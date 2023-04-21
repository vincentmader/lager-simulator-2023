import {Position} from "../../math/vector.js";
import {CoordinateTransformer} from "../../math/coordinate_transformer.js";
import {gaussian_random} from "../../math/utils.js";


export class Renderer {

    constructor(world, canvas) {
        this.world = world;
        this.canvas = canvas;
        this.environment_clock = Date.now();
        this.fire_cache = []
        this.coordinate_transformer = new CoordinateTransformer(world, canvas);
        this.iso_canvas = this.draw_background();
    }

    draw_person(person) {
        let position = person.position;
        let color = person.color;
        this.draw_circle(position, 5 * this.canvas.zoom_level, color);
        // let dimensions = [100, 100]; // TODO Define image size.
        // let src = "/img/sprite.png";
        // this.draw_image(src, position, dimensions);

    }

    draw_image(src, position, dimensions) {
        position = this.coordinate_transformer.cartesian_to_isometric(position);
        position = this.coordinate_transformer.world_to_canvas(position, this.canvas.zoom_level);
        let w = dimensions[0],
            h = dimensions[1];
        let x = position.x - w / 2,
            y = position.y - h / 2;
        let image = new Image(w, h);
        image.src = src;
        this.canvas.ctx.drawImage(image, x, y, w, h);
    }

    draw_fire(position) {
        let x = position.x,
            y = position.y,
            z = position.z;
        let scale = 0.2;
        // Define fire particle locatins.
        if (Date.now() > this.environment_clock + 70) {
            this.environment_clock = Date.now()
            this.fire_cache = [];
            for (let i = 0; i < 25; i++) {
                let offset_x = gaussian_random();
                let offset_z = Math.abs(gaussian_random(0, 2));
                let radius = Math.max(3, (10 - offset_z) * 0.5 + Math.random()) * scale * this.canvas.zoom_level;
                let color = "rgb(255, " + Math.min(220, (20 * scale * offset_z) ** 2 + Math.abs(30 * scale * offset_x ** 3)) + ", 0)";
                let part_x = x + offset_x * scale;
                let part_y = y;
                let part_z = z + offset_z * scale * this.canvas.zoom_level / 4;
                // Note: The factor 4 here is an ambiguous choice. Important is only to include the zoom level!
                this.fire_cache.push([part_x, part_y, part_z, radius, color]);
            }
        }
        // Draw fire particles.
        for (let i = 0; i < this.fire_cache.length; i++) {
            let part_x = this.fire_cache[i][0],
                part_y = this.fire_cache[i][1],
                part_z = this.fire_cache[i][2],
                radius = this.fire_cache[i][3],
                color = this.fire_cache[i][4];
            let position = new Position(part_x, -part_y, part_z);
            this.draw_circle(position, radius, color);
        }
        // Draw piece of wood.
        let wood_width = 12 * this.canvas.zoom_level;
        let wood_height = 0.2 * wood_width;
        this.draw_rectangle_fast(new Position(x, y), wood_width, wood_height, "rgb(120, 51, 0)");
    }

    draw_circle(position, r, color) {
        position = this.coordinate_transformer.cartesian_to_isometric(position);
        position = this.coordinate_transformer.world_to_canvas(position, this.canvas.zoom_level);
        this.canvas.ctx.strokeStyle = color;
        this.canvas.ctx.fillStyle = color;
        this.canvas.ctx.beginPath();
        this.canvas.ctx.arc(position.x, position.y, r, 0, 2 * Math.PI);
        this.canvas.ctx.stroke();
        this.canvas.ctx.fill();
    }

    draw_rectangle_fast(position, width, height, color) {
        position = this.coordinate_transformer.cartesian_to_isometric(position);
        position = this.coordinate_transformer.world_to_canvas(position, this.canvas.zoom_level);
        this.canvas.ctx.strokeStyle = color;
        this.canvas.ctx.fillStyle = color;
        this.canvas.ctx.beginPath();
        this.canvas.ctx.rect(position.x - width / 2, position.y - height / 2, width, height);
        this.canvas.ctx.stroke();
        this.canvas.ctx.fill();
    }

    draw_text(position, text_content, {font = "15px sans-serif", color = "white"}) {
        position = this.coordinate_transformer.cartesian_to_isometric(position);
        position = this.coordinate_transformer.world_to_canvas(position, this.canvas.zoom_level);
        this.canvas.ctx.font = font;
        this.canvas.ctx.fillStyle = color;
        this.canvas.ctx.fillText(text_content, position.x, position.y);
    }

    draw_rectangle(rect, color) { // TODO Use different format for arguments?
        this.canvas.ctx.strokeStyle = color;
        this.canvas.ctx.beginPath();
        let corners = rect.corners;
        corners = corners.map((c) => {
            return this.coordinate_transformer.cartesian_to_isometric(c);
        });
        corners = corners.map((c) => {
            return this.coordinate_transformer.world_to_canvas(c, this.canvas.zoom_level);
        });
        for (let idx = 0; idx < corners.length; idx++) {
            let from = corners[idx];
            let jdx = idx + 1;
            if (jdx == corners.length) {jdx = 0;}
            let to = corners[jdx];
            this.canvas.ctx.moveTo(from.x, from.y);
            this.canvas.ctx.lineTo(to.x, to.y);
        }
        this.canvas.ctx.stroke();
    }

    draw_floor_grid() {
        let color = "rgb(255, 0, 0)";
        let rectangles = this.world.floor_grid.boundary;
        this.draw_rectangle(rectangles, color)
    }

    draw_background() {
        let position = new Position(0, 0);
        let src = "/img/grass_small.jpg";
        position = this.coordinate_transformer.cartesian_to_isometric(position);
        position = this.coordinate_transformer.world_to_canvas(position, this.canvas.zoom_level);
        let size = 2400
        let image = new Image();
        image.src = src;
        let iso_canvas = document.createElement("canvas");
        iso_canvas.width = size;
        iso_canvas.height = size;
        let iso_ctx = iso_canvas.getContext("2d");
        iso_ctx.setTransform(1, -0.5, 1, 0.5, 0, 0);
        let zoom = this.canvas.zoom_level
        image.onload = function() {
            let pattern = iso_ctx.createPattern(image, "repeat");
            iso_ctx.fillStyle = pattern
            iso_ctx.fillRect(-size*0.25*zoom, 0.5*size - 0.25*size*zoom, size/2*zoom, size/2*zoom)
        };
        return iso_canvas;
    }

    draw_labeled_positions() {
        let floor_grid = this.world.floor_grid;
        let rectangles = floor_grid.rectangles;
        rectangles.forEach((rect) => {
            let position = rect.position;
            this.draw_circle(position, 1, "#444444");
            let text_content = " (" + position.x + "," + position.y + ")";
            this.draw_text(position, text_content, {color: "#444444"});
        });
    }

    clear_screen() {
        this.canvas.ctx.clearRect(0, 0, this.canvas.W, this.canvas.H);
    }

    display() {
        this.clear_screen();
        this.canvas.ctx.drawImage(this.iso_canvas, -this.iso_canvas.width/4, 0) // needed
        // this.draw_labeled_positions();
        this.draw_floor_grid();
        this.world.people.forEach((person) => {
            this.draw_person(person);
        });
        this.draw_fire(this.world.fire.position)

        // TODO Remove this again (temporary test).
        this.test_draw_tent(new Position(7, 6), "LEFT_NO_OUTLINE.png");
        this.test_draw_tent(new Position(-5, 3), "RIGHT_NO_OUTLINE.png");
    }

    // TODO Remove this again (temporary test).
    test_draw_tent(position, filename) {
        let src = "/img/sprites/sort/Isometriccampingtent/" + filename;
        let scale = 1 / 12;
        let dimensions = [
            1024 * this.canvas.zoom_level * scale,
            631 * this.canvas.zoom_level * scale,
        ];
        this.draw_image(src, position, dimensions);
    };
}


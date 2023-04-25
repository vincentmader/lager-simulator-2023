import {Position} from "../../math/vector.js";
import {CoordinateTransformer} from "../../math/coordinate_transformer.js";
import {gaussian_random} from "../../math/utils.js";
import {JupfiZelt, Lagerfeuer, LeiterJurte, PfadiZelt, RoverZelt, WoelflingsZelt} from "../../data/entities/structures.js";
import {Rectangle} from "../../math/rectangle.js";


export class Renderer {

    constructor(world, game_display, active_entity) {
        this.world = world;
        this.game_display = game_display; // TODO Rename to `game_display` (everywhere).
        this.environment_clock = Date.now();
        this.fire_cache = []
        this.coordinate_transformer = new CoordinateTransformer(world, game_display);
        this.image_cache = {};
        this.active_entity = active_entity;
    }

    display() {
        this.clear_screen();
        if (this.game_display.draw_floor_background) {
            this.draw_floor_background();
        }
        if (this.game_display.draw_world_boundary) {
            this.draw_world_boundary();
        }
        if (this.game_display.draw_floor_grid) {
            this.draw_floor_grid();
        }
        if (this.game_display.draw_labeled_positions) {
            this.draw_labeled_positions();
        }
        if (this.active_entity["field"] !== null) {
            let rect = new Rectangle(this.active_entity["field"], [1, 1]);
            this.draw_rectangle(rect,  "white");
        }

        this.world.people.forEach((person) => {
            this.draw_person(person);
        });

        // TODO Remove this again (temporary test).
        this.world.structures.forEach((structure) => {
            switch (structure.constructor) {
                case Lagerfeuer:
                    this.draw_fire(structure);
                    break
                case WoelflingsZelt:
                case JupfiZelt:
                case PfadiZelt:
                case RoverZelt:
                case LeiterJurte:
                    this.test_draw_tent(structure);
                    break
            }
        });

        if (this.active_entity["person"] !== null) {
            let speech_bubble_position = new Position(
                this.active_entity["person"].position.x,
                this.active_entity["person"].position.y,
                this.active_entity["person"].position.z + 0.3*this.game_display.zoom_level
            )
            this.draw_speech_bubble(speech_bubble_position, 50 * this.game_display.zoom_level, 30 * this.game_display.zoom_level,
            "Lass uns mal Tequila trinken!");
        }
    }

    draw_speech_bubble(position, width, height, text) {
        let canvas_position = this.coordinate_transformer.cartesian_to_isometric(position);
        canvas_position = this.coordinate_transformer.world_to_game_display(canvas_position, this.game_display.zoom_level);
        this.game_display.ctx.fillStyle = "white";
        this.game_display.ctx.beginPath();
        let corners = [
            new Position(canvas_position.x - width/2, canvas_position.y - height/2),
            new Position(canvas_position.x + width/2, canvas_position.y - height/2),
            new Position(canvas_position.x + width/2, canvas_position.y + height/2),
            new Position(canvas_position.x + 0.1*width, canvas_position.y + height/2),
            new Position(canvas_position.x, canvas_position.y + height*0.7),
            new Position(canvas_position.x  - 0.1*width, canvas_position.y + height/2),
            new Position(canvas_position.x - width/2, canvas_position.y + height/2),
        ]
        this.game_display.ctx.moveTo(corners[0].x, corners[0].y);
        for (let idx = 1; idx < corners.length; idx++) {
            this.game_display.ctx.lineTo(corners[idx].x, corners[idx].y);
        }
        this.game_display.ctx.closePath();
        this.game_display.ctx.fill();
        let font_size = 15 * this.game_display.zoom_level / 5;
        this.draw_text(position, text, {font_size:font_size, color:"black"});
    }

    draw_person(person) {
        let position = person.position;
        let color = person.color;
        this.draw_circle(position, 5 * this.game_display.zoom_level, color);
        // let dimensions = [100, 100]; // TODO Define image size.
        // let src = "/img/sprite.png";
        // this.draw_image(src, position, dimensions);

    }

    draw_image(src, position, dimensions) {
        let w = dimensions[0],
            h = dimensions[1];
        let image = null;
        if (this.image_cache[src] == null) {
            image = new Image(w, h);
            image.src = src;
            this.image_cache[src] = image;
        } else {
            image = this.image_cache[src];
        }
        position = this.coordinate_transformer.cartesian_to_isometric(position);
        position = this.coordinate_transformer.world_to_game_display(position, this.game_display.zoom_level);
        let x = position.x - w / 2,
            y = position.y - h / 2;
        this.game_display.ctx.drawImage(image, x, y, w, h);
    }

    draw_fire(fire) {
        let x = fire.position.x,
            y = fire.position.y,
            z = fire.position.z;
        let scale = 0.2;
        // Define fire particle locatins.
        if (Date.now() > this.environment_clock + 70) {
            this.environment_clock = Date.now()
            this.fire_cache = [];
            for (let i = 0; i < 25; i++) {
                let offset_x = gaussian_random();
                let offset_z = Math.abs(gaussian_random(0, 1.5));
                let radius = Math.max(3, (10 - offset_z) * 0.6 + Math.random()) * scale * this.game_display.zoom_level;
                let color = "rgb(255, " + Math.min(220, (20 * scale * offset_z) ** 2 + Math.abs(30 * scale * offset_x ** 3)) + ", 0)";
                let part_x = x + offset_x * scale;
                let part_y = y;
                let part_z = z + offset_z * scale * this.game_display.zoom_level / 4;
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
        let wood_width = 12 * this.game_display.zoom_level;
        let wood_height = 0.2 * wood_width;
        this.draw_rectangle_fast(new Position(x, y), wood_width, wood_height, "rgb(120, 51, 0)");
    }

    draw_circle(position, r, color) {
        position = this.coordinate_transformer.cartesian_to_isometric(position);
        position = this.coordinate_transformer.world_to_game_display(position, this.game_display.zoom_level);
        this.game_display.ctx.strokeStyle = color;
        this.game_display.ctx.fillStyle = color;
        this.game_display.ctx.beginPath();
        this.game_display.ctx.arc(position.x, position.y, r, 0, 2 * Math.PI);
        this.game_display.ctx.stroke();
        this.game_display.ctx.fill();
    }

    draw_rectangle_fast(position, width, height, color) {
        position = this.coordinate_transformer.cartesian_to_isometric(position);
        position = this.coordinate_transformer.world_to_game_display(position, this.game_display.zoom_level);
        this.game_display.ctx.strokeStyle = color;
        this.game_display.ctx.fillStyle = color;
        this.game_display.ctx.beginPath();
        this.game_display.ctx.rect(position.x - width / 2, position.y - height / 2, width, height);
        this.game_display.ctx.stroke();
        this.game_display.ctx.fill();
    }

    draw_text(position, text_content, {
        font_size = 15,
        font_family = "sans-serif",
        color = "white"
    }) {
        let font = font_size + "px " + font_family;
        position = this.coordinate_transformer.cartesian_to_isometric(position);
        position = this.coordinate_transformer.world_to_game_display(position, this.game_display.zoom_level);
        this.game_display.ctx.font = font;
        this.game_display.ctx.fillStyle = color;
        this.game_display.ctx.textAlign = "center";
        this.game_display.ctx.fillText(text_content, position.x, position.y);
    }

    draw_rectangle(rect, color) { // TODO Use different format for arguments?
        this.game_display.ctx.strokeStyle = color;
        this.game_display.ctx.beginPath();
        let corners = rect.corners;
        corners = corners.map((c) => {
            return this.coordinate_transformer.cartesian_to_isometric(c);
        });
        corners = corners.map((c) => {
            return this.coordinate_transformer.world_to_game_display(c, this.game_display.zoom_level);
        });
        for (let idx = 0; idx < corners.length; idx++) {
            let from = corners[idx];
            let jdx = idx + 1;
            if (jdx == corners.length) {jdx = 0;}
            let to = corners[jdx];
            this.game_display.ctx.moveTo(from.x, from.y);
            this.game_display.ctx.lineTo(to.x, to.y);
        }
        this.game_display.ctx.stroke();
    }

    draw_floor_grid() {
        let color = "#444444";
        let rectangles = this.world.floor_grid.rectangles;
        rectangles.forEach((rect) => {
            this.draw_rectangle(rect, color);
        });
    }

    draw_world_boundary() {
        let color = "rgb(255, 0, 0)";
        let boundary = this.world.floor_grid.boundary;
        this.draw_rectangle(boundary, color);
    }

    draw_floor_background() {
        // TODO Account for uneven number of cells.
        let tiles = 16; // Since each grass-image contains 8x8 tiles, this amounts to 128 tiles in each direction.
        let tile_size = 2400 / tiles * this.game_display.zoom_level;
        for (let x = 0; x < tiles; x++) {
            for (let y = 0; y < tiles; y++) {
                let x_pos = this.world.dimensions[0]*((x + 0.5)/tiles - 0.5) - 0.5;
                let y_pos = this.world.dimensions[1]*((y + 0.5)/tiles - 0.5) - 0.5;
                this.draw_image("/img/grass.png", new Position(x_pos, y_pos), [
                    tile_size, 
                    tile_size
                    ]);
            }
        }
    }

    draw_labeled_positions() {
        let floor_grid = this.world.floor_grid;
        let rectangles = floor_grid.rectangles;
        rectangles.forEach((rect) => {
            let scale = 5;
            let position = rect.position;
            let radius = 2 * this.game_display.zoom_level / scale;
            this.draw_circle(position, radius, "#444444");
            let text_content = " (" + position.x + "," + position.y + ")";
            let font_size = 15 * this.game_display.zoom_level / scale;
            this.draw_text(position, text_content, {font_size: font_size, color: "#444444"});
        });
    }

    clear_screen() {
        this.game_display.ctx.clearRect(0, 0, this.game_display.W, this.game_display.H);
    }

    // TODO Remove this again (temporary test).
    test_draw_tent(tent) {
        let scale = 1 / 12;
        let dimensions = [
            1024 * this.game_display.zoom_level * scale,
            631 * this.game_display.zoom_level * scale,
        ];
        this.draw_image(tent.texture, tent.position, dimensions);
    };
}


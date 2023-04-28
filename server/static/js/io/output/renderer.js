import {Position} from "../../math/vector.js";
import {CoordinateTransformer} from "../../math/coordinate_transformer.js";
import {gaussian_random} from "../../math/utils.js";
import {Rectangle} from "../../math/rectangle.js";
// import {JupfiZelt, Lagerfeuer, LeiterJurte, PfadiZelt, RoverZelt, WoelflingsZelt} from "../../data/entities/structures.js";


export class Renderer {

    constructor(world, game_display, active_entity) {
        this.world = world;
        this.game_display = game_display; // TODO Rename to `game_display` (everywhere).
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
        if (true) {
            this.world.people.forEach((person) => {
                this.draw_bounding_box(person);
            });
            this.world.structures().forEach((structure) => {
                this.draw_bounding_box(structure);
            })
        }
        if (this.active_entity["field"] !== null) {
            let rect = new Rectangle(this.active_entity["field"], [1, 1]);
            this.draw_rectangle(rect, "white");
        }

        let active_person = this.active_entity["person"];
        this.world.people.forEach((person) => {
            let is_activated = active_person == person;
            this.draw_person(person, is_activated);
        });
        this.world.trees.forEach((tree) => {
            this.draw_tree(tree);
        });
        this.world.tents.forEach((tent) => {
            this.draw_tent(tent);
        });
        this.world.campfires.forEach((campfire) => {
            this.draw_campfire(campfire);
        });
        if (this.draw_fps) {
            this.draw_fps();
        }
        this.draw_cardinal_direction_labels();

        // this.game_display.element.style.filter = "grayscale(100%)";
    }

    draw_speech_bubble(position, width, height, text) {
        let canvas_position = this.coordinate_transformer.cartesian_to_isometric(position);
        canvas_position = this.coordinate_transformer.world_to_game_display(canvas_position, this.game_display.zoom_level);

        this.game_display.ctx.fillStyle = "white";
        this.game_display.ctx.beginPath();
        let corners = [
            new Position(canvas_position.x - width / 2, canvas_position.y - height / 2),
            new Position(canvas_position.x + width / 2, canvas_position.y - height / 2),
            new Position(canvas_position.x + width / 2, canvas_position.y + height / 2),
            new Position(canvas_position.x + 0.1 * width, canvas_position.y + height / 2),
            new Position(canvas_position.x, canvas_position.y + height * 0.7),
            new Position(canvas_position.x - 0.1 * width, canvas_position.y + height / 2),
            new Position(canvas_position.x - width / 2, canvas_position.y + height / 2),
        ]
        this.game_display.ctx.moveTo(corners[0].x, corners[0].y);
        for (let idx = 1; idx < corners.length; idx++) {
            let to = corners[idx];
            this.game_display.ctx.lineTo(to.x, to.y);
        }
        this.game_display.ctx.closePath();
        this.game_display.ctx.fill();
        let font_size = 1 * this.game_display.zoom_level;
        this.draw_text(position, text, {font_size: font_size, color: "black"});
    }

    draw_person(person, is_activated = false) {
        let position = person.position;
        let color = person.color;
        let player_radius = 0.5 * this.game_display.zoom_level;
        if (is_activated) {
            this.draw_circle(position, player_radius*1.1, "white");
        }
        this.draw_circle(position, player_radius, color);
        // let dimensions = [100, 100]; // TODO Define image size.
        // let src = "/img/sprite.png";
        // this.draw_image(src, position, dimensions);
    }

    draw_image(src, position, dimensions, texture_origin) {
        position = this.coordinate_transformer.cartesian_to_isometric(position);
        position = this.coordinate_transformer.world_to_game_display(position, this.game_display.zoom_level);

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
        let x = null,
            y = null;
        x = position.x - w * texture_origin[0];
        y = position.y - h * texture_origin[1];
        this.game_display.ctx.drawImage(image, x, y, w, h);
    }

    draw_fps() {
        let font_size = 30;
        let position = new Position(10, font_size);
        let fps = 1 / this.game_display.dt
        let text_content = Math.round(fps) + " fps";
        this.game_display.ctx.font = font_size + "px " + "sans-serif";
        this.game_display.ctx.fillStyle = "white";
        this.game_display.ctx.textAlign = "left";
        this.game_display.ctx.fillText(text_content, position.x, position.y);
    }

    draw_campfire(fire) {
        let x = fire.position.x,
            y = fire.position.y,
            z = fire.position.z;
        this.draw_point_light(fire);
        let scale = 0.2;
        // Define fire particle locatins.
        if (Date.now() > fire.animation_clock + fire.animation_offset) {
            fire.animation_clock = Date.now();
            fire.particle_cache = [];
            for (let i = 0; i < 25; i++) {
                let offset_x = gaussian_random(0, 2);
                let offset_z = Math.abs(gaussian_random(0, 1.5));
                let radius = Math.max(3, (10 - offset_z) * 0.6 + Math.random()) * scale * this.game_display.zoom_level * 0.1;
                let color = "rgb(255, " + Math.min(220, (20 * scale * offset_z) ** 2 + Math.abs(30 * scale * offset_x ** 3)) + ", 0)";
                let part_x = x + offset_x * scale;
                let part_y = y;
                let part_z = z + offset_z;
                // Note: The factor 4 here is an ambiguous choice. Important is only to include the zoom level!
                fire.particle_cache.push([part_x, part_y, part_z, radius, color]);
            }
        }
        // Draw fire particles.
        for (let i = 0; i < fire.particle_cache.length; i++) {
            let [part_x, part_y, part_z, radius, color] = fire.particle_cache[i];
            let position = new Position(part_x, part_y, part_z);
            this.draw_circle(position, radius, color);
        }
        // Draw piece of wood.
        let wood_width = 2 * this.game_display.zoom_level;
        let wood_height = 0.2 * wood_width;
        this.draw_rectangle_fast(new Position(x, y), wood_width, wood_height, "rgb(120, 51, 0)");
    }

    draw_point_light(light) {
        let radius = Math.ceil(light.bounding_box.dimensions[0]);
        let update_lighting_values = false;
        if (Date.now() > light.animation_clock + light.animation_offset) {
            update_lighting_values = true;
        }
        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                let lighting_cache_index = (dx + radius) * 2 * radius + (dy + radius)
                if (update_lighting_values) {
                    light.lighting_cache[lighting_cache_index] = (0.5 - (Math.abs(dx) + Math.abs(dy)) / (4 * radius) + Math.random() * 0.1)
                }
                this.fill_rectangle(new Rectangle(
                    light.position.add(new Position(dx, dy)),
                    [1, 1]),
                    "rgba(255, 102, 0, " + light.lighting_cache[lighting_cache_index] + ")")
            }
        }
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
        position = this.coordinate_transformer.cartesian_to_isometric(position);
        position = this.coordinate_transformer.world_to_game_display(position, this.game_display.zoom_level);

        let font = font_size + "px " + font_family;
        this.game_display.ctx.font = font;
        this.game_display.ctx.fillStyle = color;
        this.game_display.ctx.textAlign = "center";
        this.game_display.ctx.fillText(text_content, position.x, position.y);
    }

    draw_rectangle(rect, color) { // TODO Use different format for arguments?
        let corners = rect.corners;
        corners = corners.map((c) => {
            return this.coordinate_transformer.cartesian_to_isometric(c);
        });
        corners = corners.map((c) => {
            return this.coordinate_transformer.world_to_game_display(c, this.game_display.zoom_level);
        });

        this.game_display.ctx.strokeStyle = color;
        this.game_display.ctx.beginPath();
        this.game_display.ctx.moveTo(corners[0].x, corners[0].y);
        for (let idx = 1; idx < corners.length; idx++) {
            let to = corners[idx];
            this.game_display.ctx.lineTo(to.x, to.y);
        }
        this.game_display.ctx.closePath();
        this.game_display.ctx.stroke();
    }

    fill_rectangle(rect, color) { // TODO Use different format for arguments?
        let corners = rect.corners;
        corners = corners.map((c) => {
            return this.coordinate_transformer.cartesian_to_isometric(c);
        });
        corners = corners.map((c) => {
            return this.coordinate_transformer.world_to_game_display(c, this.game_display.zoom_level);
        });

        this.game_display.ctx.fillStyle = color;
        this.game_display.ctx.beginPath();
        this.game_display.ctx.moveTo(corners[0].x, corners[0].y);
        for (let idx = 1; idx < corners.length; idx++) {
            let to = corners[idx];
            this.game_display.ctx.lineTo(to.x, to.y);
        }
        this.game_display.ctx.closePath();
        this.game_display.ctx.fill();
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
        let tile_size = 256 / tiles * this.game_display.zoom_level;
        for (let x = 0; x < tiles; x++) {
            for (let y = 0; y < tiles; y++) {
                let x_pos = this.world.dimensions[0] * ((x + 0.5) / tiles - 0.5) - 0.5;
                let y_pos = this.world.dimensions[1] * ((y + 0.5) / tiles - 0.5) - 0.5;
                this.draw_image("/img/grass.png", new Position(x_pos, y_pos), [
                    tile_size,
                    tile_size
                ], [0.5, 0.5]);
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
        let W = this.game_display.width,
            H = this.game_display.height;
        this.game_display.ctx.clearRect(0, 0, W, H);
    }

    draw_tent(tent) {
        let scale = 1 / 100; // TODO Remove magic number.
        let dimensions = [
            1024 * this.game_display.zoom_level * scale,
            631 * this.game_display.zoom_level * scale,
        ];
        this.draw_image(tent.texture, tent.position, dimensions, tent.texture_origin);
    };

    draw_tree(tree) {
        let scale = 1 / 20; // TODO Remove magic number.
        let dimensions = [
            150 * this.game_display.zoom_level * scale,
            150 * this.game_display.zoom_level * scale,
        ];
        this.draw_image(tree.texture, tree.position, dimensions, tree.texture_origin);
    }

    draw_bounding_box(entity) {
        this.draw_rectangle(entity.bounding_box, "red");
    }

    draw_cardinal_direction_labels() {
        // TODO North is in the bottom left at the moment. Change?
        let x_max = this.world.dimensions[0] / 2,
            y_max = this.world.dimensions[1] / 2,
            delta = 5;
        let positions = [
            new Position(0, y_max + delta),
            new Position(0, -(y_max + delta)),
            new Position(x_max + delta, 0),
            new Position(-(x_max + delta), 0)
        ]
        let labels = ["N", "S", "E", "W"];
        [0, 1, 2, 3].forEach((i) => {
            let position = positions[i];
            let label = labels[i];
            let color;
            if (label == "N") {color = "red";} else {color = "white";}
            this.draw_text(position, labels[i], {color: color});
        });
    }
}


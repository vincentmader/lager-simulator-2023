import {CoordinateTransformer, Position} from "./position.js";
import {Slider} from "./inputs.js";

var ZOOM_LEVEL = 1; // TODO Move definition of zoom-level elsewhere.
const setup_sliders = () => {
    var oninput = (value) => {
        console.log("zoom level: " + ZOOM_LEVEL + " -> " + value);
        ZOOM_LEVEL = value;
    };
    let slider = new Slider("zoom_slider", {oninput: oninput, min: 1, max: 21, step: 0.01, value: ZOOM_LEVEL});
}
setup_sliders();
// NOTE The above is here only temporarily for testing. 
// TODO Move definition of sliders elsewhere.

export class Renderer {

    constructor(world, canvas) {
        this.world = world;
        this.canvas = canvas;
        this.environment_clock = Date.now();
        this.fire_cache = []
        this.coordinate_transformer = new CoordinateTransformer(world, canvas);
    }

    gaussian_random(mean = 0, stdev = 1) { // TODO Move elsewhere.
        let u = 1 - Math.random(); // Converting [0,1) to (0,1]
        let v = Math.random();
        let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        // Transform to the desired mean and standard deviation:
        return z * stdev + mean;
    }

    draw_person(position, color) {
        this.draw_circle(position, 5, color);
    }

    draw_fire(position) {
        let x = position.x,
            y = position.y;
        // TODO Use position object instead of x & y. (?)
        let scale = 0.2;
        if (Date.now() > this.environment_clock + 70) {
            this.environment_clock = Date.now()
            this.fire_cache = [];
            for (let i = 0; i < 25; i++) {
                let offset_x = this.gaussian_random();
                let offset_y = Math.abs(this.gaussian_random(0, 3));
                let part_x = x + offset_x * scale;
                let part_y = y - offset_y * scale;
                let radius = Math.max(3, (10 - offset_y) * 0.1 + Math.random()) * scale * ZOOM_LEVEL;
                let color = "rgb(255, " + Math.min(220, (scale * offset_y) ** 1.5 + Math.abs(scale * offset_x ** 3)) + ", 0)";
                this.fire_cache.push([part_x, part_y, radius, color]);
            }
        }
        for (let i = 0; i < this.fire_cache.length; i++) {
            let part_x = this.fire_cache[i][0],
                part_y = this.fire_cache[i][1],
                radius = this.fire_cache[i][2],
                color = this.fire_cache[i][3];
            let position = new Position(part_x, -part_y);
            // TODO ^ Use position object already earlier in this function. (?)
            this.draw_circle(position, radius, color);
        }
        let wood_size = 10 * ZOOM_LEVEL;
        this.draw_rectangle_fast(
            new Position(x, y),
            wood_size,
            wood_size * 0.2,
            "rgb(120, 51, 0)"
        );
    }

    draw_circle(position, r, color) {
        position = this.coordinate_transformer.cartesian_to_isometric(position);
        // TODO This conversion here leads to the fire blowing off at an angle.
        //      -> Fire particle coords should not be given as (x, y), but as (x, y, z) instead!
        position = this.coordinate_transformer.world_to_canvas(position, ZOOM_LEVEL);
        this.canvas.ctx.strokeStyle = color;
        this.canvas.ctx.fillStyle = color;
        this.canvas.ctx.beginPath();
        this.canvas.ctx.arc(position.x, position.y, r, 0, 2 * Math.PI);
        this.canvas.ctx.stroke();
        this.canvas.ctx.fill();
    }

    draw_rectangle_fast(position, width, height, color) {
        position = this.coordinate_transformer.cartesian_to_isometric(position);
        position = this.coordinate_transformer.world_to_canvas(position, ZOOM_LEVEL);
        this.canvas.ctx.strokeStyle = color;
        this.canvas.ctx.fillStyle = color;
        this.canvas.ctx.beginPath();
        this.canvas.ctx.rect(position.x - width / 2, position.y - height / 2, width, height);
        this.canvas.ctx.stroke();
        this.canvas.ctx.fill();
    }

    draw_text(position, text_content, {font = "15px sans-serif", color = "white"}) {
        position = this.coordinate_transformer.cartesian_to_isometric(position);
        position = this.coordinate_transformer.world_to_canvas(position, ZOOM_LEVEL);
        this.canvas.ctx.font = font;
        this.canvas.ctx.fillStyle = color;
        this.canvas.ctx.fillText(text_content, position.x, position.y);
    }

    draw_rectangle(rect, color) { // TODO Use different format for arguments?
        this.canvas.ctx.strokeStyle = color;
        this.canvas.ctx.beginPath();
        let corners = rect.corners();
        corners = corners.map((c) => {
            return this.coordinate_transformer.cartesian_to_isometric(c);
        });
        corners = corners.map((c) => {
            return this.coordinate_transformer.world_to_canvas(c, ZOOM_LEVEL);
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
    };

    draw_floor_grid() {
        let color = "#444444";
        let rectangles = this.world.floor_grid.rectangles;
        rectangles.forEach((rect) => {
            this.draw_rectangle(rect, color);
        });
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
        // this.draw_labeled_positions()
        this.draw_floor_grid();
        this.world.people.forEach((person) => {
            this.draw_person(person.position, person.color)
        });
        // this.draw_fire(this.world.fire.position)
    }

}

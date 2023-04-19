import {draw_floor_grid} from "./test_isometric.js";

export class Renderer {

    constructor(world, canvas) {
        this.world = world;
        this.canvas = canvas;
        this.environment_clock = Date.now();
        this.fire_cache = []
    }

    gaussian_random(mean = 0, stdev = 1) {
        let u = 1 - Math.random(); // Converting [0,1) to (0,1]
        let v = Math.random();
        let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        // Transform to the desired mean and standard deviation:
        return z * stdev + mean;
    }

    draw_person(x, y, color) {
        this.draw_circle(x, y, 5, color);
    }

    draw_fire(x, y) {
        let scale = 10
        if (Date.now() > this.environment_clock + 70) {
            this.environment_clock = Date.now()
            this.fire_cache = [];
            for (let i = 0; i < 25; i++) {
                let offset_x = this.gaussian_random();
                let part_x = x + offset_x * scale;
                let offset_y = Math.abs(this.gaussian_random(0, 3));
                let part_y = y - offset_y * scale;
                let radius = Math.max(3, (10 - offset_y) * 0.1 * scale + Math.random())
                let color = "rgb(255, " + Math.min(220, (scale * offset_y) ** 1.5 + Math.abs(scale * offset_x ** 3)) + ", 0)";
                this.fire_cache.push([part_x, part_y, radius, color]);
            }
        }
        for (let i = 0; i < this.fire_cache.length; i++) {
            let part_x = this.fire_cache[i][0],
                part_y = this.fire_cache[i][1],
                radius = this.fire_cache[i][2],
                color = this.fire_cache[i][3];
            this.draw_circle(part_x, part_y, radius, color);
        }
        let wood_size = 6
        this.draw_rectangle(x - wood_size * scale / 2, y,
            wood_size * scale, wood_size * scale * 0.2, "rgb(120, 51, 0)")
    }

    draw_circle(x, y, r, color) {
        this.canvas.ctx.strokeStyle = color;
        this.canvas.ctx.fillStyle = color;
        this.canvas.ctx.beginPath();
        this.canvas.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.canvas.ctx.stroke();
        this.canvas.ctx.fill();
    }

    draw_rectangle(x, y, width, height, color) {
        this.canvas.ctx.strokeStyle = color;
        this.canvas.ctx.fillStyle = color;
        this.canvas.ctx.beginPath();
        this.canvas.ctx.rect(x, y, width, height);
        this.canvas.ctx.stroke();
        this.canvas.ctx.fill();
    }

    clear_screen() {
        this.canvas.ctx.clearRect(0, 0, this.canvas.W, this.canvas.H);
    }

    display() {
        this.clear_screen();
        draw_floor_grid();
        this.world.people.forEach((person) => {
            let x = person.position[0],
                y = person.position[1];
            this.draw_person(x, y, person.color)
        });
        this.draw_fire(this.world.fire.position[0], this.world.fire.position[1])
    }

}

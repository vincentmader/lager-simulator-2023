export class Renderer {
    constructor(world, canvas) {
        this.world = world;
        this.canvas = canvas;
    }
    draw_person(x, y, color) {
        this.draw_circle(x, y, 5, color);
    };
    draw_circle(x, y, r, color) {
        this.canvas.ctx.strokeStyle = color;
        this.canvas.ctx.fillStyle = color;
        this.canvas.ctx.beginPath();
        this.canvas.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.canvas.ctx.stroke();
        this.canvas.ctx.fill();
    }
    clear_screen() {
        this.canvas.ctx.clearRect(0, 0, this.canvas.W, this.canvas.H);
    }
    display() {
        this.clear_screen();
        this.world.people.forEach((person) => {
            let x = person.position[0],
                y = person.position[1];
            this.draw_person(x, y, person.color)
        });
    }
}

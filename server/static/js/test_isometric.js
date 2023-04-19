import {Position} from "./position.js";

const canvas = document.getElementById("canvas-0");
const ctx = canvas.getContext("2d");

class Rectangle {
    constructor(position, dimensions) {
        this.position = position;
        this.dimensions = dimensions;
    }
    corners() {
        let x = this.position.x,
            y = this.position.y;
        let w = this.dimensions[0],
            h = this.dimensions[1];
        return [
            new Position(x - w / 2, y - h / 2),
            new Position(x + w / 2, y - h / 2),
            new Position(x + w / 2, y + h / 2),
            new Position(x - w / 2, y + h / 2),
        ];
    }
}

const create_rectangles = () => {
    let N = 10;
    let W = 100,
        H = 100;
    let rectangles = [];
    for (let idx = 0; idx < N; idx++) {
        for (let jdx = 0; jdx < N; jdx++) {
            let position = new Position(idx * W, jdx * H);
            let rect = new Rectangle(position, [W, H]);
            rectangles.push(rect);
        }
    }
    return rectangles;
};

const draw_rectangle = (rect) => {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.beginPath();
    let corners = rect.corners();
    corners = corners.map((c) => {return c.cartesian_to_isometric();});
    for (let idx = 0; idx < corners.length; idx++) {
        let from = corners[idx];
        let jdx = idx + 1;
        if (jdx == corners.length) {jdx = 0;}
        let to = corners[jdx];
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
    }
    ctx.stroke();
    ctx.fill();
};

export const draw_floor_grid = () => {
    let rectangles = create_rectangles();
    rectangles.forEach((rect) => {
        draw_rectangle(rect);
    });
};

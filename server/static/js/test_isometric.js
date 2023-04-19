import {Position} from "./position.js";

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

export const create_rectangles = () => {
    let N = 10;
    let W = 30,
        H = 30;
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

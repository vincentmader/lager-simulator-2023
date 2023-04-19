import {Position} from "./position.js";

export class Rectangle {
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

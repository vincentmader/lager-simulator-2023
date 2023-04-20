import {Position} from "./position.js";

export class Rectangle {

    constructor(position, dimensions) {
        this.position = position;
        this.dimensions = dimensions;
        this.corners = this._corners()
    }

    _corners() {
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

    contains(position) {
        return position.x <= this.corners[1].x
            && position.x >= this.corners[0].x
            && position.y <= this.corners[2].y
            && position.y >= this.corners[0].y;
    }
}

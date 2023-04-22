import {Position} from "../math/vector.js";
import {Rectangle} from "../math/rectangle.js";


export class FloorGrid { // TODO Move definition elsewhere?

    constructor(dimensions) {
        this.W = 1;
        this.H = 1;
        this.rectangles = this._rectangles(dimensions);
        this.boundary = new Rectangle(new Position(-0.5, -0.5), dimensions); // TODO add dimensions%2 for case that we have an uneven number of cells.
    }

    _rectangles(dimensions) {
        let rectangles = [];
        for (let idx = 0; idx < dimensions[0]; idx++) {
            for (let jdx = 0; jdx < dimensions[1]; jdx++) {
                let x = this.W * (idx - dimensions[0] / 2);
                let y = this.H * (jdx - dimensions[1] / 2);
                let position = new Position(x, y);
                let rect = new Rectangle(position, [this.W, this.H]);
                rectangles.push(rect);
            }
        }
        return rectangles;
    };
}

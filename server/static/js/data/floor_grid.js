import {Position} from "../math/vector.js";
import {Rectangle} from "../math/rectangle.js";


export class FloorGrid { // TODO Move definition elsewhere?

    constructor(dimensions) {
        this.width = 1;
        this.height = 1;
        this.rectangles = this._rectangles(dimensions);
        this.boundary = new Rectangle(new Position(-0.5, -0.5), dimensions); // TODO add dimensions%2 for case that we have an uneven number of cells.
    }

    _rectangles(dimensions) {
        let rectangles = [];
        for (let idx = 0; idx < dimensions[0]; idx++) {
            for (let jdx = 0; jdx < dimensions[1]; jdx++) {
                let x = this.width * (idx - dimensions[0] / 2);
                let y = this.height * (jdx - dimensions[1] / 2);
                let position = new Position(x, y);
                let rect = new Rectangle(position, [this.width, this.height]);
                rectangles.push(rect);
            }
        }
        return rectangles;
    };
}

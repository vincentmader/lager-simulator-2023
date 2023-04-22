import {Position} from "../math/vector.js";
import {Rectangle} from "../math/rectangle.js";


export class FloorGrid { // TODO Move definition elsewhere?

    constructor(dimensions) {
        this.rectangles = this._rectangles(dimensions);
        this.boundary = new Rectangle(new Position(0, 0), dimensions);
    }

    _rectangles(dimensions) {
        let W = 1,
            H = 1;
        let rectangles = [];
        for (let idx = 0; idx < dimensions[0]; idx++) {
            for (let jdx = 0; jdx < dimensions[1]; jdx++) {
                let x = W * (idx - dimensions[0] / 2 + 0.5);
                let y = H * (jdx - dimensions[1] / 2 + 0.5);
                let position = new Position(x, y);
                let rect = new Rectangle(position, [W, H]);
                rectangles.push(rect);
            }
        }
        return rectangles;
    };
}

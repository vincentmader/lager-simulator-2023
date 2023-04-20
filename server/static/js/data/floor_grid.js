import {Position} from "../math/vector.js";
import {Rectangle} from "../math/rectangle.js";

export class FloorGrid { // TODO Move definition elsewhere?

    constructor() {
        this.rectangles = this._rectangles();
        this.boundary = new Rectangle(new Position(0, 0), [100, 100]);
    }

    _rectangles() {
        let N = 100;
        let W = 1,
            H = 1;
        let rectangles = [];
        for (let idx = 0; idx < N; idx++) {
            for (let jdx = 0; jdx < N; jdx++) {
                let x = W * (idx - N / 2);
                let y = H * (jdx - N / 2);
                let position = new Position(x, y);
                let rect = new Rectangle(position, [W, H]);
                rectangles.push(rect);
            }
        }
        return rectangles;
    };
}

import {Lagerfeuer} from "./structures.js";
import {Position} from "./position.js";
import {Rectangle} from "./rectangle.js";

export const dt = 1; // TODO Make dynamic.

export class World {

    constructor(people) {
        this.people = people
        this.fire = new Lagerfeuer(new Position(0, 0));
        this.dimensions = [100, 100]; // TODO Make dynamic?
        this.floor_grid = new FloorGrid();
        // TODO ^ Is this the right location for storing the `FloorGrid`?
    }
}

export class FloorGrid { // TODO Move definition elsewhere?

    constructor() {
        this.rectangles = this._rectangles();
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

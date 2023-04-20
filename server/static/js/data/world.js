import {Lagerfeuer} from "./entities/structures.js";
import {Position} from "../math/vector.js";
import {FloorGrid} from "./floor_grid.js";

export const dt = 1; // TODO Make dynamic.
export const N = 100;

export class World {

    constructor(people) {
        this.people = people;
        this.fire = new Lagerfeuer(new Position(0, 0));
        this.dimensions = [N, N]; // TODO Make dynamic?
        this.floor_grid = new FloorGrid(this.dimensions);
        // TODO ^ Is this the right location for storing the `FloorGrid`?
    }
}

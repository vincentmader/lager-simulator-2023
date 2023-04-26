import {FloorGrid} from "./floor_grid.js";

export const dt = 1; // TODO Make dynamic.
export const N = 128;

export class World {

    constructor(
        people,
        tents,
        trees,
        campfires,
    ) {
        this.people = people;
        this.tents = tents;
        this.trees = trees;
        this.campfires = campfires;

        this.dimensions = [N, N]; // TODO Make dynamic?
        this.floor_grid = new FloorGrid(this.dimensions);
        // TODO ^ Is this the right location for storing the `FloorGrid`?
    }

    structures() {
        return [].concat(
            this.tents,
            this.trees,
            this.campfires,
        );
    }
}

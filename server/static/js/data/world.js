import {FloorGrid} from "./floor_grid.js";

export const dt = 1; // TODO Make dynamic.

export class World {

    constructor(
        dimensions,
        people,
        tents,
        trees,
        campfires,
    ) {
        this.people = people;
        this.tents = tents;
        this.trees = trees;
        this.campfires = campfires;

        this.dimensions = dimensions;
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

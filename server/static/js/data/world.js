import {FloorGrid} from "./floor_grid.js";


export const dt = 1; // TODO Make dynamic.


export class World {

    constructor(
        dimensions,
        trees,
        scout_camps,
    ) {
        this.dimensions = dimensions;

        this.trees = trees;
        this.scout_camps = scout_camps;

        // TODO Update the arrays below when adding to e.g. a `ScoutCamp`.
        this.people = this._people();
        this.structures = this._structures();
        this.campfires = this._campfires();

        this.floor_grid = new FloorGrid(this.dimensions);
        // TODO ^ Is this the right location for storing the `FloorGrid`?
        // TODO   Maybe remove the grid now?
    }

    _structures() {
        let structures = [];
        structures = structures.concat(this.trees);
        for (let idx = 0; idx < this.scout_camps.length; idx++) {
            structures = structures.concat(this.scout_camps[idx].structures);
        }
        return structures;
    }

    _people() {
        let people = [];
        for (let idx = 0; idx < this.scout_camps.length; idx++) {
            people = people.concat(this.scout_camps[idx].people);
        }
        return people;
    }

    _campfires() {
        let campfires = [];
        for (let idx = 0; idx < this.scout_camps.length; idx++) {
            campfires = campfires.concat(this.scout_camps[idx].campfires);
        }
        return campfires;
    }
}

import {FloorGrid} from "./floor_grid.js";


export const dt = 1; // TODO Make dynamic.


export class World {

    constructor(
        dimensions,
        trees,
        scout_camps,
    ) {
        this.dimensions = dimensions;
        this.floor_grid = new FloorGrid(this.dimensions);

        this.trees = trees;
        this.scout_camps = scout_camps;

        // TODO Update the arrays below when adding to e.g. a `ScoutCamp`.
        this.people = this._people();
        this.structures = this._structures();
        this.textured_structures = this._textured_structures();
        this.campfires = this._campfires();

    }

    _textured_structures() {
        let textured_structures = [];
        textured_structures = textured_structures.concat(this.trees);
        for (let idx = 0; idx < this.scout_camps.length; idx++) {
            textured_structures = textured_structures.concat(this.scout_camps[idx].textured_structures);
        }
        textured_structures = textured_structures.sort((structure_b, structure_a) => {
            return (structure_a.position.x + structure_a.position.y) - (structure_b.position.x + structure_b.position.y);
        });
        return textured_structures;
    }

    _structures() {
        let structures = [];
        structures = structures.concat(this.trees);
        for (let idx = 0; idx < this.scout_camps.length; idx++) {
            structures = structures.concat(this.scout_camps[idx].structures);
        }
        structures = structures.sort((structure_b, structure_a) => {
            return (structure_a.position.x + structure_a.position.y) - (structure_b.position.x + structure_b.position.y);
        });
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

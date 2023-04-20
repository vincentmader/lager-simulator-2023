import {Lagerfeuer} from "./structures.js";
import {Position} from "./position.js";

export const dt = 1; // TODO Make dynamic.

export class World {
    constructor(people) {
        this.people = people
        this.fire = new Lagerfeuer(new Position(0, 0));

        this.dimensions = [100, 100];
    }
}

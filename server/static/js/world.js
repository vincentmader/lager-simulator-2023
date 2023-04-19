import {Lagerfeuer, Banner} from "./structures.js";

export const dt = 1; // TODO Make dynamic.

export class World {
    constructor(people) {
        this.people = people
        this.fire = new Lagerfeuer([300, 300]);
        this.banner = new Banner([400, 300]);
    }
}

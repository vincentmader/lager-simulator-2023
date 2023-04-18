export const dt = 1; // TODO Make dynamic.

export class World {
    constructor(people) {
        this.people = people
    }
}

export class Entity {
    constructor(position) {
        this.position = position;
    }
}

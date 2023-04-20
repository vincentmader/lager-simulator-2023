import {Rectangle} from "../../math/rectangle.js";

export class Entity {
    constructor(position, bounding_box_dims) {
        this.position = position;
        this.bounding_box = new Rectangle(this.position, bounding_box_dims);
    }
}

class Zelt extends Entity {
    constructor(position) {
        super(position, [1, 1]);
    }
}

export class KuechenZelt extends Zelt {
    constructor(position) {
        super(position);
    }
}

export class WoelflingsZelt extends Zelt {
    constructor(position) {
        super(position);
    }
}

export class JupfiZelt extends Zelt {
    constructor(position) {
        super(position);
    }
}

export class PfadiZelt extends Zelt {
    constructor(position) {
        super(position);
    }
}

export class RoverZelt extends Zelt {
    constructor(position) {
        super(position);
    }
}

export class LeiterJurte extends Zelt {
    constructor(position) {
        super(position);
    }
}

export class Lagerfeuer extends Entity {
    constructor(position) {
        super(position, [5, 5]);
    }
}

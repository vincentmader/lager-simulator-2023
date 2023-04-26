import {Rectangle} from "../../math/rectangle.js";

export class Entity {
    constructor(position, bounding_box_dims, texture) {
        this.position = position;
        this.bounding_box = new Rectangle(this.position, bounding_box_dims);
        this.texture = texture;
    }
}

export class Zelt extends Entity {
    constructor(position, bounding_box_dims, texture) {
        super(position, bounding_box_dims, texture);
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
        super(position, [6, 4], "/img/sprites/structures/tents/RIGHT_NO_OUTLINE.png");
    }
}

export class LeiterJurte extends Zelt {
    constructor(position) {
        super(position, [4, 6], "/img/sprites/structures/tents/LEFT_NO_OUTLINE.png");
    }
}

export class Lagerfeuer extends Entity {
    constructor(position) {
        super(position, [3, 3]);
    }
}

export class Tree extends Entity {
    constructor(position, bounding_box_dims, texture) {
        super(position, bounding_box_dims, texture);
    }
}

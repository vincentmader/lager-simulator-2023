import {Rectangle} from "../../math/rectangle.js";

export class Entity {
    constructor(position, bounding_box_dims, texture, texture_origin = [0.5, 0.5]) {
        this.position = position;
        this.bounding_box = new Rectangle(this.position, bounding_box_dims);
        this.texture = texture;
        this.texture_origin = texture_origin;
    }
}

export class Lightsource {
    constructor(position, intensity, color) {
        this.position = position;
        this.intensity = intensity;
        this.color = color;
    }
}

export class Zelt extends Entity {
    constructor(position, bounding_box_dims, texture, texture_origin) {
        super(position, bounding_box_dims, texture, texture_origin);
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
        super(position, [3, 5], "/img/sprites/structures/tents/LEFT_NO_OUTLINE.png", [0.4, 0.67]);
    }
}

export class RoverZelt extends Zelt {
    constructor(position) {
        super(position, [5, 3], "/img/sprites/structures/tents/RIGHT_NO_OUTLINE.png", [0.6, 0.67]);
    }
}

export class LeiterJurte extends Zelt {
    constructor(position) {
        super(position, [5, 5], "/img/sprites/structures/tents/jurte.png", [0.5, 0.67]);
    }
}

export class Lagerfeuer extends Entity {
    constructor(position) {
        super(position, [3, 3]);
        this.animation_clock = 0;
        this.animation_offset = 70;
        this.particle_cache = [];
        this.lighting_cache = [];
        this.wood_amount = 5;
    }
}

export class Tree extends Entity {
    constructor(position, texture) {
        super(position, [3, 3], texture, [0.5, 0.83]);
    }
}

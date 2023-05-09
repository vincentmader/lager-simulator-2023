import {Entity} from "./entity.js";


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

export class WeissZelt1 extends Zelt {

    constructor(position) {
        super(position, [3, 5], "/img/sprites/structures/tents/RIGHT_NO_OUTLINE.png", [0.6, 0.67]);
    }
}

export class WeissZelt2 extends Zelt {

    constructor(position) {
        super(position, [5, 3], "/img/sprites/structures/tents/LEFT_NO_OUTLINE.png", [0.4, 0.67]);
    }
}

export class Jurte extends Zelt {

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

export class Dixi extends Entity {

    constructor(position) {
        super(position, [1, 1], "/img/sprites/structures/dixies/dixi_left.png", [0.5, 0.6]);
    }
}

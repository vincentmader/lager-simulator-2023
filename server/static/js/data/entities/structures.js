import {Entity} from "./entity.js";
import {Texture} from "../../io/output/texture.js";


export class Zelt extends Entity {

    constructor(position, bounding_box_dims, texture) {
        super(position, bounding_box_dims, texture);
    }
}


export class WeissZelt1 extends Zelt {

    constructor(position) {
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/tents/RIGHT_NO_OUTLINE.png";
        let img_dimensions = [1024, 631];
        let texture_origin = [0.6, 0.67];
        let texture_scale = 1 / 120;
        // Define `Zelt` object.
        let bounding_box_dims = [3, 4];
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position, bounding_box_dims, texture);
    }
}


export class WeissZelt2 extends Zelt {

    constructor(position) {
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/tents/LEFT_NO_OUTLINE.png";
        let img_dimensions = [1024, 631];
        let texture_origin = [0.4, 0.67];
        let texture_scale = 1 / 120;
        // Define `Zelt` object.
        let bounding_box_dims = [4, 3];
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position, bounding_box_dims, texture);
    }
}


export class Jurte extends Zelt {

    constructor(position) {
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/tents/jurte.png";
        let img_dimensions = [1024, 631];
        let texture_origin = [0.5, 0.67]
        let texture_scale = 1 / 80;
        // Define `Zelt` object.
        let bounding_box_dims = [6, 6];
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position, bounding_box_dims, texture);
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


export class Dixi extends Entity {

    constructor(position) {
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/dixies/dixi_left.png";
        let img_dimensions = [1920, 1080];
        let texture_origin = [0.5, 0.6]
        let texture_scale = 1 / 100;
        // Define `Zelt` object.
        let bounding_box_dims = [1, 1];
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position, bounding_box_dims, texture);
    }
}


export class Tree extends Entity {

    constructor(position, texture) {
        super(position, [3, 3], texture, [0.5, 0.83]);
    }
}


// export class LightSource {

//     constructor(position, intensity, color) {
//         this.position = position;
//         this.intensity = intensity;
//         this.color = color;
//     }
// }

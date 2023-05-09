import {Entity} from "./entity.js";
import {Texture} from "../../data/texture.js";


export class Zelt extends Entity {

    constructor(position, bounding_box_dims, texture, orientation) {
        super(position, bounding_box_dims, texture, orientation);
    }
}


export class WeissZelt_1 extends Zelt {

    constructor(position, orientation) {
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/tents/weisszelt_1/" + orientation + ".png";
        let img_dimensions = [1920, 1080];
        let texture_origin = [0.5, 0.6];
        let texture_scale = 1 / 100;
        // Define `Zelt` object.
        let bounding_box_dims = [3, 4];
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position, bounding_box_dims, texture, orientation);
    }
}


export class WeissZelt_2 extends Zelt {

    constructor(position, orientation) {
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/tents/weisszelt_2/" + orientation + ".png";
        let img_dimensions = [1024, 631];
        let texture_origin = [0.4, 0.67];
        let texture_scale = 1 / 120;
        // Define `Zelt` object.
        let bounding_box_dims = [4, 3];
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position, bounding_box_dims, texture, orientation);
    }
}


export class Jurte_1 extends Zelt {

    constructor(position, orientation) {
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/tents/jurte_1/" + orientation + ".png";
        let img_dimensions = [1920, 1080];
        let texture_origin = [0.5, 0.6]
        let texture_scale = 1 / 80;
        // Define `Zelt` object.
        let bounding_box_dims = [6, 6];
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position, bounding_box_dims, texture, orientation);
    }
}


export class Jurte_2 extends Zelt {

    constructor(position, orientation) {
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/tents/jurte_2/" + orientation + ".png";
        let img_dimensions = [1920, 1080];
        let texture_origin = [0.5, 0.6]
        let texture_scale = 1 / 100;
        // Define `Zelt` object.
        let bounding_box_dims = [5, 5];
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position, bounding_box_dims, texture, orientation);
    }
}


export class Dixi extends Entity {

    constructor(position, orientation) {
        let state = "closed"; // TODO
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/dixies/" + orientation + "_" + state + ".png";
        let img_dimensions = [1920, 1080];
        let texture_origin = [0.5, 0.6]
        let texture_scale = 1 / 100;
        // Define `Zelt` object.
        let bounding_box_dims = [1, 1];
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position, bounding_box_dims, texture, orientation);
    }
}


export class Tree extends Entity {

    constructor(position, variant_idx) { // TODO `variant_idx`
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/trees/tree_" + variant_idx + ".png";
        let img_dimensions = [150, 150];
        let texture_origin = [0.5, 0.83]
        let texture_scale = 1 / 20;
        // Define `Entity` object.
        let bounding_box_dims = [3, 3];
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


// export class LightSource {

//     constructor(position, intensity, color) {
//         this.position = position;
//         this.intensity = intensity;
//         this.color = color;
//     }
// }

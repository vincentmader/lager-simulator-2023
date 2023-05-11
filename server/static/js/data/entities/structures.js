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
        let bounding_box_dims = [4, 3];
        let [position2, bounding_box_dims2] = utility_func_for_rotating_bounding_boxes(position, bounding_box_dims, orientation);
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position2, bounding_box_dims2, texture, orientation);
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
        [position, bounding_box_dims] = utility_func_for_rotating_bounding_boxes(position, bounding_box_dims, orientation);
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
        [position, bounding_box_dims] = utility_func_for_rotating_bounding_boxes(position, bounding_box_dims, orientation);
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
        [position, bounding_box_dims] = utility_func_for_rotating_bounding_boxes(position, bounding_box_dims, orientation);
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
        let texture_origin = [0.5, 0.595]
        let texture_scale = 1 / 100;
        // Define `Entity` object.
        let bounding_box_dims = [1, 1];
        [position, bounding_box_dims] = utility_func_for_rotating_bounding_boxes(position, bounding_box_dims, orientation);
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position, bounding_box_dims, texture, orientation);
    }
}


export class WaschStelle extends Entity {

    constructor(position, orientation) {
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/waschstelle/" + orientation + ".png";
        let img_dimensions = [1920, 1080];
        let texture_origin = [0.5, 0.58];
        let texture_scale = 1 / 100;
        // Define `Entity` object.
        let bounding_box_dims = [2, 2];
        [position, bounding_box_dims] = utility_func_for_rotating_bounding_boxes(position, bounding_box_dims, orientation);
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position, bounding_box_dims, texture, orientation);
    }
}


export class BierBank extends Entity {

    constructor(position, orientation) {
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/biergarnituren/bierbank/" + orientation + ".png";
        let img_dimensions = [1920, 1080];
        let texture_origin = [0.5, 0.59]
        let texture_scale = 1 / 100;
        // Define `Entity` object.
        let bounding_box_dims = [1, 4];
        [position, bounding_box_dims] = utility_func_for_rotating_bounding_boxes(position, bounding_box_dims, orientation);
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position, bounding_box_dims, texture, orientation);
    }
}


export class BierTisch extends Entity {

    constructor(position, orientation) {
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/biergarnituren/biertisch/" + orientation + ".png";
        let img_dimensions = [1920, 1080];
        let texture_origin = [0.5, 0.59]
        let texture_scale = 1 / 100;
        // Define `Entity` object.
        let bounding_box_dims = [1, 4];
        [position, bounding_box_dims] = utility_func_for_rotating_bounding_boxes(position, bounding_box_dims, orientation);
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position, bounding_box_dims, texture, orientation);
    }
}


export class BierKasten extends Entity {

    constructor(position, orientation) {
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/bierkasten/" + orientation + ".png";
        let img_dimensions = [1920, 1080];
        let texture_origin = [0.5, 0.59]
        let texture_scale = 1 / 50;
        // Define `Entity` object.
        let bounding_box_dims = [1, 1];
        [position, bounding_box_dims] = utility_func_for_rotating_bounding_boxes(position, bounding_box_dims, orientation);
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position, bounding_box_dims, texture);
    }
}


export class BannerMast extends Entity {

    constructor(position, orientation) {
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/banner/" + orientation + ".png";
        let img_dimensions = [1920, 1080];
        let texture_origin = [0.5, 0.59]
        let texture_scale = 1 / 30;
        // Define `Entity` object.
        let bounding_box_dims = [1, 1];
        [position, bounding_box_dims] = utility_func_for_rotating_bounding_boxes(position, bounding_box_dims, orientation);
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position, bounding_box_dims, texture);
    }
}


export class PofferBallFeld extends Entity {

    constructor(position, orientation) {
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/pofferballfeld/" + orientation + ".png";
        let img_dimensions = [1920, 1080];
        let texture_origin = [0.49, 0.6]
        let texture_scale = 1 / 100;
        // Define `Entity` object.
        let bounding_box_dims = [5, 9];
        [position, bounding_box_dims] = utility_func_for_rotating_bounding_boxes(position, bounding_box_dims, orientation);
        let texture = new Texture(img_path, img_dimensions, texture_origin, texture_scale);
        super(position, bounding_box_dims, texture);
    }
}


export class Tree extends Entity {

    constructor(position, variant_idx, scale) { // TODO `variant_idx`
        // Define `Texture` object.
        let img_path = "/img/sprites/structures/trees/tree_" + variant_idx + ".png";
        let img_dimensions = [150, 150];
        let texture_origin = [0.5, 0.83]
        let texture_scale = 1 / 20 * scale;
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

// TODO Move elsewhere, or implement differently. Use e.g. `Vector` class?
const utility_func_for_rotating_bounding_boxes = (position, bounding_box_dims, orientation) => {
    if (orientation == "north" || orientation == "south") {
        bounding_box_dims = [bounding_box_dims[1], bounding_box_dims[0]];
    } else if (orientation == "west" || orientation == "east") {
    } else {
        throw "Orientation " + orientation + "is not defined.";
    }
    if (bounding_box_dims[0] % 2 == 0) position.x += 0.5;
    if (bounding_box_dims[1] % 2 == 0) position.y += 0.5;
    return [position, bounding_box_dims];

}

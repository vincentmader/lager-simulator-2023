import {Rectangle} from "../../math/rectangle.js";

export class Entity {

    constructor(
        position,
        bounding_box_dims,
        texture,
        texture_origin = [0.5, 0.5]
    ) {
        this.position = position;
        this.bounding_box = new Rectangle(this.position, bounding_box_dims);
        this.texture = texture;
        this.texture_origin = texture_origin;
    }
}

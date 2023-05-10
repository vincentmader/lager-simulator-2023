import {Rectangle} from "../../math/rectangle.js";


export class Entity {

    constructor(position, bounding_box_dims, texture, orientation) {
        this.position = position;
        this.bounding_box = new Rectangle(this.position, bounding_box_dims);
        this.texture = texture;
        this.orientation = orientation;
    }
}

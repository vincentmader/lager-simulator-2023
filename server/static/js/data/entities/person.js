import {Entity} from "./structures.js"
import {TaskList} from "../task_list.js";
import {Inventory} from "../inventory.js";

class Person extends Entity {

    constructor(position, speed, vision, direction) {
        super(position, [0.99, 0.99], "");
        this.speed = speed;
        this.task_list = new TaskList(this, []);
        this.vision = vision;
        this.direction = direction;
        this.rotation = direction;
        this.inventory = new Inventory();
    }

    move(new_position) {
        this.position = new_position;
        this.bounding_box.position = new_position;
        this.bounding_box.corners = this.bounding_box._corners();
    }
}
export class Woelfling extends Person {

    constructor(position, direction) {
        super(position, 0.05, 4, direction);
        this.color = "orange";
    }
}
export class Jupfi extends Person {

    constructor(position, direction) {
        super(position, 0.075, 5, direction);
    }
}

export class Pfadi extends Person {

    constructor(position, direction) {
        super(position, 0.1, 6, direction);
        this.color = "green";
    }
}

export class Rover extends Person {

    constructor(position, direction) {
        super(position, 0.125, 7, direction);
        this.color = "red";
    }
}

export class Leiter extends Person {

    constructor(position, direction) {
        super(position, 0.15, 8, direction);
        this.color = "gray";
    }
}


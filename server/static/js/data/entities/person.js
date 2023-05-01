import {Entity} from "./structures.js"
import {TaskList} from "../../logic/task_list.js";

class Person extends Entity {

    constructor(position, speed, vision) {
        super(position, [0.99, 0.99], "");
        this.speed = speed;
        this.task_list = new TaskList(this, []);
        this.vision = vision;
    }

    move(new_position) {
        this.position = new_position;
        this.bounding_box.position = new_position;
        this.bounding_box.corners = this.bounding_box._corners();
    }
}
export class Woelfling extends Person {

    constructor(position) {
        super(position, 0.05, 4);
        this.color = "orange";
    }
}
export class Jupfi extends Person {

    constructor(position) {
        super(position, 0.075, 5);
        this.color = "blue";
    }
}

export class Pfadi extends Person {

    constructor(position) {
        super(position, 0.1, 6);
        this.color = "green";
    }
}

export class Rover extends Person {

    constructor(position) {
        super(position, 0.125, 7);
        this.color = "red";
    }
}

export class Leiter extends Person {

    constructor(position) {
        super(position, 0.15, 8);
        this.color = "gray";
    }
}


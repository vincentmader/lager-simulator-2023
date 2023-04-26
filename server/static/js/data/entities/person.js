import {Entity} from "./structures.js"
import {TaskList} from "../../logic/task_list.js";

class Person extends Entity {

    constructor(position, speed) {
        super(position, [1, 1], "");
        this.speed = speed;
        this.task_list = new TaskList(this, []);
    }

    move(new_position) {
        this.position = new_position;
        this.bounding_box.position = new_position;
        this.bounding_box.corners = this.bounding_box._corners();
    }
}
export class Woelfling extends Person {

    constructor(position) {
        super(position, 0.05);
        this.color = "orange";
    }
}
export class Jupfi extends Person {

    constructor(position) {
        super(position, 0.075);
        this.color = "blue";
    }
}

export class Pfadi extends Person {

    constructor(position) {
        super(position, 0.1);
        this.color = "green";
    }
}

export class Rover extends Person {

    constructor(position) {
        super(position, 0.125);
        this.color = "red";
    }
}

export class Leiter extends Person {

    constructor(position) {
        super(position, 0.15);
        this.color = "gray";
    }
}


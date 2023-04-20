import {Entity} from "./structures.js"
import {TaskList} from "../../logic/task_list.js";

class Person extends Entity {

    constructor(position, speed) {
        super(position, [0.5, 0.5]);
        this.speed = speed;
        this.velocity = [speed, 0];
        this.task_list = new TaskList(this, []);
    }
}
export class Woelfling extends Person {

    constructor(position) {
        super(position, 0.5);
        this.color = "orange";
    }
}
export class Jupfi extends Person {

    constructor(position) {
        super(position, 0.75);
        this.color = "blue";
    }
}

export class Pfadi extends Person {

    constructor(position) {
        super(position, 1);
        this.color = "green";
    }
}

export class Rover extends Person {

    constructor(position) {
        super(position, 1.25);
        this.color = "green";
    }
}

export class Leiter extends Person {

    constructor(position) {
        super(position, 1.5);
        this.color = "white";
    }
}


import {Entity} from "./structures.js"
import {TaskList} from "./task_list.js";

class Person extends Entity {

    constructor(position, speed) {
        super(position, [0, 0]);
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
        super(position, 1);
        this.color = "blue";
    }
}


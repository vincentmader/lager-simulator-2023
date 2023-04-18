import {Entity, dt} from "./world.js";
import {TaskList} from "./task_list.js";

class Person extends Entity {
    constructor(position, speed) {
        super(position);
        this.speed = speed;
        this.velocity = [speed, 0];
        this.task_list = new TaskList([]);
    }
}
export class Woelfling extends Person {
    constructor(position) {
        super(position, 1);
        this.color = "orange";
    }
}
export class Jupfi extends Person {
    constructor(position) {
        super(position, 2);
        this.color = "blue";
    }
}


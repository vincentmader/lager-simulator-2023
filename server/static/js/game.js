import {World} from "./data/world.js";
import {Woelfling, Jupfi} from "./data/entities/person.js";
import {Canvas} from "./io/output/canvas.js";
import {TaskExecutor} from "./logic/task_list.js";
import {Position} from "./math/vector.js";
import {run_tests} from "./tests/main.js";
import {IO} from "./io/io.js";


export class Game {

    constructor() {
        let person_1 = new Woelfling(new Position(-6, 6));
        let person_2 = new Jupfi(new Position(-7, 7));
        let people = [person_1, person_2];

        this.world = new World(people);
        this.canvas = new Canvas(); // TODO Use `let canvas` here instead.
        this.io = new IO(this.world, this.canvas);
        this.task_executor = new TaskExecutor(this.world);

        run_tests(this.io);
    }

    forward() {
        this.world.people.forEach((person) => {
            let task = person.task_list.peek();
            if (!this.task_executor.execute(task)) {
                person.task_list.shift();
            }
        });
    }

    run() {
        window.setInterval(() => {
            this.forward();
            this.io.renderer.display();
        }, 1000 / 60);
    }
}

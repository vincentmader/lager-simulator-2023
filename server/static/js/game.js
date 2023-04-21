import {World} from "./data/world.js";
import {Woelfling, Jupfi, Pfadi, Rover, Leiter} from "./data/entities/person.js";
import {Canvas} from "./io/output/canvas.js";
import {TaskExecutor} from "./logic/task_list.js";
import {Position} from "./math/vector.js";
import {run_tests} from "./tests/main.js";
import {IO} from "./io/io.js";

const INITIAL_ZOOM_LEVEL = 2;

export class Game {

    constructor() {
        let person_1 = new Woelfling(new Position(-1, 3));
        let person_2 = new Jupfi(new Position(-2, -3));
        let person_3 = new Pfadi(new Position(4, 3));
        let person_4 = new Rover(new Position(-4, -3));
        let person_5 = new Leiter(new Position(2, -3));
        let people = [person_1, person_2, person_3, person_4, person_5];

        this.world = new World(people);
        this.canvas = new Canvas(INITIAL_ZOOM_LEVEL);
        // ^ TODO Use `let canvas` here instead.
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

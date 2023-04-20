import {World} from "./world.js";
import {Renderer} from "./renderer.js";
import {LagerInputHandler} from "./input_handler.js";
import {Woelfling, Jupfi} from "./person.js";
import {Canvas} from "./canvas.js";
import {MoveTask} from "./tasks.js";
import {TaskExecutor} from "./task_list.js";
import {Position} from "./position.js";
import {run_tests} from "./tests.js";


export class Game {

    constructor() {
        let person_1 = new Woelfling(new Position(-5, 5));
        let person_2 = new Jupfi(new Position(-7, 7));
        let people = [person_1, person_2];


        this.canvas = new Canvas();
        this.world = new World(people);
        this.input_handler = new LagerInputHandler(this.world, this.canvas).initialize();
        this.renderer = new Renderer(this.world, this.canvas);
        this.task_executor = new TaskExecutor(this.world);

        run_tests(this.renderer);
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
            this.renderer.display();
        }, 1000 / 60);
    }
}

import {World} from "./world.js";
import {Renderer} from "./renderer.js";
import {LagerInputHandler} from "./input_handler.js";
import {Woelfling, Jupfi} from "./person.js";
import {Canvas} from "./canvas.js";
import {MoveTask} from "./tasks.js";
import {TaskExecutor} from "./task_list.js";


export class Game {

    constructor() {
        let person_1 = new Woelfling([100, 100]);
        let person_2 = new Jupfi([200, 100]);
        let people = [person_1, person_2];
        people[0].task_list.push(new MoveTask(200, 200));

        this.canvas = new Canvas();
        this.world = new World(people);
        this.input_handler = new LagerInputHandler(this.world, this.canvas).initialize();
        this.renderer = new Renderer(this.world, this.canvas);
        this.task_executor = new TaskExecutor(this.world);
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

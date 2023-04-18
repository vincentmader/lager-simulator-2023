import {World} from "./world.js";
import {Renderer} from "./renderer.js";
import {LagerInputHandler} from "./input_handler.js";
import {Woelfling, Jupfi} from "./person.js";
import {Canvas} from "./canvas.js";
import {TaskExecutor, MoveTask} from "./task_list.js";

export class Game {
    constructor() {
        let person_1 = new Woelfling([100, 100]);
        let person_2 = new Jupfi([200, 100]);
        let people = [person_1, person_2];
        people[0].task_list.entries.push(new MoveTask(200, 200));

        this.canvas = new Canvas();
        this.world = new World(people);
        this.input_handler = new LagerInputHandler(this.world, this.canvas).initialize();
        this.renderer = new Renderer(this.world, this.canvas);
        this.task_executor = new TaskExecutor(this.world);
    }
    forward() {
        this.world.people.forEach((person) => {
            if (person.task_list.entries.length > 0) { // TODO Extend list. (-> task_list.length)
                let task = person.task_list.entries[0];
                if (!this.task_executor.execute_task(person, task)) {
                    person.task_list.entries.shift();
                }
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

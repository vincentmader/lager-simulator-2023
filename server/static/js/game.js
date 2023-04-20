import {World} from "./data/world.js";
import {Renderer} from "./visual/renderer.js";
import {LagerInputHandler} from "./input_handler.js";
import {Woelfling, Jupfi} from "./data/entities/person.js";
import {Canvas} from "./visual/canvas.js";
import {MoveTask} from "./tasks.js";
import {TaskExecutor} from "./task_list.js";
import {Position} from "./math/vector.js";
import {run_tests} from "./tests/main.js";


export class Game {

    constructor() {
        let person_1 = new Woelfling(new Position(-1, 1));
        let person_2 = new Jupfi(new Position(-2, 2));
        let people = [person_1, person_2];

        people[0].task_list.push(new MoveTask(new Position(+1, +1)));
        people[0].task_list.push(new MoveTask(new Position(+1, -1)));
        people[0].task_list.push(new MoveTask(new Position(-1, -1)));
        people[0].task_list.push(new MoveTask(new Position(-1, +1)));
        people[1].task_list.push(new MoveTask(new Position(+2, +2)));
        people[1].task_list.push(new MoveTask(new Position(+2, -2)));
        people[1].task_list.push(new MoveTask(new Position(-2, -2)));
        people[1].task_list.push(new MoveTask(new Position(-2, +2)));

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

import {MoveTask} from "./tasks.js";
import {Position} from "./position.js";

class InputHandler {

    constructor(world, canvas) {
        this.world = world;
        this.canvas = canvas;
    }
}


export class LagerInputHandler extends InputHandler {
    constructor(world, canvas) {
        super(world, canvas);
    }

    init_movement_listener() {
        this.canvas.element.addEventListener('click', () => {
            var x = event.pageX - this.canvas.elementLeft,
                y = event.pageY - this.canvas.elementTop;
            let position = new Position(x, y);
            this.world.people[0].task_list.push(new MoveTask(position));
        }, false);
        return this;
    }

    initialize() {
        this.init_movement_listener()
    }
}


export class UeberfaellerInputHandler extends InputHandler {
    constructor(world, canvas) {
        super(world, canvas);
    }
}


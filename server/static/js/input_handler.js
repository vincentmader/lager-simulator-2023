import {MoveTask} from "./tasks.js";

class InputHandler {
    
    constructor(world, canvas) {
        this.world = world;
        this.canvas = canvas;
    }

    initialize() {
        let canvas = this.canvas;
        this.canvas.element.addEventListener('click', () => {
            var x = event.pageX - canvas.elementLeft,
                y = event.pageY - canvas.elementTop;
        }, false);
        return this;
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
            this.world.people[0].task_list.push(new MoveTask(x, y))
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


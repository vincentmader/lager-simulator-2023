import {MoveTask, CutBannerTask} from "./tasks.js";

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
        this.init_movement_listener();
    }
}


export class UeberfaellerInputHandler extends InputHandler {
    constructor(world, canvas) {
        super(world, canvas);
    }

    cut_banner_listener() {
        this.canvas.element.addEventListener('click', () => {
            let active_person = this.world.people[0];
            let banner_position = this.world.banner.position;
            let person_position = active_person.position;
            let distance = Math.sqrt(Math.pow(banner_position[0] - person_position[0], 2)\
                + Math.pow(banner_position[1] - person_position[1], 2))
            if (distance < 30) {
                active_person.task_list.push(new CutBannerTask()) // TODO person.cut_efficiency
            }
        }, false);
        return this;
    }

    initialize() {
        this.cut_banner_listener();
    }
}


import {MoveTask} from "./data/tasks.js";
import {Position} from "./math/vector.js";
import {CoordinateTransformer} from "./math/coordinate_transformer.js";

const zoom_level = 1; // TODO Get value! A.t.m it breaks at zoom != 11 (default).

class InputHandler {

    constructor(world, canvas) {
        this.world = world;
        this.canvas = canvas;
        this.coordinate_transformer = new CoordinateTransformer(world, canvas);
    }
}


export class LagerInputHandler extends InputHandler {

    constructor(world, canvas) {
        super(world, canvas);
    }

    init_movement_listener() {
        this.canvas.element.addEventListener('click', () => {
            const rect = this.canvas.element.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;

            let canvas_coords = new Position(x, y);

            let world_coords = this.coordinate_transformer.canvas_to_world(canvas_coords, zoom_level)
            world_coords = this.coordinate_transformer.isometric_to_cartesian(world_coords);

            this.world.people[0].task_list.push(new MoveTask(world_coords));
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


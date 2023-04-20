import {MoveTask} from "./tasks.js";
import {Position} from "./position.js";
import {CoordinateTransformer} from "./position.js";

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
            var x = event.pageX - this.canvas.elementLeft,
                y = event.pageY - this.canvas.elementTop;

            let canvas_coords = new Position(x, y);
            console.log("Canvas Coordinates: x=" + canvas_coords.x + ", y=" + canvas_coords.y);

            let world_coords = this.coordinate_transformer.canvas_to_world(canvas_coords, zoom_level)
            world_coords = this.coordinate_transformer.isometric_to_cartesian(world_coords);
            console.log("World Coordinates:  x=" + Math.round(100 * world_coords.x) / 100 + ", y=" + Math.round(100 * world_coords.y) / 100);

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


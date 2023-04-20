import {MoveTask} from "../../data/tasks.js";
import {Position} from "../../math/vector.js";
import {CoordinateTransformer} from "../../math/coordinate_transformer.js";

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
        this.active_person = null;
    }

    mouseclick_to_world_coordinates(event) {
        const rect = this.canvas.element.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        let canvas_coords = new Position(x, y);
        let world_coords = this.coordinate_transformer.canvas_to_world(canvas_coords, this.canvas.zoom_level)
        world_coords = this.coordinate_transformer.isometric_to_cartesian(world_coords);
        return world_coords;
    }

    init_movement_listener() {
        this.canvas.element.addEventListener('click', () => {
            if (this.active_person !== null) {
                let clicked_world_coords = this.mouseclick_to_world_coordinates(event);
                this.active_person.task_list.push(new MoveTask(clicked_world_coords));
            }
        }, false);
        return this;
    }

    init_select_character_listener() {
        this.canvas.element.addEventListener('click', () => {
            if (this.active_person == null) {
                let clicked_world_coords = this.mouseclick_to_world_coordinates(event);
                // TODO This needs access to the collision_controller
                let clicked_person = null;
                this.world.people.forEach((person) => {
                    if (person.bounding_box.contains(clicked_world_coords)) {
                        clicked_person = person;
                        return;
                    }
                });
                this.active_person = clicked_person;
            }
        });
    }

    initialize() {
        this.init_select_character_listener();
        this.init_movement_listener();
    }
}


export class UeberfaellerInputHandler extends InputHandler {

    constructor(world, canvas) {
        super(world, canvas);
    }
}


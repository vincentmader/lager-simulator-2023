import {MoveTask} from "../../data/tasks.js";
import {Position} from "../../math/vector.js";
import {CoordinateTransformer} from "../../math/coordinate_transformer.js";

class InputHandler {

    constructor(world, game_display) {
        this.world = world;
        this.game_display = game_display;
        this.coordinate_transformer = new CoordinateTransformer(world, game_display);
    }

    init_scroll_listener() {
        this.game_display.element.addEventListener('wheel', () => {
            if (event.deltaY > 0
                && this.game_display.zoom_level < 21) {
                this.game_display.zoom_level += 0.1;
            } else if (event.deltaY < 0
                && this.game_display.zoom_level > 1) {
                this.game_display.zoom_level -= 0.1;
            }
        });
    }

    initialize() {
        this.init_scroll_listener();
    }
}


export class LagerInputHandler extends InputHandler {

    constructor(world, game_display) {
        super(world, game_display);
        this.active_person = null;
    }

    mouseclick_to_world_coordinates(event) {
        const rect = this.game_display.element.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        let game_display_coords = new Position(x, y);
        let world_coords = this.coordinate_transformer.game_display_to_world(game_display_coords, this.game_display.zoom_level)
        world_coords = this.coordinate_transformer.isometric_to_cartesian(world_coords);
        world_coords = new Position(Math.round(world_coords.x), Math.round(world_coords.y));
        return world_coords;
    }

    init_movement_listener() {
        this.game_display.element.addEventListener('click', () => {
            if (this.active_person !== null) {
                let clicked_world_coords = this.mouseclick_to_world_coordinates(event);
                this.active_person.task_list.push(new MoveTask(clicked_world_coords));
            }
        }, false);
        return this;
    }

    init_select_character_listener() {
        this.game_display.element.addEventListener('click', () => {
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
        super.initialize();
        this.init_select_character_listener();
        this.init_movement_listener();
    }
}


export class UeberfaellerInputHandler extends InputHandler {

    constructor(world, game_display) {
        super(world, game_display);
    }
}


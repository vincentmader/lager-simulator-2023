import {MoveTask} from "../../data/tasks.js";
import {Position} from "../../math/vector.js";
import {CoordinateTransformer} from "../../math/coordinate_transformer.js";

class InputHandler {

    constructor(world, game_display, active_entity) {
        this.world = world;
        this.game_display = game_display;
        this.coordinate_transformer = new CoordinateTransformer(world, game_display);
        this.active_entity = active_entity;
        this.current_task = null;
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

    init_scroll_listener() {
        this.game_display.element.addEventListener('wheel', (event) => {
            if (event.deltaY > 0
                && this.game_display.zoom_level < 21) {
                this.game_display.zoom_level += 0.1;
            } else if (event.deltaY < 0
                && this.game_display.zoom_level > 1) {
                this.game_display.zoom_level -= 0.1;
            }
        });
    }

    handle_task_lifecycle(event) {
        let clicked_world_coords = this.mouseclick_to_world_coordinates(event);
        if (this.active_entity["person"] == null) {
            let clicked_person = null;
            this.world.people.forEach((person) => {
                if (person.bounding_box.contains(clicked_world_coords)) {
                    clicked_person = person;
                    return;
                }
            });
            this.active_entity["person"] = clicked_person;
        } else if (this.current_task == null) {
            // TODO Get from clicked button.
        } else {
            this.active_entity["person"].task_list.push(this.current_task(clicked_world_coords));
            this.active_person = null;
            this.current_task = null;
        }
    }

    handle_mouse_movement(event) {
        let hover_world_coords = this.mouseclick_to_world_coordinates(event);
        this.active_entity["field"] = hover_world_coords;
    }

    initialize() {
        this.init_scroll_listener();
        this.game_display.element.addEventListener("click", (event) => {this.handle_task_lifecycle(event)});
        this.game_display.element.addEventListener("mousemove", (event) => {this.handle_mouse_movement(event)});
    }
}


export class LagerInputHandler extends InputHandler {

    constructor(world, game_display, active_entity) {
        super(world, game_display, active_entity);
    }
}


export class UeberfaellerInputHandler extends InputHandler {

    constructor(world, game_display, active_entity) {
        super(world, game_display, active_entity);
    }
}


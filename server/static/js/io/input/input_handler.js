import {Position, Vector} from "../../math/vector.js";
import {CoordinateTransformer} from "../../math/coordinate_transformer.js";
import {UserInputHandler} from "./user_input_handler.js";

class InputHandler {

    constructor(world, game_display, active_entity) {
        this.world = world;
        this.game_display = game_display;
        this.ui = new UserInputHandler(game_display, this);
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

    init_window_resize_listener() {
        window.addEventListener("resize", (event) => {
            this.game_display.width = window.innerWidth;
            this.game_display.height = window.innerHeight;
            this.game_display.element.width = window.innerWidth;
            this.game_display.element.height = window.innerHeight;
            this.ui.initialize(); // TODO This is temporary and horrible! Should re-initialize the button-sizes and -positions, not remove and re-add all of them!
        });
    }

    init_scroll_listener() {
        this.game_display.element.addEventListener('wheel', (event) => {
            if (event.deltaY > 0
                && this.game_display.zoom_level < 101) {
                this.game_display.zoom_level *= 1.02;
            } else if (event.deltaY < 0
                && this.game_display.zoom_level > 5) {
                this.game_display.zoom_level /= 1.02;
            }
        });
    }

    init_keyboard_listener() {
        let game_display = this.game_display;

        function keyHandler(e) {
            let camera_velocity = game_display.camera_velocity;
            let camera_speed = camera_velocity.abs();
            let max_camera_speed = 2; // TODO Adjust magic number.
            let camera_speed_increment = 3 / game_display.zoom_level; // TODO Ajust magic number.
            let direction;
            // NOTE: x-direction is inverted, y-direction is not!
            if (e.code == "ArrowUp") {
                if (camera_speed < max_camera_speed) {
                    direction = new Vector(0, camera_speed_increment);
                    game_display.camera_velocity = camera_velocity.add(direction);
                }
            }
            else if (e.code == "ArrowDown") {
                if (camera_speed < max_camera_speed) {
                    direction = new Vector(0, -camera_speed_increment);
                    game_display.camera_velocity = camera_velocity.add(direction);
                }
            }
            else if (e.code == "ArrowLeft") {
                if (camera_speed < max_camera_speed) {
                    direction = new Vector(camera_speed_increment, 0);
                    game_display.camera_velocity = camera_velocity.add(direction);
                }
            }
            else if (e.code == "ArrowRight") {
                if (camera_speed < max_camera_speed) {
                    direction = new Vector(-camera_speed_increment, 0);
                    game_display.camera_velocity = camera_velocity.add(direction);
                }
            }
            else {
                return;
                // TODO: Define all other key-press events.
            }
        }

        document.addEventListener("keydown", keyHandler);
        document.addEventListener("keyup", keyHandler);
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
            if (clicked_person !== null) {
                this.ui.visible(true);
                this.active_entity["person"] = clicked_person;
            }
        } else if (this.current_task == null) {
            // Clicking on empty tile unselects current selection
            this.active_entity["person"] = null;
        } else {
            this.active_entity["person"].task_list.push(new this.current_task(clicked_world_coords));
            this.active_entity["person"] = null;
            this.current_task = null;
            this.ui.visible(false);
        }
    }

    handle_mouse_movement(event) {
        let hover_world_coords = this.mouseclick_to_world_coordinates(event);
        this.active_entity["field"] = hover_world_coords;
    }


    initialize() {
        this.init_scroll_listener();
        this.init_keyboard_listener();
        this.init_window_resize_listener();
        this.game_display.element.addEventListener("click", (event) => {this.handle_task_lifecycle(event)});
        this.game_display.element.addEventListener("mousemove", (event) => {this.handle_mouse_movement(event)});
        this.ui.initialize();
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


import {Position, Vector} from "../../math/vector.js";

export class GameDisplay {

    constructor(zoom_level) {
        this.element = document.getElementById("canvas-0");
        this.ctx = this.element.getContext('2d');

        this.fog_element = document.getElementById("fog_canvas");
        this.fog_ctx = this.fog_element.getContext("2d");

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.element.width = this.fog_element.width = this.width;
        this.element.height = this.fog_element.height = this.height;

        this.zoom_level = zoom_level;
        this.draw_floor_grid = false;
        this.draw_labeled_positions = false;
        this.draw_floor_background = true;
        this.draw_world_boundary = true;
        this.draw_frame_idx = true;

        this.display_origin = new Position(0, 0);
        this.camera_velocity = new Vector(0, 0);
        this.dt = 0;
    }
}

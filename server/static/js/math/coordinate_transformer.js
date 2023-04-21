import {Position} from "./vector.js";


export class CoordinateTransformer {

    constructor(world, canvas) {
        this.world_width = world.dimensions[0];
        this.world_height = world.dimensions[1];
        this.canvas_width = canvas.W; // TODO Use dimensions field here as well?
        this.canvas_height = canvas.H;
    }

    isometric_to_cartesian(position) {
        let x = (2 * position.y + position.x) / 2;
        let y = (2 * position.y - position.x) / 2 + position.z;
        return new Position(x, y); // TODO Return `Position2D` here?
    }

    cartesian_to_isometric(position) {
        let x = position.x - position.y;
        let y = (position.x + position.y) / 2;
        let z = position.z;
        return new Position(x, y, z);
    }

    world_to_canvas(position, zoom_level) {
        let x_min = -this.world_width / 2;
        let y_min = -this.world_height / 2;
        let x_max = this.world_width / 2;
        let y_max = this.world_height / 2;
        let p_max = this.canvas_width;
        let q_max = this.canvas_height;
        // TODO Check if it shouldn't be p_max * window_scale_factor (inversion of canvas_to_world-formula?)
        // let window_scale_factor = 0.000765 * window.innerWidth;
        let x = p_max * (zoom_level * position.x - x_min) / (x_max - x_min);
        let y = q_max * (zoom_level * position.y - y_max) / (y_min - y_max) - 100 * position.z;
        //                                                                     ^ TODO Scale accurately: 
        //                                                                            Use projection factor, 
        //                                                                            as well as world-to-canvas rescaling .
        return new Position(x, y);
    }

    canvas_to_world(position, zoom_level) {
        let x_min = -this.world_width / 2;
        let y_min = -this.world_width / 2;
        let x_max = this.world_width / 2;
        let y_max = this.world_width / 2;
        let p_max = this.canvas_width;
        let q_max = this.canvas_height;
        let window_scale_factor = 0.000765 * window.innerWidth; // TODO Is this absolutely needed? Weirdly specific number...
        let x = (x_min + position.x / (p_max * window_scale_factor) * (x_max - x_min)) / zoom_level;
        let y = (y_max + position.y / (q_max * window_scale_factor) * (y_min - y_max)) / zoom_level;
        return new Position(x, y);
    }
}

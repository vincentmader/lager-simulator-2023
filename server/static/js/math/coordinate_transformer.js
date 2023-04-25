import {Position} from "./vector.js";


export class CoordinateTransformer {

    constructor(world, game_display) {
        this.world_width = world.dimensions[0];
        this.world_height = world.dimensions[1];
        this.game_display_width = game_display.W; // TODO Use dimensions field here as well?
        this.game_display_height = game_display.H;
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

    world_to_game_display(position, zoom_level) {
        let canvas_origin = new Position(this.game_display_width / 2, this.game_display_height / 2);
        let x = canvas_origin.x + position.x * zoom_level;
        let y = canvas_origin.y + position.y * zoom_level - position.z;
        return new Position(x, y);
    }

    game_display_to_world(position, zoom_level) {
        let canvas_origin = new Position(this.game_display_width / 2, this.game_display_height / 2);
        let x = (position.x - canvas_origin.x) / zoom_level;
        let y = (position.y - canvas_origin.y) / zoom_level;
        return new Position(x, y);
    }
}

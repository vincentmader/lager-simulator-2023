export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export class Position extends Vector {
    constructor(x, y) {
        super(x, y);
    }
}

export class CoordinateTransformer {
    constructor(world, canvas) {
        this.world_width = world.dimensions[0];
        this.world_height = world.dimensions[1];
        this.canvas_width = canvas.W; // TODO Use dimensions field here as well?
        this.canvas_height = canvas.H;
    }

    isometric_to_cartesian(position) {
        let x = (2 * position.y + position.x) / 2;
        let y = (2 * position.y - position.x) / 2;
        return new Position(x, y);
    }

    cartesian_to_isometric(position) {
        let x = position.x - position.y;
        let y = (position.x + position.y) / 2;
        return new Position(x, y);
    }

    world_to_canvas(position, zoom_level) {
        let x = position.x;
        let y = position.y;
        let W = this.world_width;
        let H = this.world_height;
        let x_min = -W / 2;
        let x_max = +W / 2;
        let y_min = -H / 2;
        let y_max = +H / 2;
        let p_max = this.canvas_width;
        let q_max = this.canvas_height;
        x = (zoom_level * p_max) * (x - x_min) / (x_max - x_min);
        y = (zoom_level * q_max) * (y - y_max) / (y_min - y_max);
        return new Position(x, y);
    }

    canvas_to_world(position, zoom_level) {
        let x = position.x;
        let y = position.y;
        let W = this.world_width;
        let H = this.world_height;
        let x_min = -W / 2;
        let x_max = +W / 2;
        let y_min = -H / 2;
        let y_max = +H / 2;
        let p_max = this.canvas_width;
        let q_max = this.canvas_height;
        x = x_min + x / p_max * (x_max - x_min) / zoom_level;
        y = y_max + y / q_max * (y_min - y_max) / zoom_level;
        return new Position(x, y);
    }
}

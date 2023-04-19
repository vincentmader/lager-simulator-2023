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
        // TODO
        let x = position.x;
        let y = position.y;
        return new Position(x, y);
    }

    canvas_to_world(position, zoom_level) {
        // TODO
        let x = position.x;
        let y = position.y;
        return new Position(x, y);
    }
}

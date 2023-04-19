export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

export class CoordinateTransformer {
    constructor() {}

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

    world_to_canvas() {}

    canvas_to_world() {}
}


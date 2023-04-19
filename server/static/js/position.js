export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    isometric_to_cartesian() {
        let x = (2 * this.y + this.x) / 2;
        let y = (2 * this.y - this.x) / 2;
        return new Position(x, y);
    };

    cartesian_to_isometric() {
        let x = this.x - this.y;
        let y = (this.x + this.y) / 2;
        return new Position(x, y);
    };
}

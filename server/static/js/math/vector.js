export class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    mult(other) {
        return new Vector(this.x * other.x, this.y * other.y);
    }

    add(other) {
        return new Vector(this.x + other.x, this.y * other.y);
    }
}


export class Position extends Vector {

    constructor(x, y) {
        super(x, y);
    }
}

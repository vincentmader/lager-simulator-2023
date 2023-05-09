export class Vector {

    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    mul(other) {
        if (other instanceof Vector || other instanceof Position) {
            // TODO ^ Check whether second term is needed.
            return new this.constructor(this.x * other.x, this.y * other.y, this.z * other.z);
        } else {
            return new this.constructor(this.x * other, this.y * other, this.z * other);
        }
    }

    add(other) {
        return new this.constructor(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    sub(other) {
        return new this.constructor(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    max() {
        return Math.max(this.x, this.y, this.z);
    }

    abs() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    }

    round() {
        return new this.constructor(Math.round(this.x), Math.round(this.y), Math.round(this.z));
    }

}


export class Position extends Vector {

    constructor(x, y, z = 0) {
        super(x, y, z);
    }
}


export class Direction extends Vector {

    constructor(x, y, z = 0) {
        super(x, y, z);
    }

    length() {  // TODO Move to `Vector` class
        let length = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
        return length;
    }

    normalize() {  // TODO Move to `Vector` class
        let length = this.length();
        return new this.constructor(this.x / length, this.y / length, this.z / length);
    }

    scale(scalar) {  // TODO Move to `Vector` class
        return new this.constructor(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    /**
    * Assumes that the direction is only in the x/y plane.
    * Retrieves the radian [0, 2*Math.PI) of the angle of direction.
    */
    to_radian() {
        let radian = Math.atan2(this.y, this.x);
        if (radian < 0) {
            radian += 2 * Math.PI;
        }
        return radian;
    }

    /**
     * Returns the DirectionEnum which equals the Vector, if possible.
     */
    discretize() {
        let eps = 0.1 * Math.PI;
        // TODO Handle `z != 0`.
        if (Math.abs(this.x) < eps && Math.abs(this.y - 1) < eps) {
            // console.log("N");
            return DirectionEnum.NORTH;
        } else if (Math.abs(this.x) < eps && Math.abs(this.y + 1) < eps) {
            // console.log("S");
            return DirectionEnum.SOUTH;
        } else if (Math.abs(this.x - 1) < eps && Math.abs(this.y) < eps) {
            // console.log("E");
            return DirectionEnum.EAST;
        } else if (Math.abs(this.x + 1) < eps && Math.abs(this.y) < eps) {
            // console.log("W");
            return DirectionEnum.WEST;
        }
        throw new Error("Vector (" + this.x + ", " + this.y + ", " + this.z + ") is not 2d-discretizable!");
    }

    angle_between(direction) {
        // TODO: Untested.
        // NOTE: This will not work reliably: Use atan2 instead.
        return Math.atan((this.y * direction.x - this.x * direction.y) / (this.x * direction.x - this.y * direction.y));
    }

    /**
    * Needed when getting a Direction by Position.sub(Position)
    */
    static from_vector(vector) {
        return new Direction(vector.x, vector.y, vector.z);
    }

    static from_radian(radian) {
        let x = Math.cos(radian);
        let y = Math.sin(radian);
        return new Direction(x, y);
    }
}


export const DirectionEnum = {
    EAST: 0,
    NORTH: Math.PI / 2,
    WEST: Math.PI,
    SOUTH: Math.PI * 3 / 2
}

export const direction_to_string = (direction) => {
    // TODO Do this conversion differently?
    if (Math.abs((direction - 0)) < 0.1 * Math.PI) {
        return "east";
    }
    else if (Math.abs((direction - Math.PI / 2)) < 0.1 * Math.PI) {
        return "north";
    }
    else if (Math.abs((direction - Math.PI)) < 0.1 * Math.PI) {
        return "west";
    }
    else if (Math.abs((direction - Math.PI * 3 / 2)) < 0.1 * Math.PI) {
        return "south";
    }
    throw new Error("Vector (" + this.x + ", " + this.y + ", " + this.z + ") is not 2d-discretizable!");
}

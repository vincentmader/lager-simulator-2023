export class Vector {

    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    mul(other) {
        if (other instanceof Vector || other instanceof Position) {
            // TODO ^ Check whether second term is needed.
            return new Vector(this.x * other.x, this.y * other.y, this.z * other.z);
        } else {
            return new Vector(this.x * other, this.y * other, this.z * other);
        }
    }

    add(other) {
        return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    sub(other) {
        return new Vector(this.x - other.x, this.y - other.y, this.z - other.z);
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

    length() {
        let length = Math.sqrt(this.x**2 + this.y**2 + this.z**2);
        return length;
    }

    normalize() {
        let length = this.length();
        return new Direction(this.x/length, this.y/length, this.z/length);
    }

    /**
    * Assumes that the direction is only in the x/y plane.
    * Retrieves the radian of the angle of direction.
    */
    to_radian() {
        let radian = Math.atan2(this.y, this.x);
        if (radian < 0) {
            radian += 2*Math.PI;
        }
        return radian;
    }

    discretize() {
        let eps = 0.1*Math.PI
        if (Math.abs(this.x) < eps && Math.abs(this.y-1) < eps) {
            return DirectionEnum.BOTTOM;
        } else if (Math.abs(this.x) < eps && Math.abs(this.y+1) < eps) {
            return DirectionEnum.TOP;
        } else if (Math.abs(this.x-1) < eps && Math.abs(this.y) < eps) {
            return DirectionEnum.RIGHT;
        } else if (Math.abs(this.x+1) < eps && Math.abs(this.y) < eps) {
            return DirectionEnum.LEFT;
        }
        throw new Error("Vector (" + this.x + ", " + this.y + ", " + this.z + ") is not 2d-discretizable!");
    }

    angle_between(direction) {
        return Math.atan((this.y*direction.x-this.x*direction.y)/(this.x*direction.x - this.y*direction.y));
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
    RIGHT: 0,
    BOTTOM: Math.PI/2,
    LEFT: Math.PI,
    TOP: Math.PI*3/2
}

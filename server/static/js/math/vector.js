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
    static RIGHT = Math.PI/4;
    static BOTTOM = Math.PI*3/4;
    static LEFT = Math.PI*5/4;
    static TOP =Math.PI*7/4;

    constructor(x, y, z = 0) {
        super(x, y, z);
    }

    normalize() {
        let length = Math.sqrt(this.x^2 + this.y^2 + this.z^2);
        return new Direction(this.x/length, this.y/length, this.z/length);
    }

    /**
    * Assumes that the direction is only in the x/y plane.
    * Retrieves the radian of the angle of direction.
    */
    to_radian() {
        return Math.atan(this.y/this.x);
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
}

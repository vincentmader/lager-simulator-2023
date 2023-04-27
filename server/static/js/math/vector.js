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
        return new Vector(Math.round(this.x), Math.round(this.y), Math.round(this.z));
    }
}


export class Position extends Vector {

    constructor(x, y, z = 0) {
        super(x, y, z);
    }
}

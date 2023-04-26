export class Vector {

    constructor(x, y, z) {
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
}


export class Position extends Vector {

    constructor(x, y, z = 0) {
        super(x, y, z);
    }
}

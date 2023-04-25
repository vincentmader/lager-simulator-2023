export class Vector {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    mul(other) {
        return new Vector(this.x * other.x, this.y * other.y, this.z * other.z);
        // TODO z
    }

    add(other) {
        return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
        // TODO z
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

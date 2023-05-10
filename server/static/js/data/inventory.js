export class Inventory {

    constructor() {
        this.size = 6;
        this.items = {};
    }

    add(item, index=-1) {
        if (index < this.size) {
            if (index < 0) {
                let success = false;
                for (let i = 0; i < this.size; i++) {
                    if (this.items[i] == undefined) {
                        this.items[i] = item;
                        success = true;
                        break;
                    }
                }
                if (!success) {
                    throw Error("Inventory already full!");
                }
            } else {
                if (this.items[index] == undefined) {
                    this.items[index] = item;
                } else {
                    throw Error("Inventory slot already occupied! by " + this.items[index]);
                }
            }
        } else {
            throw Error("Invalid Inventory slot " + index + " for Inventory size " + this.size);
        }
    }

    remove_at(index) {
        if(this.items[index] !== undefined) {
            let obj = this.items[index];
            delete this.items[index];
            return obj;
        }
        return null;
    }
}

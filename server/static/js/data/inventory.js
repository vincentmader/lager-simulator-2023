class Inventory {

    constructor() {
        this.size = 6;
        this.items = {};
    }

    add(item, index=-1) {
        if (index < this.size) {
            if (index < 0) {
                let success = false;
                for (let i = 0; i < this.size; i++) {
                    if (!this.items.hasKey(i)) {
                        this.items[i] = item;
                        success = true;
                        break;
                    }
                }
                if (!success) {
                    throw Error("Inventory already full!");
                }
            } else {
                if (!this.items.hasKey(index)) {
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
        if(this.items.hasKey(index)) {
            let obj = this.items[index];
            delete this.items[index];
            return obj;
        }
        return null;
    }
}

class Task {
    constructor() {
        this.owner = null;
    }
}


export class MoveTask extends Task {
    constructor(target_position) {
        super();
        this.target_position = target_position;
    }
}


export class IdleTask extends Task {
    constructor() {
        super();
    }
}

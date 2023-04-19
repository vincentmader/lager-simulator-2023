class Task {
    constructor() {
        this.owner = null;
    }
}


export class MoveTask extends Task {
    constructor(targetX, targetY) {
        super();
        this.targetX = targetX;
        this.targetY = targetY;
    }
}


export class IdleTask extends Task {
    constructor() {
        super();
    }
}


export class CutBannerTask extends Task {
    constructor(efficiency=1) {
        super();
        this.efficiency = efficiency;
    }
}

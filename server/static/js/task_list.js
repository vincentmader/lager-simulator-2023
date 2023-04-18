var dt = 1; // TODO

export class TaskExecutor {
    constructor(world) {
        this.world = world;
    }
    execute_task(target, task) {
        // TODO Check which task it is.
        let directionX = task.targetX - target.position[0];
        let directionY = task.targetY - target.position[1];
        let distance = Math.sqrt(Math.pow(directionX, 2) + Math.pow(directionY, 2))
        directionX /= distance;
        directionY /= distance;
        target.position[0] += target.speed * directionX * dt;
        target.position[1] += target.speed * directionY * dt;
        return distance > 1;
    }
}

export class TaskList {
    constructor(entries) {
        this.entries = entries;
    }
    execute() {
        this.entries[0].execute();
    }
}

class Task {
    constructor() {}
}
export class MoveTask extends Task {
    constructor(targetX, targetY) {
        super();
        this.targetX = targetX;
        this.targetY = targetY;
    }
}

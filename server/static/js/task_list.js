import {IdleTask, MoveTask, CutBannerTask} from "./tasks.js";


var dt = 1; // TODO
var idle_task = new IdleTask();


export class TaskExecutor {

    constructor(world) {
        this.world = world;
    }

    execute_move(task) {
        let person = task.owner
        let directionX = task.targetX - person.position[0];
        let directionY = task.targetY - person.position[1];
        let distance = Math.sqrt(Math.pow(directionX, 2) + Math.pow(directionY, 2))
        directionX /= distance;
        directionY /= distance;
        person.position[0] += person.speed * directionX * dt;
        person.position[1] += person.speed * directionY * dt;
        return distance > 1;
    }

    execute_cut_banner(task) {
        return true;
    }

    execute(task) {
        switch(task.constructor) {
            case IdleTask:
                return true;
            case MoveTask:
                return this.execute_move(task);
            case CutBannerTask:
                return this.execute_cut_banner(task);
        }
    }
}


export class TaskList {

    constructor(owner, entries) {
        this.owner = owner
        this._entries = entries;
    }

    push(task) {
        task.owner = this.owner
        this._entries.push(task)
    }

    peek() {
        if (this.is_executable()) {
            return this._entries[0]
        } else {
            return idle_task
        }
    }

    shift() {
        this._entries.shift()
    }

    circular_shift() {
        this._entries.push(this._entries.shift())
    }

    is_executable() {
        return this._entries.length > 0
    }
}

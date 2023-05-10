import {IdleTask} from "./tasks.js";

var idle_task = new IdleTask();

export class TaskList {

    constructor(owner, entries) {
        this.owner = owner;
        this._entries = entries;
    }

    push(task) {
        task.owner = this.owner;
        this._entries.push(task);
    }

    peek() {
        if (this.is_executable()) {
            return this._entries[0];
        } else {
            return idle_task;
        }
    }

    shift() {
        this._entries.shift();
    }

    circular_shift() {
        this._entries.push(this._entries.shift());
    }

    reset() {
        this._entries = [];
    }

    is_executable() {
        return this._entries.length > 0;
    }
}

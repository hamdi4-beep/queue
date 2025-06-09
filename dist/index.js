"use strict";
class TaskQueue {
    constructor() {
        this.queue = [];
        this.nextID = 0;
    }
    addTask(task) {
        this.queue.push({
            id: this.nextID++,
            task
        });
    }
    findTask(id) {
        const targetTask = this.queue.find(it => it.id === id);
        if (!targetTask)
            return console.log('No such task exists.');
        return targetTask;
    }
    start(depth = 1) {
        const item = this.queue.shift();
        if (item) {
            const { task, id } = item;
            task(depth, () => this.start(depth + 1));
        }
    }
}
const taskQueue = new TaskQueue();
const task = (depth, next) => {
    console.log('The number of times a function was called recursively:', depth);
    next();
};
taskQueue.addTask(task);
taskQueue.addTask(task);
taskQueue.addTask(() => { });
taskQueue.addTask(() => console.log('Running the last task!'));
taskQueue.start();
console.log(taskQueue);

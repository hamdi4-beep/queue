class TaskQueue {
    private nextID: number

    private queue: {
        id: number
        task: Function
    }[]

    constructor() {
        this.queue = []
        this.nextID = 0
    }

    addTask(task: Function) {
        this.queue.push({
            id: this.nextID++,
            task
        })
    }

    findTask(id: number) {
        const targetTask = this.queue.find(it => it.id === id)

        if (!targetTask)
            return console.log('No such task exists.')

        return targetTask
    }

    start(depth = 1) {
        const item = this.queue.shift()
        
        if (item) {
            const {task, id} = item
            task(id, () => this.start(depth + 1))
        }
    }
}

const taskQueue = new TaskQueue()

const task = (depth: number, next: Function) => {
    console.log('The number of times a function was called recursively:', depth)
    next()
}

taskQueue.addTask((id: number) =>
    console.log('Running a task with the ID:', id)
)

taskQueue.start()
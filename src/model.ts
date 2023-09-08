export interface Profile {
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    userbio: string,
    profilePicture?: string,
}

export enum TaskPriority {
    LOW,
    MEDIUM,
    HIGH,
}

export interface Task {
    title: string,
    description: string,
    dueDate: Date,
    priority: TaskPriority
}

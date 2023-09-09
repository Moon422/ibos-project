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

export enum TaskStatus {
    NOT_STARTED,
    STARTED,
    COMPLETED
}

export interface Task {
    id: number,
    title: string,
    description: string,
    dueDate: Date,
    priority: TaskPriority,
    teamId: number,
    taskStatus: TaskStatus
}

export interface Team {
    id: number,
    title: string,
    members: string[]
}

export interface Response {
    statusCode: number,
    body: string
}

export enum ItemStatusEnum {
    open = 'open',
    in_progress = 'in progress',
    done = 'done'
}

export interface TodoItem {
    id: string,
    name: string,
    status: ItemStatusEnum
    updatedAt: string
}
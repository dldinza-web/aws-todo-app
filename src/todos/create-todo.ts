'use strict';

import * as uuid from 'uuid'
import { dynamoDbDocument } from './dynamo';
import { TodoItem } from './model';

const createTodo = (event: any, callback: Function) => {
    const item: TodoItem = JSON.parse(event.body)

    if (!item.id) { item.id = uuid.v1() }

    item.updatedAt = new Date().toISOString()
    
    const dynamoParams = {
        TableName: 'todos',
        Item: item
    }
    
    return dynamoDbDocument.put(dynamoParams, (error) => {
        if (error) { 
            callback(error) 
        }

        callback(error, item)
    })
}

export const handler = (event: any, context: any, callback: Function) => {
    createTodo(event, (error: any, result: any) => {
        let response = {}
        
        if (error) {
            response = {
                statusCode: 500,
                body: JSON.stringify(error)
            }
        } else {
            response = {
                statusCode: 201,
                body: JSON.stringify(result)
            }

            context.succeed(response)
        }

    })
}
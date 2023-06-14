'use strict';

import * as uuid from 'uuid'
import { dynamoDbDocument } from './dynamo';
import { TodoItem } from './model';

export const handler = (event: any, context: any, callback: Function) => {
    const item: TodoItem = JSON.parse(event.body)

    if (!item.id) { item.id = uuid.v1() }

    item.updatedAt = new Date().toISOString()
    
    const dynamoParams = {
        TableName: 'todos',
        Item: item
    }
    
    return dynamoDbDocument.put(dynamoParams, (error) => {
        if (error) { callback(error) }

        callback(error, item)
    })
}
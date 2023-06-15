import { Handler } from "aws-lambda"
import { dynamoDbDocument } from "./dynamo"
import { TodoItem } from "./model"

const requestAllItems = async () => {
    let dynamoParams = {
        TableName: 'todos'
    }
    
    let items = []
    let dbResponse = null

    do {
        dbResponse = await dynamoDbDocument.scan(dynamoParams).promise()
        items.push(dbResponse.Items)

        dynamoParams.ExclusiveStartKey = dbResponse.LastEvaluatedKey
    } while(dbResponse.LastEvaluatedKey)

    return items.flat()
}

export const handler: Handler = async (event: any, context: any, callback: Function) => {
    const items = await requestAllItems()

    const response = {
        statusCode: 200,
        body: JSON.stringify(items, null, 2)
    }

    return response
}
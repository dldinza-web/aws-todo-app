import { dynamoDbDocument } from "./dynamo"

export const handler = async (event: any, context: any, callback: Function) => {
    let dynamoParams = {
        TableName: 'todos'
    }
    
    let items = []
    let response = null

    do {
        response = await dynamoDbDocument.scan(dynamoParams).promise()
        items.push(response.Items)

        dynamoParams.ExclusiveStartKey = response.LastEvaluatedKey
    } while(response.LastEvaluatedKey)

    return callback(null, items)
}
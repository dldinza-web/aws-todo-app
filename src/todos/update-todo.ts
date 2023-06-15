import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import { processParams } from "./utils";
import { dynamoDbDocument } from "./dynamo";
import { requestItem } from "./load-todo";

const updateTodo = async (id: string, body: any) => {    
    let item = await requestItem(id)

    item = {
        ...item,
        ...body,
        id,
        updatedAt: new Date().toISOString()
    }

    const dynamoParams = {
        TableName: 'todos',
        Item: item
    }

    await dynamoDbDocument.put(dynamoParams).promise()

    return item
}

export const handler: Handler = async (event: APIGatewayProxyEvent) => {
    let response = {}

    const params = processParams(event.pathParameters)

    const item = await updateTodo(params.id, JSON.parse(event.body || ''))

    response = {
        statusCode: 200,
        body: JSON.stringify(item)
    }

    return response
}
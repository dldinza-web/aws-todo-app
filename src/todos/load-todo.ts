import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import { dynamoDbDocument } from "./dynamo";
import { processParams } from "./utils";
import { TodoItem } from "./model";

export const requestItem = async (id: string): Promise<TodoItem> => {
    const dynamoParams = {
        TableName: 'todos',
        Key: {
            id
        }
    }

    const dbResponse = await dynamoDbDocument.get(dynamoParams).promise()

    return dbResponse.Item as TodoItem
}

export const handler: Handler = async (event: APIGatewayProxyEvent) => {
    let response = {}
    
    try {
        const params = processParams(event.pathParameters)

        const item = await requestItem(params.id)

        response = {
            statusCode: 200,
            body: JSON.stringify(item)
        }
    } catch (error) {
        response = {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }

    return response
}
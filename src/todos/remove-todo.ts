import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import { processParams } from "./utils";
import { dynamoDbDocument } from "./dynamo";
import { requestItem } from "./load-todo";
import { ItemStatusEnum } from "./model";

const removeItem = async (id: string) => {

    let item = await requestItem(id)
    item.status = ItemStatusEnum.deleted

    const dynamoParams = {
        TableName: 'todos',
        Key: { id }
    }

    await dynamoDbDocument.delete(dynamoParams).promise()

    return item
}

export const handler: Handler = async (event: APIGatewayProxyEvent) => {
    let response;

    const params = processParams(event.pathParameters)

    const item = await removeItem(params.id)

    response = {
        statusCode: 200,
        body: JSON.stringify(item)
    }
    
    return response
}
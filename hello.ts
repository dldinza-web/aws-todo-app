'use strict';

interface Response {
  statusCode: number,
  body: string
}

export const hello = async (event: any): Promise<Response> => {
  const statusCode = 200
  const body = JSON.stringify(
    {
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    },
    null,
    2
  )
  
  let response = {
    statusCode,
    body 
  }

  return response;
};

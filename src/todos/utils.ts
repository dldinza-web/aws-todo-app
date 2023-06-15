export const processParams = (params: any) => {
    if ('id' in params) { params.id = params.id as string }

    return params
}
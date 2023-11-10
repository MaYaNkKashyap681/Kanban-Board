export function responseFormat(data: any, success: boolean = false, message: string = 'Successful Request') {
    return {
        "data": data,
        "message": message,
        "error": null,
        "success": success
    }
}
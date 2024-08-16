interface ErrorMessage {
    error: string,
    code: number
}

interface InfoMessage {
    message?: string,
    code: number
}

export { ErrorMessage, InfoMessage };
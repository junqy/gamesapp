import axios from "axios"
 
class ErrorHandlerRegistry {
    handlers = new Map()
 
    constructor(errorHandlers) {
        if (typeof errorHandlers !== 'undefined') this.registerMany(errorHandlers)
    }
 
    register(key, handler) {
        this.handlers.set(key, handler)
        return this
    }
 
    registerMany(input) {
        for (const [key, value] of Object.entries(input)) {
            this.register(key, value)
        }
 
        return this
    }
 
    unregister(key) {
        this.handlers.delete(key)
        return this
    }
 
    find(seek) {
        return this.handlers.get(seek)
    }
 
    isErrorHandlerObject(value) {
        if (typeof value === 'object') {
            return ['getMessage', 'after'].some((key) => key in value)
        }
 
        return false
    }
 
    handleError(
        handler,
        error
    ) {
        if (typeof handler === 'string') {
            return this.handleErrorObject(error, { message: handler })
        } else if (typeof handler === 'function') {
            const result = handler(error)
 
            if (this.isErrorHandlerObject(result)) {
                return this.handleErrorObject(error, result)
            }
        } else if (this.isErrorHandlerObject(handler)) {
            return this.handleErrorObject(error, handler?.getMessage())
        } else if (error?.message) {
            return { error: true, message: error?.message }
        } else {
            return { error: true, message: "API request error" }
        }
    }
 
    handleErrorObject(errorObject, message) {
        return { error: true, message: message }
    }
 
    responseErrorHandler(error) {
        if (error === null) {
            throw new Error("Unrecoverable error")
        }
 
        if (axios.isAxiosError(error)) {
            const response = error?.response
            const data = response?.data
            let handler
 
            const seekers = [
                data?.error,
                String(response?.status),
                error.code,
                error?.name,
            ]
 
            if (Array.isArray(seekers)) {
                seekers.some((key) => {
                    if (key !== undefined) {
                        handler = this.find(key)
                        return handler
                    }
                })
            }
 
            const result = this.handleError(handler, error)
 
            if (data?.message) {
                result.message = data?.message
            }
 
            handler?.after?.(error, result)
 
            return result
        } else if (error instanceof Error) {
            return this.handleError(error.name, error)
        } else {
            throw error
        }
    }
}
 
const axiosErrorHandlers = new ErrorHandlerRegistry()
 
export { axiosErrorHandlers }
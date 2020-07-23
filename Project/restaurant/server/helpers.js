class UniqueConstraintError extends Error {
    constructor(value) {
        super(`${value} must be unique.`)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UniqueConstraintError)
        }
    }
}

class InvalidPropertyError extends Error {
    constructor(msg) {
        super(msg)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidPropertyError)
        }
    }
}

class RequiredParameterError extends Error {
    constructor(param) {
        super(`${param} can not be null or undefined.`)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RequiredParameterError)
        }
    }
}

const HttpError = ({ statusCode, errorMessage }) => {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode,
        data: JSON.stringify({
            success: false,
            status: 1,
            error: errorMessage
        })
    }
}

const requiredParam = (param) => {
    throw new RequiredParameterError(param)
}

const createListener = (initialValue) => (Object.freeze({
    innerValue: initialValue,
    resCollector: [],
    innerListener: () => { this.resCollector.forEach(res => res.sse('update', { timestamp: this.innerValue })); },
    get: () => this.innerValue,
    set: (newValue) => { this.innerValue = newValue; this.innerListener(); },
    add: (res) => { console.log('shuld add res');this.resCollector.push(res); console.log('res added'); }
}));

module.exports = {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError,
    HttpError,
    requiredParam,
    createListener
}
class AjaxError extends Error {
    constructor(httpErrorCode = '', ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AjaxError);
        }

        this.name = 'AjaxError';
        // Custom debugging information
        this.httpErrorCode = httpErrorCode;
        this.date = new Date();
    }
}

export default AjaxError
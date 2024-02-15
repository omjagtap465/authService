const { INTERNAL_SERVER_ERROR } = require('http-status-code');

class ApiErrors extends Error {
    constructor(name = "ApiErrors", message = "Something Went Wrong", explanation = "Something Went Wrong", statusCode = INTERNAL_SERVER_ERROR) {
        super();
        this.message = message;
        this.name = name;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}

module.exports = ApiErrors;

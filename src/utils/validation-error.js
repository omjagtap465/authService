const ApiErrors = require("./error-handler");
const StatusCode  = require('http-status-code');

class ValidationError extends ApiErrors {
    constructor(error) {
        let name = error.name;
        let explanation = [];

        // error.errors.forEach(err => {
        //     explanation.push(err.message);
        // });

        super(name, "Something went Wrong", explanation, StatusCode.BAD_REQUEST);
    }
}

module.exports = ValidationError;

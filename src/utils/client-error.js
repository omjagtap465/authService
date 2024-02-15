const ApiErrors = require('./error-handler')
class ClientError extends ApiErrors{
    constructor(name , message , explanation, statusCode ) {
        let _message = message;
        let _name = name;
        let _explanation = explanation;
        let _statusCode = statusCode;
        super(_name,_message,_explanation,_statusCode);
    }
}
module.exports = ClientError;
const errorHandler = (err, req, res, next) => {
    let code = 500;
    let message = 'Internal Server Error'
    
    if (err.name == "BSONTypeError") {
        code = 400;
        message = "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"
    }
    if (err.name == 'UnknownId') {
        code = 404;
        message = "Data Not Found";
    }
    if (err.name == "ValidationError") {
        code = 400;
        message = err.errors[0]
    }
    
    console.log(err);
    res.status(code).json({message})
}

module.exports = errorHandler;
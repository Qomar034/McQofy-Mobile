const errorHandler = (err, req, res, next) => {
    let code = 500
    let msg = "Internal Server Error"

    if (err.name == 'SequelizeValidationError'){
        code = 400
        msg = err.errors[0].message
    }

    if (err.name == "UnknownId" || err.name == "UnknownSlug"){
        code = 400
        msg = "Parameter is Required"
    }

    if (err.name == "InvalidId"){
        code = 404
        msg = "Data Not Found"
    }

    if (err.name == "UnknownProperty"){
        code = 400
        msg = "Please Fill Required Field"
    }

    if (err.name == "UnknownIngredients"){
        code = 400
        msg = "Please Fill Ingredients Field"
    }
    
    console.log(err);
    res.status(code).json({msg})
}

module.exports = errorHandler
const validation = {
    username: {args: true, msg: "username is required"},
    email: {args: true, msg: "email is required"},
    password: {args: true, msg: "password is required"},
    role: false,
    phoneNumber: false,
    address: false
}

const data = {
}

let errors = []
for (el in validation){
    if (validation[el].args == true){
        if (!data[el]){
            errors.push(validation[el].msg)
        }
    }
}

if (errors.length) {
    console.log(errors);
}
else console.log("no errors found");
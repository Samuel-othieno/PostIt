// Global Message variables 

const user_created = "Your account has been successfully created"
const after_success = "you may now explore some of our top feature."
const Invalid_User = "User not found, please try again!"
const access_denied = "You do not have permissions to perform this action, try again later"
const unavailable = "Service temporarily down 😭, please try again"
const invalid_User = "Invalid user, please check your credentials and try again"
const Invalid_Password = "Wrong password, please check you password and try again."


async function messages(req, res){

   }

export {
    Invalid_User,
    user_created,
    after_success,
    access_denied,
    invalid_User,
    unavailable,
    Invalid_Password
}





//check if credentials of user exist?
    // if user exists eg id or name, but wrong password:
        // wrong password, please check you password and try again.
    // if No user exists with provided credentials:
        // invalid user credentials, please check your credentials and try again
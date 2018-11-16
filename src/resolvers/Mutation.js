const Users =  require('../schemas/Users');
const jwt =  require('jsonwebtoken');

const SECRET = "mysecret"


function signup(_,args,context,info){


   return Users.create(args.data).then((user) => {

        let payload =  {email:user.email}
       let token = jwt.sign(payload,SECRET)
       return {token}
       
    }).catch((err) => {
        throw  new Error(err)
    })


}

module.exports = {
    signup
}
const Users =  require('../schemas/Users');
const Movies = require('../schemas/Movies');
const createToken  = require('../utils/createToken');
const comparePasswords =  require('../utils/comparePasswords');


function signup(_,args,context,info){
   return Users.create(args.data).then((user) => {
       let token =  createToken(user)
       return {token}
    }).catch((err) => {
        throw  new Error(err)
    })

}


function login(_,args,context,info){
    return comparePasswords(args.email,args.password)
        .then((token) => {return {token}})
        .catch((err) => { throw err })

}

function createMovie(_,args,context,info){
    return Movies.create(args.data).then((movie) => {
        return movie.toObject()
    }).catch((err) => {throw err;})

}

function updateMovie(_,args,context,info){
    return Movies.findByIdAndUpdate(args.id,{$set:args.data},{new:true}).then((movie) => {
        return movie.toObject();
    }).catch((err) => {
        throw err
    })
}

function deleteMovie(_,args,context,info){
    return Movies.findOneAndUpdate({_id:args.id},{$set:{is_active:false}})
        .then(() => {
            return "Movie deleted"
        }).catch((err) => {
            throw err
        })
}


module.exports = {
    signup,
    login,
    createMovie,
    updateMovie,
    deleteMovie
}
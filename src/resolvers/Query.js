const Movies = require("../schemas/Movies");
const Users =  require("../schemas/Users");

function prueba(_,args,context,info){
    return "Esto es una prueba en graphql"
}

function movies(_,args,context,info){
    if(!context.user) throw new Error("Authentication is required")
    
    return Movies.find({is_active:true}).then((movies) => {
        return movies;
    }).catch((err) => {
        throw err;
    })
}

function movie(_,args,context,info){
    if(!context.user) throw new Error("Authentication is required")

    return Movies.findById(args.id).then((movie) => {
        return movie.toObject();
    }).catch((err) => {
        throw err
    })
}


function me(_,args,context,info){
    if(!context.user) throw new Error("Authentication is required")

    return Users.findById(context.user._id)
                .populate("subscription_id")
                .then((user) => {
                    console.log(user.toObject())
                    return user.toObject()
                })
                .catch((err) => { throw err;})


}

module.exports = {
    prueba,
    movies,
    movie,
    me
}
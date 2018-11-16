const {GraphQLServer}  = require('graphql-yoga')
const Query  = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation')
const mongoose =  require('mongoose');


mongoose.connect('mongodb://prueba:prueba123@ds161856.mlab.com:61856/netflix-cul',{ useNewUrlParser: true } )

const db = mongoose.connection

db.on('error',
    (error) =>  console.log("Failed to connect to mongo",error))
    .once('open', () => console.log("Connected to database"))

const resolvers = {
    Query,
    Mutation
}

const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers,
    context: req => ({
        ...req
    })
})

const options = {
    port:8000,
    endpoint:'/graphql',
    playground:'/playground'


}

server.start(options,
    ({port}) => console.log(`Magic start in port ${port}`))
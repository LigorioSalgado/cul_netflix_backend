const {GraphQLServer}  = require('graphql-yoga')
const Query  = require('./resolvers/Query')
const mongoose =  require('mongoose');


mongoose.connect('mongodb://prueba:prueba123@cluster0-shard-00-00-vp6hz.mongodb.net:27017,cluster0-shard-00-01-vp6hz.mongodb.net:27017,cluster0-shard-00-02-vp6hz.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',{ useNewUrlParser: true } )

const db = mongoose.connection

db.on('error',
    () =>  console.log("Failed to connect to mongo"))
    .once('open', () => console.log("Connected to database"))

const resolvers = {
    Query
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
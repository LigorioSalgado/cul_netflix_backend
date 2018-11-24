const {GraphQLServer}  = require('graphql-yoga')
const Query  = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation')
const mongoose =  require('mongoose');
const verifyToken =  require('./utils/verifyToken');
const { importSchema } = require('graphql-import')
const { makeExecutableSchema } =  require('graphql-tools')

const typeDefs = importSchema('./src/schema.graphql')


mongoose.connect('mongodb://prueba:prueba123@ds161856.mlab.com:61856/netflix-cul',{ useNewUrlParser: true } )

const db = mongoose.connection

db.on('error',
    (error) =>  console.log("Failed to connect to mongo",error))
    .once('open', () => console.log("Connected to database"))

const resolvers = {
    Query,
    Mutation
}


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

const server = new GraphQLServer({
    schema,
    context: async context => ({
        ...context,
        user:await verifyToken(context)
    })
})

const options = {
    port:8000,
    endpoint:'/graphql',
    playground:'/playground'


}

server.start(options,
    ({port}) => console.log(`Magic start in port ${port}`))

module.exports = { schema }
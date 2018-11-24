const {graphql} =  require('graphql')

const {schema} =  require('../index');

const setupTest = require('./helpers');

const mutationRegister = `

    mutation Register($first_name:String!,$last_name:String!,$email:String!,
        $password:String!){
        signup(data:{first_name:$first_name,
            last_name:$last_name,
            email:$email,
            password:$password
        }){
            token
        }
    }
`

describe("Register user works correctly", () => {

    beforeEach( async () => await setupTest())


    it("Should create user correctly",async () => {
        const first_name = "Prueba"
        const last_name = "Prueba"
        const email = "prueba@email.com"
        const password = " miprueba"

        const res = await graphql(schema,mutationRegister,null,{}
                                ,{first_name,last_name,email,password})
    
        expect(res).toMatchSnapshot();
        expect(res).toHaveProperty("data")

    })

} )
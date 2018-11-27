const {graphql} =  require('graphql')

const {schema} =  require('../index');

const Users =  require('../schemas/Users');

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

const queryMe = `

    query Profile{
        me{
            first_name,
            last_name,
            email
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
    
        //expect(res).toMatchSnapshot();
        expect(res).toHaveProperty("data")
        expect(res.data).toHaveProperty("signup")
        expect(res.data.signup).toHaveProperty("token")


    })


    it("Should retrieve me profile",async () => {

        const me =  await Users.create({first_name:"prueba",last_name:"prueba",email:"prueba@prueba.com",password:"prueba"})

        const res  =  await graphql(schema,queryMe,null,{user:me},{})
        
        expect(res).toMatchSnapshot()
        expect(res.data.me.first_name).toBe(me.first_name)

    })

} )
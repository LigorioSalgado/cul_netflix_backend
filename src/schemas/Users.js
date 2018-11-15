const mongoose =  require('mongoose');


const Schema =  mongoose.Schema

const UserSchema = new Schema({

    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    birth_date:{
        type:Date
    },
    gender:{
       type:String,
       enum:["Male","Female"] 
    },
    nationality:{
        type:String
    },
    user_payment:{type:String},
    subscription_id:{
        type:Schema.Types.ObjectId,
        ref:"subscriptions"
    },
    history:[
        {
            type:Schema.Types.ObjectId,
            ref:'movies'
        }
    ],
    favorites:[
        {
            type:Schema.Types.ObjectId,
            ref:'movies'
        }
    ],
    is_active:{
        type:Boolean,
        default:true
    }

},{'collection':'users',timestamps:true})

module.exports = UserSchema;
const mongoose =  require('mongoose');

const Schema =  mongoose.Schema



const SubscriptionSchema =  new Schema({

    type_subscription:{
        type:String,
        enum:["basic","gold","premium"],
        required:true
    },
    price:{
        type:String,
        enum:["0","99","199"],
        required:true
    },
    start_date:{
        type:Date,
        required:true
    },
    end_date:{
        type:Date,
        required:true
    },
    is_active:{
        type:Boolean,
        default:false
    }


},{'collection':'subscriptions','timestamps':true})


module.exports =  mongoose.model('subscriptions',SubscriptionSchema)
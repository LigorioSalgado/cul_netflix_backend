const mongoose =  require('mongoose');
const {SECRET_KEY_STRIPE,SUBSCRIPTIONS_TYPES} = require('../const');
const stripe =  require('stripe')(SECRET_KEY_STRIPE)

const Schema =  mongoose.Schema



const SubscriptionSchema =  new Schema({

    type_subscription:{
        type:String,
        enum:["BASIC","GOLD","PREMIUM"],
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
    },
    stripe_id:{
        type:String
    }


},{'collection':'subscriptions','timestamps':true})


SubscriptionSchema.methods.upgrade = function (type,customer,cb) {
    
    if(this.type_subscription == type){
        cb(new Error("You can not upgrade the same subscription"),null)
    }else{
        stripe.subscriptions.create({
           customer,
           items:[
               {
                   plan:SUBSCRIPTIONS_TYPES[type]
               }
           ]
        }, function(err,subscription){
            if(err) cb(err,null)
            this.stripe_id = subscription.id
            this.type_subscription =  type
            this.save()
            cb(null,subscription)
        })


    }



}

module.exports =  mongoose.model('subscriptions',SubscriptionSchema)
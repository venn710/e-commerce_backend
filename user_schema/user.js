const mongoose=require('mongoose')
let schema=mongoose.Schema({
    email:String,
    pass:Array,
    address:Map,
    isadmin:Boolean
})
module.exports=mongoose.model('users',schema)
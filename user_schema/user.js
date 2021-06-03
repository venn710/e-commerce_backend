const mongoose=require('mongoose')
let schema=mongoose.Schema({
    id:String,
    email:String,
    pass:String
})
module.exports=mongoose.model('users',schema)
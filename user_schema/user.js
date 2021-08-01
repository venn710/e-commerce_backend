const mongoose=require('mongoose')
let schema=mongoose.Schema({
    email:String,
    pass:String,
    adress:Map
})
module.exports=mongoose.model('users',schema)
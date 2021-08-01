const mongoose=require('mongoose')
let schema=mongoose.Schema({
    usermail:String,
    address:Map
})
module.exports=mongoose.model('addresses',schema)
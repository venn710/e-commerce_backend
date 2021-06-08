const mongoose=require('mongoose')
let schema=mongoose.Schema({
    usermail:String,
    products:Array
})
module.exports=mongoose.model('carts',schema)
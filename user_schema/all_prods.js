const mongoose=require('mongoose')
let schema=mongoose.Schema({
    id:String,
    products:Array
})
module.exports=mongoose.model('allproducts',schema)
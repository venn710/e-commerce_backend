const mongoose=require('mongoose')
let schema=mongoose.Schema({
    brand:String,
    id:String,
    description:String,
    image:String,
    size:Number,
    title:String,
    price:Number
})
module.exports=mongoose.model('products',schema)
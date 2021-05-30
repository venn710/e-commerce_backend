const mongoose=require('mongoose')
let schema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    brand:String,
    id:String,
    description:String,
    size:Number,
    title:String,
    price:Number
})
module.exports=mongoose.model('products',schema)
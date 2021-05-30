const mongoose=require('mongoose')
let schema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id:String,
    email:String,
    pass:String
})
module.exports=mongoose.model('users',schema)






































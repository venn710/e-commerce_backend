const mongoose=require('mongoose')
require('dotenv').config({path:"config.env"})
const uri=process.env.mongo_url
async function connectDB(){
await mongoose.connect(
    uri,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    )
console.log("CONNECTED")
}
module.exports=connectDB;
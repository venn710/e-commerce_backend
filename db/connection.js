const mongoose=require('mongoose')
require('dotenv').config({path:"config.env"})
const uri=process.env.mongo_url
async function connectDB(){
await mongoose.connect(
    uri,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: false,
    }
    )
    mongoose.connection.once("open", () => {
        console.log("connecteddddddddddd to database");
      });
// console.log("CONNECTED")
}
module.exports=connectDB;
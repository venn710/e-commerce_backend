const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config({path:"config.env"})
const product_data=require('./user_schema/product')
const app=express()
const port=process.env.PORT
app.listen(process.env.PORT,()=>console.log("Startedddddddddddd"))
// const con=require('./db/connection')
// con()
mongoose.connect(
    process.env.PORT,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: false,
    }
    )
    mongoose.connection.once("open", () => {
        console.log("connecteddddddddddd to database");
      });
console.log("CONNECTED")
app.get('/',(req,res)=>{
    console.log("HIIIIIIIIIII")
    res.send("Hello world...!!")
})
app.get('/users',async function(req,res)
{
   console.log("CAME To users@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    try
    {
    const user_data=require('./user_schema/user')
    console.log(user_data)
    user_data.find({}).exec(function(err,data)
    {
        // res.send("jiiiii")
        // res.json(data)
        res.send(data)
    })}
    catch(err)
    {
        console.log("ERROr")
    }
})
app.get('/:category/:type',async(req,res)=>
{
    const category=req.params.category
    const typed=req.params.type
    try
    {
    product_data.find({}).where({
        'id':category,
        'title':typed
    }).exec(function(err,data){
        if(err)
        console.log("ERRRRRRRROR")
        else
        {
        // console.log(data)
        res.json(data)
        print("Data Sent")
        }
    })}
    catch(err)
    {
        console.log("CANNOT FIND THOSE ITEMS")
    }

})
app.get("*", (req, res) => {
    console.log("HIIIIIIIIIIIIIIIIIII")
    res.status(404).send("oops cant find");
  });

const express=require('express')
require('dotenv').config({path:"config.env"})
const product_data=require('./user_schema/product')
const app=express()
const port=process.env.PORT
app.listen(port,()=>console.log("Startedddddddddddd"))
const con=require('./db/connection')
const rout=express.Router()
con()
app.get('/',(req,res)=>{
    console.log("HIIIIIIIIIII")
    res.send("Hello world...!!")
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
app.get('/users',async function(req,res)
{
    try
    {
    const user_data=require('./user_schema/user')
    user_data.find({}).exec(function(err,data)
    {
        // res.send("jiiiii")
        res.json(data)
        // res.send(data)
    })}
    catch(err)
    {
        console.log("ERROr")
    }
})


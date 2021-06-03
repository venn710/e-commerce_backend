const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config({path:"config.env"})
const product_data=require('./user_schema/product')
const app=express()
const port=5000
mongoose.connect(
    "mongodb+srv://venn:venn123@cluster0.ziajh.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: false,
    }
    ).then(co => console.log('connected to mongodb..')).catch(e=>console.log('could not connect to mongodb', e))

app.get('/',(req,res)=>{
    console.log("HIIIIIIIIIII")
 //   console.log("HIIIIIIIIIII")
    res.status(200).send("Hello world...!!")
})
app.get('/users',async function(req,res)
{
   console.log("CAME To Users")
    try
    {
    const user_data=require('./user_schema/user')
    console.log(user_data)
    user_data.find({}).exec(function(err,data)
    {
        // res.send("jiiiii")
        res.status(200).json(data)
        // res.send(data)
    })}
    catch(err)
    {
        console.log("ERROr")
    }
})
app.get('/all',async function(req,res)
{
    try
    {
        product_data.find({}).exec(function(err,data)
        {
            if(err)
            console.log("ERRRORRR")
            else
            res.json(data)
        })
    }
    catch(err)
    {
        console.log("CANNOT FIND THOSE ITEMS")
         res.json(data)
      //  res.send(data)
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
        console.log("p");
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
  app.listen(process.env.PORT,()=>console.log("Startedddddddddddd"))
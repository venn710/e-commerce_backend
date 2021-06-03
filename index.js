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
<<<<<<< HEAD
=======
 //   console.log("HIIIIIIIIIII")
>>>>>>> 637144e0d52bfbab780733c1dcc15459b1494ec9
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
<<<<<<< HEAD
=======
        // res.send("jiiiii")
>>>>>>> 637144e0d52bfbab780733c1dcc15459b1494ec9
        res.status(200).json(data)
        // res.send(data)
    })}
    catch(err)
    {
        res.status(404).send("ERROR");
    }
})
app.get('/all',async function(req,res)
{
    try
    {
        product_data.find({}).exec(function(err,data)
        {
            if(err)
            res.status(404).send("ERROR");
            else
            res.json(data)
        })
    }
    catch(err)
    {
        console.log("CANNOT FIND THOSE ITEMS")
        res.status(404).send("ERROR");
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
        res.status(404).send("ERROR");
        else
        {
<<<<<<< HEAD
        res.json(data);
=======
        // console.log(data)
        res.json(data)
        console.log("p");
>>>>>>> 637144e0d52bfbab780733c1dcc15459b1494ec9
        }
    })}
    catch(err)
    {
        res.status(404).send("ERROR");
    }

})
app.get("*", (req, res) => {
    console.log("HIIIIIIIIIIIIIIIIIII")
    res.status(404).send("oops cant find");
  });
  app.listen(5000,()=>console.log("Startedddddddddddd"))
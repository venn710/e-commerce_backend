const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config({path:"config.env"})
const product_data=require('./user_schema/product')
const app=express()
const port=process.env.PORT
mongoose.connect(
    process.env.mongo_url,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: false,
    }
    ).then(co => console.log('connected to mongodb..')).catch(e=>console.log('could not connect to mongodb', e))

app.get('/',(req,res)=>{
 //   console.log("HIIIIIIIIIII")
    res.send("Hello world...!!")
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
         res.json(data)
      //  res.send(data)
    })}
    catch(err)
    {
        console.log("Error")
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

    res.status(404).send("oops cant find");
  });
  app.listen(process.env.PORT,()=>console.log("Startedddddddddddd"))
app.listen(process.env.PORT, function () {

  console.log("listening to port " + process.env.PORT);

});

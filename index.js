const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config({path:"config.env"})
const product_data=require('./user_schema/product')
const cart_data=require('./user_schema/cart_Prods')
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
    console.log("HIIIIIIIIIII")
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
app.get('/products/:category/:type',async(req,res)=>
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
        res.json(data)
        }
    })}
    catch(err)
    {
        res.status(404).send("ERROR");
    }
})
app.get('/cart/:usermail',async(req,res)=>{
    const mail=req.params.usermail
    console.log(mail)
    try{
        cart_data.find({}).where({'usermail':mail}).exec((err,data)=>
        {
            if(err)
            res.status(404).send(err)
            else
            res.json(data)
        })
    }
    catch(err)
    {
        res.status(404).send(err)
    }
})
app.get("*", (req, res) => {
    res.status(404).send("oops cant find");
  });
app.use(express.json(
    {
        limit:'100mb',
    }
));
app.use(express.urlencoded({
    extended: true,
    urlencoded:true,
    limit:'100mb',
  }));
app.post('/',function(req,res)
{
    var new_prod= new product_data(req.body)
    new_prod.save(function(err,data)
    {
        if(err)
        {
            console.log(err)
            res.status(200).send("An Error Occured")
        }
        else{
        console.log("SUCCESSFULLY INSERTED")
        res.status(200).send("POsted")
        }
    })
})
app.post('/cart',function(req,res)
{
    var cart= new cart_data(req.body)
    // print(req.body)
    cart.save(
        function(err,data)
        {
            if(err)
            {
                console.log("ERROr")
                res.status(200).send("An Error Ocuured")
        }
        else
        {
            console.log("SUCCESSFULLY INSERTED")
            res.status(200).send("POsted")
        }
    }
    )
})
  app.listen(port,()=>console.log("Startedddddddddddd"))
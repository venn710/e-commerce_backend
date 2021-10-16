const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config({path:"config.env"})
const men_product_data=require('./user_schema/product')
const wom_product_data=require('./user_schema/womenprods')
const cart_data=require('./user_schema/cart_Prods')
const orders_data=require('./user_schema/orders')
const user_data=require('./user_schema/user')
const address_data=require('./user_schema/address_schema')
const user = require('./user_schema/user')
const allprods=require('./user_schema/all_prods')
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
app.get('/:gend/all',async function(req,res)
{
    var ptype=req.params.gend
    if(ptype=='Men')
    {
        try
        {
            allprods.find({'id':'Men'}).exec(function(err,data)
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
    }
    else if(ptype=='Women')
    {
        try
        {
            allprods.find({'id':'Women'}).exec(function(err,data)
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
    }
})
app.get('/products/:category/:type',async(req,res)=>
{
    const { page =1 }=req.query
    const limit=6
    const category=req.params.category
    const typed=req.params.type
    if(category=='Men'){
        try
        {
        men_product_data.find({}).where({
            'id':category,
            'title':typed
        }).limit(limit).skip((page-1)*limit).exec(function(err,data){
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
    }
    else if(category=='Women')
    {
        try
        {
        wom_product_data.find({}).where({
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
            else{
            res.json(data)
               }
        })
    }
    catch(err)
    {
        res.status(404).send(err)
    }
})
app.get('/address/:usermail',async(req,res)=>{
    const mail=req.params.usermail
    console.log(mail)
    try{
        address_data.find({}).where({'usermail':mail}).exec((err,data)=>
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
app.get('/orders/:usermail',async(req,res)=>{
    const mail=req.params.usermail
    console.log(mail)
    try{
         orders_data.find({}).where({'usermail':mail}).exec((err,data)=>
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
app.post('/address',function(req,res)
{
    var addr= new address_data(req.body)
    addr.save(function(err,data)
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
    console.log("came to post")
    console.log(req.body['usermail'])
    // req.body['products'].unique_id=mongoose.Types.ObjectId().toString()
    // console.log(req.body)
    cart_data.countDocuments({'usermail':req.body['usermail']},function(err,count)
    {
        if(count>0)
        {
            cart_data.find({}).where({'usermail':req.body['usermail']}).updateOne(
                {$push:{'products':req.body['products']}}
            ).then(function(err)
            {
                if(err)
                res.status(404).send(err)
                else
                res.send("Updated Successfully")
            })        
        }
        else
        {
        var cart= new cart_data(req.body)
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
                console.log("SUCCESSFULLY INSERTED New Person Cart")
                res.status(200).send("POsted")
            }
    }
    )
        }

    })
})
app.post('/orders',function(req,res)
{
    console.log(req.body['usermail'])
    orders_data.countDocuments({'usermail':req.body['usermail']},function(err,count)
    {
        if(count>0)
        {
            orders_data.find({}).where({'usermail':req.body['usermail']}).updateOne(
                {$push:{'products':req.body['products']}}
            ).then(function(err)
            {
                if(err)
                res.status(404).send(err)
                else
                res.send("Orders Updated Successfully")
            })        
        }
        else
        {
            var ords= new orders_data(req.body)
            ords.save(
            function(err,data)
            {
                if(err)
                {
                    console.log("ERROr")
                    res.status(200).send("An Error Ocuured")
                }
            else
            {
                console.log("SUCCESSFULLY INSERTED New Order")
                res.status(200).send("POsted")
            }
    }
    )
        }

    })
})
app.post('/user',function(req,res)
{
    console.log(req.body['email'])
    user_data.countDocuments({'email':req.body['email']},function(err,count)
    {
        if(count>0)
        {
            console.log("have there and came")
            user_data.find({}).where({'email':req.body['email']}).updateOne(
                {$set:{'address':req.body['address']}}
            ).then(function(err)
            {
                if(err)
                res.status(404).send(err)
                else
                res.send("User Updated Successfully")
            })        
        }
        else
        {
            var newuser= new user_data(req.body)
            newuser.save(
            function(err,data)
            {
                if(err)
                {
                    console.log("ERROr")
                    res.status(200).send(err)
                }
            else
            {
                console.log("SUCCESSFULLY INSERTED New User")
                res.status(200).send("POsted")
            }
    }
    )
        }

    })
})
app.post('/:gend',function(req,res)
{
    var type=req.params.gend
    if(type=='Men'){
        allprods.countDocuments({'id':'Men'},function(err,count)
        {
            if(count>0)
            {
                allprods.find({}).where({'id':'Men'}).updateOne(
                    {$push:{'products':req.body['products']}}
                ).then(function(err)
                {
                    if(err)
                    res.status(404).send(err)
                    else
                    res.send("Updated Successfully")
                })        
            }
            else
            {
            var new_product= new allprods(req.body)
            new_product.save(
                function(err,data)
                {
                    if(err)
                    {
                        console.log("ERROr")
                        res.status(200).send("An Error Ocuured")
                    }
                else
                {
                    console.log("SUCCESSFULLY INSERTED New Person Cart")
                    res.status(200).send("POsted")
                }
        }
        )
            }
    
        })
        var new_prod= new men_product_data(req.body['products'])
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
    }
    else if(type=="Women")
    {
        allprods.countDocuments({'id':'Women'},function(err,count)
        {
            if(count>0)
            {
                allprods.find({}).where({'id':'Women'}).updateOne(
                    {$push:{'products':req.body['products']}}
                ).then(function(err)
                {
                    if(err)
                    res.status(404).send(err)
                    else
                    res.send("Updated Successfully")
                })        
            }
            else
            {
            var new_product= new allprods(req.body['products'])
            new_product.save(
                function(err,data)
                {
                    if(err)
                    {
                        console.log("ERROr")
                        res.status(200).send("An Error Ocuured")
                    }
                else
                {
                    console.log("SUCCESSFULLY INSERTED New Person Cart")
                    res.status(200).send("POsted")
                }
        }
        )
            }
    
        })
        var new_prod= new wom_product_data(req.body)
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
    }
})
app.put('/cart',function(req,res)
{
    var uni_id=req.body['uni_id']
    console.log(req.body)
    console.log(res)
    cart_data.find({}).where({'usermail':req.body['usermail']}).updateOne(
        {"products.unique_id":uni_id}, 
        {'$set': {"products.$.quantity": req.body['updatedquant'] }},
        function(err) {
            if(err)
            {
                console.log(err)
                res.status(200).send("Error")
            }
            else
            console.log("Updated")
              res.status(200).send("Updated")
        }
)
})
app.delete('/cart',function(req,res)
{
    console.log(req.body)
    cart_data.find({}).where({'usermail':req.body['usermail']}).updateOne(
        {'$pull': {"products":{"unique_id":req.body['uni_id']}}},
        function(err) {
            if(err)
            {
                console.log(err)
                res.status(200).send("Error")
            }
            else
            console.log("Updated")
              res.status(200).send("Updated")
        })
    })
  app.listen(port,()=>console.log("Started the server"))
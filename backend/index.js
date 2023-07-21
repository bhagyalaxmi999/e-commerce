console.log("jesussai")
// npm run dev
const express= require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require('stripe')
// const Stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
// const Stripe = require('stripe')(secret_key)

const app = express()
app.use(cors())
app.use(express.json({limit : "10mb"}))


const   PORT = process.env.PORT || 8000
//mongodb connection
console.log(process.env.MONGODB_URL)
mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("Connect to Database"))
.catch((err) =>console.log(err));

// schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type : String,
        unique:true,
    },
    password: String,
    confirmPassword: String,
    image:String,
})

// model
const userModel = mongoose.model("user",userSchema)
  
// api
app.get("/",(req,res) => {
    res.send("server is running jesussai")
})


//  api signup created
app.post("/signup", async (req,res) => {
    // console.log(req.body)
   try {
    const {email} = req.body
    const extEmail = await userModel.findOne({email})
    if(extEmail) {
     return res.status(400).json({msg:`${email} allreadyexist`, alert: false})
    // res.send({message:"email id already register", alert: false})
    } else {
        const data = userModel(req.body);
        const save = data.save();
        // return res.status(200).json({msg:`${}`})
        res.send({ message: "signup Successfully",alert:true})
    }
   } catch (err) {
    return res.status(500).json({ msg: err.message })
   }
       
});



// api login created
app.post("/login", async (req,res) => {
    // console.log(req.body)
    try{
        const {email} = req.body 
        const result=  await userModel.findOne({email})
            if(result){
               
                const dataSend = {
                     _id: result._id,
                    firstName:result.firstName,
                    lastName:result.lastName,
                    email:result.email,
                    image:result.image,
                };
                console.log(dataSend)
                res.send({message:"login is successfully", alert:true, data: dataSend});
    
            }
            else{
                res.send({message:"This email is not matched please signup", alert:false, data:dataSend})
            }
         
    }catch (err) {
        return res.status(500).json({msg: err.message})
    }
})



// product section
 const schemaProduct = mongoose.Schema({
    name:String,
    category:String,
    image: String,
    price: String,
    description: String,
 });
 const productModel = mongoose.model("product",schemaProduct)

//  save product in data
// api
app.post("/uploadProduct",async(req,res) => {
    console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message: "upload successfully"})
})

// product
app.get("/product", async(req,res) => {
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})

// payment get way
console.log(process.env.STRIPE_SECRET_KEY)

  
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session", async(req,res) => {
    console.log(req.body)

    try{
    const params ={
           submit_type : 'pay',
           mode: "payment",
           payment_method_types: ['card'],
           billing_address_collection: "auto",
           shipping_options: [{shipping_rate:"shr_1NThLkSEuPj3HL3n0GwoFVak"}],
        
           line_items : req.body.map((item) => {
            return{
                price_data: {
                    currency :"inr",
                    product_data: {
                        name: item.name,
                        // images: [item.image]
                    },
                    unit_amount :item.price * 100,
                },
                adjustable_quantity: {
                    enabled : true,
                    minimum: 1,
                },
                quantity: item.qty
               }
           }),

           success_url : `${process.env.FRONTEND_URL}/success`,
           cancel_url : `${process.env.FRONTEND_URL}/cancel`,
    }
    
    const session = await stripe.checkout.sessions.create(params)
    console.log(session)
   
    res.status(200).json(session.id)
    } catch(err){
        res.status(err.statusCode || 500).json(err.message)
    }
})


app.listen(PORT , () =>console.log("server is running at port : "+ PORT))
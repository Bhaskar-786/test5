const express =  require('express')

const router = express.Router();
const User = require('../Models/User')
const {body , validationResult} = require('express-validator') 
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const jwtSecret = "iSaP0qrnxvJUUfILtfUPp4bLzmf6apXr";
router.post("/createuser", 
[
   body('naam').isLength({min:3}),
  body('email').isEmail(),
  body('password').isLength({min:5})
],
async(req, res)=>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
     
      return res.status(400).json({errors:errors.array()});
    } 
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password ,salt )
       
      try{
        const { naam, email, password, location } = req.body;
        await User.create({
        naam:naam,
        password:secPassword,
        email:email,
        location:location
         })
       return  res.json({success:true});
      }catch(error)
      {
         console.log(error);
         return res.json({success:false});
      }
    
}) 

router.post("/loginuser", [
   
 body('email').isEmail(),
 body('password' , 'Incorrect Password').isLength({min:5})
 
],
 
async(req, res)=>{
  const errors = validationResult(req);
    
  if(!errors.isEmpty()){
   
    return res.status(400).json({errors:errors.array()});
  }
      try{
       
         var  email = req.body.email;
        
        let userdata = await User.findOne({email});
        if(!userdata)
        {
          return res.status(400).json({errors: "try logging with correct credentials"});
        }

        const pwdCompare  =  await bcrypt.compare(req.body.password , userdata.password)
        if(!pwdCompare)
        {
          return res.status(400).json({errors: "try logging with correct password"});

        }
        
        const data = {
          user:{
            id:userdata.id
          }
        }
        const authToken = jwt.sign(data ,jwtSecret )
         return res.json({success:true , authToken: authToken});
      }catch(error)
      {
         console.log(error);
        return res.json({success:false});
      }
    
}) 


module.exports =  router;
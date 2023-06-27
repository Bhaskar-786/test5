const mongoose = require('mongoose');
const mongoURI='mongodb+srv://hungryme:Bhaskar@cluster0.zk8bybs.mongodb.net/hungryme?retryWrites=true&w=majority'
const mongoDB =async()=>{
 
 mongoose.connect(mongoURI , {useNewUrlParser: true} ,async (err, result)=>{
    if(err) console.log("---" ,err)
    else
    {    console.log("connected");
         const fetched_data =  await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(async function(err,data){
            const foodCategory = await mongoose.connection.db.collection("food_catogry")
           foodCategory.find({}).toArray(function (err , catData){
              
            if(err) 
           {
              console.log(err);
               
           } 
            else
            {
                global.food_items = data;
                global.food_catogry = catData;
                 
            }


           })
           
            // if(err)
            // console.log(err);
            // else
            // {
            //     global.food_items = data;
               
            // }
        })
    }
});
}

module.exports = mongoDB;



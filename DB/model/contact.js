
import mongoose, { Types, Schema, model } from "mongoose";
const AddContactSchema=new Schema({
fullName:{

    type:String,
   required:true
},
Region:{
    type:String,
    required:true

},
city:{  

    type:String,
    required:true

},
fullAddress:{

    type:String,
    required:true   
},
phone:{
    type:String,
    required:true   

},
Notes:{
    type:String,
}



})
const contactModel=model('contact',AddContactSchema)
export {contactModel}
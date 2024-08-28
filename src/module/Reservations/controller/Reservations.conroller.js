
import { contactModel } from "../../../../DB/model/contact.js";

export const AddContact=async(req,res)=>{
const {fullName , Region , city , fullAddress , phone,Notes}=req.body;
try{
const add=await contactModel.create(req.body);
if(!add){

    res.status(400).json({message:"not add "})
}else{

res.status(200).json({message:"succses",add})

}



}catch(error){

    res.status(500).json({message:`error ${error}`})
}

}
export const ShowAll=async(req,res)=>{
try{

const show=await contactModel.find({});
if(!show){

    res.status(404).json({message:"not found "})
}else{
res.status(200).json ({message:"sucsses",show})

  
}

}catch(error){
    res.status(500).json({message:`error ${error}`})

}

}
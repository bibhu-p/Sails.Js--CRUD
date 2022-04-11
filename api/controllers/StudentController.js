/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    Register:async (req, res)=>{

        const data = {
            name:req.body.name,
            roll:req.body.roll,
            branch:req.body.branch,
            gender:req.body.gender,
            age:req.body.age
        }
        try{
            let result=await Student.create(data).fetch();
            if(result){
                return res.status(200).json({success:true, data:result})
            }
        }catch(error){
            console.log(error)
            return res.status(500).json({success:false, message:"Something went wrong."})
        }
    },

    find :async(req,res)=>{

        try{
            let result=await Student.find();
            if(result){
                return res.status(200).json({success:true, data:result})
            }else{
                return res.status(404).json({success:false, message:"No data available."})
            }
        }catch(error){
            console.log(error)
            return res.status(500).json({success:false, message:"Something went wrong."})
        }
    },
    findOne : async(req,res)=>{
        try{
            let result=await Student.find({where:{id : req.params.id},limit:1});
            if(result){
                return res.status(200).json({success:true, data:result})
            }else{
                return res.status(404).json({success:false, message:"Data not found."})
            }
        }catch(error){
            console.log(error)
            return res.status(500).json({success:false, message:"Something went wrong."})
        }
    },
    update : async (req,res)=>{
        try{

            const data = {
                name:req.body.name,
                roll:req.body.roll,
                branch:req.body.branch,
                gender:req.body.gender,
                age:req.body.age
            }

            let result=await Student.updateOne({id : req.params.id}).set(data);
            if(result){
                return res.status(200).json({success:true, data:result})
            }
        }catch(error){
            console.log(error)
            return res.status(500).json({success:false, message:"Something went wrong."})
        }
    },
    delete : async (req,res)=>{
        try{
            let result=await Student.destroyOne({id : req.params.id});
            if(result){
                return res.status(200).json({success:true, data:result})
            }else{
                return res.status(404).json({success:false, message:"Data not found."})
            }
        }catch(error){
            console.log(error)
            return res.status(500).json({success:false, message:"Something went wrong."})
        }
    }
};
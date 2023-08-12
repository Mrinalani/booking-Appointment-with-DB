const User = require('../models/user')

exports.postUserDetails = async(req,res,next)=>{
    //console.log(req)
    //console.log(req.body.name, req.body.email)
    try{

        if(!req.body.phonenumber){
            throw new Error('Phonenumber is Mandatory')
        }
    const name =  req.body.name;
    const email =  req.body.email;
    const phonenumber =  req.body.phonenumber;

    //console.log(name,email)


    const data = await User.create({name:name , email: email,phonenumber:phonenumber });
    res.status(201).json({newUserDetail:data});
    }catch(error){
        res.status(500).json({
            error:error
        })
    }
}

exports.getUserDetails = async(req,res,next)=>{
    try{
    const data = await User.findAll()
    res.status(201).json({retrievedData:data})
    }catch(error){
        res.status(500).json({
            error:error
        })
    }
}

exports.deleteUserDetails =  async(req,res,next)=>{
    try{
   const userId = req.params.userId
   console.log(userId)
   const data = await User.findByPk(userId)
   console.log(data)
   const destroyedData = await data.destroy()
   console.log(destroyedData)
      res.status(201).json({deletedData:destroyedData})
    }catch(error){
        res.status(500).json({
            error:error
        })
    }
    
}
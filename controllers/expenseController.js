const Expense = require('../models/expense')

exports.postExpenseDetails = async(req, res, next)=>{
    try{
    const ProductName = req.body.ProductName;
    const orderId = req.body.orderId;
    const sellingPrice = req.body.sellingPrice;

    const data = await Expense.create( {ProductName:ProductName, orderId:orderId, sellingPrice:sellingPrice} )
    res.status(201).json({newUserDetail:data})
    }catch(error){
        console.error('Error:', error); // Log the error here

        res.status(500).json({
            error: error.message // Return the error message in the response
        });

    }
}

exports.getExpenseDetails = async(req,res,next)=>{
    try{
     const data = await Expense.findAll()
     res.status(201).json({RetrivedData:data})
    }catch(error){
     console.log('error:',error)
     res.status(500).json({
         error:error.message
     })
    }
 }

 exports.deleteExpenseDetail = async(req,res,next)=>{
    try{
    const prodId = req.params.productId;
    const data = await Expense.findByPk(prodId)
    const deletedData = await data.destroy()
    res.status(201).json({deletedProduct:deletedData})
    }catch(error){
        console.log('error:', error)
        res.status(500).json({
            error:error.message
        })
    }
}
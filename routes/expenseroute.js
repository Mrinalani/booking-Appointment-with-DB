const express = require('express');

const ExpenseController = require('../controllers/expenseController')

const router = express.Router();

router.post('/add-expense/product',ExpenseController.postExpenseDetails)

router.get('/get-expense/fromDB', ExpenseController.getExpenseDetails)

 router.delete('/delete-product/fromDB/:productId',ExpenseController.deleteExpenseDetail)


  module.exports = router


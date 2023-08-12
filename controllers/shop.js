const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
   // console.log(products)
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err=>{
    console.log(err)
  })
};

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
// Product.findAll({where: {id:prodId}})
// .then(product=>{
//  // if(product){
//     console.log(product , '.........', product[0])
//     res.render('shop/product-detail', {
//       product: product[0],
//       pageTitle: product.title,
//       path: '/products'
//     });
//  // }
// })
// .catch(err => console.log(err))

 
// };

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      if (product) {
        res.render('shop/product-detail', {
          product: product,
          pageTitle: product.title,
          path: '/products'
        });
      } else {
        // Handle the case when the product is not found
        res.redirect('/products'); // For example, redirect to the product list
      }
    })
    .catch(err => {
      console.log(err);
    });
};


exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err =>{
    consolle.log(err)
  })
  
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  
  Product.findByPk(prodId)
  .then(product=>{
    console.log('adding')
    Cart.addProduct(prodId, product.price);
    res.redirect('/cart');
  })
  .catch(err => console.log(err))
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

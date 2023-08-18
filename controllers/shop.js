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
  // console.log(req.user.cart)
  req.user.getCart()
  .then(cart =>{
    console.log(".........",cart)
    console.log(".........","complete")
    console.log("-----------",cart.getProducts)
    console.log("-----------","complete")
    return cart.getProducts()
    .then(products=>{
      console.log("***********",products)
  
        if(products){
      res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products:products
        });
      }
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
  // res.render('shop/cart', {
  //   path: '/cart',
  //   pageTitle: 'Your Cart'
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user.getCart()
  .then(cart =>{
    fetchedCart = cart
    return cart.getProducts({ where: {id:prodId}})
  })
  .then(products =>{
    let product;
    if(products.length>0){
      product = products[0];
    }
    let newQuantity = 1;
    if(product){
      //...
      const oldQuantity = product.cartItem.quantity;
      newQuantity=oldQuantity+1;
      return fetchedCart.addProduct(product, {
        through: {quantity: newQuantity}
      })

    }
    return Product.findByPk(prodId)
    .then(product =>{
      return fetchedCart.addProduct(product, {
        through: {quantity: newQuantity}
      })
    })
    .catch(err => console.log(err))
  })
  .then(()=>{
    res.redirect('/cart')
  })
//   Product.findByPk(prodId)
//   .then(product=>{
//     console.log('adding')
//     Cart.addProduct(prodId, product.price);
//     res.redirect('/cart');
//   })
   .catch(err => console.log(err))
 };

 exports.postCartDeleteProduct = (req,res,next)=>{
  const prodId = req.body.productId;

  req.user.getCart()
  .then(cart =>{
    return cart.getProducts({ where:{id:prodId}})
  })
  .then(products =>{
    const product = products[0];
    return product.cartItem.destroy();
  })
  .then(result =>{
    res.redirect('/cart')
  })
  .catch(err => console.log(err))
 }

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



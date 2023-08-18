const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/database')

const Product = require('./models/product');
const Productuser = require('./models/productuser'); // Corrected filename
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

var cors = require('cors')

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/userroute')
const expenseRoutes = require('./routes/expenseroute');
const User = require('./models/user');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    Productuser.findByPk(1)
    .then(user=>{
        req.user = user;
        console.log(req.user); // Logging req.user
        next();
    })
    .catch(err => console.log(err))
})


app.use(expenseRoutes)
app.use(userRoutes)
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(Productuser,{constraints:true,onDelete:'CASCADE'})
Productuser.hasMany(Product);
Productuser.hasOne(Cart);
Cart.belongsTo(Productuser);
Cart.belongsToMany(Product, {through:CartItem});
Product.belongsToMany(Cart, {through:CartItem});


sequelize.sync()
.then((result) => {
    return Productuser.findByPk(1)       // returning the value by finding 1 id in Productuser
})
.then(user =>{
    if(!user){                          //  if not find id 1 in productuser
        return Productuser.create({ name: "max", email: "test@test"})         // created with id 1
    }
    return user;                        // else returning user of id 1
})
.then(user =>{                         // getting user with id 1
    //console.log(user)                 // consoling user of id 1
   // app.listen(3000)
   return user.createCart();
})
.then(cart =>{
    console.log("$$$$$$$", cart)
    console.log("$$$$$$$     complete")
    
    app.listen(3000)
})
.catch(err => {
    console.error('Error syncing the database:', err);
});

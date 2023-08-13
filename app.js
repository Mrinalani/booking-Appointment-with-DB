const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/database')

var cors = require('cors')

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/userroute')
const expenseRoutes = require('./routes/expenseroute')

// db.execute('SELECT*FROM PRODUCTS')
// .then((result)=>{
//     console.log(result[0], result[1])
// })
// .catch(err=>{
//     console.log(err)
// })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(expenseRoutes)
app.use(userRoutes)
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.
sync()
.then((result)=>{
   // console.log()
    console.log("Received POST request at /user/add-user");

    app.listen(3000);
})
.catch(err => console.log(err))


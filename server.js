const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
const users = require('./backend/routes/api/users');
const app = express();
const path = require('path');

const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

//connect to database
const uri = require("./backend/config/keys").mongoURI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


/*const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongo database connection made!");
});
*/
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./backend/config/passport")(passport);
// Routes
app.use('/api/users', users);

//requiere and use route files
const blanks = require('./backend/routes/api/blanks');
const comissions = require('./backend/routes/api/comission');
const currencies = require('./backend/routes/api/currency');
const customers = require('./backend/routes/api/customer');
const discounts = require('./backend/routes/api/discount');
const payment = require('./backend/routes/api/payment');
const sales = require('./backend/routes/api/sales');

app.use('/api/stock', blanks);
app.use('/api/comission', comissions);
app.use('/api/currency', currencies);
app.use('/api/customers', customers);
app.use('/api/discounts', discounts);
app.use('/api/payment', payment);
app.use('/api/sales', sales);

// Serve static assets if we are in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
//
app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});
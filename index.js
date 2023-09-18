// Create the connection and List of Required
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

//This is the set up for the website
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//Database Connection
mongoose.connect('mongodb://0.0.0.0:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create a user schema and model
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });
  
const User = mongoose.model('User', userSchema);
  
//Check the database connection
const db = mongoose.connection;
db.on('error',() => console.log("Error Connecting"));
const port = process.env.PORT || 3000;

//This is where the route will be defined
app.get('/', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User ({
        username,
        password,
    });

    newUser.save ((err) => {
        if (err) {
           console.error(err);
           res.redirect('/');
        }else {
            res.redirect('/login')
        }
    })
})

app.listen(port,() =>{
    console.log(`Database is connected to port ${port}`)
})
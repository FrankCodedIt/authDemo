const express = require('express');
const app = express();
const User = require('./models/user');
const { default: mongoose } = require('mongoose'); 
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/authDemo')
    .then(() =>{
        console.log("Mongo Connection Open!!!")
    })
    .catch(error => {
        console.log("Oh no Mongo Connection Error!!!")
        console.log(error)
    })

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("This is the home page.")
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) =>{
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    })
    console.log(user);
    await user.save();
    res.redirect('/')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    //const user = await User.findOne({ username })
})

app.get('/secret', (req, res) => {
    res.send('This is secret! You cannot see me unless you are logged in!')
})

app.listen(3000, () => {
    console.log("Serving your app!")
})
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")
const User = require("./model_user/users")
const booksDB = require("./models")
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;


//express
const app = express();


//mongoDB
const usersDB = 'mongodb+srv://sxnmit:{password}cluster0.e7mnhbm.mongodb.net/usersDB?retryWrites=true&w=majority&appName=Cluster0'


mongoose
  .connect(usersDB, {
  })
  .then(() => {
    app.listen(3001, () => {
      console.log('Server connected to port 3001 and MongoDB')
    })
  })
  .catch((error) => {
    console.log('Unable to connect to Server and/or MongoDB', error)
  })


//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//Routes


//register user
app.post('/register', async (req, res) => {
  try {
    const { userType, email, password, account } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ userType, email, password: hashedPassword, account })
    await newUser.save()
    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Error signing up', details: error.message })
  }
})

//get employees
app.get('/register', async (req, res) => {
  try {
    const users = await User.find({
      $or: [{ userType: "Admin" }, { userType: "Employee" }]
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Unable to get users", details: error.message });
  }
});


//remove users
app.post('/remove', async (req, res) => {
  try {
    const { userType, email, name } = req.body;

    const result = await User.deleteOne({
      userType: userType,
      email: email,
      'account.name': name
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing user', details: error.message });
  }
});


//attempting login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(401).json({ error: "Invalid Login credentials" })
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      return res.status(401).json({ error: "Invalid Password" })
    }
    const token = jwt.sign({ userId: user._id, userType: user.userType }, SECRET_KEY, { expiresIn: "1hr" })
    res.json(token)
  }
  catch (error) {
    res.status(500).json({ error: "Error logging in" })
  }
})


//sequelize and booksRouter

const booksRouter = require('./routes/collection');
app.use('/books', booksRouter);



booksDB.sequelize.sync().then(() => {
  app.listen(3002, () => {
    console.log("Books backend db running on port 3002");
  })
});

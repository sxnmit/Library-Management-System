const mongoose = require('mongoose')
const user = new mongoose.Schema({
  userType: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  account: {
    name: { type: String, required: true },
    birthday:{type:Date},
    verified: { type: Boolean, required: true },
    booksLeased: {
      bookId: { type: Number },
      returnDate: { type: Date },
      overdueBooks: { type: Number }
    }
  }
})

const User = mongoose.model('User', user)

module.exports = User;
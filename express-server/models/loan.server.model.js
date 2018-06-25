var mongoose = require('mongoose');

var LoanSchema = new mongoose.Schema({
  name: String,
  days: Number,
  book: 
  {
    isbn: String,
    title: String,
    author: String,
    language: String,
    editorial: String,
    state: String,
    description: String,
    status: { type: String, default: "Activate" },
    releaseDate: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    deletedAt: Date
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  deletedAt: Date
});

module.exports = mongoose.model('Loan', LoanSchema);
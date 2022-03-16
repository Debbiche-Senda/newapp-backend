const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  bankAccount: String,
  salary: String,
  companyName: String
});

module.exports = mongoose.model('Company', companySchema);

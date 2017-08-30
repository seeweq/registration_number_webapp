var mongoose = require('mongoose');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/myRegNumbers"
mongoose.connect(mongoURL, {
useMongoClient: true
});


exports.Registration = mongoose.model('Registration', {
  regNum : String

})

var mongoose = require('mongoose');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/myRegNumbers"
mongoose.connect(mongoURL, {
useMongoClient: true
});
mongoose.connection.on("error", function(err){
 console.log(err);
});

exports.Registration = mongoose.model('Registration', {
  regNum : String

})

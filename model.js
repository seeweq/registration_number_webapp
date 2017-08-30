var mongoose = require('mongoose');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/myRegNumbers"
mongoose.connect(mongoURL, {
useMongoClient: true
});


exports.Registration = mongoose.model('Registration', {
  regNum : String

})

  // var enteredRegNumber = req.body.addRegNumber;
  // models.Registration.findOne({
  //   regNum: enteredRegNumber
  // }, function(err, result) {
  //   if (err) {
  //     console.log(err);
  //   } else if (result) {
  //     res.render('index', {message: 'This registration number already exists'});
  //   } else {
  //     models.Registration.create({
  //       regNum: enteredRegNumber
  //     }, function(err) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('saved');
  //         res.render('index',
  //         {numberPlates: regNum})
  //       }
  //       }
  //     });

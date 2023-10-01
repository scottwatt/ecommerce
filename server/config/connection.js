const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

mongoose.connect('mongodb://localhost:27017/ecommerce' , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;

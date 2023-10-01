const mongoose = require('mongoose');
const db = require('./connection.js'); // this assumes you're connecting to MongoDB in connection.js

async function unseed() {
  await mongoose.connection.dropDatabase();
  console.log("Database cleared!");
  process.exit(0);
}

unseed();

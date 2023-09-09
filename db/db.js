const mongoose = require('mongoose');

const MONGOURI = 'mongodb+srv://patrickfengsr:patrickfengsr@cluster0.z0iz4hy.mongodb.net/test?retryWrites=true&w=majority';

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database!');
  } catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports = InitiateMongoServer;

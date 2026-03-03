const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_CONNECTION_URL)
    .then(() => {
      console.log(`Database has been Connected successfully.`);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = dbConnect;

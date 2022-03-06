import mongoose from "mongoose";

const { DATABASE_URL } = process.env;

const dbConnect = () => {
  // connecting to the database mongodb
  mongoose.connect(DATABASE_URL)
    .then((result) => {
      console.log("App is running ... \n");
    })
    .catch((error) => {
      console.error("App starting error:", error.message);
      process.exit(1);
    });
}

export default dbConnect;
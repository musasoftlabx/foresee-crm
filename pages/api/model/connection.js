// Import libraries
process.env.TZ = "Africa/Nairobi";
import mongoose from "mongoose";
const schema = mongoose.Schema;

// Connect to Database
mongoose
  .connect(process.env.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB Connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });

export { mongoose, schema };

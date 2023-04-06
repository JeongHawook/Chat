import mongoose from 'mongoose';
import colors , { cyan} from "colors";


const connectDB = async () => {
  try {

    const conn = await mongoose.connect(process.env.MONGO_URL);
 console.log(colors.green.bold(`MongoDB Connected: ${conn.connection.host}`));
  } catch (err) {
     console.log(colors.red.bold(`Error: ${err.message}`));
    process.exit(1);
  }
};

export default connectDB;

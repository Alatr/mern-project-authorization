import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import mongoose from 'mongoose';
// import router from './router/index.js';
// import errorMiddleware from './middlewares/error-middleware.js';

const PORT = process.env.PORT || 5000;
const app = express();

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors());
// app.use('/api', router);
// app.use(errorMiddleware);

// mongoose.connection.on('connected', () => {
//   console.log('Mongoose is connected!!!!');
// });
const start = async () => {
  try {
    // await mongoose.connect(process.env.DB_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    app.listen(PORT, () =>
      console.log(`Server started on PORT: ${PORT} http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(`Start error: ${error}`);
  }
};

start();

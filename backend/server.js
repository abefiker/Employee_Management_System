const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { errorHandler, notfound } = require('./middlerware/errorHandler');
dotenv.config();
const connectDb = require('./config/connectDb');
const app = express();
const userRoutes = require('./route/userRoutes');
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
connectDb();
app.get('/', (req, res) => {
  res.send('hello am from backend');
});
app.use('/api/users', userRoutes);
const port = process.env.PORT || 8088;
app.use(notfound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

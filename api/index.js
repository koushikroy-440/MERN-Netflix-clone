const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// routers
const authRouter = require('./routes/auth');
const userRoute = require('./routes/users');
const movieRoute = require('./routes/movies');
const listsRouter = require('./routes/lists');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('DB connected Successfull!'))
    .catch((err) => console.log(err));
app.use(express.json());

//middlware
app.use('/api/auth', authRouter);
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/lists', listsRouter);

app.listen(8800, () => {
    console.log("backend server is running!");
});
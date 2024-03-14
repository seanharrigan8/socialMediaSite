const express = require('express');
const connectDB = require('./config/connection');
const dotenv = require('dotenv');
const routes = require('./routes');



const PORT = process.env.PORT || 5000;

const app = express();

//middleware
connectDB();
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
// Define the routes
// app.use('/api', apiRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/thoughts', thoughtRoutes);

app.use(routes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



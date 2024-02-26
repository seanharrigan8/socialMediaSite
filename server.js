const express = require('express');
const connectDB = require('./config/connection');
const apiRoutes = require('./routes/apiRoutes');
const { connect } = require('mongoose');

const app = express();

const userRoutes = require('./routes/user-routes');
const thoughtRoutes = require('./routes/thought-routes');

//middleware
connectDB();
app.use(express.json({ extended: false }));

// Define the routes
app.use('/api', apiRoutes);
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



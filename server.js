const express = require('express');
const connectDB = require('./config/connection');
const apiRoutes = require('./routes/apiRoutes');
const { connect } = require('mongoose');

const app = express();

connectDB();
app.use(express.json({ extended: false }));

// Define the routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



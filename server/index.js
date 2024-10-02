const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const documentRouter = require('./routes/documentRoutes');
const suspectRouter = require('./routes/suspectRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/api/documents',documentRouter);
app.use('/api/suspects',suspectRouter);
app.use('/public', express.static(path.join(__dirname, 'public')));


mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Murder Mystery API' });
});

// Port from environment or default
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
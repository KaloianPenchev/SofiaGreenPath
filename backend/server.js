const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database.js');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const feedbackRoutes = require('./routes/feedbackRoutes.js');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/feedback', feedbackRoutes); 

sequelize.sync()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.error('Database connection failed:', error));

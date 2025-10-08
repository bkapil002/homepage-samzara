const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const setupCluster = require('./config/cluster');
const cookieParser = require('cookie-parser');
const user = require('./Route/user')
const authenticateToken  = require('./middleware/auth')
const app = express();
const postRoutes = require('./Route/postRoutes')


app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : 'http://localhost:5173',
  credentials: true
}));


app.use(cookieParser());
app.use(express.json());


process.on('SIGINT', async () => {
  console.log('Shutting down the server...');
  await mongoose.connection.close();
  console.log('MongoDB connection closed.');
  process.exit(0);
});


function validateEnvVars() {
  if (!process.env.MONGO) {
    throw new Error('MONGO is not defined in the environment');
  }
  if (!process.env.PORT) {
    throw new Error('PORT is not defined in the environment');
  }
}


async function initializeApp() {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      throw new Error('Failed to connect to MongoDB');
    }
   
    app.use('/api/user',user)
    app.use('/api/posts',postRoutes)

    app.get("/api/profile", authenticateToken, (req, res) => {
    res.json({
     message: "This is a protected route",
     user: req.user
    });
   });
    
    app.get('/health', (req, res) => {
      res.json({
        status: 'ok',
        message: 'Server is running',
        pid: process.pid,
      });
    });

    // Start server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} - Worker PID: ${process.pid}`);
      console.log(`Health check available at http://localhost:${PORT}/health`);

    });
  } catch (error) {
    console.error('Initialization error:', error.message);
    process.exit(1);
  }
}

validateEnvVars();
setupCluster(() => {
  initializeApp();
});

module.exports = app;


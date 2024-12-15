const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

const server = express();

server.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
}));
server.use(express.json());

server.use(routes);



server.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next(); 
});

server.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

// async function connectToDatabase() {
//     const uri = process.env.MONGO_URI;
//     if (!uri) {
//         console.error("MongoDB connection URI is not defined in .env file");
//         process.exit(1); // Exit if no URI is provided
//     }
//     try {
//         await mongoose.connect(uri); // No additional options required
//         console.log("DB connected");
//     } catch (error) {
//         console.error("Error connecting to DB:", error);
//     }
// }


// async function connectToDatabase() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("DB connected");
//   } catch (error) {
//     console.error("Error connecting to DB:", error);
//   }
// }

async function connectToDatabase() {
    try {
      await mongoose.connect(process.env.MONGO_URI); // Simply pass the URI without extra options
      console.log("DB connected");
    } catch (error) {
      console.error("Error connecting to DB:", error);
    }
  }
  connectToDatabase();

server.use('/api', routes);

server.use((err, req, res, next) => {
    console.error('Global error handler:', err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing server...');
    await mongoose.connection.close();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing server...');
    await mongoose.connection.close();
    process.exit(0);
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

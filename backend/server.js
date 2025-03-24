import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/mongodb.js';

// Routes
import authRouter from './routes/auth.route.js';
import adminRouter from './routes/admin.route.js';
import tenantRouter from './routes/tenant.route.js';
import roomRouter from './routes/room.route.js';
import leaseRouter from './routes/lease.route.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// MIDDLEWARE
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// ROUTES
app.use('/api/auth', authRouter);
app.use('/api/', adminRouter);
app.use('/api/', tenantRouter);
app.use('/api/', roomRouter);
app.use('/api/', leaseRouter);

app.get('/', (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

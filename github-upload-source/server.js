require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('node:path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = Number(process.env.PORT) || 5000;
const distPath = path.join(__dirname, 'dist');
const missing = ['MONGODB_URI', 'JWT_SECRET'].filter((key) => !process.env[key]);

if (missing.length) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/equipment', require('./routes/equipmentRoutes'));
app.use('/api/borrow', require('./routes/borrowRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

app.use('/api', (req, res) => res.status(404).json({ message: 'API route not found' }));
app.use(express.static(distPath));
app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
app.use(errorHandler);

connectDB()
  .then(() => app.listen(port, () => console.log(`Toolroom server listening on port ${port}`)))
  .catch((error) => {
    console.error('Cannot start server:', error.message);
    process.exit(1);
  });

const mongoose = require('mongoose');

if (process.env.MONGODB_URI) {
  mongoose.connection.on('error', (error) => console.error('MongoDB runtime error:', error.message));
  mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'));
}

mongoose.connection.on('error', (e) => console.error('MongoDB runtime error:', e));
mongoose.connection.on('disconnected', () => console.warn('⚠️ MongoDB disconnected'));

module.exports = async () => {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required');
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`✅ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
};

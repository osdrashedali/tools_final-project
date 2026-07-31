import app from './app.js';
import cors from 'cors';
import connectDB from './src/config/database.js';
import config from './src/config/config.js';


const startServer = async () => {
  try {
    await connectDB();

    const PORT = config.PORT;

    app.get('/', (req, res) => {
      res.send('Server is working fine 🚀 bro ');
    });

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(' Server failed to start:', error.message);
    process.exit(1);
  }
};

startServer();

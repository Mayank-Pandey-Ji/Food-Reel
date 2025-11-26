// server.js
require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

async function start() {
  try {
    // connect DB (wait for it before starting listener)
    if (typeof connectDB === 'function') {
      await connectDB();
      console.log('MongoDB connected');
    } else {
      // if your db module auto-connects on require, it's fine
      console.log('DB module loaded (no connect function).');
    }

    // Render (and most hosts) provide PORT in env — bind to it
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

// Only start when run directly (so importing app for tests or serverless wrappers still works)
if (require.main === module) {
  start();
}

// export app for other uses (serverless wrappers, tests)
module.exports = app;

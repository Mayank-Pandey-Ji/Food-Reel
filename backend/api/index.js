// api/index.js
// Vercel will treat this as the /api entrypoint.
// It wraps your existing Express app with serverless-http.

const serverless = require('serverless-http');
const app = require('../src/app');      // your exported express app
const connectDB = require('../src/db/db'); // your DB connect function

// Ensure DB is connected on cold-start.
// If connectDB returns a promise, call it once and keep the promise.
let dbPromise = null;
if (typeof connectDB === 'function') {
  dbPromise = connectDB().catch(err => {
    console.error('DB connection failed during cold start:', err);
  });
} else {
  // If your db module connects on require, just require it (force side effects)
  try { require('../src/db/db'); } catch (e) { /* ignore */ }
}

module.exports = async (req, res) => {
  // wait for DB connect if it is still initialising (optional)
  if (dbPromise) {
    try { await dbPromise; } catch { /* ignore, logged above */ }
  }
  // delegate to serverless handler
  return serverless(app)(req, res);
};

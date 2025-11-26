// start server 
require('dotenv').config();
const app = require('./src/app');
const connecDB = require('./src/db/db')

connecDB();


// not to use app.listen here as we are using verel for deployment which is serverless
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

module.exports = app;
// start server 
require('dotenv').config();
const app = require('./src/app');
const connecDB = require('./src/db/db')

await connectDB();

if(process.env.NODE_ENV !== "production")
{
    const PORT = process.env.PORT || 5000;
    server.listen(PORT , ()=> console.log("Server is Running on PORT: ", PORT));
}

// export server for vercel
export default server;
// create server

const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route')
const foodRoutes = require('./routes/food.route')
const foodPartnerRoutes = require('./routes/food-partner.route')
const app = express();
const cors = require('cors');
app.use(cors({
  origin: (origin, cb) => {
    const allowed = "https://food-reel-five.vercel.app";
    if (!origin) return cb(null, true);
    const clean = origin.replace(/\/+$/, "");
    if (clean === allowed) return cb(null, true);
    cb(new Error("CORS blocked: " + origin));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With','Accept']
}));


app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');       
});

app.use('/api/auth' , authRoutes);
app.use('/api/food' , foodRoutes);

app.use('/api/food-partner' , foodPartnerRoutes);

module.exports = app;

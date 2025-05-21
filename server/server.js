const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth/auth-routes');

const adminProductRoutes = require('./routes/admin/products-routes');
const productRoutes = require('./routes/shop/shop-routes');


mongoose.connect('mongodb+srv://dismatest:dismatest@cluster-mean-shop.amad1.mongodb.net/').then(() => console.log('Connected to MongoDB')).catch(error => console.log(error));
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:[
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials: true
}));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/admin/products', adminProductRoutes);
app.use('/api/shop/products', productRoutes);

app.listen(PORT, ()=>(console.log(`Server running on port ${PORT}`)));
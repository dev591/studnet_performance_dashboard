const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS — allow all origins for class project
app.use(cors({ origin: true, credentials: true }));

// Extra safety — manually set CORS headers on every response
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

app.use(express.json({ limit: '10mb' })); // 10mb for base64 certificate uploads

// Health check — Railway uses this
app.get('/', (req, res) => {
    res.json({ status: 'EduDash API running', version: '1.0.0' });
});

// Mount Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/goals', require('./routes/goals'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/teacher', require('./routes/teacher'));
app.use('/api/announcements', require('./routes/announcements'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`EduDash API running on port ${PORT}`);
});

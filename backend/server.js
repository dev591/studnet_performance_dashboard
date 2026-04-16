const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS — allow all frontend origins
app.use(cors({
    origin: true,  // allow all origins for class project
    credentials: true
}));

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

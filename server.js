const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const router = require('./routes/index.js');

const app = express();

// API Rate Limiting
const limiter = rateLimit({
    windowMS: 10 * 60 * 1000, // 10 minutes
    max: 50
});
app.use(limiter);
app.set('trust proxy', 1);

// Enable CORS
app.use(cors());

app.use(express.static('./public'));

// API Connection
app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
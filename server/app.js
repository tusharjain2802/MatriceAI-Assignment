const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const projectRoutes = require('./routes/projectRoutes')
const taskRoutes = require('./routes/taskRoutes');
const deadlineRoutes = require('./routes/deadlineRoutes');

require('dotenv').config();

const app = express();

connectDB();

const allowedOrigins = [
    'http://localhost:5173',
    'https://matriceai-assignment-6dnd.onrender.com/'
];

app.use(cors());

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/deadlines', deadlineRoutes);

app.get('/', async (req, res) => {
    res.send('Welcome to Matrice.ai');
});

app.listen(process.env.PORT || 5000, function () {
    console.log(`Server started on port ${process.env.PORT || 5000}`);
});
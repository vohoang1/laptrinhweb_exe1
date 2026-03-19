const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Phục vụ giao diện (HTML/CSS/JS) từ thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// Cấu hình Connection Pool cho MySQL với retry logic
let pool;
const initDB = async () => {
    let retries = 5;
    while(retries) {
        try {
            pool = mysql.createPool({
                host: process.env.DB_HOST || 'db',
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASSWORD || 'root',
                database: process.env.DB_NAME || 'laptrinhweb',
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
            // Test connection
            await pool.query('SELECT 1');
            console.log('✅ Connected to MySQL Database laptrinhweb successfully!');
            break;
        } catch (err) {
            console.log('⏳ MySQL is not ready yet. Retrying in 5 seconds...', retries, 'retries left.');
            retries -= 1;
            await new Promise(res => setTimeout(res, 5000));
            if(retries === 0) {
                console.error('❌ Could not connect to MySQL:', err);
            }
        }
    }
};

initDB();

// API endpoint lấy danh sách users (Lab 04 Backend)
app.get('/api/users', async (req, res) => {
    try {
        if (!pool) return res.status(500).json({ error: 'Database connection not established' });
        const [rows] = await pool.query('SELECT user_id, user_name, user_email FROM users ORDER BY user_id ASC');
        res.json(rows);
    } catch (error) {
        console.error('Lỗi truy vấn DB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`🚀 Node.js Backend Server is running at http://localhost:${port}`);
});

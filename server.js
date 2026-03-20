const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');

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
                pool = null;
            }
        }
    }
};

// Middleware xác thực bảo vệ API
const checkAuth = (req, res, next) => {
    const username = req.header('x-username');
    if (!username) return res.status(401).json({ error: 'Unauthorized: Vui lòng đăng nhập' });
    next();
};

// API endpoint lấy danh sách users (Lab 04 Backend)
app.get('/api/users', checkAuth, async (req, res) => {
    try {
        if (!pool) return res.status(500).json({ error: 'Database connection not established' });
        
        const q = req.query.q || 'default';
        let sql = 'SELECT user_id, user_name, user_email, created_at FROM users ORDER BY user_id ASC';
        
        if (q === 'a1') sql = 'SELECT * FROM users ORDER BY user_name ASC';
        else if (q === 'a2') sql = 'SELECT * FROM users ORDER BY user_name ASC LIMIT 7';
        else if (q === 'a3') sql = "SELECT * FROM users WHERE user_name LIKE '%a%' ORDER BY user_name ASC";
        else if (q === 'a4') sql = "SELECT * FROM users WHERE user_name LIKE 'm%'";
        else if (q === 'a5') sql = "SELECT * FROM users WHERE user_name LIKE '%i'";
        else if (q === 'a6') sql = "SELECT * FROM users WHERE user_email LIKE '%@gmail.com'";
        else if (q === 'a7') sql = "SELECT * FROM users WHERE user_email LIKE '%@gmail.com' AND user_name LIKE 'm%'";
        else if (q === 'a8') sql = "SELECT * FROM users WHERE user_email LIKE '%@gmail.com' AND user_name LIKE '%i%' AND LENGTH(user_name) > 5";
        else if (q === 'a9') sql = "SELECT * FROM users WHERE user_name LIKE '%a%' AND LENGTH(user_name) BETWEEN 5 AND 9 AND user_email LIKE '%@gmail.com' AND SUBSTRING_INDEX(user_email, '@', 1) LIKE '%i%'";
        else if (q === 'a10') sql = "SELECT * FROM users WHERE (user_name LIKE '%a%' AND LENGTH(user_name) BETWEEN 5 AND 9) OR (user_name LIKE '%i%' AND LENGTH(user_name) < 9) OR (user_email LIKE '%@gmail.com' AND SUBSTRING_INDEX(user_email, '@', 1) LIKE '%i%')";
        
        const [rows] = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        console.error('Lỗi truy vấn DB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint đăng ký người dùng mới
app.post('/api/register', async (req, res) => {
    try {
        if (!pool) return res.status(500).json({ error: 'Database connection not established' });
        
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
        }
        
        try {
            // Hash mật khẩu trước khi lưu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Lưu vào database
            const [result] = await pool.query(
                'INSERT INTO users (user_name, user_email, user_pass) VALUES (?, ?, ?)',
                [username, email, hashedPassword]
            );
            res.status(201).json({ message: 'Đăng ký thành công', userId: result.insertId });
        } catch (dbError) {
            // Bắt lỗi trùng lặp (Race condition) trực tiếp từ database
            if (dbError.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Email này đã được sử dụng' });
            }
            throw dbError; // Đẩy các lỗi khác ra catch bên ngoài
        }
    } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        res.status(500).json({ error: 'Lỗi server khi đăng ký' });
    }
});

// API endpoint đăng nhập
app.post('/api/login', async (req, res) => {
    try {
        if (!pool) return res.status(500).json({ error: 'Database connection not established' });
        
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ error: 'Vui lòng nhập tên đăng nhập và mật khẩu' });
        }
        
        const [users] = await pool.query(
            'SELECT * FROM users WHERE user_name = ?', 
            [username]
        );
        
        if (users.length > 0) {
            const isMatch = await bcrypt.compare(password, users[0].user_pass || '');
            if (isMatch) {
                res.json({ message: 'Đăng nhập thành công', user: { id: users[0].user_id, name: users[0].user_name } });
            } else {
                res.status(401).json({ error: 'Sai tên đăng nhập hoặc mật khẩu' });
            }
        } else {
            res.status(401).json({ error: 'Sai tên đăng nhập hoặc mật khẩu' });
        }
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        res.status(500).json({ error: 'Lỗi server khi đăng nhập' });
    }
});

// API endpoint lấy danh sách sản phẩm
app.get('/api/products', checkAuth, async (req, res) => {
    try {
        if (!pool) return res.status(500).json({ error: 'Database connection not established' });
        const [rows] = await pool.query('SELECT * FROM products ORDER BY product_id ASC');
        res.json(rows);
    } catch (error) {
        console.error('Lỗi truy vấn db products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint lấy chi tiết 1 sản phẩm
app.get('/api/products/:id', checkAuth, async (req, res) => {
    try {
        if (!pool) return res.status(500).json({ error: 'Database connection not established' });
        const [rows] = await pool.query('SELECT * FROM products WHERE product_id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Lỗi lấy chi tiết sản phẩm:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint tạo sản phẩm mới
app.post('/api/products', checkAuth, async (req, res) => {
    try {
        const { name, price, description } = req.body;
        if (!name || !price) return res.status(400).json({ error: 'Tên và giá sản phẩm là bắt buộc' });
        const [result] = await pool.query(
            'INSERT INTO products (product_name, product_price, product_description) VALUES (?, ?, ?)',
            [name, price, description || '']
        );
        res.status(201).json({ message: 'Thêm sản phẩm thành công', productId: result.insertId });
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
        res.status(500).json({ error: 'Lỗi server khi thêm sản phẩm' });
    }
});

// API endpoint cập nhật sản phẩm
app.put('/api/products/:id', checkAuth, async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const productId = req.params.id;
        const [result] = await pool.query(
            'UPDATE products SET product_name = ?, product_price = ?, product_description = ? WHERE product_id = ?',
            [name, price, description || '', productId]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Cập nhật sản phẩm thành công' });
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        res.status(500).json({ error: 'Lỗi server khi cập nhật sản phẩm' });
    }
});

// API endpoint xóa sản phẩm
app.delete('/api/products/:id', checkAuth, async (req, res) => {
    try {
        const productId = req.params.id;
        // Kiểm tra xem có đơn hàng nào chứa sản phẩm này không
        const [orders] = await pool.query('SELECT * FROM order_details WHERE product_id = ?', [productId]);
        if (orders.length > 0) {
            return res.status(400).json({ error: 'Không thể xóa sản phẩm đã có trong đơn hàng' });
        }
        const [result] = await pool.query('DELETE FROM products WHERE product_id = ?', [productId]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Xóa sản phẩm thành công' });
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).json({ error: 'Lỗi server khi xóa sản phẩm' });
    }
});

// API endpoint lấy danh sách đơn hàng
app.get('/api/orders', checkAuth, async (req, res) => {
    try {
        if (!pool) return res.status(500).json({ error: 'Database connection not established' });
        
        const q = req.query.q || 'default';
        let sql = `
            SELECT o.order_id, o.created_at, u.user_name, u.user_email,
                   COUNT(od.product_id) as total_items,
                   SUM(p.product_price) as total_price
            FROM orders o
            JOIN users u ON o.user_id = u.user_id
            LEFT JOIN order_details od ON o.order_id = od.order_id
            LEFT JOIN products p ON od.product_id = p.product_id
            GROUP BY o.order_id, o.created_at, u.user_name, u.user_email
            ORDER BY o.order_id DESC
        `;
        
        if (q === 'b1') sql = "SELECT u.user_id, u.user_name, o.order_id FROM orders o JOIN users u ON o.user_id = u.user_id";
        else if (q === 'b2') sql = "SELECT u.user_id, u.user_name, COUNT(o.order_id) AS so_don_hang FROM users u JOIN orders o ON u.user_id = o.user_id GROUP BY u.user_id, u.user_name";
        else if (q === 'b3') sql = "SELECT order_id, COUNT(product_id) AS so_san_pham FROM order_details GROUP BY order_id";
        else if (q === 'b4') sql = "SELECT u.user_id, u.user_name, o.order_id, p.product_name FROM users u JOIN orders o ON u.user_id = o.user_id JOIN order_details od ON o.order_id = od.order_id JOIN products p ON od.product_id = p.product_id ORDER BY o.order_id";
        else if (q === 'b5') sql = "SELECT u.user_id, u.user_name, COUNT(o.order_id) AS so_luong_don_hang FROM users u JOIN orders o ON u.user_id = o.user_id GROUP BY u.user_id, u.user_name ORDER BY so_luong_don_hang DESC LIMIT 7";
        else if (q === 'b6') sql = "SELECT u.user_id, u.user_name, o.order_id, p.product_name FROM users u JOIN orders o ON u.user_id = o.user_id JOIN order_details od ON o.order_id = od.order_id JOIN products p ON od.product_id = p.product_id WHERE p.product_name LIKE '%Samsung%' OR p.product_name LIKE '%Apple%' LIMIT 7";
        else if (q === 'b7') sql = "SELECT u.user_id, u.user_name, o.order_id, SUM(p.product_price) AS tong_tien FROM users u JOIN orders o ON u.user_id = o.user_id JOIN order_details od ON o.order_id = od.order_id JOIN products p ON od.product_id = p.product_id GROUP BY u.user_id, u.user_name, o.order_id";
        else if (q === 'b8') sql = "WITH OrderTotals AS ( SELECT u.user_id, u.user_name, o.order_id, SUM(p.product_price) AS tong_tien FROM users u JOIN orders o ON u.user_id = o.user_id JOIN order_details od ON o.order_id = od.order_id JOIN products p ON od.product_id = p.product_id GROUP BY u.user_id, u.user_name, o.order_id ), RankedOrders AS ( SELECT user_id, user_name, order_id, tong_tien, ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY tong_tien DESC) as rn FROM OrderTotals ) SELECT user_id, user_name, order_id, tong_tien FROM RankedOrders WHERE rn = 1";
        else if (q === 'b9') sql = "WITH OrderTotals AS ( SELECT u.user_id, u.user_name, o.order_id, SUM(p.product_price) AS tong_tien, COUNT(od.product_id) AS so_san_pham FROM users u JOIN orders o ON u.user_id = o.user_id JOIN order_details od ON o.order_id = od.order_id JOIN products p ON od.product_id = p.product_id GROUP BY u.user_id, u.user_name, o.order_id ), RankedOrders AS ( SELECT user_id, user_name, order_id, tong_tien, so_san_pham, ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY tong_tien ASC) as rn FROM OrderTotals ) SELECT user_id, user_name, order_id, tong_tien, so_san_pham FROM RankedOrders WHERE rn = 1";
        else if (q === 'b10') sql = "WITH OrderTotals AS ( SELECT u.user_id, u.user_name, o.order_id, SUM(p.product_price) AS tong_tien, COUNT(od.product_id) AS so_san_pham FROM users u JOIN orders o ON u.user_id = o.user_id JOIN order_details od ON o.order_id = od.order_id JOIN products p ON od.product_id = p.product_id GROUP BY u.user_id, u.user_name, o.order_id ), RankedOrders AS ( SELECT user_id, user_name, order_id, tong_tien, so_san_pham, ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY so_san_pham DESC) as rn FROM OrderTotals ) SELECT user_id, user_name, order_id, tong_tien, so_san_pham FROM RankedOrders WHERE rn = 1";
        
        const [rows] = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        console.error('Lỗi truy vấn db orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ==================== CUSTOMER (USER) CRUD API ====================

// API endpoint lấy danh sách khách hàng (không yêu cầu auth cho mục đích demo)
app.get('/api/customers', async (req, res) => {
    try {
        if (!pool) return res.status(500).json({ error: 'Database connection not established' });
        const [rows] = await pool.query('SELECT user_id, user_name, user_email, created_at, updated_at FROM users ORDER BY user_id ASC');
        res.json(rows);
    } catch (error) {
        console.error('Lỗi truy vấn db customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint lấy thông tin 1 khách hàng theo ID (Hỗ trợ cả route users cho view.html)
app.get(['/api/customers/:id', '/api/users/:id'], async (req, res) => {
    try {
        if (!pool) return res.status(500).json({ error: 'Database connection not established' });
        const customerId = req.params.id;
        const [rows] = await pool.query('SELECT user_id, user_name, user_email, created_at, updated_at FROM users WHERE user_id = ?', [customerId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Lỗi truy vấn customer detail:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint tạo khách hàng mới
app.post('/api/customers', async (req, res) => {
    try {
        if (!pool) return res.status(500).json({ error: 'Database connection not established' });

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin (username, email, password)' });
        }

        try {
            // Hash mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Lưu vào database
            const [result] = await pool.query(
                'INSERT INTO users (user_name, user_email, user_pass) VALUES (?, ?, ?)',
                [username, email, hashedPassword]
            );
            res.status(201).json({
                message: 'Thêm khách hàng thành công',
                userId: result.insertId,
                username,
                email
            });
        } catch (dbError) {
            if (dbError.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Email này đã được sử dụng' });
            }
            throw dbError;
        }
    } catch (error) {
        console.error('Lỗi khi tạo khách hàng:', error);
        res.status(500).json({ error: 'Lỗi server khi tạo khách hàng' });
    }
});

// API endpoint cập nhật khách hàng (Hỗ trợ cả route users cho update.html)
app.put(['/api/customers/:id', '/api/users/:id'], async (req, res) => {
    try {
        if (!pool) return res.status(500).json({ error: 'Database connection not established' });

        const customerId = req.params.id;
        const { username, email, password } = req.body;

        // Kiểm tra customer tồn tại
        const [existing] = await pool.query('SELECT user_id FROM users WHERE user_id = ?', [customerId]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Kiểm tra email trùng (nếu có thay đổi)
        if (email) {
            const [emailExists] = await pool.query('SELECT user_id FROM users WHERE user_email = ? AND user_id != ?', [email, customerId]);
            if (emailExists.length > 0) {
                return res.status(400).json({ error: 'Email này đã được sử dụng' });
            }
        }

        // Cập nhật thông tin
        let updateFields = [];
        let updateValues = [];

        if (username) {
            updateFields.push('user_name = ?');
            updateValues.push(username);
        }
        if (email) {
            updateFields.push('user_email = ?');
            updateValues.push(email);
        }
        if (password) {
            updateFields.push('user_pass = ?');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateValues.push(hashedPassword);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ error: 'Không có thông tin nào để cập nhật' });
        }

        updateValues.push(customerId);
        const sql = `UPDATE users SET ${updateFields.join(', ')} WHERE user_id = ?`;
        await pool.query(sql, updateValues);

        res.json({ message: 'Cập nhật khách hàng thành công' });
    } catch (error) {
        console.error('Lỗi khi cập nhật khách hàng:', error);
        res.status(500).json({ error: 'Lỗi server khi cập nhật khách hàng' });
    }
});

// API endpoint xóa khách hàng
app.delete(['/api/customers/:id', '/api/users/:id'], async (req, res) => {
    try {
        if (!pool) return res.status(500).json({ error: 'Database connection not established' });

        const customerId = req.params.id;

        // Kiểm tra customer tồn tại
        const [existing] = await pool.query('SELECT user_id FROM users WHERE user_id = ?', [customerId]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            // Xóa các order_details liên quan (trong order_details có foreign key đến orders)
            await connection.query('DELETE FROM order_details WHERE order_id IN (SELECT order_id FROM orders WHERE user_id = ?)', [customerId]);
            // Xóa các orders của customer này trước (do foreign key constraint)
            await connection.query('DELETE FROM orders WHERE user_id = ?', [customerId]);
            // Xóa customer
            await connection.query('DELETE FROM users WHERE user_id = ?', [customerId]);
            await connection.commit();
            res.json({ message: 'Xóa khách hàng thành công' });
        } catch (txnError) {
            await connection.rollback();
            throw txnError;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Lỗi khi xóa khách hàng:', error);
        res.status(500).json({ error: 'Lỗi server khi xóa khách hàng' });
    }
});

// Khởi động DB trước, sau đó mới mở port HTTP
initDB().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Node.js Backend Server is running at http://localhost:${port}`);
    });
});

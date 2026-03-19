<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Danh sách người dùng | Lập trình Web @01/2024</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .page-title {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .page-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--accent-light), #58a6ff);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: #fff;
        }
        
        .page-title h2 {
            font-size: 1.75rem;
            font-weight: 700;
            margin: 0;
        }
        
        .page-subtitle {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-top: 0.25rem;
        }
        
        .btn-add {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
            color: #fff;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            transition: var(--transition);
        }
        
        .btn-add:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(35, 134, 54, 0.4);
        }
        
        .search-bar {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
        }
        
        .search-input {
            flex: 1;
            min-width: 250px;
            padding: 0.75rem 1.25rem;
            padding-left: 3rem;
            background: rgba(13, 17, 23, 0.8);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            color: var(--text-primary);
            font-family: inherit;
            font-size: 1rem;
            transition: var(--transition);
        }
        
        .search-input:focus {
            outline: none;
            border-color: var(--link-color);
            box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.15);
        }
        
        .search-wrapper {
            position: relative;
            flex: 1;
            min-width: 250px;
        }
        
        .search-icon {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-secondary);
        }
        
        .filter-select {
            padding: 0.75rem 1.25rem;
            background: rgba(13, 17, 23, 0.8);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            color: var(--text-primary);
            font-family: inherit;
            font-size: 1rem;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .filter-select:focus {
            outline: none;
            border-color: var(--link-color);
        }
        
        .table-container {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            overflow: hidden;
            margin-bottom: 1.5rem;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        thead {
            background: rgba(255, 255, 255, 0.03);
        }
        
        th {
            padding: 1.25rem;
            text-align: left;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-secondary);
            border-bottom: 1px solid var(--border-color);
        }
        
        td {
            padding: 1rem 1.25rem;
            border-bottom: 1px solid var(--border-color);
            transition: var(--transition);
        }
        
        tbody tr {
            transition: var(--transition);
        }
        
        tbody tr:hover {
            background: rgba(255, 255, 255, 0.03);
        }
        
        .user-cell {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .user-avatar {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #f093fb, #f5576c);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1rem;
            color: #fff;
            flex-shrink: 0;
        }
        
        .user-info {
            display: flex;
            flex-direction: column;
        }
        
        .user-name {
            font-weight: 600;
            color: var(--text-primary);
        }
        
        .user-email {
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin-top: 0.15rem;
        }
        
        .user-id {
            font-family: 'Courier New', monospace;
            background: rgba(255, 255, 255, 0.05);
            padding: 0.25rem 0.75rem;
            border-radius: 6px;
            font-size: 0.85rem;
            color: var(--text-secondary);
        }
        
        .action-buttons {
            display: flex;
            gap: 0.5rem;
        }
        
        .action-btn {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: var(--transition);
            text-decoration: none;
        }
        
        .action-btn.view {
            background: rgba(88, 166, 255, 0.15);
            color: var(--link-color);
        }
        
        .action-btn.view:hover {
            background: var(--link-color);
            color: #fff;
            transform: scale(1.1);
        }
        
        .action-btn.edit {
            background: rgba(46, 160, 67, 0.15);
            color: var(--accent-light);
        }
        
        .action-btn.edit:hover {
            background: var(--accent-light);
            color: #fff;
            transform: scale(1.1);
        }
        
        .action-btn.delete {
            background: rgba(248, 81, 73, 0.15);
            color: var(--danger-color);
        }
        
        .action-btn.delete:hover {
            background: var(--danger-color);
            color: #fff;
            transform: scale(1.1);
        }
        
        .pagination {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .pagination-info {
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        
        .pagination-controls {
            display: flex;
            gap: 0.5rem;
        }
        
        .pagination-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 40px;
            height: 40px;
            padding: 0 0.75rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            color: var(--text-primary);
            cursor: pointer;
            transition: var(--transition);
            text-decoration: none;
            font-size: 0.9rem;
        }
        
        .pagination-btn:hover:not(.active):not(:disabled) {
            background: rgba(255, 255, 255, 0.08);
            border-color: var(--link-color);
        }
        
        .pagination-btn.active {
            background: var(--link-color);
            border-color: var(--link-color);
        }
        
        .pagination-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .loading-state {
            text-align: center;
            padding: 4rem 2rem;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid var(--border-color);
            border-top-color: var(--accent-light);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .empty-state {
            text-align: center;
            padding: 4rem 2rem;
        }
        
        .empty-icon {
            font-size: 4rem;
            color: var(--text-secondary);
            opacity: 0.5;
            margin-bottom: 1rem;
        }
        
        .empty-text {
            color: var(--text-secondary);
            font-size: 1.1rem;
        }
        
        .notification {
            position: fixed;
            top: 1rem;
            right: 1rem;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 500;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            background: rgba(35, 134, 54, 0.9);
            color: #fff;
        }
        
        .notification.error {
            background: rgba(248, 81, 73, 0.9);
            color: #fff;
        }
        
        @media (max-width: 768px) {
            .page-header {
                flex-direction: column;
                align-items: flex-start;
            }
            
            table {
                font-size: 0.85rem;
            }
            
            th, td {
                padding: 0.75rem 0.5rem;
            }
            
            .action-buttons {
                flex-direction: column;
                gap: 0.25rem;
            }
            
            .action-btn {
                width: 32px;
                height: 32px;
            }
        }
    </style>
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <i class="fas fa-code"></i> WebDev Lab
            </div>
            <ul class="nav-links">
                <li><a href="index.html"><i class="fas fa-home"></i> Home</a></li>
                <li><a href="login.html"><i class="fas fa-sign-in-alt"></i> Đăng nhập</a></li>
                <li><a href="register.html"><i class="fas fa-user-plus"></i> Đăng ký</a></li>
                <li><a href="list.html" class="active"><i class="fas fa-users"></i> Quản lý</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <div class="glass reveal" style="padding: 2rem;">
            <div class="page-header">
                <div class="page-title">
                    <div class="page-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div>
                        <h2>Danh sách người dùng</h2>
                        <p class="page-subtitle">Quản lý tất cả người dùng trong hệ thống</p>
                    </div>
                </div>
                <a href="register.html" class="btn-add">
                    <i class="fas fa-user-plus"></i> Thêm mới
                </a>
            </div>
            
            <div class="search-bar">
                <div class="search-wrapper">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" class="search-input" placeholder="Tìm kiếm theo tên hoặc email..." id="searchInput">
                </div>
                <select class="filter-select" id="statusFilter">
                    <option value="">Tất cả trạng thái</option>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                </select>
            </div>
            
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Người dùng</th>
                            <th>Email</th>
                            <th>Ngày tạo</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody id="userTableBody">
                        <tr>
                            <td colspan="5" class="loading-state">
                                <div class="loading-spinner"></div>
                                <p>Đang tải dữ liệu...</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="pagination">
                <div class="pagination-info">
                    Hiển thị <span id="showingStart">1</span> - <span id="showingEnd">0</span> của <span id="totalItems">0</span> người dùng
                </div>
                <div class="pagination-controls">
                    <button class="pagination-btn" id="prevBtn" disabled>
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="pagination-btn active">1</button>
                    <button class="pagination-btn" id="nextBtn">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <p><i class="fas fa-code"></i> Lập trình web @01/2024</p>
    </footer>
    
    <div id="notification" class="notification">
        <i class="fas fa-check-circle"></i>
        <span id="notificationMessage">Thành công!</span>
    </div>
    
    <script>
        let allUsers = [];
        let filteredUsers = [];
        const itemsPerPage = 10;
        let currentPage = 1;
        
        document.addEventListener('DOMContentLoaded', async () => {
            await loadUsers();
            
            document.getElementById('searchInput').addEventListener('input', (e) => {
                filterUsers(e.target.value, document.getElementById('statusFilter').value);
            });
            
            document.getElementById('statusFilter').addEventListener('change', (e) => {
                filterUsers(document.getElementById('searchInput').value, e.target.value);
            });
            
            document.getElementById('prevBtn').addEventListener('click', () => changePage(-1));
            document.getElementById('nextBtn').addEventListener('click', () => changePage(1));
        });
        
        async function loadUsers() {
            try {
                const response = await fetch('/api/users');
                if (!response.ok) throw new Error('Không thể tải dữ liệu');
                allUsers = await response.json();
                filteredUsers = [...allUsers];
                renderTable();
                updatePagination();
            } catch (error) {
                console.error('Lỗi:', error);
                showNotification('Không thể tải dữ liệu người dùng', 'error');
                document.getElementById('userTableBody').innerHTML = `
                    <tr>
                        <td colspan="5" class="empty-state">
                            <div class="empty-icon"><i class="fas fa-database"></i></div>
                            <p class="empty-text">Không thể kết nối đến cơ sở dữ liệu</p>
                        </td>
                    </tr>
                `;
            }
        }
        
        function filterUsers(search, status) {
            search = search.toLowerCase().trim();
            filteredUsers = allUsers.filter(user => {
                const matchSearch = !search || 
                    user.user_name.toLowerCase().includes(search) || 
                    user.user_email.toLowerCase().includes(search);
                const matchStatus = !status || true; // Implement status logic if needed
                return matchSearch && matchStatus;
            });
            currentPage = 1;
            renderTable();
            updatePagination();
        }
        
        function renderTable() {
            const tbody = document.getElementById('userTableBody');
            
            if (filteredUsers.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="5" class="empty-state">
                            <div class="empty-icon"><i class="fas fa-user-slash"></i></div>
                            <p class="empty-text">Không tìm thấy người dùng nào</p>
                        </td>
                    </tr>
                `;
                return;
            }
            
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const usersToShow = filteredUsers.slice(start, end);
            
            tbody.innerHTML = usersToShow.map((user, index) => {
                const initial = user.user_name.charAt(0).toUpperCase();
                const date = user.created_at ? new Date(user.created_at).toLocaleDateString('vi-VN') : 'N/A';
                return `
                    <tr style="animation: fadeInUp 0.3s ease forwards; animation-delay: ${index * 0.05}s">
                        <td><span class="user-id">#${user.user_id}</span></td>
                        <td>
                            <div class="user-cell">
                                <div class="user-avatar">${initial}</div>
                                <div class="user-info">
                                    <span class="user-name">${escapeHtml(user.user_name)}</span>
                                </div>
                            </div>
                        </td>
                        <td>${escapeHtml(user.user_email)}</td>
                        <td>${date}</td>
                        <td>
                            <div class="action-buttons">
                                <a href="view.html?id=${user.user_id}" class="action-btn view" title="Xem chi tiết">
                                    <i class="fas fa-eye"></i>
                                </a>
                                <a href="update.html?id=${user.user_id}" class="action-btn edit" title="Chỉnh sửa">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <button class="action-btn delete" onclick="deleteUser(${user.user_id})" title="Xóa">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
            
            document.getElementById('showingStart').textContent = start + 1;
            document.getElementById('showingEnd').textContent = Math.min(end, filteredUsers.length);
            document.getElementById('totalItems').textContent = filteredUsers.length;
        }
        
        function updatePagination() {
            const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages || totalPages === 0;
        }
        
        function changePage(delta) {
            currentPage += delta;
            renderTable();
            updatePagination();
        }
        
        function deleteUser(userId) {
            if (confirm('Bạn có chắc chắn muốn xóa người dùng #' + userId + '?')) {
                // TODO: Implement delete API call
                showNotification('Xóa người dùng thành công!', 'success');
                loadUsers();
            }
        }
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        function showNotification(message, type) {
            const notification = document.getElementById('notification');
            const notificationMessage = document.getElementById('notificationMessage');
            const icon = notification.querySelector('i');
            
            notificationMessage.textContent = message;
            notification.className = 'notification ' + type;
            icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
            
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    </script>
</body>
</html>

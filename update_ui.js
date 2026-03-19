const fs = require('fs');

// 1. UPDATE LIST.HTML
let pathList = 'public/list.html';
if(fs.existsSync(pathList)) {
    let content = fs.readFileSync(pathList, 'utf8');
    
    const searchDiv = '<div class="search-bar">';
    if(!content.includes('querySelect')) {
        content = content.replace(searchDiv, searchDiv + `
                <select id="querySelect" class="search-input" style="flex: 1; min-width: 250px; padding-left: 1rem;">
                    <option value="default">-- Truy vấn mặc định --</option>
                    <option value="a1">1. Tên thứ tự A-Z</option>
                    <option value="a2">2. [Top 7] Tên thứ tự A-Z</option>
                    <option value="a3">3. Tên chứa chữ "a" (A-Z)</option>
                    <option value="a4">4. Tên bắt đầu chữ "m"</option>
                    <option value="a5">5. Tên kết thúc chữ "i"</option>
                    <option value="a6">6. Email là Gmail</option>
                    <option value="a7">7. Email Gmail & Tên bắt đầu "m"</option>
                    <option value="a8">8. Email Gmail, tên có "i", dài >5</option>
                    <option value="a9">9. Tên "a"(5-9), Email Gmail có "i"</option>
                    <option value="a10">10. Truy vấn tổng hợp chữ a/i/Gmail</option>
                </select>`);
    }

    content = content.replace(/<thead>[\s\S]*?<\/thead>/, `<thead id="userTableHead"><tr><th>Đang tải...</th></tr></thead>`);
    
    const scriptContent = `
    <script src="js/auth.js"></script>
    <script>
        let allData = [];
        const querySelect = document.getElementById('querySelect');
        
        async function loadData(q = 'default') {
            try {
                document.getElementById('userTableHead').innerHTML = '<tr><th>Đang tải...</th></tr>';
                document.getElementById('userTableBody').innerHTML = '<tr><td class="empty-state">Đang tải dữ liệu...</td></tr>';
                
                const response = await fetch('/api/users?q=' + q, {
                    headers: { 'x-username': localStorage.getItem('username') || '' }
                });
                if (response.status === 401) { window.location.href = 'login.html'; return; }
                if (!response.ok) throw new Error('Failed');
                
                allData = await response.json();
                renderTable(allData);
            } catch(e) { 
                document.getElementById('userTableBody').innerHTML = '<tr><td>Lỗi tải dữ liệu</td></tr>'; 
            }
        }
        
        document.addEventListener('DOMContentLoaded', () => { 
            loadData(); 
            if(querySelect) querySelect.addEventListener('change', e => loadData(e.target.value));
            const searchInput = document.getElementById('searchInput');
            if(searchInput) {
                searchInput.addEventListener('input', e => {
                    const search = e.target.value.toLowerCase();
                    const filtered = allData.filter(item => 
                        Object.values(item).some(val => String(val).toLowerCase().includes(search))
                    );
                    renderTable(filtered);
                });
            }
        });

        function renderTable(data) {
            const thead = document.getElementById('userTableHead');
            const tbody = document.getElementById('userTableBody');
            
            if (!data || data.length === 0) {
                thead.innerHTML = '<tr><th>Trống</th></tr>';
                tbody.innerHTML = '<tr><td class="empty-state">Không có dữ liệu</td></tr>';
                return;
            }
            
            const keys = Object.keys(data[0]);
            thead.innerHTML = '<tr>' + keys.map(k => '<th>' + k.replace(/_/g, ' ').toUpperCase() + '</th>').join('') + '</tr>';
            
            tbody.innerHTML = data.map((item, index) => {
                let tds = keys.map(k => {
                    let val = item[k] || '';
                    if (k.includes('at')) val = new Date(val).toLocaleDateString('vi-VN');
                    return '<td>' + val + '</td>';
                }).join('');
                return '<tr>' + tds + '</tr>';
            }).join('');
            
            const totalEl = document.getElementById('totalItems');
            if(totalEl) totalEl.textContent = data.length;
            const endEl = document.getElementById('showingEnd');
            if(endEl) endEl.textContent = data.length;
        }
    </script>
</body>`;

    content = content.replace(/<script src="js\/auth\.js"><\/script>[\s\S]*<\/body>/, scriptContent);
    fs.writeFileSync(pathList, content, 'utf8');
}

// 2. UPDATE ORDERS.HTML
let pathOrders = 'public/orders.html';
if(fs.existsSync(pathOrders)) {
    let contentO = fs.readFileSync(pathOrders, 'utf8');
    
    const searchWrapperO = '<div class="search-bar">';
    if(!contentO.includes('querySelect')) {
        contentO = contentO.replace(searchWrapperO, searchWrapperO + `
                <select id="querySelect" class="search-input" style="flex: 1; min-width: 250px; padding-left: 1rem;">
                    <option value="default">-- Truy vấn mặc định --</option>
                    <option value="b1">1. Mã KH, Tên, Mã Đơn</option>
                    <option value="b2">2. Tổng số Đơn hàng/KH</option>
                    <option value="b3">3. Số SP mỗi hóa đơn</option>
                    <option value="b4">4. Chi tiết mua hàng/Đơn</option>
                    <option value="b5">5. Top 7 người nhiều Đơn nhất</option>
                    <option value="b6">6. Top 7 mua Samsung/Apple</option>
                    <option value="b7">7. Tổng tiền từng hóa đơn</option>
                    <option value="b8">8. Hóa đơn giá CAO NHẤT/KH</option>
                    <option value="b9">9. Hóa đơn giá THẤP NHẤT/KH</option>
                    <option value="b10">10. Hóa đơn NHIỀU SP nhất/KH</option>
                </select>`);
    }

    contentO = contentO.replace(/<thead>[\s\S]*?<\/thead>/, `<thead id="userTableHead"><tr><th>Đang tải...</th></tr></thead>`);
    const scriptContentO = `
    <script src="js/auth.js"></script>
    <script>
        let allData = [];
        const querySelect = document.getElementById('querySelect');
        
        async function loadData(q = 'default') {
            try {
                document.getElementById('userTableHead').innerHTML = '<tr><th>Đang tải...</th></tr>';
                document.getElementById('orderTableBody').innerHTML = '<tr><td class="empty-state">Đang tải dữ liệu...</td></tr>';
                
                const response = await fetch('/api/orders?q=' + q, {
                    headers: { 'x-username': localStorage.getItem('username') || '' }
                });
                if (response.status === 401) { window.location.href = 'login.html'; return; }
                if (!response.ok) throw new Error('Failed');
                
                allData = await response.json();
                renderTable(allData);
            } catch(e) { 
                document.getElementById('orderTableBody').innerHTML = '<tr><td>Lỗi tải dữ liệu</td></tr>'; 
            }
        }
        
        document.addEventListener('DOMContentLoaded', () => { 
            loadData(); 
            if(querySelect) querySelect.addEventListener('change', e => loadData(e.target.value));
            const searchInput = document.getElementById('searchInput');
            if(searchInput) {
                searchInput.addEventListener('input', e => {
                    const search = e.target.value.toLowerCase();
                    const filtered = allData.filter(item => 
                        Object.values(item).some(val => String(val).toLowerCase().includes(search))
                    );
                    renderTable(filtered);
                });
            }
        });

        function renderTable(data) {
            const thead = document.getElementById('userTableHead');
            const tbody = document.getElementById('orderTableBody');
            
            if (!data || data.length === 0) {
                thead.innerHTML = '<tr><th>Trống</th></tr>';
                tbody.innerHTML = '<tr><td class="empty-state">Không có dữ liệu</td></tr>';
                return;
            }
            
            const keys = Object.keys(data[0]);
            thead.innerHTML = '<tr>' + keys.map(k => '<th>' + k.replace(/_/g, ' ').toUpperCase() + '</th>').join('') + '</tr>';
            
            tbody.innerHTML = data.map((item, index) => {
                let tds = keys.map(k => {
                    let val = item[k] || '';
                    if (k.includes('at')) val = new Date(val).toLocaleDateString('vi-VN');
                    if (k.includes('price') || k.includes('tien')) val = new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(val);
                    return '<td>' + val + '</td>';
                }).join('');
                return '<tr>' + tds + '</tr>';
            }).join('');
            
            const totalEl = document.getElementById('totalItems');
            if(totalEl) totalEl.textContent = data.length;
            const endEl = document.getElementById('showingEnd');
            if(endEl) endEl.textContent = data.length;
        }
    </script>
</body>`;
    // Replace script block for orders (it might use orderTableBody)
    const ordersRegex = /<script src="js\/auth\.js"><\/script>[\s\S]*<\/body>/;
    contentO = contentO.replace(ordersRegex, scriptContentO);
    fs.writeFileSync(pathOrders, contentO, 'utf8');
}

// 3. UPDATE PRODUCTS.HTML (Auth Header only)
let pathProd = 'public/products.html';
if(fs.existsSync(pathProd)) {
    let contentP = fs.readFileSync(pathProd, 'utf8');
    contentP = contentP.replace(/const response = await fetch\('\/api\/products'\);/, 
        "const response = await fetch('/api/products', { headers: { 'x-username': localStorage.getItem('username') || '' } }); if(response.status === 401) return window.location.href = 'login.html';");
    fs.writeFileSync(pathProd, contentP, 'utf8');
}

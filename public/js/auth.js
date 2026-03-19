document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPath = window.location.pathname;

    // Các trang yêu cầu đăng nhập
    const protectedPages = ['/list.html', '/view.html', '/update.html', '/products.html', '/orders.html'];
    const isProtected = protectedPages.some(page => currentPath.endsWith(page));

    // Các trang chỉ dành cho khách (guest)
    const guestPages = ['/login.html', '/register.html'];
    const isGuestOnly = guestPages.some(page => currentPath.endsWith(page));

    if (!isLoggedIn) {
        // Ẩn tab Quản lý
        const manageLinks = document.querySelectorAll('a[href="list.html"], a[href="products.html"], a[href="orders.html"]');
        manageLinks.forEach(link => {
            const li = link.closest('li');
            if (li) li.style.display = 'none';
        });

        // Redirect nếu đang vào trang nội bộ
        if (isProtected) {
            window.location.href = 'login.html';
        }
    } else {
        // Đã đăng nhập
        // Đổi nút Đăng nhập thành Đăng xuất
        const loginLinks = document.querySelectorAll('a[href="login.html"]');
        loginLinks.forEach(link => {
            link.innerHTML = '<i class="fas fa-sign-out-alt"></i> Đăng xuất';
            link.href = '#';
            link.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                window.location.href = 'login.html';
            });
        });
        
        // Ẩn Đăng ký
        const regLinks = document.querySelectorAll('a[href="register.html"]');
        regLinks.forEach(link => {
            const li = link.closest('li');
            if (li) li.style.display = 'none';
        });
        
        // Xin chào user tại tab Home (hoặc các chỗ khác nếu cần, nhưng cơ bản là vậy)
        
        // Redirect về list.html nếu vào nhầm trang đăng nhập/đăng ký
        if (isGuestOnly) {
            window.location.href = 'list.html';
        }
    }
});

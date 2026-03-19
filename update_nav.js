const fs = require('fs');
const files = ['index.html', 'login.html', 'register.html', 'view.html', 'update.html', 'list.html'];

let replacements = 0;
files.forEach(f => {
    let path = 'public/' + f;
    if (fs.existsSync(path)) {
        let content = fs.readFileSync(path, 'utf8');
        
        // Remove duplicate products/orders if they got stuck
        content = content.replace(/<li><a href="products\.html">.*?<\/a><\/li>\s*/g, '');
        content = content.replace(/<li><a href="orders\.html">.*?<\/a><\/li>\s*/g, '');
        
        // Now safely replace
        const match = content.match(/<li>\s*<a href="list\.html"([^>]*)>\s*<i class="fas fa-users"><\/i>\s*Quản lý\s*<\/a>\s*<\/li>/);
        if (match) {
            content = content.replace(/<li>\s*<a href="list\.html"([^>]*)>\s*<i class="fas fa-users"><\/i>\s*Quản lý\s*<\/a>\s*<\/li>/, 
                '<li><a href="list.html"$1><i class="fas fa-users"></i> Khách hàng</a></li>\n                <li><a href="products.html"><i class="fas fa-box"></i> Sản phẩm</a></li>\n                <li><a href="orders.html"><i class="fas fa-shopping-cart"></i> Đơn hàng</a></li>'
            );
            fs.writeFileSync(path, content, 'utf8');
            replacements++;
        }
    }
});
console.log('Replaced in ' + replacements + ' files');

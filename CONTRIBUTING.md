# Hướng dẫn Đóng góp (Contributing Guide)

Chào mừng bạn đến với dự án! Để đảm bảo mã nguồn luôn sạch sẽ, dễ quản lý và chuyên nghiệp theo chuẩn Senior, vui lòng tuân thủ các quy tắc dưới đây.

## 1. Quy trình làm việc (Git Flow)

Chúng ta sử dụng mô hình Git Flow rút gọn:

- **`main`**: Nhánh chính, chứa mã nguồn đã qua kiểm duyệt và sẵn sàng chạy thực tế (Production). Cấm commit trực tiếp vào nhánh này.
- **`develop`**: Nhánh tích hợp. Mọi tính năng mới sau khi hoàn thành sẽ được merge vào đây để test.
- **`feature/*`**: Nhánh phát triển tính năng (ví dụ: `feature/login-logic`). Tách ra từ `develop`.
- **`hotfix/*`**: Nhánh sửa lỗi khẩn cấp. Tách ra từ `main` và merge ngược lại vào cả `main` và `develop` sau khi xong.

**Quy trình chuẩn:**
1. Tách nhánh từ `develop`: `git checkout -b feature/ten-tinh-nang`
2. Code và commit theo chuẩn.
3. Merge vào `develop` bằng lệnh: `git merge --no-ff feature/ten-tinh-nang` (để tạo hình sóng chuyên nghiệp).

## 2. Quy chuẩn Commit (Conventional Commits)

Mọi commit message phải tuân theo cấu trúc: `<type>: <description>`

### Các loại Type phổ biến:
- `feat`: Thêm tính năng mới (ví dụ: `feat: add product delete functionality`)
- `fix`: Sửa lỗi (ví dụ: `fix: resolve login redirect issue`)
- `docs`: Cập nhật tài liệu (ví dụ: `docs: update setup instructions`)
- `style`: Thay đổi định dạng code (khoảng trắng, dấu phẩy...) không đổi logic.
- `refactor`: Tái cấu trúc code nhưng không thay đổi tính năng.
- `perf`: Cải thiện hiệu năng.
- `chore`: Các thay đổi nhỏ cho build tool, thư viện...

### Ví dụ tốt:
- `feat: implement bcrypt for password hashing`
- `fix: correct api endpoint for customer details`
- `style: linting fix in server.js`

## 3. CI/CD Pipeline

Mỗi khi bạn `push` hoặc tạo `Pull Request` lên nhánh `develop` hoặc `main`, hệ thống GitHub Actions sẽ tự động:
1. Kiểm tra cú pháp (Linting).
2. Chạy thử Docker build.
3. Nếu thất bại, bạn không được phép merge code.

Cảm ơn bạn đã tuân thủ quy trình để dự án của chúng ta luôn đạt chất lượng tốt nhất! 🚀

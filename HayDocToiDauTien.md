
## Yêu cầu

- JDK 25
- Git
- OpenSSL để tạo JWT secret
- Maven Wrapper đi kèm repository

Maven Wrapper được cấu hình để tải Maven `3.9.16`. Khi khởi động lần đầu, cần có kết nối Internet để tải Maven và dependencies.

## Cấu hình

**Tạo JWT secret:**

```bash
openssl rand -base64 32
```

Đặt chuỗi vừa tạo vào biến môi trường `JWT_SECRET`.

**PowerShell:**
```powershell
$env:JWT_SECRET = "THAY_BANG_CHUOI_BASE64_VUA_TAO"
$env:JWT_EXPIRATION_MS = "86400000"
```

**Nếu dùng database khác H2, có thể cấu hình thêm:**
```powershell
$env:DB_URL = "jdbc:mysql://localhost:3306/banking"
$env:DB_USERNAME = "your_db_user"
$env:DB_PASSWORD = "your_db_password"
```
> **Lưu ý:** `DB_URL` cần phù hợp với JDBC driver đã khai báo trong POM

## Chạy ứng dụng

Mở terminal tại thư mục chứa `pom.xml`.

**Windows:**
```powershell
.\mvnw.cmd spring-boot:run
```

**macOS/Linux:**
```bash
chmod +x mvnw
./mvnw spring-boot:run
```

Mặc định API chạy tại: `http://localhost:8080`

**Chạy test:**
```powershell
# Windows
.\mvnw.cmd test

# macOS/Linux
./mvnw test
```

## Xác thực JWT

Chỉ hai endpoint đăng ký và đăng nhập không yêu cầu token.

### User và Auth
- Đăng ký
- Đăng nhập
- Trả JWT access token sau khi đăng nhập.
- Các endpoint còn lại yêu cầu JWT hợp lệ.

### Account
- Tạo tài khoản thuộc user đang đăng nhập.
- Mỗi tài khoản có số tài khoản duy nhất.
- Xem danh sách tài khoản của user hiện tại.

### Transaction
- Nạp tiền vào tài khoản của user đang đăng nhập.
- Rút tiền từ tài khoản của user đang đăng nhập.
- Chuyển tiền từ tài khoản của user đăng nhập đến tài khoản đích.

### History
- Xem lịch sử có phân trang của mọi tài khoản thuộc user.
- Xem chi tiết giao dịch nếu giao dịch liên quan đến tài khoản user.

## REST API

| Method | Endpoint | Mô tả | JWT |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Đăng ký user | Không |
| **POST** | `/api/auth/login` | Đăng nhập, nhận JWT | Không |
| **POST** | `/api/accounts` | Tạo tài khoản | Có |
| **GET** | `/api/accounts/me` | Danh sách tài khoản của tôi | Có |
| **POST** | `/api/transactions/deposit` | Nạp tiền | Có |
| **POST** | `/api/transactions/withdraw` | Rút tiền | Có |
| **POST** | `/api/transactions/transfer` | Chuyển tiền | Có |
| **GET** | `/api/history?page=0&size=20` | Lịch sử giao dịch | Có |
| **GET** | `/api/history/{transactionId}`| Chi tiết giao dịch | Có |


## Mã lỗi thường gặp

- **400 Bad Request**: dữ liệu đầu vào không hợp lệ, số tiền không hợp lệ hoặc không đủ số dư.
- **401 Unauthorized**: thiếu token hoặc token không hợp lệ/hết hạn.
- **404 Not Found**: không tìm thấy tài khoản/giao dịch, hoặc tài nguyên không thuộc user hiện tại.
- **500 Internal Server Error**: lỗi ngoài các trường hợp được xử lý ở trên.


## Cấu trúc thư mục dự án

Dự án được phân chia thành 2 phần độc lập:
- `backend/`: Chứa toàn bộ mã nguồn Java Spring Boot, cấu hình Maven (`pom.xml`, `mvnw`), `Dockerfile` của backend.
- `frontend/`: Chứa mã nguồn giao diện React (Vite + TypeScript), package manager config (`package.json`), v.v.

---

## 1. Hướng dẫn chạy Backend

Mở terminal và di chuyển vào thư mục `backend`:
```bash
cd backend
```

**Yêu cầu:**
- JDK 25
- Maven Wrapper đi kèm (Maven 3.9.16)

**Cấu hình biến môi trường:**
```bash
openssl rand -base64 32
```
Đặt chuỗi vừa tạo vào biến môi trường `JWT_SECRET`.

**PowerShell (Windows):**
```powershell
cd backend
$env:JWT_SECRET = "THAY_BANG_CHUOI_BASE64_VUA_TAO"
$env:JWT_EXPIRATION_MS = "86400000"
.\mvnw.cmd spring-boot:run
```

**macOS/Linux:**
```bash
cd backend
export JWT_SECRET="THAY_BANG_CHUOI_BASE64_VUA_TAO"
export JWT_EXPIRATION_MS="86400000"
chmod +x mvnw
./mvnw spring-boot:run
```

Mặc định Backend API chạy tại: `http://localhost:8080`

---

## 2. Hướng dẫn chạy Frontend

Mở terminal và di chuyển vào thư mục `frontend`:
```bash
cd frontend
npm install # hoặc: pnpm install
npm run dev # hoặc: pnpm dev
```

Mặc định Frontend chạy tại: `http://localhost:5173`

---

## 3. Khởi chạy bằng Docker Compose (Database & Backend)

Tại thư mục gốc:
```bash
docker-compose up --build -d
```

---

## REST API Backend

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

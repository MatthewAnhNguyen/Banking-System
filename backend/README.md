# 🏦 Enterprise Banking System - Backend

Dịch vụ Backend cho hệ thống Banking, xây dựng trên nền tảng **Java 21/25**, **Spring Boot**, **Spring Security (JWT)**, và **JPA/Hibernate (MySQL/H2)**.

---

## 📌 Tổng quan

Backend cung cấp hệ thống RESTful API an toàn, chịu trách nhiệm xử lý toàn bộ nghiệp vụ ngân hàng:
- Xác thực và phân quyền người dùng (JWT)
- Quản lý tài khoản ngân hàng (Accounts)
- Thực hiện giao dịch nạp, rút, chuyển khoản (Transactions)
- Lịch sử giao dịch (History)
- Quản trị viên (Admin)

---

## 🚀 Khởi chạy Backend

### 1. Yêu cầu môi trường
- JDK 21 hoặc 25
- Maven (hoặc dùng Maven Wrapper `./mvnw` có sẵn)

### 2. Biến môi trường
Cần cấu hình tối thiểu `JWT_SECRET`:
```bash
# macOS / Linux
export JWT_SECRET="bW90LWNodW9pLWJpLW1hdC1iYXQta3ktZGFpLWhvbi0zMi1reS10dS1kYW5oLWNoby1kdS1hbi1iYW5raW5n"
export JWT_EXPIRATION_MS="86400000"

# PowerShell (Windows)
$env:JWT_SECRET = "bW90LWNodW9pLWJpLW1hdC1iYXQta3ktZGFpLWhvbi0zMi1reS10dS1kYW5oLWNoby1kdS1hbi1iYW5raW5n"
$env:JWT_EXPIRATION_MS = "86400000"
```

### 3. Khởi chạy ứng dụng
```bash
# macOS / Linux
chmod +x mvnw
./mvnw spring-boot:run

# Windows
.\mvnw.cmd spring-boot:run
```

API mặc định lắng nghe tại: `http://localhost:8080`

### 4. Build Docker Image
```bash
# Build file jar trước
./mvnw clean package -DskipTests

# Build docker image
docker build -t banking-api .
```

# Bước 1: Mượn một "căn bếp" có sẵn Java 21
FROM eclipse-temurin:21-jdk-alpine

# Bước 2: Tạo một thư mục tên là /app bên trong container
WORKDIR /app

# Bước 3: Copy file .jar bạn vừa build ở bước trên vào trong container
# (Đổi tên thành app.jar cho dễ gọi)
COPY target/*.jar app.jar

# Bước 4: Mở cổng 8080 (cổng mặc định của Spring Boot)
EXPOSE 8080

# Bước 5: Lệnh khởi chạy ứng dụng khi Container bắt đầu chạy
ENTRYPOINT ["java", "-jar", "app.jar"]
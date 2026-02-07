# 🌍 Travel Booking Tour - Website Đặt Tour Du Lịch

Travel Booking Tour là một dự án website thương mại điện tử cho phép người dùng tìm kiếm, đặt tour du lịch và quản lý chuyến đi trực tuyến. Dự án được xây dựng nhằm mục đích học tập và áp dụng thực tế các kỹ năng frontend và backend, với đầy đủ chức năng của một nền tảng đặt tour hiện đại.

---

## 🚀 Tính năng chính

### 👤 Người dùng

* Đăng ký / đăng nhập
* Xác thực tài khoản qua email
* Cập nhật thông tin cá nhân
* Phân quyền (admin / người dùng)

### 🧳 Tour du lịch

* Hiển thị danh sách tour
* Trang chi tiết tour
* Tìm kiếm, lọc theo địa điểm / thời gian / giá / loại tour
* Hiển thị giá, lịch trình, số chỗ còn lại, trạng thái tour

### 📅 Đặt tour & Thanh toán

* Đặt tour trực tuyến
* Chọn số lượng người
* Thanh toán và tạo đơn đặt tour
* Theo dõi trạng thái đơn đặt tour

### 🛠️ Trang quản trị (Admin)

* Quản lý tour (thêm, sửa, xoá)
* Upload ảnh tour
* Quản lý danh mục tour / địa điểm
* Quản lý người dùng
* Quản lý đơn đặt tour
* Quản lý đánh giá & phản hồi

---

## 🧑‍💻 Công nghệ sử dụng

### Frontend

* **Next.js (React)**
* **TypeScript / TSX**
* **Redux Toolkit** + redux-persist
* **Framer Motion** (hiệu ứng UI)
* **Tailwind CSS** / CSS Modules
* **Fetch API** (gọi backend)

### Backend

* **Node.js**
* **Express.js**
* **TypeScript**
* **Sequelize ORM** hoặc **Prisma**
* **MySQL** hoặc **PostgreSQL**
* **Multer** (upload ảnh)
* **JWT** (xác thực)
* **Nodemailer** (gửi email xác nhận đặt tour)

### Khác

* **EJS** (render một số view backend)
* **Git & GitHub**
* **Vercel / Render** (deploy frontend & backend)

---

## 📁 Cấu trúc dự án (tóm tắt)

### Frontend (Next.js)

```
app/
  (site)/
    tours/
    tour/[slug]/
    category/[slug]/
  admin/
components/
store/ (Redux)
types/
services/
```

### Backend (Express + ORM)

```
controllers/
models/
routes/
middlewares/
config/
app.ts
```

---

## ⚙️ Cài đặt & chạy dự án

### 1. Clone dự án

```bash
git clone <repo-url>
cd travel-booking-tour
```

### 2. Cài đặt backend

```bash
cd backend
npm install
npm run dev
```

### 3. Cài đặt frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Cấu hình môi trường (.env)

Backend:

```
PORT=5000
DB_NAME=travel_booking
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Frontend:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🧠 Mục tiêu học tập

* Hiểu và áp dụng mô hình **MVC** trong backend
* Xây dựng hệ thống đặt tour thực tế
* Thực hành upload ảnh và quản lý file
* Làm việc với API RESTful
* Quản lý trạng thái frontend bằng Redux
* Tối ưu UI/UX với animation
* Triển khai dự án thực tế lên môi trường production

---

## 📸 Demo & Link dự án

* Frontend repo: *(điền link GitHub frontend)*
* Backend repo: *(điền link GitHub backend)*
* Website: *(điền link deploy nếu có)*
* Admin panel: *(điền link nếu có)*

---

## 👤 Tác giả

**Tai Nguyen**
Frontend Developer (Intern/Junior)

* GitHub: *(link github)*
* Portfolio: *(link portfolio)*

---

## 📄 Giấy phép

Dự án phục vụ mục đích học tập và phi thương mại.

---

✨ Nếu bạn là nhà tuyển dụng hoặc người học khác, đừng ngần ngại liên hệ hoặc góp ý để dự án ngày càng hoàn thiện hơn!

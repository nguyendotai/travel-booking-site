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

### Khác

* **Git & GitHub**
* **Vercel / Render** (deploy frontend & backend)

---

## 📁 Cấu trúc dự án (tóm tắt)

### Frontend (Next.js)

```
├── 📁 travel-booking-site/
│   ├── 📁 app/
│   │   ├── 📁 about/
│   │   ├── 📁 categories/
│   │   │   └── 📁 [slug]/
│   │   ├── 📁 components/
│   │   │   ├── 📁 ui/
│   │   │   ├── 📁 uiHome/
│   │   ├── 📁 explore/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 hot-deals/
│   │   ├── 📁 login/
│   │   ├── 📁 mock/
│   │   ├── 📁 my-bookings/
│   │   ├── 📁 payment-cancel/
│   │   ├── 📁 payment-success/
│   │   ├── 📁 profile/
│   │   ├── 📁 register/
│   │   ├── 📁 store/
│   │   ├── 📁 tours/
│   │   │   ├── 📁 [slug]/
│   │   │   │   ├── 📁 booking/
│   │   │   │   ├── 📁 payment/
│   │   │   ├── 📁 destination/
│   │   │   │   └── 📁 [id]/
│   │   │   └── 📁 search/
│   │   ├── 📁 types/
│   ├── 📁 public/
```

### Backend (Express + ORM)

```
├── 📁 travel-booking-backend/
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   ├── 📁 controllers/
│   │   ├── 📁 middlewares/
│   │   ├── 📁 models/
│   │   ├── 📁 routes/
│   │   └── 📄 app.js
│   ├── 📁 uploads/
```
### Admin (Next.js)

```
├── 📁 travel-booking-admin/
│   ├── 📁 app/
│   │   ├── 📁 (admin)/
│   │   │   ├── 📁 bookings/
│   │   │   ├── 📁 categories/
│   │   │   │   ├── 📁 add/
│   │   │   │   ├── 📁 edit/
│   │   │   │   │   └── 📁 [id]/
│   │   │   ├── 📁 components/
│   │   │   ├── 📁 destinations/
│   │   │   │   ├── 📁 add/
│   │   │   │   ├── 📁 edit/
│   │   │   │   │   └── 📁 [id]/
│   │   │   ├── 📁 hotels/
│   │   │   │   ├── 📁 add/
│   │   │   ├── 📁 locations/
│   │   │   │   ├── 📁 add/
│   │   │   │   ├── 📁 edit/
│   │   │   │   │   └── 📁 [id]/
│   │   │   ├── 📁 tours/
│   │   │   │   ├── 📁 add/
│   │   │   │   ├── 📁 edit/
│   │   │   │   │   └── 📁 [slug]/
│   │   │   ├── 📁 users/
│   │   ├── 📁 login/
│   ├── 📁 public/
```
---

## ⚙️ Cài đặt & chạy dự án

### 1. Clone và cài đặt dự án(Backend)

```bash
git clone https://github.com/nguyendotai/travel-booking-backend.git
npm install
npm run dev
```

### 2. Clone và cài đặt dự án(Frontend)

```bash
git clone https://github.com/nguyendotai/travel-booking-site.git
npm install
npm run dev
```

### 3. Clone và cài đặt dự án(Admin)

```bash
git clone https://github.com/nguyendotai/travel-booking-admin.git
npm install
npm run dev
```

### 4. Cấu hình môi trường (.env)

Backend:

```
DB_NAME=travel_booking       
DB_USER=root             
DB_PASSWORD=            
DB_HOST=localhost
DB_PORT=3306

```

Frontend:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_USE_MOCK=false
```

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

* Frontend repo: [*(GitHub frontend)*](https://github.com/nguyendotai/travel-booking-site)
* Backend repo: [*(GitHub backend)*](https://github.com/nguyendotai/travel-booking-admin)
* Website: [*(link deploy )*](https://travel-booking-site-3fra410j3-nguyendotais-projects.vercel.app/)
---

## 👤 Tác giả

**Tai Nguyen**
Frontend Developer

* GitHub: [*(link github)*](https://github.com/nguyendotai)
* Portfolio: [*(link portfolio)*](https://portfolio-xi-nine-jwe6t3zoza.vercel.app/)

---

## 📄 Giấy phép

Dự án phục vụ mục đích học tập và phi thương mại.

---

✨ Nếu bạn là nhà tuyển dụng hoặc người học khác, đừng ngần ngại liên hệ hoặc góp ý để dự án ngày càng hoàn thiện hơn!

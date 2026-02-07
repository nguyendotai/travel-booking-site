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
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 categories/
│   │   │   └── 📁 [slug]/
│   │   │       └── 📄 page.tsx
│   │   ├── 📁 components/
│   │   │   ├── 📁 ui/
│   │   │   │   └── 📄 TourCard.tsx
│   │   │   ├── 📁 uiHome/
│   │   │   │   ├── 📄 CategoriesImage.tsx
│   │   │   │   ├── 📄 HotDeals.tsx
│   │   │   │   ├── 📄 IntroSection.tsx
│   │   │   │   ├── 📄 Newsletter.tsx
│   │   │   │   ├── 📄 Testimonials.tsx
│   │   │   │   ├── 📄 TopDestinations.tsx
│   │   │   │   ├── 📄 TourDomestic.tsx
│   │   │   │   └── 📄 TourInternational.tsx
│   │   │   ├── 📄 Banner.tsx
│   │   │   ├── 📄 Footer.tsx
│   │   │   ├── 📄 Header.tsx
│   │   │   └── 📄 TourSearchForm.tsx
│   │   ├── 📁 explore/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 hot-deals/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 login/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 mock/
│   │   │   ├── 📄 authMock.ts
│   │   │   ├── 📄 bookings.ts
│   │   │   ├── 📄 categories.ts
│   │   │   ├── 📄 destinations.ts
│   │   │   ├── 📄 locations.ts
│   │   │   ├── 📄 reviews.ts
│   │   │   ├── 📄 toursDomestic.ts
│   │   │   └── 📄 toursInternational.ts
│   │   ├── 📁 my-bookings/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 payment-cancel/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 payment-success/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 profile/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 register/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 store/
│   │   │   ├── 📄 authSlice.ts
│   │   │   └── 📄 store.ts
│   │   ├── 📁 tours/
│   │   │   ├── 📁 [slug]/
│   │   │   │   ├── 📁 booking/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 payment/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 destination/
│   │   │   │   └── 📁 [id]/
│   │   │   │       └── 📄 page.tsx
│   │   │   └── 📁 search/
│   │   │       └── 📄 page.tsx
│   │   ├── 📁 types/
│   │   │   ├── 📄 Bookings.ts
│   │   │   ├── 📄 Categories.ts
│   │   │   ├── 📄 Destination.ts
│   │   │   ├── 📄 Hotels.ts
│   │   │   ├── 📄 Locations.ts
│   │   │   ├── 📄 Reviews.ts
│   │   │   └── 📄 Tours.ts
│   │   ├── 📄 favicon.ico
│   │   ├── 🎨 globals.css
│   │   ├── 📄 layout.tsx
│   │   └── 📄 page.tsx
│   ├── 📁 public/
│   │   ├── 🖼️ bea21b4ccc54d80679542e44ce849f57.jpg
│   │   ├── 🖼️ file.svg
│   │   ├── 🖼️ globe.svg
│   │   ├── 🖼️ next.svg
│   │   ├── 🖼️ vercel.svg
│   │   └── 🖼️ window.svg
│   ├── ⚙️ .gitignore
│   ├── 📝 README.md
│   ├── 📝 Untitled-1.md
│   ├── 📄 eslint.config.mjs
│   ├── 📄 next-env.d.ts
│   ├── 📄 next.config.ts
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── 📄 postcss.config.mjs
│   └── ⚙️ tsconfig.json
```

### Backend (Express + ORM)

```
├── 📁 travel-booking-backend/
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   │   ├── 📄 cloudinary.js
│   │   │   └── 📄 db.js
│   │   ├── 📁 controllers/
│   │   │   ├── 📄 authController.js
│   │   │   ├── 📄 bookingController.js
│   │   │   ├── 📄 categoryController.js
│   │   │   ├── 📄 dashboardController.js
│   │   │   ├── 📄 departureController.js
│   │   │   ├── 📄 destinationController.js
│   │   │   ├── 📄 hotelController.js
│   │   │   ├── 📄 invoiceController.js
│   │   │   ├── 📄 locationController.js
│   │   │   ├── 📄 paymentController.js
│   │   │   ├── 📄 promotionController.js
│   │   │   ├── 📄 reviewController.js
│   │   │   ├── 📄 tourController.js
│   │   │   ├── 📄 userController.js
│   │   │   └── 📄 wishlistController.js
│   │   ├── 📁 middlewares/
│   │   │   ├── 📄 authMiddleware.js
│   │   │   ├── 📄 uploadCloudinary.js
│   │   │   └── 📄 uploadMiddleware.js
│   │   ├── 📁 models/
│   │   │   ├── 📄 Booking.js
│   │   │   ├── 📄 Category.js
│   │   │   ├── 📄 Departure.js
│   │   │   ├── 📄 Destination.js
│   │   │   ├── 📄 Hotel.js
│   │   │   ├── 📄 HotelLocation.js
│   │   │   ├── 📄 Invoice.js
│   │   │   ├── 📄 Location.js
│   │   │   ├── 📄 Notification.js
│   │   │   ├── 📄 Payment.js
│   │   │   ├── 📄 Review.js
│   │   │   ├── 📄 Tour.js
│   │   │   ├── 📄 TourCategory.js
│   │   │   ├── 📄 TourDay.js
│   │   │   ├── 📄 TourDayDestination.js
│   │   │   ├── 📄 TourDestination.js
│   │   │   ├── 📄 User.js
│   │   │   ├── 📄 Wishlist.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 routes/
│   │   │   ├── 📄 authRoutes.js
│   │   │   ├── 📄 bookingRoutes.js
│   │   │   ├── 📄 categoryRoutes.js
│   │   │   ├── 📄 dashboardRoutes.js
│   │   │   ├── 📄 departureRoutes.js
│   │   │   ├── 📄 destinationRoutes.js
│   │   │   ├── 📄 hotelRoutes.js
│   │   │   ├── 📄 locationRoutes.js
│   │   │   ├── 📄 paymentRoutes.js
│   │   │   ├── 📄 reviewRoutes.js
│   │   │   ├── 📄 tourRoutes.js
│   │   │   └── 📄 userRoutes.js
│   │   └── 📄 app.js
│   ├── 📁 uploads/
│   │   ├── 🖼️ 1759323214539-52414292.jpg
│   │   ├── 🖼️ 1759323239335-540187061.jpg
│   │   ├── 🖼️ 1759323803460-5634966.jpg
│   │   ├── 🖼️ 1759323857778-420400486.jpg
│   │   ├── 🖼️ 1759323922995-377124672.jpg
│   │   ├── 🖼️ 1759323961011-783564420.jpg
│   │   ├── 🖼️ 1759323998309-425671550.jpg
│   │   ├── 🖼️ 1759324033213-951597374.jpg
│   │   ├── 🖼️ 1759324157995-855532559.jpg
│   │   ├── 🖼️ 1759325143521-473775187.jpg
│   │   ├── 🖼️ 1759327964461-477074009.jpg
│   │   ├── 🖼️ 1759330616822-195487114.jpg
│   │   ├── 🖼️ 1759331011521-420070408.jpg
│   │   ├── 🖼️ 1759331125866-878218856.jpg
│   │   ├── 🖼️ 1759723803862-793020715.jpg
│   │   ├── 🖼️ 1759725563927-855031296.jpg
│   │   ├── 🖼️ 1759729008148-611060009.jpg
│   │   ├── 🖼️ 1759730222310-122207166.jpg
│   │   ├── 🖼️ 1759931207463-152870874.jpg
│   │   └── 🖼️ 1760771036033-940961064.png
│   ├── ⚙️ .gitignore
│   ├── 📄 eslint.config.mjs
│   ├── ⚙️ package-lock.json
│   └── ⚙️ package.json
```
### Admin (Next.js)

```
├── 📁 travel-booking-admin/
│   ├── 📁 app/
│   │   ├── 📁 (admin)/
│   │   │   ├── 📁 bookings/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 categories/
│   │   │   │   ├── 📁 add/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 edit/
│   │   │   │   │   └── 📁 [id]/
│   │   │   │   │       └── 📄 page.tsx
│   │   │   │   ├── 📄 AddCategoryForm.tsx
│   │   │   │   ├── 📄 EditCategoryForm.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 components/
│   │   │   │   ├── 📄 Header.tsx
│   │   │   │   ├── 📄 Notification.tsx
│   │   │   │   └── 📄 Sidebar.tsx
│   │   │   ├── 📁 destinations/
│   │   │   │   ├── 📁 add/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 edit/
│   │   │   │   │   └── 📁 [id]/
│   │   │   │   │       └── 📄 page.tsx
│   │   │   │   ├── 📄 AddDestinationForm.tsx
│   │   │   │   ├── 📄 EditDestinationForm.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 hotels/
│   │   │   │   ├── 📁 add/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📄 AddHotelForm.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 locations/
│   │   │   │   ├── 📁 add/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 edit/
│   │   │   │   │   └── 📁 [id]/
│   │   │   │   │       └── 📄 page.tsx
│   │   │   │   ├── 📄 AddLocationForm.tsx
│   │   │   │   ├── 📄 EditLocationForm.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 tours/
│   │   │   │   ├── 📁 add/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 edit/
│   │   │   │   │   └── 📁 [slug]/
│   │   │   │   │       └── 📄 page.tsx
│   │   │   │   ├── 📄 AddTourForm.tsx
│   │   │   │   ├── 📄 EditTourForm.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 users/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📄 layout.tsx
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 login/
│   │   │   └── 📄 page.tsx
│   │   ├── 📄 favicon.ico
│   │   ├── 🎨 globals.css
│   │   └── 📄 layout.tsx
│   ├── 📁 public/
│   │   ├── 🖼️ file.svg
│   │   ├── 🖼️ globe.svg
│   │   ├── 🖼️ next.svg
│   │   ├── 🖼️ vercel.svg
│   │   └── 🖼️ window.svg
│   ├── ⚙️ .gitignore
│   ├── 📝 README.md
│   ├── 📄 eslint.config.mjs
│   ├── 📄 next-env.d.ts
│   ├── 📄 next.config.ts
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── 📄 postcss.config.mjs
│   └── ⚙️ tsconfig.json
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

JWT_SECRET=supersecret

STRIPE_SECRET_KEY=sk_test_51SGfBD2Lfs8gA1ECrUc9EaW7nLpHmZdH9ReOItXE9JIFD97sh7aaOLTH2biph7LTlhfKPI7oh98RdMhAJ30uoGKz00KnriG3Uu
STRIPE_PUBLISHABLE_KEY=pk_test_51SGfBD2Lfs8gA1ECbc0ikICRWhbANoiwVMlbdMyVDAUBDwH4ObgNDMx74l5fw2ZYs4awZ4ScnN5zLy3ABnTqOtCT00D1OxTVrd
STRIPE_WEBHOOK_SECRET=whsec_9b58797a1cefb5d6d820db0f175580f9a7db28bf74f66b4209d7afb49a18126c

CLOUDINARY_CLOUD_NAME=dovmfzcnk
CLOUDINARY_API_KEY=347133623652791
CLOUDINARY_API_SECRET=tOHJ-yyb-7P0cVGjzK-yuYOuvqk

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

* Frontend repo: *(điền link GitHub frontend)*
* Backend repo: *(điền link GitHub backend)*
* Website: *(điền link deploy nếu có)*
* Admin panel: *(điền link nếu có)*

---

## 👤 Tác giả

**Tai Nguyen**
Frontend Developer Intern

* GitHub: *(link github)*
* Portfolio: *(link portfolio)*

---

## 📄 Giấy phép

Dự án phục vụ mục đích học tập và phi thương mại.

---

✨ Nếu bạn là nhà tuyển dụng hoặc người học khác, đừng ngần ngại liên hệ hoặc góp ý để dự án ngày càng hoàn thiện hơn!

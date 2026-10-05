# Toolroom — ระบบจัดการและยืมคืนอุปกรณ์

ระบบนี้ประกอบด้วยหน้าเว็บ React/Vite และ API Node.js/Express ที่ใช้ MongoDB ผ่าน Mongoose

## เริ่มพัฒนาในเครื่อง

1. ติดตั้ง Node.js 20 ขึ้นไป
2. คัดลอก `.env.example` เป็น `.env` แล้วตั้งค่า `MONGODB_URI` และ `JWT_SECRET`
3. ติดตั้ง dependencies ด้วย `npm install`
4. เปิดระบบพัฒนาด้วย `npm run dev` (หน้าเว็บที่ `http://localhost:5173`, API ที่ `http://localhost:5000`)
5. สร้างบัญชี Admin เริ่มต้นด้วย `npm run seed` หลังตั้ง `ADMIN_EMAIL` และ `ADMIN_PASSWORD`

## Deploy บน Render

สร้าง **Web Service** จาก repository นี้ โดยตั้งค่า:

- Build command: `npm ci --include=dev && npm run build`
- Start command: `npm start`
- Environment variables: `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- `CLIENT_URL` ใช้เมื่อต้องเรียก API จากเว็บคนละ origin; หากให้ Express เสิร์ฟหน้าเว็บและ API จาก service เดียวกัน ปล่อยว่างได้
- ไม่ต้องกำหนด `PORT` เองบน Render; ระบบจะใช้ค่าที่ Render ส่งให้
- หลัง deploy ครั้งแรก ให้สร้าง Admin หนึ่งครั้งด้วย `npm run seed` ใน Render Shell หลังตั้ง `ADMIN_EMAIL` และ `ADMIN_PASSWORD`

ตั้ง `MONGODB_URI` เป็น connection string ของ MongoDB ที่ Render เข้าถึงได้ และใช้ secret ที่สุ่มยาวและคาดเดายากสำหรับ `JWT_SECRET` อย่าอัปโหลด `.env` ขึ้น GitHub

## โครงสร้างโค้ด

- `server.js` ตั้งค่า Express, ลงทะเบียน API และให้บริการไฟล์เว็บที่ Vite สร้าง
- `config/db.js` เชื่อมต่อ MongoDB
- `routes/` จับคู่ URL กับ controller
- `controllers/` ทำงานตามคำขอและเรียกใช้ฐานข้อมูล
- `models/` กำหนด schema ของผู้ใช้ อุปกรณ์ และคำขอยืม
- `middleware/` ตรวจโทเคน/สิทธิ์ และจัดการข้อผิดพลาด
- `src/` เก็บหน้า React, components, API client และ CSS
- `seed.js` สร้างบัญชี Admin เริ่มต้นจากตัวแปรแวดล้อม

## API หลัก

- `/api/auth` — เข้าสู่ระบบและจัดการผู้ใช้
- `/api/equipment` — ดูและจัดการอุปกรณ์
- `/api/borrow` — ส่งและดำเนินการคำขอยืม
- `/api/dashboard` — สรุปข้อมูลสำหรับ Dashboard
- `/api/health` — ตรวจสถานะ API

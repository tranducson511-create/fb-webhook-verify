# TaiwanPay V5 — Static Build for Hostinger Shared Hosting

## Tổng quan
Bản V5 được build **tĩnh** (HTML + CSS + JS) để chạy trực tiếp trên Hostinger shared hosting (public_html).  
Không dùng React/Node runtime. Tất cả logic client-side, multi-language, admin mock, barcode, countdown đều chạy trên browser.

## Cấu trúc thư mục
```
taiwanpay-v5/
├── index.html          # Trang chủ + đổi tiền + thẻ thanh toán (SPA-like)
├── admin.html          # Admin V5 dashboard
├── style.css           # Toàn bộ style (neon, iPhone mock, responsive)
├── app.js              # Logic: i18n, rate, barcode, countdown, queue
└── README.md           # File này
```

## Checklist 5 bước deploy (Hostinger File Manager)

1. **Tải về**  
   Clone hoặc Download ZIP từ repo:  
   `https://github.com/tranducson511-create/fb-webhook-verify/tree/main/taiwanpay-v5`

2. **Vào hPanel → File Manager**  
   Mở `public_html` (hoặc thư mục domain taiwanpayapp.com).

3. **Upload**  
   Upload toàn bộ file trong `taiwanpay-v5/` vào thư mục gốc domain (hoặc tạo folder `v5` nếu muốn giữ bản cũ).

4. **Kiểm tra**  
   - Mở `https://taiwanpayapp.com/` → thấy neon tím logo, 101 Taipei, 3 iPhone cam.  
   - Thử đổi tiền 2 chiều, xem thẻ thanh toán có 3 mã Code39 + countdown.  
   - Mở `https://taiwanpayapp.com/admin.html` → hàng đợi đơn gấp.

5. **Bảo mật bổ sung (khuyến nghị)**  
   - Bật Cloudflare (WAF + Rate Limit 3 req/giờ/IP cho API nếu có).  
   - Trong hPanel → Advanced → PHP Configuration: tắt display_errors.  
   - Nếu cần backend thật sau này: dùng PHP proxy riêng (không đụng bản tĩnh này).

## Tính năng đã implement

### 1. Trang chủ
- Logo neon tím
- Hình 101 Taipei mờ bên phải
- 3 hộp iPhone cam xếp lệch ~30°
- Nút "Gửi tiền ngay" màu cam rực
- Hình trang trí sương mờ

### 2. Trang đổi tiền
- Số tiền lớn lên trước
- Bạn trả / Phí NT$150 / Người nhận
- Khóa báo giá (lock rate)
- Cả 2 chiều Đài → Việt & Việt → Đài

### 3. Thẻ thanh toán khách
- 1 ảnh chứa 3 mã vạch Code 39:  
  `151001K5G` · `00MRT261001ARMJK` · `035782000001150`
- Nút "Đưa màn hình cho nhân viên" nền trắng
- Câu cố định: `我要繳費，條碼在這裡。`
- Đồng hồ đếm ngược (cam < 30 phút, đỏ < 5 phút)

### 4. Admin V5
- Hàng đợi ưu tiên: quá hạn → sắp hết hạn → chờ gửi mã → khách báo đã trả
- Mã đơn đầu dòng
- Nút động theo trạng thái: Tạo TwPay Card / Xác nhận đã nhận tiền / Nhắc khách
- Trang đơn 3 cột (không popup)
- Ảnh gốc + watermark `go-vn` chỉ admin thấy
- Hai giờ cạnh nhau: trên phiếu / hết hạn
- Nút "Trừ 2 phút" ghi rõ
- Việc còn thiếu hiện ngay trên nút gửi

### 5. Đa ngôn ngữ (5 ngôn ngữ)
- Tiếng Việt · English · 繁體中文 · Bahasa Indonesia · ภาษาไทย
- Tách i18n khỏi logic
- Câu thu ngân **luôn** tiếng Trung

### 6. Bảo mật (client + hướng dẫn)
- Rate limit client-side mock
- Log admin (localStorage)
- PIN mã hóa (mock)

## Lưu ý quan trọng
- Site hiện tại là PHP. Bản này **không ghi đè** PHP cũ nếu bạn upload vào subfolder.
- API Hostinger chỉ đọc → không dùng token để ghi file.
- FTP 21/22 không dùng được → chỉ File Manager.
- Muốn backend thật: viết PHP riêng gọi API, giữ frontend tĩnh này.

# TaiwanPay V5 - Static Version

## Files
- index.html: Trang chủ với neon tím, Taipei 101 mờ, iPhones cam lệch 30 độ, nút cam rực, mist.
- style.css: Styles cho các hiệu ứng.
- app.js: Logic, đa ngôn ngữ (VI, EN, ZH-TW, ID, TH), exchange, countdown, admin queue.
- admin.html: Admin V5 với hàng đợi ưu tiên, 3 cột, etc.
- README.md: Hướng dẫn này.

## Lưu ý quan trọng
Site hiện tại là PHP trên Hostinger shared hosting (public_html).
Không deploy React/Node nguyên bản. Đây là bản HTML/CSS/JS tĩnh.

API Hostinger chỉ đọc. FTP không kết nối từ xa. Dùng hPanel File Manager để upload.

## Checklist 5 bước deploy
1. Backup toàn bộ public_html hiện tại qua hPanel File Manager.
2. Tải thư mục taiwanpay-v5/ từ GitHub về máy.
3. Upload các file (index.html, style.css, app.js, admin.html) vào public_html/ (hoặc thư mục con) qua hPanel File Manager. Không dùng FTP.
4. Kiểm tra trang chủ và admin trên browser. Clear cache nếu cần.
5. Bật Cloudflare WAF, cấu hình rate limit server-side nếu có backend PHP, mã hóa PIN và log admin ở server.

## Bảo mật
- Cloudflare WAF
- Rate limit API 3 lần/giờ/IP (server-side)
- Log admin
- Mã hóa PIN

Câu thu ngân luôn tiếng Trung: 我要繳費，條碼在這裡。

Đẩy từ repo: tranducson511-create/fb-webhook-verify /taiwanpay-v5/

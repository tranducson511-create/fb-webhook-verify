# TaiwanPay V5 - Static Deploy

Đây là bản static HTML/CSS/JS của TaiwanPay V5. KHÔNG phải React/Node raw.

## Files
- index.html : Trang chủ (neon tím logo, 101 Taipei bóng mờ, 3 iPhone cam lệch 30°, nút Gửi tiền ngay)
- exchange.html : Trang đổi tiền (số lớn, bạn trả / phí NT$150 / người nhận, khóa báo giá, cả 2 chiều)
- payment.html : Thẻ thanh toán khách (3 Code 39 barcode, nút đưa màn hình, câu 我要繳費，條碼在這裡。, timer cam/đỏ)
- admin.html : Admin V5 (hàng đợi ưu tiên, mã đơn đầu dòng, nút theo việc, 3 cột, watermark admin only, 2 giờ cạnh nhau, Trừ 2 phút)
- style.css : Styles
- app.js : Logic + i18n 5 ngôn ngữ (vi, en, zh, id, th). Câu thu ngân luôn tiếng Trung.

## Bảo mật
- Cloudflare WAF recommended
- Rate limit API 3 lần/giờ/IP (implement ở backend riêng)
- Log admin, mã hóa PIN (không có trong static demo)

## Deploy Checklist (5 bước)
1. Đăng nhập hPanel Hostinger → File Manager
2. Vào public_html (hoặc thư mục domain)
3. Upload toàn bộ file trong thư mục taiwanpay-v5/ (giữ nguyên cấu trúc)
4. Đảm bảo index.html là file chính, hoặc cấu hình directory index
5. Test: mở taiwanpayapp.com, kiểm tra 5 ngôn ngữ, barcode, timer, admin queue

Lưu ý: API Hostinger chỉ ĐỌC. FTP 21/22 không kết nối được từ xa. Chỉ dùng File Manager.
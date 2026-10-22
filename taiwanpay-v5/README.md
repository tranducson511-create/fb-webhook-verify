# TaiwanPay V5 - Static HTML/CSS/JS Version

Bản tĩnh (không React/Node). Phù hợp Hostinger shared hosting PHP hiện tại.

## Files đã tạo/cập nhật
- `index.html`: Trang chủ đầy đủ (neon tím quanh logo, Taipei 101 bóng mờ mép phải, 3 hộp iPhone cam xếp lệch ~30°, nút Gửi tiền ngay cam rực, hình trang trí mờ như sương). Có section đổi tiền (input số tiền động) và thẻ thanh toán.
- `style.css`: Styles neon, mist, iPhones, countdown, admin 3 cột, responsive.
- `app.js`: Logic đổi tiền (số lớn lên trước, bạn trả / phí NT$150 / người nhận, khóa báo giá, cả hai chiều Đài-Việt), barcode Code 39 (151001K5G, 00MRT261001ARMJK, 035782000001150), đồng hồ đếm ngược đúng phút (dưới 30' cam, dưới 5' đỏ), đa ngôn ngữ tách khỏi logic, hàng đợi admin mock ưu tiên.
- `admin.html`: Admin V5 - hàng đợi đơn gấp lên trước (quá hạn, sắp hết hạn, chờ gửi mã, khách báo đã trả), mã đơn đầu dòng, nút đổi theo việc, trang đơn 3 cột, ảnh gốc + watermark go-vn, hai giờ cạnh nhau, nút Trừ 2 phút ghi rõ, việc còn thiếu hiện ngay trên nút gửi.
- `README.md`: Hướng dẫn này.

## 5 ngôn ngữ
Tiếng Việt, English, 繁體中文, Bahasa Indonesia, ภาษาไทย. Câu thu ngân luôn tiếng Trung: 我要繳費，條碼在這裡。

## LƯU Ý QUAN TRỌNG DEPLOY
Site taiwanpayapp.com hiện tại là PHP trong public_html trên Hostinger shared hosting.
Bản V5 này là HTML/CSS/JS tĩnh — KHÔNG deploy React/Node nguyên bản lên public_html.
API Hostinger token chỉ ĐỌC, không ghi file. FTP cổng 21/22 không kết nối được từ xa.
File Manager hPanel là cách duy nhất.

## Checklist 5 bước deploy
1. Backup toàn bộ public_html hiện tại qua hPanel File Manager (download zip).
2. Tải thư mục taiwanpay-v5/ từ GitHub repo tranducson511-create/fb-webhook-verify về máy.
3. Upload các file (index.html, style.css, app.js, admin.html) vào public_html/ (hoặc thư mục con nếu muốn giữ site cũ) qua hPanel File Manager. Không dùng FTP.
4. Kiểm tra trang chủ (taiwanpayapp.com), trang đổi tiền, thẻ thanh toán, admin trên browser. Clear cache.
5. Bật Cloudflare WAF. Cấu hình rate limit API 3 lần/giờ/IP, log admin, mã hóa PIN ở phía server (PHP hiện tại hoặc thêm endpoint).

## Bảo mật
- Cloudflare WAF
- Rate limit API 3 lần/giờ/IP (server-side)
- Log admin
- Mã hóa PIN

Repo: https://github.com/tranducson511-create/fb-webhook-verify/tree/main/taiwanpay-v5

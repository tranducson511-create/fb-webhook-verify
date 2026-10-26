# TaiwanPay V5 — Static HTML/CSS/JS for Hostinger Shared Hosting

Bản tĩnh (không React/Node). Phù hợp Hostinger shared hosting PHP hiện tại (public_html).

## Files trong taiwanpay-v5/

- `index.html` — Trang chủ đầy đủ: neon tím quanh logo, Taipei 101 bóng mờ mép phải, 3 hộp iPhone cam xếp lệch ~30°, nút "Gửi tiền ngay" cam rực, hình trang trí mờ như sương. Bao gồm section đổi tiền và thẻ thanh toán.
- `style.css` — Styles neon, mist, iPhones 30°, countdown (cam <30 phút, đỏ <5 phút), admin 3 cột, responsive.
- `app.js` — Logic đổi tiền (số lớn lên trước, bạn trả / phí NT$150 / người nhận, khóa báo giá, cả hai chiều Đài-Việt), barcode Code 39 (151001K5G, 00MRT261001ARMJK, 035782000001150) trong một khối ảnh, đồng hồ đếm ngược đúng phút, đa ngôn ngữ tách khỏi logic (câu thu ngân luôn tiếng Trung), hàng đợi admin mock ưu tiên.
- `admin.html` — Admin V5: hàng đợi đơn gấp lên trước (quá hạn → sắp hết hạn → chờ gửi mã → khách báo đã trả), mã đơn đầu dòng, nút đổi theo việc (Tạo TwPay Card / Xác nhận đã nhận tiền / Nhắc khách), trang đơn 3 cột thay popup, ảnh gốc + watermark go-vn chỉ admin thấy, hai giờ cạnh nhau (trên phiếu 19:50 / hết hạn 10:50), nút "Trừ 2 phút" ghi rõ, việc còn thiếu hiện ngay trên nút gửi.
- `README.md` — File này.

## 5 ngôn ngữ

Tiếng Việt, English, 繁體中文, Bahasa Indonesia, ภาษาไทย — tách ngôn ngữ khỏi logic.  
Câu thu ngân luôn tiếng Trung: **我要繳費，條碼在這裡。**

## LƯU Ý QUAN TRỌNG DEPLOY

Site taiwanpayapp.com hiện tại là **PHP** trong `public_html` trên Hostinger shared hosting.  
Bản V5 này là **HTML/CSS/JS tĩnh** — KHÔNG deploy React/Node nguyên bản lên public_html.  
API Hostinger token chỉ **ĐỌC**, không ghi file. FTP cổng 21/22 không kết nối được từ xa.  
**File Manager hPanel là cách duy nhất.**

## Checklist 5 bước deploy

1. **Backup** toàn bộ `public_html` hiện tại qua hPanel File Manager (Download as ZIP).
2. **Tải** thư mục `taiwanpay-v5/` từ GitHub repo `tranducson511-create/fb-webhook-verify` về máy (Download ZIP hoặc clone).
3. **Upload** các file (`index.html`, `style.css`, `app.js`, `admin.html`) vào `public_html/` (hoặc thư mục con nếu muốn giữ site cũ) qua hPanel File Manager. Không dùng FTP.
4. **Kiểm tra** trên browser: trang chủ (neon + 101 + iPhone cam), đổi tiền (số lớn, phí 150, cả 2 chiều, khóa báo giá), thẻ thanh toán (3 barcode Code 39 + countdown cam/đỏ), admin (hàng đợi ưu tiên, 3 cột, nút gửi hiện việc thiếu). Clear cache nếu cần.
5. **Bảo mật**: Bật Cloudflare WAF. Cấu hình rate limit API 3 lần/giờ/IP, log admin, mã hóa PIN ở phía server (PHP hiện tại hoặc thêm endpoint riêng).

## Bảo mật

- Cloudflare WAF
- Rate limit API 3 lần/giờ/IP (server-side)
- Log admin
- Mã hóa PIN

Repo: https://github.com/tranducson511-create/fb-webhook-verify/tree/main/taiwanpay-v5

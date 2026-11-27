# TaiwanPay V5 — Static HTML/CSS/JS for Hostinger Shared Hosting

Bản tĩnh (không React/Node). Phù hợp Hostinger shared hosting PHP hiện tại (`public_html`).

**Bàn giao hoàn tất cho Quyên bot — V5 static ready.**

## Files trong `taiwanpay-v5/`

- `index.html` — Trang chủ đầy đủ: neon tím quanh logo, Taipei 101 bóng mờ mép phải, 3 hộp iPhone cam xếp lệch ~30°, nút "Gửi tiền ngay" cam rực, hình trang trí mờ như sương. Bao gồm section đổi tiền và thẻ thanh toán.
- `style.css` — Styles neon, mist, iPhones 30°, countdown (cam <30 phút, đỏ <5 phút), admin 3 cột, responsive.
- `app.js` — Logic đổi tiền (số lớn lên trước, bạn trả / phí NT$150 / người nhận, khóa báo giá, cả hai chiều Đài-Việt), barcode Code 39 (`151001K5G`, `00MRT261001ARMJK`, `035782000001150`) trong một khối, đồng hồ đếm ngược đúng phút, đa ngôn ngữ tách khỏi logic (câu thu ngân luôn tiếng Trung), hàng đợi admin mock ưu tiên.
- `admin.html` — Admin V5: hàng đợi đơn gấp lên trước (quá hạn → sắp hết hạn → chờ gửi mã → khách báo đã trả), mã đơn đầu dòng, nút đổi theo việc (Tạo TwPay Card / Xác nhận đã nhận tiền / Nhắc khách), trang đơn 3 cột thay popup, ảnh gốc + watermark `go-vn` chỉ admin thấy, hai giờ cạnh nhau (trên phiếu 19:50 / hết hạn 10:50), nút "Trừ 2 phút" ghi rõ, việc còn thiếu hiện ngay trên nút gửi.
- `README.md` — File này.

## 5 ngôn ngữ

Tiếng Việt, English, 繁體中文, Bahasa Indonesia, ภาษาไทย — tách ngôn ngữ khỏi logic.

Câu thu ngân luôn tiếng Trung: **我要繳費，條碼在這裡。**

## LƯU Ý QUAN TRỌNG DEPLOY

Site hiện tại là PHP trong `public_html` Hostinger shared hosting.  
**KHÔNG** deploy React/Node raw. Bản này đã là HTML/CSS/JS tĩnh.

- Hostinger API token chỉ **ĐỌC**, không ghi file.
- FTP cổng 21/22 không kết nối được từ xa.
- **Chỉ dùng File Manager hPanel** để upload.

## Checklist 5 bước deploy lên Hostinger

1. Đăng nhập hPanel Hostinger → mở **File Manager**.
2. Vào thư mục `public_html` (hoặc thư mục domain taiwanpayapp.com).
3. Upload toàn bộ file trong thư mục `taiwanpay-v5/` (giữ nguyên cấu trúc: index.html, style.css, app.js, admin.html, README.md).
4. Đảm bảo `index.html` là file mặc định (Directory Index). Xóa hoặc đổi tên file PHP cũ nếu cần.
5. Test: mở https://taiwanpayapp.com → kiểm tra neon/iPhone/101, 5 ngôn ngữ, trang đổi tiền, barcode Code 39 + timer cam/đỏ, admin queue 3 cột + watermark.

## Bảo mật (ghi chú)

- Cloudflare WAF recommended cho domain.
- Rate limit API 3 lần/giờ/IP (triển khai ở backend riêng, không có trong static demo).
- Log admin mọi thao tác, mã hóa PIN (backend).
- Demo hiện tại chỉ frontend; dữ liệu mock.

Repo: https://github.com/tranducson511-create/fb-webhook-verify/tree/main/taiwanpay-v5

# TaiwanPay V5 - Static HTML/CSS/JS

Bản static hoàn chỉnh cho taiwanpayapp.com. **KHÔNG** deploy React/Node raw lên public_html Hostinger. Đã build thành HTML/CSS/JS thuần.

## Files đã tạo / cập nhật
- `index.html` — Trang chủ: neon tím quanh logo, 101 Taipei bóng mờ mép phải, ba hộp iPhone cam xếp lệch 30°, nút Gửi tiền ngay cam rực, hình trang trí mờ như sương.
- `exchange.html` — Đổi tiền: số lớn lên trước, bạn trả / phí NT$150 / người nhận, khóa báo giá, cả hai chiều Đài-Việt.
- `payment.html` — Thẻ thanh toán khách: 3 mã vạch Code 39 (151001K5G, 00MRT261001ARMJK, 035782000001150), nút Đưa màn hình cho nhân viên nền trắng, câu `我要繳費，條碼在這裡。` luôn tiếng Trung, đồng hồ đếm ngược (dưới 30 phút cam, dưới 5 phút đỏ).
- `admin.html` — Admin V5: hàng đợi đơn gấp lên trước (quá hạn, sắp hết hạn, chờ gửi mã, khách báo đã trả), mã đơn đầu dòng, nút đổi theo việc (Tạo TwPay Card / Xác nhận đã nhận tiền / Nhắc khách), trang đơn 3 cột, ảnh gốc + watermark go-vn chỉ admin thấy, hai giờ cạnh nhau (trên phiếu / hết hạn), nút Trừ 2 phút ghi rõ, việc còn thiếu hiện ngay trên nút gửi.
- `style.css` — Toàn bộ style (neon, iPhone offset, fog, admin grid, timer colors).
- `app.js` — Logic + i18n 5 ngôn ngữ (vi, en, zh-TW, id, th). Ngôn ngữ tách khỏi logic. Câu thu ngân luôn tiếng Trung.

## Bảo mật (ghi chú)
- Cloudflare WAF recommended cho domain.
- Rate limit API 3 lần/giờ/IP (triển khai ở backend riêng, không có trong static demo).
- Log admin mọi thao tác, mã hóa PIN (backend).
- Demo hiện tại chỉ frontend; dữ liệu mock.

## Checklist 5 bước deploy lên Hostinger (File Manager duy nhất)
1. Đăng nhập hPanel Hostinger → mở **File Manager**.
2. Vào thư mục `public_html` (hoặc thư mục domain taiwanpayapp.com).
3. Upload toàn bộ file trong thư mục `taiwanpay-v5/` (giữ nguyên cấu trúc: index.html, style.css, app.js, admin.html, exchange.html, payment.html, README.md).
4. Đảm bảo `index.html` là file mặc định (Directory Index). Xóa hoặc đổi tên file PHP cũ nếu cần.
5. Test: mở https://taiwanpayapp.com → kiểm tra neon/iPhone/101, 5 ngôn ngữ, trang đổi tiền, barcode Code 39 + timer cam/đỏ, admin queue 3 cột + watermark.

**Lưu ý quan trọng:**
- API Hostinger token chỉ ĐỌC, không ghi file.
- FTP cổng 21/22 không kết nối được từ xa.
- Chỉ dùng File Manager hPanel để upload.

Repo: https://github.com/tranducson511-create/fb-webhook-verify/tree/main/taiwanpay-v5

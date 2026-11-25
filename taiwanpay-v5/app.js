const i18n = {
  vi: { home: "Trang chủ", exchange: "Đổi tiền", payment: "Thẻ thanh toán", admin: "Admin", welcome: "Chào mừng đến TaiwanPay", desc: "Gửi tiền nhanh chóng giữa Đài Loan và Việt Nam.", exchangeTitle: "Đổi tiền", twToVn: "Đài → Việt", vnToTw: "Việt → Đài", youPay: "Bạn trả", fee: "Phí NT$150", recipient: "Người nhận", lockQuote: "Khóa báo giá", quoteOpen: "Báo giá mở", paymentTitle: "Thẻ thanh toán", showStaff: "Đưa màn hình cho nhân viên", adminTitle: "Admin V5 - Hàng đợi đơn gấp", minus2: "Trừ 2 phút" },
  en: { home: "Home", exchange: "Exchange", payment: "Payment Card", admin: "Admin", welcome: "Welcome to TaiwanPay", desc: "Fast money transfer between Taiwan and Vietnam.", exchangeTitle: "Exchange", twToVn: "TW → VN", vnToTw: "VN → TW", youPay: "You pay", fee: "Fee NT$150", recipient: "Recipient", lockQuote: "Lock quote", quoteOpen: "Quote open", paymentTitle: "Payment Card", showStaff: "Show screen to staff", adminTitle: "Admin V5 - Urgent Queue", minus2: "Minus 2 min" },
  zh: { home: "首頁", exchange: "換匯", payment: "繳費卡", admin: "管理", welcome: "歡迎來到 TaiwanPay", desc: "台灣與越南之間的快速匯款。", exchangeTitle: "換匯", twToVn: "台 → 越", vnToTw: "越 → 台", youPay: "您支付", fee: "手續費 NT$150", recipient: "收款人", lockQuote: "鎖定報價", quoteOpen: "報價開啟", paymentTitle: "繳費卡", showStaff: "把螢幕給店員看", adminTitle: "管理 V5 - 緊急隊列", minus2: "減 2 分鐘" },
  id: { home: "Beranda", exchange: "Tukar", payment: "Kartu Pembayaran", admin: "Admin", welcome: "Selamat datang di TaiwanPay", desc: "Transfer uang cepat antara Taiwan dan Vietnam.", exchangeTitle: "Tukar uang", twToVn: "TW → VN", vnToTw: "VN → TW", youPay: "Anda bayar", fee: "Biaya NT$150", recipient: "Penerima", lockQuote: "Kunci penawaran", quoteOpen: "Penawaran terbuka", paymentTitle: "Kartu Pembayaran", showStaff: "Tunjukkan layar ke staf", adminTitle: "Admin V5 - Antrian Mendesak", minus2: "Kurangi 2 menit" },
  th: { home: "หน้าแรก", exchange: "แลกเงิน", payment: "บัตรชำระเงิน", admin: "ผู้ดูแล", welcome: "ยินดีต้อนรับสู่ TaiwanPay", desc: "โอนเงินรวดเร็วระหว่างไต้หวันและเวียดนาม", exchangeTitle: "แลกเงิน", twToVn: "ไต้ → เวียด", vnToTw: "เวียด → ไต้", youPay: "คุณจ่าย", fee: "ค่าธรรมเนียม NT$150", recipient: "ผู้รับ", lockQuote: "ล็อคราคา", quoteOpen: "ราคาเปิด", paymentTitle: "บัตรชำระเงิน", showStaff: "แสดงหน้าจอให้พนักงาน", adminTitle: "ผู้ดูแล V5 - คิวเร่งด่วน", minus2: "ลบ 2 นาที" }
};

function setLang(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const langSelect = document.getElementById('lang');
  if (langSelect) {
    const saved = localStorage.getItem('lang') || 'vi';
    langSelect.value = saved;
    setLang(saved);
    langSelect.addEventListener('change', () => setLang(langSelect.value));
  }

  const timerEl = document.getElementById('timer');
  if (timerEl) {
    let seconds = 29 * 60 + 59;
    setInterval(() => {
      seconds--;
      if (seconds < 0) seconds = 0;
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      timerEl.textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
      timerEl.classList.toggle('red', seconds < 5 * 60);
      timerEl.style.color = seconds < 5 * 60 ? '#ff0000' : (seconds < 30 * 60 ? '#ff6b00' : '#fff');
    }, 1000);
  }

  const youPay = document.getElementById('you-pay');
  if (youPay) {
    let amount = 10000;
    youPay.textContent = amount.toLocaleString();
    document.getElementById('lock-quote')?.addEventListener('click', () => {
      document.getElementById('quote-status').textContent = 'Đã khóa';
    });
  }

  const queue = document.getElementById('queue');
  if (queue) {
    const orders = [
      { id: 'TP001', status: 'Quá hạn', action: 'Tạo TwPay Card' },
      { id: 'TP002', status: 'Sắp hết hạn', action: 'Xác nhận đã nhận tiền' },
      { id: 'TP003', status: 'Chờ gửi mã', action: 'Nhắc khách' }
    ];
    orders.forEach(o => {
      const div = document.createElement('div');
      div.className = 'queue-item';
      div.innerHTML = `<strong>${o.id}</strong> - ${o.status} <button>${o.action}</button>`;
      div.onclick = () => {
        document.getElementById('order-detail').style.display = 'grid';
        document.getElementById('action-btn').textContent = o.action;
      };
      queue.appendChild(div);
    });
  }
});
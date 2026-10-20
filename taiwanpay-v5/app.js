// Translations - separated from logic. Cashier phrase always Chinese.
const translations = {
  vi: {
    logo: "TaiwanPay",
    heroTitle: "Gửi tiền ngay từ Đài Loan về Việt Nam",
    sendNow: "Gửi tiền ngay",
    exchangeTitle: "Đổi tiền",
    twToVn: "Đài → Việt",
    vnToTw: "Việt → Đài",
    youPay: "Bạn trả",
    fee: "Phí NT$150",
    receiver: "Người nhận",
    lockRate: "Khóa báo giá",
    proceed: "Tiếp tục thanh toán",
    paymentTitle: "Thẻ thanh toán",
    showToStaff: "Đưa màn hình cho nhân viên",
    cashierNote: "Câu thu ngân: 我要繳費，條碼在這裡。",
    cashierPhrase: "我要繳費，條碼在這裡。"
  },
  en: {
    logo: "TaiwanPay",
    heroTitle: "Send money now from Taiwan to Vietnam",
    sendNow: "Send Money Now",
    exchangeTitle: "Exchange",
    twToVn: "TW → VN",
    vnToTw: "VN → TW",
    youPay: "You pay",
    fee: "Fee NT$150",
    receiver: "Receiver",
    lockRate: "Lock rate",
    proceed: "Proceed to payment",
    paymentTitle: "Payment Card",
    showToStaff: "Show screen to staff",
    cashierNote: "Cashier phrase: 我要繳費，條碼在這裡。",
    cashierPhrase: "我要繳費，條碼在這裡。"
  },
  "zh-TW": {
    logo: "TaiwanPay",
    heroTitle: "立即從台灣匯款到越南",
    sendNow: "立即匯款",
    exchangeTitle: "換匯",
    twToVn: "台 → 越",
    vnToTw: "越 → 台",
    youPay: "您支付",
    fee: "手續費 NT$150",
    receiver: "收款人",
    lockRate: "鎖定匯率",
    proceed: "繼續付款",
    paymentTitle: "付款卡",
    showToStaff: "將螢幕給店員",
    cashierNote: "收銀句: 我要繳費，條碼在這裡。",
    cashierPhrase: "我要繳費，條碼在這裡。"
  },
  id: {
    logo: "TaiwanPay",
    heroTitle: "Kirim uang sekarang dari Taiwan ke Vietnam",
    sendNow: "Kirim Uang Sekarang",
    exchangeTitle: "Tukar",
    twToVn: "TW → VN",
    vnToTw: "VN → TW",
    youPay: "Anda bayar",
    fee: "Biaya NT$150",
    receiver: "Penerima",
    lockRate: "Kunci kurs",
    proceed: "Lanjut ke pembayaran",
    paymentTitle: "Kartu Pembayaran",
    showToStaff: "Tunjukkan layar ke staf",
    cashierNote: "Kalimat kasir: 我要繳費，條碼在這裡。",
    cashierPhrase: "我要繳費，條碼在這裡。"
  },
  th: {
    logo: "TaiwanPay",
    heroTitle: "ส่งเงินทันทีจากไต้หวันไปเวียดนาม",
    sendNow: "ส่งเงินทันที",
    exchangeTitle: "แลกเปลี่ยน",
    twToVn: "TW → VN",
    vnToTw: "VN → TW",
    youPay: "คุณจ่าย",
    fee: "ค่าธรรมเนียม NT$150",
    receiver: "ผู้รับ",
    lockRate: "ล็อกอัตรา",
    proceed: "ดำเนินการชำระ",
    paymentTitle: "บัตรชำระ",
    showToStaff: "แสดงหน้าจอให้พนักงาน",
    cashierNote: "ประโยคแคชเชียร์: 我要繳費，條碼在這裡。",
    cashierPhrase: "我要繳費，條碼在這裡。"
  }
};

let currentLang = 'vi';
let direction = 'tw-vn';
let locked = false;

function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
  document.documentElement.lang = lang === 'zh-TW' ? 'zh-Hant' : lang;
}

function setDirection(dir) {
  direction = dir;
  updateExchange();
}

function updateExchange() {
  // Mock rates. Big numbers first.
  if (direction === 'tw-vn') {
    document.getElementById('bigAmount').textContent = 'NT$ 10,000';
    document.getElementById('youPay').textContent = 'NT$ 10,150';
    document.getElementById('receiver').textContent = 'VND 7,500,000';
  } else {
    document.getElementById('bigAmount').textContent = 'VND 7,500,000';
    document.getElementById('youPay').textContent = 'VND 7,650,000';
    document.getElementById('receiver').textContent = 'NT$ 10,000';
  }
}

function lockRate() {
  locked = true;
  alert(translations[currentLang].lockRate + ' OK');
}

function showExchange() {
  document.getElementById('hero').style.display = 'none';
  document.getElementById('exchange').style.display = 'block';
  document.getElementById('payment').style.display = 'none';
  updateExchange();
}

function showPayment() {
  document.getElementById('hero').style.display = 'none';
  document.getElementById('exchange').style.display = 'none';
  document.getElementById('payment').style.display = 'block';
  generateBarcodes();
  startCountdown(29);
}

function generateBarcodes() {
  // One image with 3 Code 39 barcodes
  JsBarcode("#barcode1", "151001K5G", { format: "CODE39", width: 2, height: 60, displayValue: true });
  JsBarcode("#barcode2", "00MRT261001ARMJK", { format: "CODE39", width: 2, height: 60, displayValue: true });
  JsBarcode("#barcode3", "035782000001150", { format: "CODE39", width: 2, height: 60, displayValue: true });
}

function startCountdown(minutes) {
  let remaining = minutes * 60;
  const el = document.getElementById('countdown');
  if (!el) return;
  const interval = setInterval(() => {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    el.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    el.className = 'countdown';
    if (remaining < 5 * 60) el.classList.add('red');
    else if (remaining < 30 * 60) el.classList.add('orange');
    remaining--;
    if (remaining < 0) {
      clearInterval(interval);
      el.textContent = '00:00';
    }
  }, 1000);
}

// Admin mock
const mockOrders = [
  { id: 'ORD-001', status: 'Quá hạn', priority: 4, task: 'Tạo TwPay Card' },
  { id: 'ORD-002', status: 'Sắp hết hạn', priority: 3, task: 'Nhắc khách' },
  { id: 'ORD-003', status: 'Chờ gửi mã', priority: 2, task: 'Tạo TwPay Card' },
  { id: 'ORD-004', status: 'Khách báo đã trả', priority: 1, task: 'Xác nhận đã nhận tiền' }
];

function renderAdminQueue() {
  const queue = document.getElementById('queue');
  if (!queue) return;
  const sorted = mockOrders.sort((a, b) => b.priority - a.priority);
  queue.innerHTML = sorted.map(o => `
    <div class="order-row">
      <span class="order-id">${o.id}</span>
      <span>${o.status}</span>
      <button onclick="alert('${o.task}')">${o.task}</button>
    </div>
  `).join('');
}

function subtractMinutes() {
  alert('Trừ 2 phút - đã cập nhật thời gian');
}

// Security notes (implement server-side):
// - Cloudflare WAF
// - Rate limit API 3 times/hour/IP
// - Admin logs
// - PIN encryption

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  if (document.getElementById('queue')) {
    renderAdminQueue();
  }
});

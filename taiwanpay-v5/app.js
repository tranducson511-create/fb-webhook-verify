// TaiwanPay V5 - Client Logic (static)
// Translations separated from logic. Cashier phrase ALWAYS Chinese.
const translations = {
  vi: {
    logo: "TaiwanPay",
    logoSub: "Đổi tiền · Gửi về nhà · Thanh toán tại Đài Loan",
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
    showToStaff: "Đưa màn hình cho nhân viên"
  },
  en: {
    logo: "TaiwanPay",
    logoSub: "Exchange · Send home · Pay in Taiwan",
    heroTitle: "Send money now from Taiwan to Vietnam",
    sendNow: "Send Money Now",
    exchangeTitle: "Exchange",
    twToVn: "TW → VN",
    vnToTw: "VN → TW",
    youPay: "You pay",
    fee: "Fee NT$150",
    receiver: "Recipient gets",
    lockRate: "Lock rate",
    proceed: "Proceed to payment",
    paymentTitle: "Payment Card",
    showToStaff: "Show screen to staff"
  },
  "zh-TW": {
    logo: "TaiwanPay",
    logoSub: "換匯 · 匯回家 · 在台灣付款",
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
    showToStaff: "將螢幕給店員"
  },
  id: {
    logo: "TaiwanPay",
    logoSub: "Tukar · Kirim pulang · Bayar di Taiwan",
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
    showToStaff: "Tunjukkan layar ke staf"
  },
  th: {
    logo: "TaiwanPay",
    logoSub: "แลกเปลี่ยน · ส่งกลับบ้าน · ชำระที่ไต้หวัน",
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
    showToStaff: "แสดงหน้าจอให้พนักงาน"
  }
};

let currentLang = localStorage.getItem('tp_lang') || 'vi';
let direction = 'tw-vn';
let locked = false;
const RATE = 820; // mock 1 NT$ = 820 VND
let countdownInterval = null;

const TP = {
  setLang(lang) {
    currentLang = lang;
    localStorage.setItem('tp_lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[currentLang] && translations[currentLang][key]) {
        el.textContent = translations[currentLang][key];
      }
    });
    document.documentElement.lang = lang === 'zh-TW' ? 'zh-Hant' : lang;
  },
  setDirection(dir) {
    direction = dir;
    document.getElementById('btn-tw-vn').classList.toggle('active', dir === 'tw-vn');
    document.getElementById('btn-vn-tw').classList.toggle('active', dir === 'vn-tw');
    TP.updateExchange();
  },
  updateExchange() {
    const input = document.getElementById('amountInput');
    if (!input) return;
    let amount = parseInt(input.value) || 0;
    const big = document.getElementById('bigAmount');
    const youPay = document.getElementById('youPay');
    const receiver = document.getElementById('receiver');
    if (direction === 'tw-vn') {
      big.textContent = `NT$ ${amount.toLocaleString()}`;
      youPay.textContent = `NT$ ${(amount + 150).toLocaleString()}`;
      receiver.textContent = `VND ${(amount * RATE).toLocaleString()}`;
    } else {
      big.textContent = `VND ${amount.toLocaleString()}`;
      const nt = Math.floor(amount / RATE);
      youPay.textContent = `VND ${amount.toLocaleString()}`;
      receiver.textContent = `NT$ ${Math.max(0, nt - 150).toLocaleString()}`;
    }
  },
  lockRate() {
    locked = true;
    const status = document.getElementById('rateStatus');
    if (status) status.textContent = translations[currentLang].lockRate + ' ✓';
    alert(translations[currentLang].lockRate + ' - Đã khóa');
  },
  showExchange() {
    document.getElementById('hero').style.display = 'none';
    document.getElementById('exchange').style.display = 'block';
    document.getElementById('payment').style.display = 'none';
    TP.updateExchange();
  },
  showPayment() {
    document.getElementById('hero').style.display = 'none';
    document.getElementById('exchange').style.display = 'none';
    document.getElementById('payment').style.display = 'block';
    TP.generateBarcodes();
    TP.startCountdown(29);
  },
  showCashierPhrase() {
    // Always Chinese for cashier
    alert('我要繳費，條碼在這裡。');
  },
  generateBarcodes() {
    if (typeof JsBarcode === 'undefined') return;
    JsBarcode("#barcode1", "151001K5G", { format: "CODE39", width: 1.7, height: 55, displayValue: true, fontSize: 11, margin: 4 });
    JsBarcode("#barcode2", "00MRT261001ARMJK", { format: "CODE39", width: 1.5, height: 55, displayValue: true, fontSize: 11, margin: 4 });
    JsBarcode("#barcode3", "035782000001150", { format: "CODE39", width: 1.7, height: 55, displayValue: true, fontSize: 11, margin: 4 });
  },
  startCountdown(minutes) {
    if (countdownInterval) clearInterval(countdownInterval);
    let remaining = minutes * 60;
    const el = document.getElementById('countdown');
    if (!el) return;
    countdownInterval = setInterval(() => {
      const mins = Math.floor(remaining / 60);
      const secs = remaining % 60;
      el.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
      el.className = 'countdown';
      if (remaining < 5 * 60) el.classList.add('red');
      else if (remaining < 30 * 60) el.classList.add('orange');
      remaining--;
      if (remaining < 0) {
        clearInterval(countdownInterval);
        el.textContent = '00:00';
        el.classList.add('red');
      }
    }, 1000);
  }
};

// Admin mock - priority: overdue > expiring soon > waiting code > customer reported paid
const mockOrders = [
  { id: 'TP-261024-001', status: 'Quá hạn', priority: 4, task: 'Tạo TwPay Card', missing: 'Thiếu ảnh ARC', slip: '19:50', expire: '10:50' },
  { id: 'TP-261024-002', status: 'Sắp hết hạn', priority: 3, task: 'Nhắc khách', missing: '', slip: '20:10', expire: '11:10' },
  { id: 'TP-261024-003', status: 'Chờ gửi mã', priority: 2, task: 'Tạo TwPay Card', missing: 'Chưa gửi mã', slip: '20:30', expire: '11:30' },
  { id: 'TP-261024-004', status: 'Khách báo đã trả', priority: 1, task: 'Xác nhận đã nhận tiền', missing: '', slip: '19:00', expire: '10:00' }
];

function renderAdminQueue() {
  const queue = document.getElementById('queue');
  if (!queue) return;
  const sorted = [...mockOrders].sort((a, b) => b.priority - a.priority);
  queue.innerHTML = sorted.map(o => `
    <div class="order-row" onclick="TP.selectOrder('${o.id}')">
      <span class="order-id">${o.id}</span>
      <span>${o.status}</span>
      <button onclick="event.stopPropagation(); alert('${o.task}${o.missing ? ' - ' + o.missing : ''}')">${o.task}</button>
    </div>
  `).join('');
}

TP.selectOrder = function(id) {
  const o = mockOrders.find(x => x.id === id);
  if (!o) return;
  document.getElementById('orderDetail').style.display = 'grid';
  document.getElementById('detailId').textContent = o.id;
  document.getElementById('detailStatus').textContent = o.status;
  document.getElementById('detailTask').textContent = 'Nút đổi theo việc: ' + o.task;
  document.getElementById('slipTime').textContent = o.slip;
  document.getElementById('expireTime').textContent = o.expire;
  const sendBtn = document.getElementById('sendBtn');
  const missingText = o.missing || 'OK';
  sendBtn.textContent = 'Gửi (' + missingText + ')';
  sendBtn.onclick = () => alert('Việc còn thiếu: ' + (o.missing || 'Không thiếu'));
};

TP.subtractMinutes = function() {
  alert('Trừ 2 phút - đã cập nhật thời gian hết hạn (trên phiếu / hết hạn)');
};

document.addEventListener('DOMContentLoaded', () => {
  TP.setLang(currentLang);
  if (document.getElementById('queue')) {
    renderAdminQueue();
  }
});

window.TP = TP;

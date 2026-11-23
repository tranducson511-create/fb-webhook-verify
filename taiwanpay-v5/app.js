// TaiwanPay V5 — Client logic (static for Hostinger public_html)
// Language fully separated. Cashier phrase ALWAYS Chinese.
const translations = {
  vi: {
    logoSub: 'Đổi tiền · Gửi về nhà · Thanh toán tại Đài Loan',
    cta: 'Gửi tiền ngay',
    exchange: 'Đổi tiền',
    youPay: 'Bạn trả',
    fee: 'Phí NT$150',
    recipient: 'Người nhận',
    lockRate: 'Khóa báo giá',
    dirTwdVnd: 'Đài → Việt',
    dirVndTwd: 'Việt → Đài',
    amountLabel: 'Số tiền',
    paymentCard: 'Thẻ thanh toán',
    showScreen: 'Đưa màn hình cho nhân viên'
  },
  en: {
    logoSub: 'Exchange · Send home · Pay in Taiwan',
    cta: 'Send money now',
    exchange: 'Exchange',
    youPay: 'You pay',
    fee: 'Fee NT$150',
    recipient: 'Recipient gets',
    lockRate: 'Lock rate',
    dirTwdVnd: 'TW → VN',
    dirVndTwd: 'VN → TW',
    amountLabel: 'Amount',
    paymentCard: 'Payment card',
    showScreen: 'Show screen to staff'
  },
  'zh-TW': {
    logoSub: '換匯 · 匯回家 · 在台灣付款',
    cta: '立即匯款',
    exchange: '換匯',
    youPay: '您支付',
    fee: '手續費 NT$150',
    recipient: '收款人收到',
    lockRate: '鎖定匯率',
    dirTwdVnd: '台 → 越',
    dirVndTwd: '越 → 台',
    amountLabel: '金額',
    paymentCard: '付款卡',
    showScreen: '將螢幕出示給店員'
  },
  id: {
    logoSub: 'Tukar · Kirim pulang · Bayar di Taiwan',
    cta: 'Kirim uang sekarang',
    exchange: 'Tukar uang',
    youPay: 'Anda bayar',
    fee: 'Biaya NT$150',
    recipient: 'Penerima dapat',
    lockRate: 'Kunci kurs',
    dirTwdVnd: 'TW → VN',
    dirVndTwd: 'VN → TW',
    amountLabel: 'Jumlah',
    paymentCard: 'Kartu pembayaran',
    showScreen: 'Tunjukkan layar ke petugas'
  },
  th: {
    logoSub: 'แลกเงิน · ส่งกลับบ้าน · ชำระที่ไต้หวัน',
    cta: 'ส่งเงินทันที',
    exchange: 'แลกเงิน',
    youPay: 'คุณจ่าย',
    fee: 'ค่าธรรมเนียม NT$150',
    recipient: 'ผู้รับได้',
    lockRate: 'ล็อกเรท',
    dirTwdVnd: 'ไต้หวัน → เวียดนาม',
    dirVndTwd: 'เวียดนาม → ไต้หวัน',
    amountLabel: 'จำนวน',
    paymentCard: 'บัตรชำระเงิน',
    showScreen: 'แสดงหน้าจอให้พนักงาน'
  }
};

const RATE = 820;
const FEE = 150;
let currentLang = localStorage.getItem('tp_lang') || 'vi';
let direction = 'tw-vn';
let locked = false;
let countdownSeconds = 28 * 60;
let countdownTimer = null;

const mockOrders = [
  { id: 'TP-261014-001', status: 'overdue', slipTime: '19:50', expireTime: '10:50', amount: 15000, missing: 'Thiếu ảnh ARC', priority: 1 },
  { id: 'TP-261014-002', status: 'expiring', slipTime: '20:10', expireTime: '11:05', amount: 8000, missing: '', priority: 2 },
  { id: 'TP-261014-003', status: 'waiting', slipTime: '20:30', expireTime: '11:30', amount: 12000, missing: 'Chưa gửi mã', priority: 3 },
  { id: 'TP-261014-004', status: 'paid', slipTime: '19:00', expireTime: '10:00', amount: 5000, missing: '', priority: 4 },
  { id: 'TP-261014-005', status: 'waiting', slipTime: '21:00', expireTime: '12:00', amount: 20000, missing: 'Thiếu biên lai', priority: 3 }
];

const TP = {
  setLang(lang) {
    currentLang = lang;
    localStorage.setItem('tp_lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[currentLang]?.[key]) el.textContent = translations[currentLang][key];
    });
    document.documentElement.lang = lang === 'zh-TW' ? 'zh-Hant' : lang;
  },

  setDirection(dir) {
    direction = dir;
    document.getElementById('btn-tw-vn')?.classList.toggle('active', dir === 'tw-vn');
    document.getElementById('btn-vn-tw')?.classList.toggle('active', dir === 'vn-tw');
    this.updateExchange();
  },

  updateExchange() {
    const input = document.getElementById('amountInput');
    if (!input) return;
    let amount = parseInt(input.value, 10) || 0;
    const big = document.getElementById('bigAmount');
    const youPay = document.getElementById('youPay');
    const receiver = document.getElementById('receiver');

    if (direction === 'tw-vn') {
      big.textContent = `NT$ ${amount.toLocaleString()}`;
      youPay.textContent = `NT$ ${(amount + FEE).toLocaleString()}`;
      receiver.textContent = `₫ ${(amount * RATE).toLocaleString()}`;
    } else {
      big.textContent = `₫ ${amount.toLocaleString()}`;
      youPay.textContent = `₫ ${amount.toLocaleString()}`;
      const twd = Math.max(0, Math.floor(amount / RATE) - FEE);
      receiver.textContent = `NT$ ${twd.toLocaleString()}`;
    }
  },

  lockRate() {
    locked = true;
    const btn = document.getElementById('lockBtn');
    if (btn) {
      btn.classList.add('locked');
      btn.textContent = translations[currentLang]?.lockRate || 'Đã khóa';
    }
  },

  startCountdown() {
    if (countdownTimer) clearInterval(countdownTimer);
    const el = document.getElementById('countdown');
    if (!el) return;
    const tick = () => {
      const m = Math.floor(countdownSeconds / 60);
      const s = countdownSeconds % 60;
      el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      el.classList.remove('warn', 'red');
      if (countdownSeconds < 5 * 60) {
        el.classList.add('red');
      } else if (countdownSeconds < 30 * 60) {
        el.classList.add('warn');
      }
      if (countdownSeconds > 0) countdownSeconds--;
    };
    tick();
    countdownTimer = setInterval(tick, 1000);
  },

  renderAdmin() {
    const queue = document.getElementById('queue');
    if (!queue) return;
    const sorted = [...mockOrders].sort((a, b) => a.priority - b.priority);
    queue.innerHTML = sorted.map(o => `
      <div class="order-item ${o.status}">
        <span class="order-id">${o.id}</span>
        <span>${o.amount.toLocaleString()} NT$</span>
        <div class="times">
          <span>Phiếu ${o.slipTime}</span>
          <span>Hết hạn ${o.expireTime}</span>
        </div>
        <div class="actions">
          ${o.status === 'waiting' || o.status === 'overdue' ? `<button class="btn-primary" onclick="TP.action('${o.id}','create')">Tạo TwPay Card</button>` : ''}
          ${o.status === 'paid' ? `<button class="btn-success" onclick="TP.action('${o.id}','confirm')">Xác nhận đã nhận tiền</button>` : ''}
          ${o.missing ? `<button class="btn-warn" onclick="TP.action('${o.id}','remind')">Nhắc khách</button>` : ''}
          <button onclick="TP.minus2('${o.id}')">Trừ 2 phút</button>
        </div>
        ${o.missing ? `<div class="missing">Còn thiếu: ${o.missing}</div>` : ''}
      </div>
    `).join('');
  },

  action(id, type) {
    const labels = { create: 'Tạo TwPay Card', confirm: 'Xác nhận đã nhận tiền', remind: 'Nhắc khách' };
    alert(`${labels[type] || type} cho đơn ${id}`);
  },

  minus2(id) {
    alert(`Đã trừ 2 phút cho đơn ${id} (ghi rõ trên phiếu)`);
  },

  openDetail(id) {
    const detail = document.getElementById('detail');
    if (!detail) return;
    const o = mockOrders.find(x => x.id === id) || mockOrders[0];
    detail.innerHTML = `
      <div class="detail-grid">
        <div class="detail-col">
          <h3>${o.id}</h3>
          <p>Số tiền: ${o.amount.toLocaleString()} NT$</p>
          <div class="times">
            <div>Trên phiếu: <strong>${o.slipTime}</strong></div>
            <div>Hết hạn: <strong>${o.expireTime}</strong></div>
          </div>
          <button class="btn-primary" style="margin-top:1rem;width:100%" onclick="TP.action('${o.id}','send')">
            Gửi mã${o.missing ? ' (còn thiếu: ' + o.missing + ')' : ''}
          </button>
        </div>
        <div class="detail-col">
          <div class="img-box">
            <div style="background:#222;height:180px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#666">Ảnh gốc</div>
            <div class="watermark">go-vn</div>
          </div>
          <p style="margin-top:.5rem;font-size:.85rem">Watermark go-vn chỉ admin thấy</p>
        </div>
        <div class="detail-col">
          <h4>Hành động</h4>
          <button class="btn-primary" style="width:100%;margin:.4rem 0" onclick="TP.action('${o.id}','create')">Tạo TwPay Card</button>
          <button class="btn-success" style="width:100%;margin:.4rem 0" onclick="TP.action('${o.id}','confirm')">Xác nhận đã nhận tiền</button>
          <button class="btn-warn" style="width:100%;margin:.4rem 0" onclick="TP.action('${o.id}','remind')">Nhắc khách</button>
          <button style="width:100%;margin:.4rem 0" onclick="TP.minus2('${o.id}')">Trừ 2 phút</button>
        </div>
      </div>
    `;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  TP.setLang(currentLang);
  TP.updateExchange();
  TP.startCountdown();
  if (document.getElementById('queue')) {
    TP.renderAdmin();
    TP.openDetail(mockOrders[0].id);
  }
});

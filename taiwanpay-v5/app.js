/* TaiwanPay V5 - Client Logic */
(function () {
  'use strict';

  // ========== i18n ==========
  const translations = {
    vi: {
      logoSub: 'Đổi tiền · Gửi về nhà · Thanh toán tại Đài Loan',
      cta: 'Gửi tiền ngay',
      exchange: 'Đổi tiền',
      youPay: 'Bạn trả',
      fee: 'Phí',
      recipient: 'Người nhận',
      lockRate: 'Đã khóa báo giá',
      dirTwdVnd: 'Đài → Việt',
      dirVndTwd: 'Việt → Đài',
      amountLabel: 'Số tiền',
      createOrder: 'Tạo lệnh đổi tiền',
      paymentCard: 'Thẻ thanh toán',
      showScreen: 'Đưa màn hình cho nhân viên',
      cashier: '我要繳費，條碼在這裡。',
      home: 'Trang chủ',
      pay: 'Thanh toán',
      admin: 'Admin',
      overdue: 'Quá hạn',
      expiring: 'Sắp hết hạn',
      waitingCode: 'Chờ gửi mã',
      customerPaid: 'Khách báo đã trả',
      createCard: 'Tạo TwPay Card',
      confirmReceived: 'Xác nhận đã nhận tiền',
      remindCustomer: 'Nhắc khách',
      deduct2min: 'Trừ 2 phút',
      onSlip: 'Trên phiếu',
      expires: 'Hết hạn',
      missingInfo: 'Thiếu thông tin',
      rateLocked: 'Tỷ giá đã khóa',
      navHome: 'Home',
      navExchange: 'Đổi tiền',
      navCard: 'Thẻ TT',
    },
    en: {
      logoSub: 'Exchange · Send home · Pay in Taiwan',
      cta: 'Send money now',
      exchange: 'Exchange',
      youPay: 'You pay',
      fee: 'Fee',
      recipient: 'Recipient gets',
      lockRate: 'Rate locked',
      dirTwdVnd: 'TW → VN',
      dirVndTwd: 'VN → TW',
      amountLabel: 'Amount',
      createOrder: 'Create exchange order',
      paymentCard: 'Payment card',
      showScreen: 'Show screen to staff',
      cashier: '我要繳費，條碼在這裡。',
      home: 'Home',
      pay: 'Payment',
      admin: 'Admin',
      overdue: 'Overdue',
      expiring: 'Expiring soon',
      waitingCode: 'Waiting for code',
      customerPaid: 'Customer reported paid',
      createCard: 'Create TwPay Card',
      confirmReceived: 'Confirm money received',
      remindCustomer: 'Remind customer',
      deduct2min: 'Deduct 2 min',
      onSlip: 'On slip',
      expires: 'Expires',
      missingInfo: 'Missing info',
      rateLocked: 'Rate locked',
      navHome: 'Home',
      navExchange: 'Exchange',
      navCard: 'Card',
    },
    zh: {
      logoSub: '換匯 · 匯款回家 · 在台灣付款',
      cta: '立即匯款',
      exchange: '換匯',
      youPay: '您支付',
      fee: '手續費',
      recipient: '收款人收到',
      lockRate: '匯率已鎖定',
      dirTwdVnd: '台 → 越',
      dirVndTwd: '越 → 台',
      amountLabel: '金額',
      createOrder: '建立換匯訂單',
      paymentCard: '付款卡',
      showScreen: '將螢幕出示給店員',
      cashier: '我要繳費，條碼在這裡。',
      home: '首頁',
      pay: '付款',
      admin: '管理',
      overdue: '已過期',
      expiring: '即將過期',
      waitingCode: '等待發送條碼',
      customerPaid: '客戶回報已付款',
      createCard: '建立 TwPay 卡',
      confirmReceived: '確認已收款',
      remindCustomer: '提醒客戶',
      deduct2min: '扣除 2 分鐘',
      onSlip: '單據時間',
      expires: '到期時間',
      missingInfo: '資料不足',
      rateLocked: '匯率已鎖定',
      navHome: '首頁',
      navExchange: '換匯',
      navCard: '付款卡',
    },
    id: {
      logoSub: 'Tukar uang · Kirim pulang · Bayar di Taiwan',
      cta: 'Kirim uang sekarang',
      exchange: 'Tukar uang',
      youPay: 'Anda bayar',
      fee: 'Biaya',
      recipient: 'Penerima dapat',
      lockRate: 'Kurs terkunci',
      dirTwdVnd: 'TW → VN',
      dirVndTwd: 'VN → TW',
      amountLabel: 'Jumlah',
      createOrder: 'Buat pesanan tukar',
      paymentCard: 'Kartu pembayaran',
      showScreen: 'Tunjukkan layar ke petugas',
      cashier: '我要繳費，條碼在這裡。',
      home: 'Beranda',
      pay: 'Bayar',
      admin: 'Admin',
      overdue: 'Terlambat',
      expiring: 'Hampir habis',
      waitingCode: 'Menunggu kode',
      customerPaid: 'Pelanggan laporkan bayar',
      createCard: 'Buat TwPay Card',
      confirmReceived: 'Konfirmasi uang diterima',
      remindCustomer: 'Ingatkan pelanggan',
      deduct2min: 'Kurangi 2 menit',
      onSlip: 'Di slip',
      expires: 'Kedaluwarsa',
      missingInfo: 'Info kurang',
      rateLocked: 'Kurs terkunci',
      navHome: 'Home',
      navExchange: 'Tukar',
      navCard: 'Kartu',
    },
    th: {
      logoSub: 'แลกเงิน · ส่งกลับบ้าน · ชำระที่ไต้หวัน',
      cta: 'ส่งเงินเลย',
      exchange: 'แลกเงิน',
      youPay: 'คุณจ่าย',
      fee: 'ค่าธรรมเนียม',
      recipient: 'ผู้รับได้',
      lockRate: 'ล็อคอัตราแล้ว',
      dirTwdVnd: 'ไต้ → เวียด',
      dirVndTwd: 'เวียด → ไต้',
      amountLabel: 'จำนวน',
      createOrder: 'สร้างคำสั่งแลก',
      paymentCard: 'บัตรชำระเงิน',
      showScreen: 'แสดงหน้าจอให้พนักงาน',
      cashier: '我要繳費，條碼在這裡。',
      home: 'หน้าหลัก',
      pay: 'ชำระ',
      admin: 'แอดมิน',
      overdue: 'เลยกำหนด',
      expiring: 'ใกล้หมดอายุ',
      waitingCode: 'รอส่งรหัส',
      customerPaid: 'ลูกค้ารายงานชำระแล้ว',
      createCard: 'สร้าง TwPay Card',
      confirmReceived: 'ยืนยันรับเงินแล้ว',
      remindCustomer: 'เตือนลูกค้า',
      deduct2min: 'หัก 2 นาที',
      onSlip: 'บนใบเสร็จ',
      expires: 'หมดอายุ',
      missingInfo: 'ข้อมูลไม่ครบ',
      rateLocked: 'ล็อคอัตราแล้ว',
      navHome: 'Home',
      navExchange: 'แลก',
      navCard: 'บัตร',
    }
  };

  let currentLang = localStorage.getItem('tp_lang') || 'vi';
  let direction = 'twd-vnd';
  let lockedRate = 820;
  let amount = 10000;
  let fee = 150;
  let countdownSeconds = 28 * 60;
  let countdownTimer = null;

  const mockOrders = [
    { id: 'TP-261014-001', status: 'overdue', slipTime: '19:50', expireTime: '10:50', amount: 15000, missing: 'Thiếu ảnh ARC', priority: 1 },
    { id: 'TP-261014-002', status: 'expiring', slipTime: '20:10', expireTime: '11:05', amount: 8000, missing: '', priority: 2 },
    { id: 'TP-261014-003', status: 'waiting', slipTime: '20:30', expireTime: '11:30', amount: 12000, missing: 'Chưa gửi mã', priority: 3 },
    { id: 'TP-261014-004', status: 'paid', slipTime: '19:00', expireTime: '10:00', amount: 5000, missing: '', priority: 4 },
    { id: 'TP-261014-005', status: 'waiting', slipTime: '20:45', expireTime: '11:45', amount: 20000, missing: '', priority: 3 },
  ];

  function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || translations.vi[key] || key;
  }

  function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    document.querySelectorAll('[data-cashier]').forEach(el => {
      el.textContent = '我要繳費，條碼在這裡。';
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('tp_lang', lang);
    applyI18n();
    renderExchange();
    if (document.getElementById('admin-queue')) renderAdmin();
  }

  function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById(pageId);
    if (page) page.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.page === pageId);
    });
    if (pageId === 'page-card') startCountdown();
    if (pageId === 'page-admin') renderAdmin();
  }

  function calcRecipient() {
    if (direction === 'twd-vnd') {
      const pay = amount + fee;
      const recv = Math.round(amount * lockedRate);
      return { youPay: pay, youPayUnit: 'NT$', recipient: recv, recipientUnit: '₫' };
    } else {
      const twd = Math.floor(amount / lockedRate);
      const pay = amount;
      return { youPay: pay, youPayUnit: '₫', recipient: twd - fee, recipientUnit: 'NT$' };
    }
  }

  function renderExchange() {
    const c = calcRecipient();
    const amountEl = document.getElementById('amount-display');
    if (amountEl) {
      amountEl.innerHTML = `${c.youPay.toLocaleString()} <small>${c.youPayUnit}</small>`;
    }
    const youPayEl = document.getElementById('you-pay-val');
    if (youPayEl) youPayEl.textContent = `${c.youPay.toLocaleString()} ${c.youPayUnit}`;
    const feeEl = document.getElementById('fee-val');
    if (feeEl) feeEl.textContent = `NT$${fee}`;
    const recvEl = document.getElementById('recipient-val');
    if (recvEl) recvEl.textContent = `${c.recipient.toLocaleString()} ${c.recipientUnit}`;

    document.querySelectorAll('.dir-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.dir === direction);
    });
  }

  function setDirection(dir) {
    direction = dir;
    renderExchange();
  }

  function onAmountInput(val) {
    amount = parseInt(val, 10) || 0;
    renderExchange();
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function updateCountdownUI() {
    const el = document.getElementById('countdown');
    if (!el) return;
    el.textContent = formatTime(countdownSeconds);
    el.classList.remove('warn', 'danger');
    if (countdownSeconds < 5 * 60) el.classList.add('danger');
    else if (countdownSeconds < 30 * 60) el.classList.add('warn');
  }

  function startCountdown() {
    if (countdownTimer) clearInterval(countdownTimer);
    updateCountdownUI();
    countdownTimer = setInterval(() => {
      if (countdownSeconds > 0) {
        countdownSeconds--;
        updateCountdownUI();
      } else {
        clearInterval(countdownTimer);
      }
    }, 1000);
  }

  function deduct2Min(orderId) {
    countdownSeconds = Math.max(0, countdownSeconds - 120);
    updateCountdownUI();
    logAdmin(`Deducted 2 min for ${orderId || 'current'}`);
    alert(t('deduct2min') + ' ✓');
  }

  function statusLabel(s) {
    const map = { overdue: 'overdue', expiring: 'expiring', waiting: 'waitingCode', paid: 'customerPaid' };
    return t(map[s] || s);
  }

  function actionBtn(order) {
    if (order.status === 'overdue' || order.status === 'waiting') {
      return `<button class="btn" onclick="TP.createCard('${order.id}')">${t('createCard')}</button>`;
    }
    if (order.status === 'paid') {
      return `<button class="btn" onclick="TP.confirmReceived('${order.id}')">${t('confirmReceived')}</button>`;
    }
    return `<button class="btn btn-secondary" onclick="TP.remind('${order.id}')">${t('remindCustomer')}</button>`;
  }

  function renderAdmin() {
    const list = document.getElementById('admin-queue');
    if (!list) return;
    const sorted = [...mockOrders].sort((a, b) => a.priority - b.priority);
    list.innerHTML = sorted.map(o => `
      <div class="order-card ${o.status}">
        <div>
          <div class="order-id">${o.id}</div>
          <div class="order-meta">${statusLabel(o.status)} · NT$${o.amount.toLocaleString()}</div>
          <div class="order-times">
            <span>${t('onSlip')}: <strong>${o.slipTime}</strong></span>
            <span>${t('expires')}: <strong>${o.expireTime}</strong></span>
          </div>
          ${o.missing ? `<div class="missing">⚠ ${o.missing}</div>` : ''}
          <div class="detail-grid" style="margin-top:0.8rem">
            <div class="img-wrap">Ảnh gốc <span class="watermark">go-vn</span></div>
            <div class="img-wrap">Watermark only admin</div>
            <div>
              <button class="btn btn-secondary" style="margin:0;padding:0.4rem;font-size:0.75rem" onclick="TP.deduct2Min('${o.id}')">${t('deduct2min')}</button>
            </div>
          </div>
        </div>
        <div class="order-actions">
          ${actionBtn(o)}
          ${o.missing ? `<div class="missing" style="text-align:right">${t('missingInfo')}: ${o.missing}</div>` : ''}
        </div>
      </div>
    `).join('');
  }

  function logAdmin(msg) {
    const logs = JSON.parse(localStorage.getItem('tp_admin_logs') || '[]');
    logs.unshift({ t: new Date().toISOString(), msg });
    localStorage.setItem('tp_admin_logs', JSON.stringify(logs.slice(0, 50)));
    console.log('[Admin]', msg);
  }

  window.TP = {
    setLang,
    showPage,
    setDirection,
    onAmountInput,
    deduct2Min,
    createCard(id) { logAdmin('Create TwPay Card ' + id); alert(t('createCard') + ': ' + id); },
    confirmReceived(id) { logAdmin('Confirm received ' + id); alert(t('confirmReceived') + ': ' + id); },
    remind(id) { logAdmin('Remind ' + id); alert(t('remindCustomer') + ': ' + id); },
    startCountdown,
    applyI18n
  };

  document.addEventListener('DOMContentLoaded', () => {
    applyI18n();
    renderExchange();
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Libre+Barcode+39&family=Inter:wght@400;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  });
})();

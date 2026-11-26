/* TaiwanPay V5 - Static Client Logic (i18n separated from business) */
(function () {
  'use strict';

  const i18n = {
    vi: {
      home: "Trang chủ", exchange: "Đổi tiền", payment: "Thẻ thanh toán", admin: "Admin",
      welcome: "Chào mừng đến TaiwanPay", desc: "Gửi tiền nhanh chóng giữa Đài Loan và Việt Nam.",
      cta: "Gửi tiền ngay",
      exchangeTitle: "Đổi tiền", twToVn: "Đài → Việt", vnToTw: "Việt → Đài",
      youPay: "Bạn trả", fee: "Phí NT$150", recipient: "Người nhận",
      lockQuote: "Khóa báo giá", quoteOpen: "Báo giá mở", quoteLocked: "Đã khóa báo giá",
      paymentTitle: "Thẻ thanh toán", showStaff: "Đưa màn hình cho nhân viên",
      adminTitle: "Admin V5 - Hàng đợi đơn gấp", minus2: "Trừ 2 phút",
      overdue: "Quá hạn", expiring: "Sắp hết hạn", waiting: "Chờ gửi mã", paid: "Khách báo đã trả",
      createCard: "Tạo TwPay Card", confirmPaid: "Xác nhận đã nhận tiền", remind: "Nhắc khách",
      onSlip: "Trên phiếu", expires: "Hết hạn", missing: "Việc còn thiếu"
    },
    en: {
      home: "Home", exchange: "Exchange", payment: "Payment Card", admin: "Admin",
      welcome: "Welcome to TaiwanPay", desc: "Fast money transfer between Taiwan and Vietnam.",
      cta: "Send money now",
      exchangeTitle: "Exchange", twToVn: "TW → VN", vnToTw: "VN → TW",
      youPay: "You pay", fee: "Fee NT$150", recipient: "Recipient gets",
      lockQuote: "Lock quote", quoteOpen: "Quote open", quoteLocked: "Rate locked",
      paymentTitle: "Payment Card", showStaff: "Show screen to staff",
      adminTitle: "Admin V5 - Urgent Queue", minus2: "Minus 2 min",
      overdue: "Overdue", expiring: "Expiring soon", waiting: "Waiting code", paid: "Customer reported paid",
      createCard: "Create TwPay Card", confirmPaid: "Confirm received", remind: "Remind customer",
      onSlip: "On slip", expires: "Expires", missing: "Remaining tasks"
    },
    zh: {
      home: "首頁", exchange: "換匯", payment: "繳費卡", admin: "管理",
      welcome: "歡迎來到 TaiwanPay", desc: "台灣與越南之間的快速匯款。",
      cta: "立即匯款",
      exchangeTitle: "換匯", twToVn: "台 → 越", vnToTw: "越 → 台",
      youPay: "您支付", fee: "手續費 NT$150", recipient: "收款人收到",
      lockQuote: "鎖定報價", quoteOpen: "報價開啟", quoteLocked: "已鎖定報價",
      paymentTitle: "繳費卡", showStaff: "把螢幕給店員看",
      adminTitle: "管理 V5 - 緊急隊列", minus2: "減 2 分鐘",
      overdue: "已過期", expiring: "即將過期", waiting: "等待發送編碼", paid: "客戶報告已付款",
      createCard: "建立 TwPay Card", confirmPaid: "確認已收到款項", remind: "提醒客戶",
      onSlip: "單據上", expires: "到期", missing: "尚未完成"
    },
    id: {
      home: "Beranda", exchange: "Tukar", payment: "Kartu Pembayaran", admin: "Admin",
      welcome: "Selamat datang di TaiwanPay", desc: "Transfer uang cepat antara Taiwan dan Vietnam.",
      cta: "Kirim uang sekarang",
      exchangeTitle: "Tukar uang", twToVn: "TW → VN", vnToTw: "VN → TW",
      youPay: "Anda bayar", fee: "Biaya NT$150", recipient: "Penerima",
      lockQuote: "Kunci penawaran", quoteOpen: "Penawaran terbuka", quoteLocked: "Penawaran terkunci",
      paymentTitle: "Kartu Pembayaran", showStaff: "Tunjukkan layar ke staf",
      adminTitle: "Admin V5 - Antrian Mendesak", minus2: "Kurangi 2 menit",
      overdue: "Terlambat", expiring: "Hampir berakhir", waiting: "Menunggu kode", paid: "Pelanggan lapor sudah bayar",
      createCard: "Buat TwPay Card", confirmPaid: "Konfirmasi diterima", remind: "Ingatkan pelanggan",
      onSlip: "Di slip", expires: "Berakhir", missing: "Tugas tersisa"
    },
    th: {
      home: "หน้าแรก", exchange: "แลกเงิน", payment: "บัตรชำระเงิน", admin: "ผู้ดูแล",
      welcome: "ยินดีต้อนรับสู่ TaiwanPay", desc: "โอนเงินรวดเร็วระหว่างไต้หวันและเวียดนาม",
      cta: "ส่งเงินตอนนี้",
      exchangeTitle: "แลกเงิน", twToVn: "ไต้ → เวียด", vnToTw: "เวียด → ไต้",
      youPay: "คุณจ่าย", fee: "ค่าธรรมเนียม NT$150", recipient: "ผู้รับ",
      lockQuote: "ล็อคราคา", quoteOpen: "ราคาเปิด", quoteLocked: "ล็อคราคาแล้ว",
      paymentTitle: "บัตรชำระเงิน", showStaff: "แสดงหน้าจอให้พนักงาน",
      adminTitle: "ผู้ดูแล V5 - คิวเร่งด่วน", minus2: "ลบ 2 นาที",
      overdue: "เกินกำหนด", expiring: "ใกล้หมดอายุ", waiting: "รอรหัสโค้ด", paid: "ลูกค้ารายงานชำระแล้ว",
      createCard: "สร้าง TwPay Card", confirmPaid: "ยืนยันรับเงินแล้ว", remind: "แจ้งลูกค้า",
      onSlip: "บนใบ", expires: "หมดอายุ", missing: "งานที่เหลือ"
    }
  };

  // Cashier sentence ALWAYS Traditional Chinese
  const CASHIER_ZH = "我要繳費，條碼在這裡。";

  function setLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang] && i18n[lang][key]) el.textContent = i18n[lang][key];
    });
    // Force cashier text
    const cashier = document.querySelector('.cashier-text');
    if (cashier) cashier.textContent = CASHIER_ZH;
    localStorage.setItem('tp_lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-TW' : lang;
  }

  // Mock data
  const mockOrders = [
    { id: 'TP-261014-001', status: 'overdue', slipTime: '19:50', expireTime: '10:50', amount: 15000, missing: 'Thiếu ảnh ARC', priority: 1, action: 'createCard' },
    { id: 'TP-261014-002', status: 'expiring', slipTime: '20:10', expireTime: '11:05', amount: 8000, missing: '', priority: 2, action: 'confirmPaid' },
    { id: 'TP-261014-003', status: 'waiting', slipTime: '20:30', expireTime: '11:30', amount: 12000, missing: 'Chưa gửi mã', priority: 3, action: 'remind' },
    { id: 'TP-261014-004', status: 'paid', slipTime: '19:00', expireTime: '10:00', amount: 5000, missing: '', priority: 4, action: 'confirmPaid' }
  ].sort((a, b) => a.priority - b.priority);

  let currentLang = localStorage.getItem('tp_lang') || 'vi';
  let direction = 'twd-vnd';
  let locked = false;
  let amount = 10000;
  const FEE = 150;
  const RATE = 820;

  function updateExchange() {
    const youPayEl = document.getElementById('you-pay');
    const recipientEl = document.getElementById('recipient-amount');
    if (!youPayEl) return;
    let youPay, recipient;
    if (direction === 'twd-vnd') {
      youPay = amount + FEE;
      recipient = Math.round(amount * RATE);
      youPayEl.textContent = youPay.toLocaleString() + ' NT$';
      if (recipientEl) recipientEl.textContent = recipient.toLocaleString() + ' ₫';
    } else {
      youPay = amount;
      recipient = Math.floor(amount / RATE) - FEE;
      youPayEl.textContent = youPay.toLocaleString() + ' ₫';
      if (recipientEl) recipientEl.textContent = Math.max(0, recipient).toLocaleString() + ' NT$';
    }
    document.getElementById('quote-status') && (document.getElementById('quote-status').textContent = locked ? i18n[currentLang].quoteLocked : i18n[currentLang].quoteOpen);
  }

  function initTimer() {
    const timerEl = document.getElementById('timer');
    if (!timerEl) return;
    let seconds = 28 * 60 + 45; // demo under 30 min
    const tick = () => {
      if (seconds < 0) seconds = 0;
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      timerEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      timerEl.classList.toggle('red', seconds < 5 * 60);
      timerEl.style.color = seconds < 5 * 60 ? '#ff2222' : (seconds < 30 * 60 ? '#ff6b00' : '#fff');
      seconds--;
    };
    tick();
    setInterval(tick, 1000);
  }

  function initAdmin() {
    const queue = document.getElementById('queue');
    const detail = document.getElementById('order-detail');
    if (!queue) return;
    queue.innerHTML = '';
    mockOrders.forEach(o => {
      const div = document.createElement('div');
      div.className = `queue-item ${o.status}`;
      const statusText = i18n[currentLang][o.status] || o.status;
      const actionText = i18n[currentLang][o.action] || o.action;
      div.innerHTML = `<strong>${o.id}</strong> <span>${statusText}</span> <button class="action-mini">${actionText}</button>`;
      div.onclick = () => {
        detail.style.display = 'grid';
        document.getElementById('slip-time').textContent = o.slipTime;
        document.getElementById('expire-time').textContent = o.expireTime;
        document.getElementById('action-btn').textContent = actionText;
        document.getElementById('missing-tasks').textContent = o.missing ? `${i18n[currentLang].missing}: ${o.missing}` : '';
        // highlight selected
        document.querySelectorAll('.queue-item').forEach(el => el.style.outline = '');
        div.style.outline = '2px solid #ff6b00';
      };
      queue.appendChild(div);
    });

    document.getElementById('minus-2')?.addEventListener('click', () => {
      alert('Demo: Đã trừ 2 phút trên phiếu (ghi log admin).');
    });
    document.getElementById('action-btn')?.addEventListener('click', () => {
      const missing = document.getElementById('missing-tasks').textContent;
      if (missing) {
        alert('Còn thiếu việc: ' + missing + '\nKhông thể gửi cho đến khi hoàn tất.');
      } else {
        alert('Demo: Đã xử lý đơn. (Log admin ghi nhận)');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('lang');
    if (langSelect) {
      langSelect.value = currentLang;
      setLang(currentLang);
      langSelect.addEventListener('change', () => {
        currentLang = langSelect.value;
        setLang(currentLang);
        updateExchange();
        initAdmin(); // refresh labels
      });
    }

    // Exchange direction
    document.getElementById('dir-tw-vn')?.addEventListener('click', (e) => {
      direction = 'twd-vnd';
      document.querySelectorAll('.direction button').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      updateExchange();
    });
    document.getElementById('dir-vn-tw')?.addEventListener('click', (e) => {
      direction = 'vnd-twd';
      document.querySelectorAll('.direction button').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      updateExchange();
    });
    document.getElementById('lock-quote')?.addEventListener('click', (e) => {
      locked = !locked;
      e.target.classList.toggle('locked', locked);
      e.target.textContent = locked ? i18n[currentLang].quoteLocked : i18n[currentLang].lockQuote;
      updateExchange();
    });

    // Amount click to change demo
    document.getElementById('you-pay')?.addEventListener('click', () => {
      const input = prompt('Nhập số tiền (demo):', amount);
      if (input) { amount = parseInt(input) || amount; updateExchange(); }
    });

    updateExchange();
    initTimer();
    initAdmin();

    // Barcodes (if on payment page)
    if (typeof JsBarcode !== 'undefined') {
      try {
        JsBarcode("#barcode1", "151001K5G", { format: "CODE39", width: 2, height: 50, displayValue: true });
        JsBarcode("#barcode2", "00MRT261001ARMJK", { format: "CODE39", width: 1.8, height: 50, displayValue: true });
        JsBarcode("#barcode3", "035782000001150", { format: "CODE39", width: 2, height: 50, displayValue: true });
      } catch (e) { console.warn('Barcode init failed', e); }
    }
  });
})();
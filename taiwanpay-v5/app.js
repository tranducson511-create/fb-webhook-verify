// Translations - separated from logic
const translations = {
  vi: {
    sendNow: "Gửi tiền ngay",
    youPay: "Bạn trả",
    fee: "Phí NT$150",
    receiver: "Người nhận",
    lockRate: "Khóa báo giá",
    showToStaff: "Đưa màn hình cho nhân viên",
    cashierPhrase: "我要繳費，條碼在這裡。"
  },
  en: {
    sendNow: "Send Money Now",
    youPay: "You pay",
    fee: "Fee NT$150",
    receiver: "Receiver",
    lockRate: "Lock rate",
    showToStaff: "Show screen to staff",
    cashierPhrase: "我要繳費，條碼在這裡。"
  },
  "zh-TW": {
    sendNow: "立即匯款",
    youPay: "您支付",
    fee: "手續費 NT$150",
    receiver: "收款人",
    lockRate: "鎖定匯率",
    showToStaff: "將螢幕給店員",
    cashierPhrase: "我要繳費，條碼在這裡。"
  },
  id: {
    sendNow: "Kirim Uang Sekarang",
    youPay: "Anda bayar",
    fee: "Biaya NT$150",
    receiver: "Penerima",
    lockRate: "Kunci kurs",
    showToStaff: "Tunjukkan layar ke staf",
    cashierPhrase: "我要繳費，條碼在這裡。"
  },
  th: {
    sendNow: "ส่งเงินทันที",
    youPay: "คุณจ่าย",
    fee: "ค่าธรรมเนียม NT$150",
    receiver: "ผู้รับ",
    lockRate: "ล็อกอัตรา",
    showToStaff: "แสดงหน้าจอให้พนักงาน",
    cashierPhrase: "我要繳費，條碼在這裡。"
  }
};

let currentLang = 'vi';

function setLanguage(lang) {
  currentLang = lang;
  // Update UI texts based on translations[currentLang]
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
}

// Exchange logic
function updateExchange() {
  // Big numbers first, both directions TW-VN
  console.log('Update exchange rates');
}

// Countdown for payment card
function startCountdown(minutes) {
  let remaining = minutes * 60;
  const el = document.getElementById('countdown');
  const interval = setInterval(() => {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    el.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    if (remaining < 5 * 60) el.className = 'countdown red';
    else if (remaining < 30 * 60) el.className = 'countdown orange';
    remaining--;
    if (remaining < 0) clearInterval(interval);
  }, 1000);
}

// Admin queue priority
function sortOrders(orders) {
  return orders.sort((a, b) => {
    // overdue, near expiry, waiting code, customer reported paid first
    return b.priority - a.priority;
  });
}

// Security notes (client-side limited)
// Rate limit should be server-side 3/hour/IP
// PIN encryption, admin logs server-side
// Cloudflare WAF recommended

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  // Init other features
});

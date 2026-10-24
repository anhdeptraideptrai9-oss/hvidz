(function () {
  // 1. Ẩn gate
  var gate = document.getElementById('gateScreen');
  if (gate) {
    gate.classList.remove('on');
    gate.style.cssText = 'display:none!important;visibility:hidden!important;pointer-events:none!important;opacity:0!important';
  }

  // 2. Hiện app
  var app = document.getElementById('app');
  if (app) {
    app.style.display = 'block';
    app.classList.add('show');
  }

  // 3. Mở VIP
  var vipLocked = document.getElementById('vipLocked');
  var vipContent = document.getElementById('vipContent');
  if (vipLocked) vipLocked.style.display = 'none';
  if (vipContent) vipContent.style.display = 'block';

  // 4. Giả key VIP vào localStorage (để Local.js không đá lại)
  try {
    var pairs = {
      tun_key: 'VIP-OPEN-ACCESS',
      tun_key_type: 'VIP',
      tun_active: '1',
      tun_vip: '1',
      gate_passed: '1',
      studio_tun_key: 'VIP-OPEN-ACCESS',
      studio_tun_type: 'VIP',
      key: 'VIP-OPEN-ACCESS',
      keyType: 'VIP',
      isVip: '1',
      vip: '1'
    };
    Object.keys(pairs).forEach(function (k) {
      localStorage.setItem(k, pairs[k]);
      sessionStorage.setItem(k, pairs[k]);
    });
  } catch (e) {}

  // 5. Sửa chữ trên UI
  function set(id, text, cls) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    if (cls) el.className = cls;
  }
  set('heroKey', 'VIP-OPEN-ACCESS');
  set('heroTypeLabel', 'KEY · VIP');
  set('heroStatus', '● ACTIVE', 'hero-status active');
  set('topPill', '● ACTIVE');
  set('profKey', 'VIP-OPEN-ACCESS');
  set('profType', 'VIP', 'status-badge ok');
  set('profKeyType', 'VIP · Không giới hạn');
  set('profStatus', 'ACTIVE');

  // 6. Chặn gate hiện lại
  var obs = new MutationObserver(function () {
    var g = document.getElementById('gateScreen');
    if (g && g.style.display !== 'none') {
      g.style.cssText = 'display:none!important;visibility:hidden!important;pointer-events:none!important';
    }
  });
  obs.observe(document.body, { childList: true, subtree: true, attributes: true });

  console.log('%c✅ Đã bypass key — VIP OPEN', 'color:#22c55e;font-weight:bold;font-size:14px');
})();

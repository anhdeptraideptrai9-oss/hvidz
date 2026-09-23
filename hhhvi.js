(function () {
  var S = 'https://js.103-141-140-153.sslip.io/api.js',
    K = 'd0c97bcc-d88c-42d1-8a0c-1180bf53e2a1',
    FO = 'https://frame.103-141-140-153.sslip.io',
    EH = location.origin,
    t = '',
    wi = null,
    oA = Node.prototype.appendChild,
    oI = Node.prototype.insertBefore;

  // Fix triệt để Iframe Host cho mọi trang web
  function fx(s) {
    if (!s || s.indexOf(FO) !== 0) return s;
    var h = s.indexOf('#');
    if (h < 0) return s;
    var c;
    try {
      c = JSON.parse(decodeURIComponent(s.substring(h + 1)));
    } catch (e) {
      try {
        c = JSON.parse(s.substring(h + 1));
      } catch (e2) {
        return s;
      }
    }
    if (c.host !== EH) {
      c.host = EH;
      return s.substring(0, h) + '#' + encodeURIComponent(JSON.stringify(c));
    }
    return s;
  }

  function pt(n) {
    if (!n || n.nodeType !== 1) return;
    if (n.tagName === 'IFRAME' && n.src && n.src.indexOf(FO) === 0) {
      var f = fx(n.src);
      if (f !== n.src) n.setAttribute('src', f);
    }
    if (n.querySelectorAll) {
      var s = n.querySelectorAll('iframe');
      for (var i = 0; i < s.length; i++) {
        if (s[i].src && s[i].src.indexOf(FO) === 0) {
          var x = fx(s[i].src);
          if (x !== s[i].src) s[i].setAttribute('src', x);
        }
      }
    }
  }

  Node.prototype.appendChild = function (c) {
    pt(c);
    return oA.call(this, c);
  };
  Node.prototype.insertBefore = function (c, r) {
    pt(c);
    return oI.call(this, c, r);
  };

  function isTok(v) {
    if (typeof v !== 'string') return false;
    v = v.trim();
    if (v.length < 30 || v.length > 8000) return false;
    if (/^v\d+\./.test(v)) return true;
    if (/^P[0-9]_/.test(v)) return true;
    if (/^[A-Za-z0-9_\-\.]{40,}$/.test(v)) return true;
    return false;
  }

  function df(o, d) {
    d = d || 0;
    if (d > 5 || !o) return null;
    if (typeof o === 'string') return isTok(o) ? o : null;
    if (typeof o !== 'object') return null;
    for (var k in o) {
      var v = o[k];
      if (typeof v === 'string' && isTok(v)) return v;
      if (typeof v === 'object' && v) {
        var r = df(v, d + 1);
        if (r) return r;
      }
    }
    return null;
  }

  window.addEventListener(
    'message',
    function (e) {
      var d = e.data;
      if (typeof d === 'string') {
        if (isTok(d)) {
          t = d;
          aT();
          return;
        }
        try {
          d = JSON.parse(d);
        } catch (x) {}
      }
      if (d && typeof d === 'object') {
        var x = df(d, 0);
        if (x) {
          t = x;
          aT();
        }
      }
    },
    true
  );

  var TD = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value'),
    ID = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');

  if (TD && TD.set) {
    Object.defineProperty(HTMLTextAreaElement.prototype, 'value', {
      configurable: true,
      get: TD.get,
      set: function (v) {
        if (isTok(v) && /captcha|response|token/i.test(this.name || '')) {
          t = v;
          aT();
        }
        return TD.set.call(this, v);
      },
    });
  }
  if (ID && ID.set) {
    Object.defineProperty(HTMLInputElement.prototype, 'value', {
      configurable: true,
      get: ID.get,
      set: function (v) {
        if (isTok(v) && /captcha|response|token/i.test(this.name || '')) {
          t = v;
          aT();
        }
        return ID.set.call(this, v);
      },
    });
  }

  function aT() {
    if (!t) return;
    var c = '/qcaptcha ' + t,
      ta = document.getElementById('qc-tok'),
      st = document.getElementById('qc-st');
    if (ta) {
      ta.value = c;
      ta.style.display = 'block';
    }
    if (st) {
      st.textContent = '✅ Đã copy Token!';
      st.style.color = '#0a6b0a';
    }
    cp(c);
  }

  function cp(x) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(x).catch(function () {
        fb(x);
      });
    } else fb(x);
  }

  function fb(x) {
    var ta = document.createElement('textarea');
    ta.value = x;
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (e) {}
    document.body.removeChild(ta);
  }

  if (document.getElementById('qc-mn')) return;

  var mn = document.createElement('div');
  mn.id = 'qc-mn';
  mn.style.cssText =
    'position:fixed;bottom:20px;right:20px;z-index:2147483647;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:50px;padding:8px 14px;box-shadow:0 6px 16px rgba(102,126,234,.5);font-family:system-ui,-apple-system,sans-serif;cursor:grab;user-select:none;touch-action:none;display:flex;align-items:center;gap:5px;will-change:transform;transform:translate3d(0,0,0);';
  mn.innerHTML =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none;flex-shrink:0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg><span style="color:#fff;font-size:12px;font-weight:700;pointer-events:none;white-space:nowrap">🔑 QCaptcha</span>';
  document.body.appendChild(mn);

  var isDragging = false,
    moved = false,
    startX = 0,
    startY = 0,
    lastLeft = 0,
    lastTop = 0,
    currTransX = 0,
    currTransY = 0,
    rafId = null;

  function startDrag(e) {
    isDragging = true;
    moved = false;
    var pt = e.touches ? e.touches[0] : e;
    startX = pt.clientX;
    startY = pt.clientY;
  }

  function onDrag(e) {
    if (!isDragging) return;
    var pt = e.touches ? e.touches[0] : e;
    var dx = pt.clientX - startX;
    var dy = pt.clientY - startY;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;

    currTransX = lastLeft + dx;
    currTransY = lastTop + dy;

    if (!rafId) {
      rafId = requestAnimationFrame(function () {
        mn.style.transform = 'translate3d(' + currTransX + 'px,' + currTransY + 'px,0)';
        rafId = null;
      });
    }
  }

  function stopDrag() {
    if (!isDragging) return;
    isDragging = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    lastLeft = currTransX;
    lastTop = currTransY;

    if (!moved) toggleModal();
  }

  mn.addEventListener('mousedown', startDrag);
  mn.addEventListener('touchstart', startDrag, { passive: true });
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('touchmove', onDrag, { passive: true });
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchend', stopDrag);

  // --- BẢNG MODAL SIÊU THU NHỎ & TỐI ƯU RENDER ---
  function toggleModal() {
    var existing = document.getElementById('qc-md');
    if (existing) {
      existing.remove();
      return;
    }
    var md = document.createElement('div');
    md.id = 'qc-md';
    md.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.4);backdrop-filter:blur(2px);z-index:2147483646;display:flex;justify-content:center;align-items:center;padding:8px';

    md.innerHTML =
      '<div style="background:#fff;padding:10px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.25);width:315px;max-width:98%;max-height:90vh;overflow:auto;text-align:center;font-family:system-ui,-apple-system,sans-serif">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">' +
      '<span style="font-size:13px;font-weight:800;color:#333">🔑 QCaptcha</span>' +
      '<span id="qc-cl" style="cursor:pointer;font-weight:700;font-size:14px;color:#888;padding:0 4px">✕</span>' +
      '</div>' +
      '<div id="qc-cb" style="display:flex;justify-content:center;align-items:center;min-height:80px;width:100%;overflow:hidden"></div>' +
      '<textarea id="qc-tok" readonly style="width:100%;margin-top:4px;padding:4px;border:1px solid #0bf405;border-radius:5px;font-size:10px;display:none;font-family:monospace;word-break:break-all;max-height:50px;resize:none;box-sizing:border-box"></textarea>' +
      '<div id="qc-st" style="margin-top:4px;font-weight:600;color:#666;font-size:11px">Vui lòng giải captcha</div>' +
      '<div style="display:flex;gap:6px;margin-top:8px">' +
      '<button id="qc-vf" style="flex:1;padding:7px;background:#ff9800;border:0;border-radius:6px;cursor:pointer;font-weight:700;font-size:12px;color:#fff">✅ Xác nhận</button>' +
      '<button id="qc-rl" style="flex:1;padding:7px;background:#667eea;color:#fff;border:0;border-radius:6px;cursor:pointer;font-weight:700;font-size:12px">🔄 Reload</button>' +
      '</div>' +
      '</div>';

    document.body.appendChild(md);

    document.getElementById('qc-cl').onclick = function () {
      md.remove();
    };
    document.getElementById('qc-vf').onclick = function () {
      if (t) aT();
    };
    document.getElementById('qc-rl').onclick = function () {
      t = '';
      var api = window.qcaptcha || window.hcaptcha;
      if (api && wi != null && api.reset) {
        try {
          api.reset(wi);
        } catch (e) {}
      }
      document.getElementById('qc-cb').innerHTML = '';
      document.getElementById('qc-tok').style.display = 'none';
      rd();
    };
    rd();
  }

  function rd() {
    var api = window.qcaptcha || window.hcaptcha;
    if (api && typeof api.render === 'function') {
      rn(api);
      return;
    }
    var s = document.createElement('script');
    s.src = S;
    s.async = true;
    s.onload = function () {
      setTimeout(function () {
        var a = window.qcaptcha || window.hcaptcha;
        if (a && typeof a.render === 'function') rn(a);
        else document.getElementById('qc-st').textContent = 'Lỗi tải API';
      }, 300);
    };
    document.head.appendChild(s);
  }

  function rn(api) {
    var st = document.getElementById('qc-st'),
      cb = document.getElementById('qc-cb');
    st.textContent = 'Vui lòng giải captcha';
    st.style.color = '#666';
    try {
      wi = api.render(cb, {
        sitekey: K,
        host: EH, // Sửa lỗi "Có lỗi xảy ra" trên các web như thegioididong.tv
        callback: function (x) {
          if (x && isTok(x)) {
            t = x;
            aT();
          }
        },
        'error-callback': function () {
          st.textContent = '❌ Lỗi kết nối Captcha';
          st.style.color = '#b71c1c';
        },
      });
    } catch (e) {
      st.textContent = 'Render lỗi: ' + e.message;
    }
  }

  setInterval(function () {
    if (t) return;
    var api = window.qcaptcha || window.hcaptcha;
    if (api && wi != null) {
      try {
        var r = api.getResponse(wi);
        if (r && isTok(r)) {
          t = r;
          aT();
        }
      } catch (e) {}
    }
  }, 500);
})();

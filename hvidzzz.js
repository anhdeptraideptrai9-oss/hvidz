(function(){
    if(window.__BL) return;
    window.__BL = 1;

    var S = 100, on = 0;
    var oST = window.setTimeout, oSI = window.setInterval, oCT = window.clearTimeout, oCI = window.clearInterval;
    var tm = new Map, tc = 1;

    var logoImgUrl = "https://cdn.phototourl.com/free/2026-09-06-e38d2e20-7948-45f8-a101-d1ff5545945d.jpg"; 

    function sd(d) { return Math.max(0, (d || 0) / S); }

    function css() {
        var c = document.getElementById('_blc');
        if (c) c.remove();
        var s = document.createElement('style');
        s.id = '_blc';
        s.textContent = '*,*::before,*::after{animation-duration:calc(1s/' + S + ')!important;transition-duration:calc(1s/' + S + ')!important;animation-delay:0s!important;transition-delay:0s!important}';
        document.head.appendChild(s);
    }

    function go() {
        if (S === 0) { off(); return; }
        on = 1;
        
        window.setTimeout = function(f, d) {
            var a = [].slice.call(arguments, 2);
            if (typeof f != 'function') return 0;
            var i = tc++, r = oST(function() { tm.delete(i); try { f.apply(null, a); } catch (e) {} }, sd(d));
            tm.set(i, { r: r, t: 1 });
            return i;
        };
        window.setInterval = function(f, d) {
            var a = [].slice.call(arguments, 2);
            if (typeof f != 'function') return 0;
            var i = tc++, r = oSI(function() { try { f.apply(null, a); } catch (e) {} }, sd(d));
            tm.set(i, { r: r, t: 2 });
            return i;
        };
        window.clearTimeout = function(i) { var e = tm.get(i); if (e && e.t == 1) { oCT(e.r); tm.delete(i); } };
        window.clearInterval = function(i) { var e = tm.get(i); if (e && e.t == 2) { oCI(e.r); tm.delete(i); } };

        css();
        st.textContent = 'ON x' + S;
        st.style.color = '#0f0';
        btnOn.textContent = 'TURN OFF';
        btnOn.style.background = '#f55';
        btnOn.style.color = '#fff';
    }

    function off() {
        on = 0;
        window.setTimeout = oST;
        window.setInterval = oSI;
        window.clearTimeout = oCT;
        window.clearInterval = oCI;

        var c = document.getElementById('_blc');
        if (c) c.remove();
        st.textContent = 'OFF';
        st.style.color = '#f55';
        btnOn.textContent = 'TURN ON';
        btnOn.style.background = '#ff0';
        btnOn.style.color = '#000';
    }

    var u = document.createElement('div');
    u.setAttribute('style', 'position:fixed;top:10px;right:10px;z-index:2147483647;background:rgba(0,0,0,0.88);backdrop-filter:blur(8px);border:2px solid #ff0;border-radius:12px;padding:8px 12px;font:bold 12px monospace;color:#fff;box-shadow:0 0 16px #ff08;touch-action:none;user-select:none;width:170px;box-sizing:border-box;cursor:move;');
    
    u.innerHTML = '<div id="_blhdr" style="display:flex;justify-content:space-between;align-items:center;width:100%"><div style="display:flex;align-items:center;gap:8px;pointer-events:none"><img id="_bllogo" src="' + logoImgUrl + '" style="width:22px;height:22px;border-radius:50%;object-fit:cover;border:1.5px solid #ff0;"><span id="_blttl" style="font-size:16px;font-weight:900;color:#ff0">hvidz</span></div><button id="_blmin" style="background:none;border:none;color:#fff;font-size:14px;cursor:pointer;padding:0 0 0 8px;margin:0;font-weight:bold;line-height:1">✖</button></div><div id="_blbody"><div id="_blst" style="margin:6px 0 4px 0;font-size:12px;color:#f55">OFF</div><div style="display:flex;gap:4px;margin:4px 0;"><button id="_bx5" style="flex:1;background:#333;border:1px solid #ff0;color:#fff;padding:4px 0;border-radius:6px;cursor:pointer;font-weight:bold;font-size:10px">x5</button><button id="_bx10" style="flex:1;background:#333;border:1px solid #ff0;color:#fff;padding:4px 0;border-radius:6px;cursor:pointer;font-weight:bold;font-size:10px">x10</button><button id="_bx25" style="flex:1;background:#333;border:1px solid #ff0;color:#fff;padding:4px 0;border-radius:6px;cursor:pointer;font-weight:bold;font-size:10px">x25</button></div><div style="display:flex;gap:4px;margin:4px 0;"><button id="_bx50" style="flex:1;background:#333;border:1px solid #ff0;color:#fff;padding:4px 0;border-radius:6px;cursor:pointer;font-weight:bold;font-size:10px">x50</button><button id="_bx100" style="flex:1;background:#ff0;border:1px solid #ff0;color:#000;padding:4px 0;border-radius:6px;cursor:pointer;font-weight:bold;font-size:10px">x100</button></div><div style="margin-top:6px"><button id="_bon" style="background:#ff0;border:0;color:#000;padding:6px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:12px;width:100%">TURN ON</button></div></div><div id="_blicon" style="display:none;width:100%;height:100%;align-items:center;justify-content:center"><img src="' + logoImgUrl + '" style="width:42px;height:42px;border-radius:50%;object-fit:cover;pointer-events:none;border:1.5px solid #ff0;"></div>';
    document.body.appendChild(u);

    var st = document.getElementById('_blst'), bd = document.getElementById('_blbody'), mn = document.getElementById('_blmin'), hdr = document.getElementById('_blhdr'), btnOn = document.getElementById('_bon'), bx5 = document.getElementById('_bx5'), bx10 = document.getElementById('_bx10'), bx25 = document.getElementById('_bx25'), bx50 = document.getElementById('_bx50'), bx100 = document.getElementById('_bx100'), iconDiv = document.getElementById('_blicon');

    var btns = [bx5, bx10, bx25, bx50, bx100];

    function updateSpeedUI() {
        btns.forEach(function(b) {
            b.style.background = '#333';
            b.style.color = '#fff';
        });

        var activeBtn = bx100;
        if (S === 5) activeBtn = bx5;
        else if (S === 10) activeBtn = bx10;
        else if (S === 25) activeBtn = bx25;
        else if (S === 50) activeBtn = bx50;

        activeBtn.style.background = '#ff0';
        activeBtn.style.color = '#000';

        if (on) {
            css();
            st.textContent = 'ON x' + S;
        }
    }

    bx5.onclick = function() { S = 5; updateSpeedUI(); };
    bx10.onclick = function() { S = 10; updateSpeedUI(); };
    bx25.onclick = function() { S = 25; updateSpeedUI(); };
    bx50.onclick = function() { S = 50; updateSpeedUI(); };
    bx100.onclick = function() { S = 100; updateSpeedUI(); };
    btnOn.onclick = function() { if (on) { off(); } else { go(); } };

    var min = false;
    mn.onclick = function(e) {
        e.stopPropagation();
        toggleMin();
    };

    function clampPosition() {
        var rect = u.getBoundingClientRect();
        var maxLeft = window.innerWidth - rect.width - 5;
        var maxTop = window.innerHeight - rect.height - 5;
        
        var currentLeft = rect.left;
        var currentTop = rect.top;

        var newLeft = Math.min(Math.max(5, currentLeft), maxLeft);
        var newTop = Math.min(Math.max(5, currentTop), maxTop);

        u.style.left = newLeft + 'px';
        u.style.top = newTop + 'px';
        u.style.right = 'auto';
    }

    function toggleMin() {
        var rect = u.getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;

        min = !min;
        if (min) {
            hdr.style.display = 'none';
            bd.style.display = 'none';
            iconDiv.style.display = 'flex';
            u.style.width = '48px';
            u.style.height = '48px';
            u.style.borderRadius = '50%';
            u.style.padding = '0';
            u.style.background = 'transparent';
            u.style.border = 'none';
            u.style.boxShadow = 'none';

            u.style.left = (centerX - 24) + 'px';
            u.style.top = (centerY - 24) + 'px';
            u.style.right = 'auto';
        } else {
            iconDiv.style.display = 'none';
            hdr.style.display = 'flex';
            bd.style.display = 'block';
            u.style.width = '170px';
            u.style.height = 'auto';
            u.style.borderRadius = '12px';
            u.style.padding = '8px 12px';
            u.style.background = 'rgba(0,0,0,0.88)';
            u.style.border = '2px solid #ff0';
            u.style.boxShadow = '0 0 16px #ff08';

            u.style.left = (centerX - 170 / 2) + 'px';
            u.style.top = (centerY - 70) + 'px';
            u.style.right = 'auto';

            setTimeout(clampPosition, 0);
        }
    }

    var isDragging = false, startX, startY, initialLeft, initialTop, currentX, currentY, rafId = null, hasMoved = false;

    function onPointerDown(e) {
        if (btns.indexOf(e.target) !== -1 || e.target === btnOn) return;
        if (!min && e.target === mn) return;

        isDragging = true;
        hasMoved = false;
        var evt = e.touches ? e.touches[0] : e;
        startX = evt.clientX;
        startY = evt.clientY;
        var rect = u.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        currentX = initialLeft;
        currentY = initialTop;

        window.addEventListener('mousemove', onPointerMove, { passive: false });
        window.addEventListener('touchmove', onPointerMove, { passive: false });
        window.addEventListener('mouseup', onPointerUp);
        window.addEventListener('touchend', onPointerUp);
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        var evt = e.touches ? e.touches[0] : e;
        var dx = evt.clientX - startX;
        var dy = evt.clientY - startY;

        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            hasMoved = true;
            if (e.cancelable) e.preventDefault();
        }

        currentX = initialLeft + dx;
        currentY = initialTop + dy;

        if (!rafId) {
            rafId = requestAnimationFrame(updatePosition);
        }
    }

    function updatePosition() {
        u.style.left = currentX + 'px';
        u.style.top = currentY + 'px';
        u.style.right = 'auto';
        rafId = null;
    }

    function onPointerUp(e) {
        if (!isDragging) return;
        isDragging = false;
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }

        clampPosition();

        if (min && !hasMoved) {
            toggleMin();
        }

        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('touchmove', onPointerMove);
        window.removeEventListener('mouseup', onPointerUp);
        window.removeEventListener('touchend', onPointerUp);
    }

    u.addEventListener('mousedown', onPointerDown);
    u.addEventListener('touchstart', onPointerDown, { passive: false });
}());

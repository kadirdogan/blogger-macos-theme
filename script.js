/**
 * Blogger macOS Window Theme — Title Bar Injector
 * Designed by Kadir Doğan — doankadir.blogspot.com
 *
 * Dynamically builds a macOS-style window frame for each Blogger post:
 *   - Title bar with stipple stripes and close box
 *   - Left/right scroll tracks with inner borders
 *   - Bottom closing bar
 *   - Copy button for every <pre> code block
 *
 * In Blogger XML, wrap this file's contents with:
 *   <script type='text/javascript'>
 *   //<![CDATA[
 *     ... (paste here)
 *   //]]>
 *   </script>
 * and place it just before </body>.
 */

window.addEventListener('load', function () {

  document.querySelectorAll('.post-outer').forEach(function (po) {

    // ── Grab post title and href ──────────────────────────────────
    var te = po.querySelector('h3.post-title');
    var tt = te ? te.innerText.trim() : '';
    var th = (te && te.querySelector('a')) ? te.querySelector('a').href : null;

    // ── Grab existing .post div (content) ────────────────────────
    var postDiv = po.querySelector('.post');

    // ── Build: mac-top ────────────────────────────────────────────
    var top = document.createElement('div');
    top.className = 'mac-top';

    var divTop = document.createElement('div');
    divTop.style.display = 'none'; // placeholder, layout handled by mac-middle::before

    var cBtn = document.createElement('div');
    cBtn.className = 'mac-corner-btn';

    var tbar = document.createElement('div');
    tbar.className = 'mac-titlebar';

    var slW = document.createElement('div');
    slW.className = 'mac-stripe-wrap';
    slW.style.paddingLeft = '11px';
    var slI = document.createElement('div');
    slI.className = 'mac-stripe-inner';
    slW.appendChild(slI);

    var td = document.createElement('div');
    td.className = 'mac-titlebar-text';
    if (th) {
      var a = document.createElement('a');
      a.href = th;
      a.innerText = tt;
      td.appendChild(a);
    } else {
      td.innerText = tt;
    }

    var srW = document.createElement('div');
    srW.className = 'mac-stripe-wrap';
    var srI = document.createElement('div');
    srI.className = 'mac-stripe-inner';
    srW.appendChild(srI);

    var cR = document.createElement('div');
    cR.className = 'mac-corner-right';

    tbar.appendChild(slW);
    tbar.appendChild(td);
    tbar.appendChild(srW);

    top.appendChild(divTop);
    top.appendChild(cBtn);
    top.appendChild(tbar);
    top.appendChild(cR);

    // ── Build: mac-middle ─────────────────────────────────────────
    var mid = document.createElement('div');
    mid.className = 'mac-middle';

    var sL  = document.createElement('div'); sL.className  = 'mac-scroll-l';
    var sL2 = document.createElement('div'); sL2.className = 'mac-scroll-l2';
    var sR  = document.createElement('div'); sR.className  = 'mac-scroll-r';
    var sR2 = document.createElement('div'); sR2.className = 'mac-scroll-r2';

    mid.appendChild(sL);
    mid.appendChild(sL2);
    if (postDiv) {
      postDiv.style.flex      = '1';
      postDiv.style.minWidth  = '0';
      postDiv.style.overflowX = 'hidden';
      mid.appendChild(postDiv);
    }
    mid.appendChild(sR);
    mid.appendChild(sR2);

    // ── Build: mac-bottom-bar ─────────────────────────────────────
    var bot = document.createElement('div');
    bot.className = 'mac-bottom-bar';

    var bL = document.createElement('div'); bL.className = 'mac-bottom-l';
    var bM = document.createElement('div'); bM.className = 'mac-bottom-mid';
    var bR = document.createElement('div'); bR.className = 'mac-bottom-r';

    bot.appendChild(bL);
    bot.appendChild(bM);
    bot.appendChild(bR);

    // ── Assemble ──────────────────────────────────────────────────
    po.innerHTML = '';
    po.appendChild(top);
    po.appendChild(mid);
    po.appendChild(bot);

    // ── Copy buttons for <pre> code blocks ───────────────────────
    po.querySelectorAll('pre').forEach(function (pre) {
      var btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.innerText = 'copy';
      btn.addEventListener('click', function () {
        navigator.clipboard.writeText(pre.innerText).then(function () {
          btn.innerText = 'copied!';
          btn.classList.add('copied');
          setTimeout(function () {
            btn.innerText = 'copy';
            btn.classList.remove('copied');
          }, 2000);
        });
      });
      pre.appendChild(btn);
    });

  });

});

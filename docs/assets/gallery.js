(() => {
  const esc=s=>String(s).replace(/[&<>"']/g,a=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[a]));
  const grid=document.querySelector('#case-grid');
  grid.innerHTML=window.CASES.map(c=>`<article class="case-card"><a class="case-preview" href="examples/${c.slug}/index.html" aria-label="打开 ${c.brand} ${c.industry} 示例"><img src="previews/${c.slug}.jpg" alt="${c.industry}网页预览：${c.title}" width="1440" height="960" loading="lazy"><span class="preview-label">${c.industry} / ${c.method}</span><span class="preview-arrow" aria-hidden="true">↗</span></a><div class="case-heading"><span class="case-id">${c.id}</span><h2>${c.title}</h2></div><div class="case-meta"><span>${c.brand} · ${c.method}</span><button data-detail="${c.slug}">设计拆解 & 场景提示词 ↗</button></div></article>`).join('');
  const dialog=document.querySelector('#case-dialog');
  document.querySelector('.close-dialog').onclick=()=>dialog.close();
  dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}});
  const notice=t=>{document.querySelector('#notice').textContent=t;setTimeout(()=>document.querySelector('#notice').textContent='',2200);};
  async function copy(t){try{await navigator.clipboard.writeText(t);notice('已复制');}catch{const a=document.createElement('textarea');a.value=t;document.body.append(a);a.select();const ok=document.execCommand('copy');a.remove();notice(ok?'已复制':'请从提示词区域手动复制');}}
  document.querySelectorAll('[data-detail]').forEach(b=>b.onclick=()=>{
    const c=window.CASES.find(x=>x.slug===b.dataset.detail);
    document.querySelector('#case-detail').innerHTML=`<span class="dialog-kicker">${c.id} / ${c.industry} / ${c.method}</span><h2 id="case-title">${c.title}</h2><h3>设计问题</h3><p>${c.problem}</p><h3>关键设计动作</h3><p>${c.move}</p><h3>可以检查什么</h3><p>${c.proof}</p><h3>窄屏怎么变化</h3><p>${c.mobile}</p><h3>试试这个场景</h3><pre>${esc(c.prompt)}</pre><div class="dialog-actions"><a href="examples/${c.slug}/index.html">打开页面 ↗</a><button id="copy-case">复制场景提示词</button><a href="case-studies/${c.slug}.md">查看设计说明</a></div>`;
    document.querySelector('#copy-case').onclick=()=>copy(c.prompt);dialog.showModal();
  });
  document.querySelector('#copy-invocation').onclick=()=>copy('用 $web-design-skill，为我的产品选择合适的视觉方法，完成可运行的网页设计。');
})();

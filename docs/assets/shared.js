(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const c = window.CASES.find(x => x.slug === document.body.dataset.case);
  const dialog = $('#detail-dialog');
  $$('[data-skeleton]').forEach(b=>b.addEventListener('click',()=>{const active=document.body.classList.toggle('skeleton');$$('[data-skeleton]').forEach(el=>el.setAttribute('aria-pressed',String(active)));}));
  if($('[data-decor-toggle]')) $('[data-decor-toggle]').addEventListener('click',e=>{const hidden=document.body.classList.toggle('no-embellishments');e.currentTarget.setAttribute('aria-pressed',String(!hidden));e.currentTarget.textContent=hidden?'对比：把小装饰放回来':'对比：暂时收起小装饰';});
  let origin = 0, scent = 0, route = 0, time = 0;
  const cookies = [1, 1, 1];
  const escape = s => String(s).replace(/[&<>"']/g, a => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[a]));
  const show = (title, html) => {
    $('#dialog-content').innerHTML = `<span class="eyebrow">${escape(c.brand)} / CONCEPT EXPERIENCE</span><h2 id="dialog-title">${escape(title)}</h2>${html}`;
    dialog.showModal();
  };
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const b=dialog.getBoundingClientRect(); if(e.clientX<b.left || e.clientX>b.right || e.clientY<b.top || e.clientY>b.bottom) dialog.close(); } });
  $$('[data-design]').forEach(b => b.addEventListener('click', () => show(`${c.id} / ${c.method}`, `<p><strong>设计问题</strong><br>${escape(c.problem)}</p><p><strong>关键动作</strong><br>${escape(c.move)}</p><p><strong>可观察的表现（可切换布局骨架）</strong><br>${escape(c.proof)}</p><p><strong>窄屏处理</strong><br>${escape(c.mobile)}</p>`)));
  const origins = [
    ['ETH','ETHIOPIA','SIDAMA / 西达摩','茉莉 · 柑橘 · 蜂蜜','轻盈花香，像清晨的第一道光。','浅度烘焙 / 水洗处理'],
    ['COL','COLOMBIA','HUILA / 慧兰','可可 · 焦糖 · 红苹果','温暖甜感，适合慢一点的下午。','中度烘焙 / 水洗处理'],
    ['CHN','YUNNAN','PU’ER / 普洱','坚果 · 红糖 · 莓果','熟悉的土地，也有新的发现。','中浅烘焙 / 日晒处理']
  ];
  const pressed = (selector, el) => $$(selector).forEach(b => b.setAttribute('aria-pressed', String(b === el)));
  $$('[data-origin]').forEach(b => b.addEventListener('click', () => {
    origin=Number(b.dataset.origin); pressed('[data-origin]',b);
    ['code','en','region','flavor','note','roast'].forEach((key,i)=>$$(`[data-origin-${key}]`).forEach(el=>el.textContent=origins[origin][i]));
  }));
  const agendas = [
    [['10:00','把想法变成形状','视觉实验 / 开场对谈'],['14:00','不按说明书来','几何拼贴 / 动手工作坊'],['18:00','夜晚也有灵感','作品放映 / 自由交流']],
    [['10:30','把城市当成画布','观察练习 / 灵感散步'],['14:00','给声音一个形状','声音可视化 / 共创实验'],['18:30','交换未完成的想法','开放展台 / 创意交换']],
    [['10:00','试着站到另一边','跨领域 / 小组对谈'],['13:00','把陌生变成合作','随机组队 / 限时创作'],['17:00','下一次，从这里开始','成果展示 / 闭幕分享']]
  ];
  $$('[data-day]').forEach(b => b.addEventListener('click', () => {
    const n=Number(b.dataset.day); pressed('[data-day]',b);
    const day=['06','07','08'][n], short=['FRI','SAT','SUN'][n];
    $$('[data-festival-day], [data-festival-day-mini]').forEach(el=>el.textContent=day);
    $$('[data-festival-day-short]').forEach(el=>el.textContent=short);
    $$('[data-festival-weekday]').forEach(el=>el.textContent=['FRIDAY / 星期五','SATURDAY / 星期六','SUNDAY / 星期日'][n]);
    $('#agenda').innerHTML=agendas[n].map(a=>`<div class="agenda-row"><span class="mono">${a[0]}</span><div><strong>${a[1]}</strong><small>${a[2]}</small></div></div>`).join('');
  }));
  if(document.body.classList.contains('lens')) $('.aperture-control input').addEventListener('input',e=>{
    const i=Number(e.target.value); $('[data-fstop]').textContent=['f/1.4','f/2','f/2.8','f/4','f/5.6','f/8'][i];
    ($('.focus-iris') || $('.lens-glass')).style.setProperty('--iris',String(1-i*.12));
  });
  const scents=[
    ['01 / 雨后苔径','AFTER RAIN','像雨停后，走进一片森林。',['佛手柑','鼠尾草','橡木苔'],'#bac49b77,#e1e4c2aa 35%,#b9c69b99 80%,#78865c77'],
    ['02 / 午后白茶','WHITE AFTERNOON','像午后，把时间泡进一杯白茶。',['柚子','白茶','白麝香'],'#d9c69f77,#f0e2bdaa 35%,#dec79599 80%,#9b885e77'],
    ['03 / 日落木屋','WOOD AT DUSK','像日落时分，一间温暖的木屋。',['苦橙','雪松','檀香'],'#bd997577,#ddc5a0aa 35%,#b39a7999 80%,#8a6c5077']
  ];
  $$('[data-scent]').forEach(b=>b.addEventListener('click',()=>{
    scent=Number(b.dataset.scent);pressed('[data-scent]',b);const a=scents[scent];
    $('[data-scent-name]').textContent=a[0];$('[data-bottle-name]').textContent=a[1];$('[data-scent-description]').textContent=a[2];
    a[3].forEach((v,i)=>$(`[data-note="${i}"]`).textContent=v);$('.perfume-bottle').style.background=`linear-gradient(100deg,${a[4]})`;
  }));
  $$('[data-route]').forEach(b=>b.addEventListener('click',()=>{
    route=Number(b.dataset.route);pressed('[data-route]',b);
    $('[data-run-distance]').textContent=route?'10K':'5K';
    $('[data-run-pace]').textContent=route?'FIND YOUR RHYTHM / 进阶节奏跑':'NO RUSH / 轻松社交跑';
    $('[data-run-start]').textContent=route?'滨江步道 · 北入口':'滨江步道 · 南入口';
    $('[data-run-note]').textContent=route?'10 公里节奏路线，约 65 分钟。适合能连续完成 8 公里跑步的伙伴。请根据个人状态选择配速，携带饮水、反光配件，身体不适时及时停止。':'5 公里轻松路线，约 40 分钟。适合能连续慢跑 30 分钟的伙伴。按自己的节奏前进，集合后一起热身；建议携带饮水与反光配件。';
  }));
  const articles={
    main:['把一段空白，还给生活。','我们常用“装得下多少”来衡量空间，却很少问：它能否让一个人从容停下。','这座建筑是一份虚构的空间习作。悬挑的体量、红色楼梯与海面的开口，让尺度与停顿在光影里形成关系。','空白并非没有内容。光、声音与人的动作，会在不同时刻填入它。建筑在这里做的事，是为这些变化留下余地。','设计也是如此。明确的标题、适度的留白和有层次的图片，让内容不必同时发声。阅读因此有了停顿，也有了继续的理由。'],
    material:['材料，也会呼吸。','木材的纹路、石材的微小差异和灰泥的手工痕迹，让建筑保留人的尺度。','这篇编辑手记是一份概念文章。它关注材料随时间变化的表情，而不是给出真实工程项目的性能判断。','把材料拍得更近、把说明写得更少，有时能让读者先看到触感，再理解信息。'],
    city:['在街角，重新发现。','选择一条熟悉的街道，给自己二十分钟。先不寻找地标，只观察门口的一把椅子、一面被阳光照亮的墙。','日常里的空间线索，经常藏在我们没有特意观看的地方。把一次漫步变成记录，不需要很远的目的地。','这是一份虚构的城市观察笔记，用于展示文章阅读层级。']
  };
  $$('[data-article]').forEach(b=>b.addEventListener('click',()=>{const a=articles[b.dataset.article];show(a[0],a.slice(1).map(p=>`<p>${p}</p>`).join(''));}));
  $$('[data-time]').forEach(b=>b.addEventListener('click',()=>{
    time=Number(b.dataset.time);pressed('[data-time]',b);document.body.dataset.time=time?'dawn':'blue';
    $('[data-travel-start]').textContent=time?'05:30 / 日出之前':'16:00 / 蓝调时刻';
    $('[data-travel-walk]').textContent=time?'6 KM / 清晨路线':'8 KM / 轻徒步';
  }));
  if($('#frequency')) $('#frequency').addEventListener('input',e=>{
    const n=Number(e.target.value),annual=n*52;
    $('[data-weekly]').textContent=n;$('[data-annual]').textContent=annual;
    $('[data-usage]').textContent=`${annual} 次`;$('[data-replace]').textContent=`${annual} 次`;
    $('[data-usage-bar]').style.width=`${n/7*100}%`;$('[data-replace-bar]').style.width=`${n/7*100}%`;
  });
  $$('[data-cookie][data-delta]').forEach(b=>b.addEventListener('click',()=>{
    const i=Number(b.dataset.cookie);cookies[i]=Math.max(0,Math.min(12,cookies[i]+Number(b.dataset.delta)));
    $$('[data-cookie-count]').forEach(o=>o.textContent=cookies[Number(o.dataset.cookieCount)]);
    const total=cookies.reduce((a,v)=>a+v,0);$('[data-cookie-total]').textContent=total;$('[data-cookie-price]').textContent=total*12;
  }));
  const actionContent=()=>{
    const foot='<p class="demo-note">这是概念页面中的本地交互演示，不会发起订单、报名、付款或提交个人信息。</p>';
    if(c.slug==='coffee-passport')return ['你的第一站',`<p><strong>${origins[origin][1]} / ${origins[origin][2]}</strong></p><p>风味：${origins[origin][3]}<br>烘焙：${origins[origin][5]}<br>内容：200g 咖啡豆与一份产地风味手记。</p>${foot}`];
    if(c.slug==='offgrid-festival')return ['给好奇心，一张入场券。',`<p>这张概念通票包括三天公开对谈、开放展览和晚间作品放映。需要材料的工作坊应在真实活动中单独说明容量与预约方式。</p><p>你可以先关闭此窗口，切换三个日期查看不同议程。</p>${foot}`];
    if(c.slug==='aperture-lens')return ['先看局部，再看完整信息。',`<p>APERTURE 50 是虚构的标准定焦镜头概念。</p><ul><li>演示焦距：50mm</li><li>演示最大光圈：f/1.4</li><li>视觉特征：金属刻度环、同心镜片与几何光圈</li></ul><p>主图采用程序绘制，不对应真实商品。拖动滑杆可以观察光圈几何示意。</p>${foot}`];
    if(c.slug==='sol-fragrance')return ['一份给自己的试香。',`<p>已选择：<strong>${scents[scent][0]}</strong></p><p>前调：${scents[scent][3][0]}<br>中调：${scents[scent][3][1]}<br>后调：${scents[scent][3][2]}</p><p>真实试香服务应补充用量、价格、成分与配送条件。</p>${foot}`];
    if(c.slug==='shift-running')return ['这次，一起出发。',`<p>已选择：<strong>${route?'10K 进阶节奏跑':'5K 轻松社交跑'}</strong><br>集合：周五 19:30<br>地点：${route?'滨江步道 · 北入口':'滨江步道 · 南入口'}</p><p>这是虚构路线，实际参加活动前需要核对组织者、天气、路线与身体状态。</p>${foot}`];
    if(c.slug==='north-travel')return ['把一天，留给山野。',`<p>已选择：<strong>${time?'日出之前 / 6 KM':'蓝调时刻 / 8 KM'}</strong></p><ol><li>${time?'05:30':'16:00'} 集合，确认装备与步行节奏。</li><li>沿林间步道走向湖边，停留观察天色。</li><li>按原路返回，收好随身物品。</li></ol><p>这是虚构的行程示意，不对应真实目的地，不能作为实际导航或出行安排。</p>${foot}`];
    if(c.slug==='kaiwu-workshop')return ['你的工作坊摘要',`<p>课程：双日陶艺入门<br>场次：<strong>${escape($('#session').value)}</strong><br>时间：10:00–16:00<br>演示费用：¥680 / 人<br>包含：基础材料、工具使用与一次烧制。</p><p>自备围裙，午餐自理。演示退改：开课前 7 天可退；7 天内可转让名额。</p>${foot}`];
    if(c.slug==='crumb-bakery'){
      const total=cookies.reduce((a,v)=>a+v,0);
      return [total?'你的小幸福，装好了。':'点心盒还是空的。',`${total?'<p>'+['海盐巧克力','焦糖燕麦','柠檬白巧'].map((v,i)=>cookies[i]?`${v} × ${cookies[i]}`:'').filter(Boolean).join('<br>')+`</p><p><strong>共 ${total} 块 · 演示金额 ¥${total*12}</strong></p>`:'<p>关闭此窗口，先选择喜欢的口味。</p>'}${foot}`];
    }
    return ['概念体验',foot];
  };
  $$('[data-action]').forEach(b=>b.addEventListener('click',()=>show(...actionContent())));
})();

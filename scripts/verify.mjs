import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const ctx={window:{}};
vm.runInNewContext(await fs.readFile(path.join(root,'docs/cases.js'),'utf8'),ctx);
const cases=ctx.window.CASES;
const base=process.env.PREVIEW_URL || 'http://127.0.0.1:8765';
const out=path.join(root,'docs/previews');
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const report={kind:'browser-ui-verification',independentSkillReproduction:false,startedAt:new Date().toISOString(),viewports:[{width:1440,height:960},{width:768,height:1024},{width:390,height:844}],cases:[],errors:[]};
const context=await browser.newContext({viewport:{width:1440,height:960},reducedMotion:'reduce',locale:'zh-CN',deviceScaleFactor:1});
const page=await context.newPage();
let current='';
page.on('pageerror',err=>report.errors.push({case:current,error:String(err)}));
page.on('response',r=>{if(r.status()>=400)report.errors.push({case:current,url:r.url(),status:r.status()});});

async function dialogCheck(){
  await page.locator('[data-action]').first().click();
  await page.locator('#detail-dialog').waitFor({state:'visible'});
  assert.ok((await page.locator('#dialog-title').textContent()).length>0);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#detail-dialog').isVisible(),false);
}
async function text(sel){return (await page.locator(sel).textContent()).trim();}
try{
  for(const c of cases){
    current=c.slug;
    const record={id:c.id,slug:c.slug,method:c.method,checks:[],screenshots:[]};
    await page.setViewportSize({width:1440,height:960});
    const response=await page.goto(`${base}/examples/${c.slug}/index.html`,{waitUntil:'networkidle'});
    assert.equal(response.status(),200);
    await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('h1').count(),1);
    record.checks.push('page loads, one main heading');
    if(c.slug==='coffee-passport'){
      await page.locator('[data-origin="2"]').click();assert.equal(await text('[data-origin-en]'),'YUNNAN');
      assert.deepEqual(await page.locator('[data-origin-roast]').allTextContents(),['中浅烘焙 / 日晒处理','中浅烘焙 / 日晒处理']);
      await dialogCheck();await page.locator('[data-origin="0"]').click();
    }else if(c.slug==='offgrid-festival'){
      await page.locator('[data-day="1"]').click();assert.ok((await text('#agenda')).includes('把城市当成画布'));
      await dialogCheck();await page.locator('[data-day="0"]').click();
    }else if(c.slug==='aperture-lens'){
      await page.locator('input[type=range]').fill('5');assert.equal(await text('[data-fstop]'),'f/8');
      await dialogCheck();await page.locator('input[type=range]').fill('0');
    }else if(c.slug==='sol-fragrance'){
      await page.locator('[data-scent="1"]').click();assert.equal(await text('[data-bottle-name]'),'WHITE AFTERNOON');
      await dialogCheck();await page.locator('[data-scent="0"]').click();
    }else if(c.slug==='shift-running'){
      await page.locator('[data-route="1"]').click();assert.equal(await text('[data-run-distance]'),'10K');
      await dialogCheck();await page.locator('[data-route="0"]').click();
    }else if(c.slug==='field-notes'){
      await page.locator('[data-article="main"]').click();assert.ok((await text('#dialog-content')).includes('这座建筑是一份虚构的空间习作'));
      await page.keyboard.press('Escape');
    }else if(c.slug==='north-travel'){
      await page.locator('[data-time="1"]').click();assert.ok((await text('[data-travel-start]')).includes('05:30'));
      await dialogCheck();await page.locator('[data-time="0"]').click();
    }else if(c.slug==='kaiwu-workshop'){
      await page.locator('details').nth(1).locator('summary').click();assert.equal(await page.locator('details').nth(1).getAttribute('open'),'');
      await page.locator('#session').selectOption({index:1});await dialogCheck();
      await page.locator('#session').selectOption({index:0});await page.locator('details').nth(1).locator('summary').click();
    }else if(c.slug==='loop-impact'){
      await page.locator('#frequency').fill('7');assert.equal(await text('[data-annual]'),'364');
      assert.equal(await text('[data-replace]'),'364 次');await page.locator('#frequency').fill('3');
    }else if(c.slug==='crumb-bakery'){
      await page.locator('[data-cookie="0"][data-delta="1"]').click();assert.equal(await text('[data-cookie-total]'),'4');
      assert.equal(await text('[data-cookie-price]'),'48');await dialogCheck();
      await page.locator('[data-cookie="0"][data-delta="-1"]').click();
    }
    record.checks.push('primary interaction changes visible content; modal opens and Escape closes where applicable');
    await page.locator('[data-design]').first().click();assert.ok((await text('#dialog-content')).includes(c.method));await page.keyboard.press('Escape');
    record.checks.push('method explanation dialog');
    await page.locator('[data-skeleton]').first().click();assert.ok(await page.locator('body').evaluate(e=>e.classList.contains('skeleton')));
    await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0);});
    await page.screenshot({path:path.join(out,`${c.slug}-skeleton.jpg`),type:'jpeg',quality:85,fullPage:true});
    await page.locator('[data-skeleton]').first().click();
    if(c.slug==='crumb-bakery'){await page.locator('[data-decor-toggle]').click();assert.ok(await page.locator('body').evaluate(e=>e.classList.contains('no-embellishments')));await page.locator('[data-decor-toggle]').click();}
    record.checks.push('layout skeleton toggle; decoration toggle where present');
    for(const size of report.viewports){
      await page.setViewportSize(size);await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0);});
      const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
      if(dims.scroll>dims.client+1) report.errors.push({case:c.slug,viewport:size.width,error:`horizontal overflow: ${JSON.stringify(dims)}`});
      const missing=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete || i.naturalWidth===0).map(i=>i.src));assert.deepEqual(missing,[]);
      if(dims.scroll<=dims.client+1) record.checks.push(`no document overflow at ${size.width}px`);
      if(c.slug==='coffee-passport'){
        const fits=await page.locator('.roast-label').evaluate(el=>el.scrollHeight<=el.clientHeight+1);
        assert.ok(fits,`coffee package label overflows at ${size.width}px`);
      }
      if(size.width===1440){
        await page.screenshot({path:path.join(out,`${c.slug}.jpg`),type:'jpeg',quality:88,fullPage:false});
        await page.screenshot({path:path.join(out,`${c.slug}-full.jpg`),type:'jpeg',quality:88,fullPage:true});
        record.screenshots.push(`previews/${c.slug}.jpg`,`previews/${c.slug}-full.jpg`,`previews/${c.slug}-skeleton.jpg`);
      }else if(size.width===390){
        await page.screenshot({path:path.join(out,`${c.slug}-mobile.png`),fullPage:true});
        record.screenshots.push(`previews/${c.slug}-mobile.png`);
        // Confirm a primary control is reachable and usable after reflow.
        if(c.slug==='loop-impact'){await page.locator('#frequency').fill('4');assert.equal(await text('[data-annual]'),'208');await page.locator('#frequency').fill('3');}
        else if(c.slug==='field-notes'){await page.locator('[data-article="main"]').click();assert.equal(await page.locator('#detail-dialog').isVisible(),true);await page.keyboard.press('Escape');}
        else {
          if(c.slug==='coffee-passport'){
            assert.equal(await page.locator('.roast-mobile-profile').isVisible(),true);
            await page.locator('[data-origin="1"]').click();
            assert.equal(await text('[data-origin-en]'),'COLOMBIA');
            assert.equal(await page.locator('.roast-mobile-profile strong').textContent(),'中度烘焙 / 水洗处理');
            await page.locator('[data-origin="0"]').click();
          }
          await dialogCheck();
        }
        record.checks.push('primary interaction reachable on mobile');
      }
    }
    report.cases.push(record);
    console.log(`PASS ${c.id} ${c.slug}`);
  }
  current='gallery';
  await page.setViewportSize({width:1440,height:960});
  await page.goto(base,{waitUntil:'networkidle'});
  // Lazy previews load on scroll; force eager loading for the archived full-page screenshot.
  await page.locator('img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));
  await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
  assert.equal(await page.locator('.case-card').count(),10);
  await page.locator('[data-detail]').first().click();assert.equal(await page.locator('#case-dialog').isVisible(),true);await page.keyboard.press('Escape');
  await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0);});
  await page.screenshot({path:path.join(out,'gallery.png'),fullPage:true});
  await page.setViewportSize({width:390,height:844});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1));
  await page.screenshot({path:path.join(out,'gallery-mobile.png'),fullPage:true});
  assert.deepEqual(report.errors,[]);
  report.status='passed';
}catch(err){report.status='failed';report.failure=String(err);process.exitCode=1;console.error(err);}
finally{
  report.finishedAt=new Date().toISOString();
  await fs.writeFile(path.join(root,'docs/verification.json'),JSON.stringify(report,null,2)+'\n');
  await browser.close();
}

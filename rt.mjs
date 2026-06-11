import { JSDOM } from 'jsdom'; import { readFileSync, readdirSync } from 'node:fs';
const files = readdirSync('dist/js');
let out = [];
for (const name of ['page-home','page-servicios','page-blog','page-sobre','page-proyectos']) {
  const f = files.find(x => x.startsWith(name));
  const code = readFileSync(`dist/js/${f}`,'utf8');
  const dom = new JSDOM(`<!DOCTYPE html><html><body><div id="root"></div></body></html>`,{runScripts:'dangerously',pretendToBeVisual:true,url:'http://localhost/'});
  const w = dom.window;
  w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}}); w.scrollTo=()=>{};
  w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}}; w.requestAnimationFrame=cb=>setTimeout(()=>cb(0),0);
  const ctx=new Proxy(function(){},{get(t,k){if(k==='measureText')return()=>({width:0});if(/Gradient|Pattern/.test(k))return()=>({addColorStop(){}});return ctx;},set(){return true;},apply(){return ctx;}});
  w.HTMLCanvasElement.prototype.getContext=()=>ctx;
  const errs=[]; w.onerror=m=>errs.push(String(m));
  const s=w.document.createElement('script'); s.textContent=code; w.document.body.appendChild(s);
  await new Promise(r=>setTimeout(r,150));
  const html=w.document.getElementById('root')?.innerHTML||'';
  out.push(`  ${html.length>200&&!errs.length?'OK':'FALLA'} ${name}: ${html.length} chars${errs.length?' ERR '+errs[0]:''}`);
}
console.log(out.join('\n'));

const $=s=>document.querySelector(s);
function currentLang(){return document.documentElement.lang==='en'?'en':'ar';}
document.addEventListener('DOMContentLoaded',async()=>{const cat=await loadCatalog();const lang=currentLang();const productSel=$('#product'),sizeSel=$('#size'),govSel=$('#gov'),file=$('#file'),scale=$('#scale'),garment=$('#garment'),layer=$('#printLayer'),printImg=$('#printImg'),send=$('#send'),totalEl=$('#total');
cat.products.forEach(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=p.name[lang];productSel.appendChild(o);});
cat.sizes.forEach(s=>{const o=document.createElement('option');o.value=s;o.textContent=s;sizeSel.appendChild(o);});
cat.governorates.forEach(g=>{const o=document.createElement('option');o.value=g;o.textContent=g;govSel.appendChild(o);});
const id=new URLSearchParams(location.search).get('product')||'cotton';
const state={product:cat.products.find(p=>p.id===id)||cat.products[0],color:'black',size:'L',gov:'بغداد',scale:28};
productSel.value=state.product.id;sizeSel.value='L';
function refresh(){garment.src=state.product.images[state.color]||state.product.image;layer.style.width=state.scale+'%';const ship=state.gov==='بغداد'?cat.shipping.baghdad:cat.shipping.other;const base=state.product.price;totalEl.textContent=formatPrice(base+ship,lang);send.href=waUrl(`طلب وسم\n${state.product.name.ar}\n${state.size}\n${state.gov}\n${base+ship} IQD`);}
productSel.onchange=()=>{state.product=cat.products.find(p=>p.id===productSel.value);refresh();};
sizeSel.onchange=()=>{state.size=sizeSel.value;refresh();};
govSel.onchange=()=>{state.gov=govSel.value;refresh();};
scale.oninput=()=>{state.scale=+scale.value;refresh();};
if(file)file.onchange=()=>{const f=file.files[0];if(!f)return;printImg.src=URL.createObjectURL(f);layer.hidden=false;};
refresh();
});

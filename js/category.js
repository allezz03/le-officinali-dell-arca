const category = document.body.dataset.category || 'Tutti';
const grid = document.getElementById('categoryGrid');
const title = document.getElementById('categoryTitle');
const subtitle = document.getElementById('categorySubtitle');
let cart = JSON.parse(localStorage.getItem('arcaCart') || '{}');

const descriptions = {
  Tutti: ['Tutti i prodotti', 'Scopri la nostra selezione completa di integratori, cosmetici e tisane.'],
  Integratori: ['Integratori', 'Formule pensate per accompagnare ogni giorno il tuo benessere.'],
  Cosmetici: ['Cosmetici', 'Rituali di bellezza ispirati alla natura e formulati per la tua quotidianità.'],
  Tisane: ['Tisane', 'Infusi e miscele aromatiche per concederti un momento di equilibrio e relax.']
};

function money(v){ return `€ ${v.toFixed(2)}`; }
function updateCount(){ const el=document.getElementById('cartCount'); if(el) el.textContent=Object.values(cart).reduce((a,b)=>a+b,0); }
function saveCart(){ localStorage.setItem('arcaCart', JSON.stringify(cart)); updateCount(); }
function add(id){ cart[id]=(cart[id]||0)+1; saveCart(); const msg=document.getElementById('addedMessage'); if(msg){msg.textContent='Prodotto aggiunto al carrello ✓'; msg.classList.add('show'); setTimeout(()=>msg.classList.remove('show'),1600);} }
function render(){
  const [t,s] = descriptions[category] || descriptions.Tutti;
  title.textContent=t; subtitle.textContent=s;
  const items = category==='Tutti' ? window.PRODUCTS : window.PRODUCTS.filter(p=>p.category===category);
  grid.innerHTML = items.map(p=>`<article class="product-card"><div class="visual"><img src="${p.image}" alt="${p.name}" loading="lazy"></div><div class="product-info"><div class="category">${p.category.toUpperCase()}</div><div class="product-name">${p.name}</div><div class="desc">${p.desc}</div><div class="rating"><span>★★★★★ &nbsp; ${p.reviews} recensioni</span><b class="price">${money(p.price)}</b></div><button class="add" data-id="${p.id}">Aggiungi al carrello +</button></div></article>`).join('');
  grid.querySelectorAll('.add').forEach(btn=>btn.addEventListener('click',()=>add(Number(btn.dataset.id))));
}
updateCount(); render();

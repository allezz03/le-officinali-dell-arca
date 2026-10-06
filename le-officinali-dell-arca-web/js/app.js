const grid=document.getElementById("productGrid");
const search=document.getElementById("search");
const cartModal=document.getElementById("cartModal");
const cartItems=document.getElementById("cartItems");
const cartTotal=document.getElementById("cartTotal");
let cart=JSON.parse(localStorage.getItem("arcaCart")||"{}");

function artClass(p){return p.kind==="dropper"?"art-dropper":""}
function renderProducts(items=window.PRODUCTS){
  grid.innerHTML="";
  if(!items.length){grid.innerHTML='<p style="color:#778078">Nessun prodotto trovato.</p>';return}
  items.forEach(p=>{
    const card=document.createElement("article");
    card.className="product-card";
    card.innerHTML=`
      <div class="visual"><div class="mini-art"></div></div>
      <div class="product-info">
        <div class="category">${p.category.toUpperCase()}</div>
        <div class="product-name">${p.name}</div>
        <div class="desc">${p.desc}</div>
        <div class="rating"><span>★★★★★ &nbsp; ${p.reviews} recensioni</span><b class="price">€ ${p.price.toFixed(2)}</b></div>
        <button class="add">Aggiungi al carrello +</button>
      </div>`;
    card.querySelector(".add").onclick=()=>add(p.id);
    grid.appendChild(card);
  });
}
function add(id){cart[id]=(cart[id]||0)+1;saveCart();openCart()}
function saveCart(){localStorage.setItem("arcaCart",JSON.stringify(cart));updateCount()}
function updateCount(){document.getElementById("cartCount").textContent=Object.values(cart).reduce((a,b)=>a+b,0)}
function openCart(){cartModal.classList.remove("hidden");renderCart()}
function renderCart(){
  cartItems.innerHTML="";
  let total=0;
  Object.entries(cart).forEach(([id,qty])=>{
    const p=window.PRODUCTS.find(x=>x.id==id); if(!p)return;
    total+=p.price*qty;
    const row=document.createElement("div");row.className="cart-row";
    row.innerHTML=`<span>${p.name} ×${qty}</span><strong>€ ${(p.price*qty).toFixed(2)}</strong>`;
    cartItems.appendChild(row);
  });
  if(!Object.keys(cart).length)cartItems.innerHTML='<p style="color:#778078">Il carrello è vuoto.</p>';
  cartTotal.textContent=`€ ${total.toFixed(2)}`;
}
function filterCategory(cat){
  renderProducts(cat==="Tutti"?window.PRODUCTS:window.PRODUCTS.filter(p=>p.category===cat));
  document.getElementById("prodotti").scrollIntoView();
}
document.querySelectorAll("[data-cat]").forEach(b=>b.onclick=()=>filterCategory(b.dataset.cat));
document.querySelectorAll("[data-cat-link]").forEach(b=>b.onclick=()=>filterCategory(b.dataset.catLink));
document.getElementById("showAll").onclick=()=>filterCategory("Tutti");
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=()=>cartModal.classList.add("hidden");
cartModal.onclick=e=>{if(e.target===cartModal)cartModal.classList.add("hidden")};
function doSearch(){
  const q=search.value.trim().toLowerCase();
  renderProducts(q?window.PRODUCTS.filter(p=>
    p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)):window.PRODUCTS);
  document.getElementById("prodotti").scrollIntoView();
}
document.getElementById("searchBtn").onclick=doSearch;
search.addEventListener("keydown",e=>{if(e.key==="Enter")doSearch()});
document.getElementById("checkout").onclick=()=>alert("Checkout demo: qui potrà essere collegato il sistema di pagamento.");
renderProducts(window.PRODUCTS.slice(0,4));
updateCount();

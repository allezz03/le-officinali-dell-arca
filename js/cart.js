let cart = JSON.parse(localStorage.getItem("arcaCart") || "{}");

function saveCart(){
  localStorage.setItem("arcaCart", JSON.stringify(cart));
  updateCount();
}
function updateCount(){
  const el=document.getElementById("cartCount");
  if(el) el.textContent=Object.values(cart).reduce((a,b)=>a+b,0);
}
function money(value){ return `€ ${value.toFixed(2)}`; }

function renderCart(){
  const container=document.getElementById("cartPageItems");
  const empty=document.getElementById("emptyCart");
  let subtotal=0;
  container.innerHTML="";

  Object.entries(cart).forEach(([id,qty])=>{
    const p=window.PRODUCTS.find(x=>x.id==id);
    if(!p) return;
    subtotal += p.price * qty;
    const row=document.createElement("div");
    row.className="cart-page-row";
    row.innerHTML=`
      <div class="cart-product-art"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
      <div class="cart-product-info">
        <span class="category">${p.category.toUpperCase()}</span>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <strong>${money(p.price)}</strong>
      </div>
      <div class="quantity-control">
        <button data-action="minus">−</button><span>${qty}</span><button data-action="plus">+</button>
      </div>
      <strong class="row-total">${money(p.price*qty)}</strong>
      <button class="remove-item" title="Rimuovi prodotto">×</button>`;
    row.querySelector('[data-action="minus"]').onclick=()=>changeQty(p.id,-1);
    row.querySelector('[data-action="plus"]').onclick=()=>changeQty(p.id,1);
    row.querySelector('.remove-item').onclick=()=>{delete cart[p.id];saveCart();renderCart();};
    container.appendChild(row);
  });

  const isEmpty=Object.keys(cart).length===0;
  empty.classList.toggle("hidden",!isEmpty);
  container.classList.toggle("hidden",isEmpty);

  const shipping=subtotal===0?0:(subtotal>=49?0:4.90);
  document.getElementById("subtotal").textContent=money(subtotal);
  document.getElementById("shipping").textContent=shipping===0?"Gratis":money(shipping);
  document.getElementById("cartTotal").textContent=money(subtotal+shipping);
  document.getElementById("freeShippingText").textContent=subtotal>=49?"Hai ottenuto la spedizione gratuita!":"Spedizione gratuita sopra 49 €";
  document.getElementById("checkoutLink").classList.toggle("disabled",isEmpty);
  document.getElementById("checkoutLink").setAttribute("aria-disabled",isEmpty);
  document.getElementById("checkoutLink").onclick=(e)=>{if(isEmpty)e.preventDefault();};
}
function changeQty(id,delta){
  cart[id]=(cart[id]||0)+delta;
  if(cart[id]<=0) delete cart[id];
  saveCart(); renderCart();
}
updateCount();
renderCart();

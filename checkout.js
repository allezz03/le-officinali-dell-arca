let cart = JSON.parse(localStorage.getItem("arcaCart") || "{}");
function money(value){ return `€ ${value.toFixed(2)}`; }
function updateCount(){document.getElementById("cartCount").textContent=Object.values(cart).reduce((a,b)=>a+b,0)}

function renderOrder(){
  const container=document.getElementById("checkoutItems");
  let subtotal=0;
  container.innerHTML="";
  Object.entries(cart).forEach(([id,qty])=>{
    const p=window.PRODUCTS.find(x=>x.id==id); if(!p)return;
    subtotal += p.price*qty;
    const row=document.createElement("div");
    row.className="checkout-item";
    row.innerHTML=`<span>${p.name} ×${qty}</span><strong>${money(p.price*qty)}</strong>`;
    container.appendChild(row);
  });
  if(!Object.keys(cart).length){
    container.innerHTML='<p class="muted">Il carrello è vuoto. <a href="index.html#prodotti">Torna ai prodotti</a>.</p>';
  }
  const shipping=subtotal===0?0:(subtotal>=49?0:4.90);
  document.getElementById("subtotal").textContent=money(subtotal);
  document.getElementById("shipping").textContent=shipping===0?"Gratis":money(shipping);
  document.getElementById("checkoutTotal").textContent=money(subtotal+shipping);
}

document.getElementById("checkoutForm").addEventListener("submit",function(e){
  e.preventDefault();
  if(!Object.keys(cart).length){alert("Il carrello è vuoto.");return;}
  alert("Ordine demo completato! In una versione reale qui verrebbe avviato il pagamento.");
  localStorage.removeItem("arcaCart");
  cart={};
  updateCount();
  renderOrder();
  this.reset();
});
updateCount();
renderOrder();

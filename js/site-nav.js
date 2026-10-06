const cart = JSON.parse(localStorage.getItem('arcaCart') || '{}');
const count = document.getElementById('cartCount');
if(count) count.textContent = Object.values(cart).reduce((a,b)=>a+b,0);

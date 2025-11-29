// script.js - extraído desde index.html

// --- DATOS ---
const products = [
    // Precios ya en COP (ej. 99.900 -> 99900)
    { id: 1, name: "Camiseta Blanca", price: 99900, image: "https://www.gef.co/cdn/shop/files/hercules-blanco-900-13310_000900-1.jpg?v=1736883355&width=1000", description: "Algodón 100% orgánico, corte regular fit perfecto para cualquier ocasión." },
    { id: 2, name: "Chaqueta Denim", price: 299900, image: "https://static2.goldengoose.com/public/Style/ECOMM/GMP00284.P000621-50100-2.jpg", description: "Estilo vintage con un toque moderno, ideal para climas frescos." },
    { id: 3, name: "Tennis Running ", price: 499900, image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/b4e8b77e1c3c4688b8d4f82e82bee1cc_9366/Tenis_de_Running_Runfalcon_5_Rojo_JI0877_01_00_standard.jpg", description: "Suela de alto impacto y tejido transpirable para corredores exigentes." },
    { id: 4, name: "Gorra Blanca", price: 69900, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80", description: "Diseño ajustable unisex, tela resistente al sol." },
    { id: 5, name: "Vestido Floral", price: 199900, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80", description: "Ligero y fresco, con estampado floral exclusivo de temporada." },
    { id: 6, name: "Reloj de Cuero", price: 499900, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80", description: "Maquinaria suiza y correa de cuero genuino italiano." },
    { id: 7, name: "Maleta de Viaje", price: 249900, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", description: "Múltiples compartimentos y espacio para laptop de 15 pulgadas." },
    { id: 8, name: "Gafas de Sol", price: 129900, image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&q=80", description: "Protección UV400 con marco de acetato resistente." }
];

let cart = [];

// --- CONFIG: conversión de USD a COP ---
// Cambia este valor si quieres una tasa distinta. Ejemplo: 1 USD = 4300 COP
const USD_TO_COP = 4300;

// Convierte cantidad en USD a COP (entero)
function toCOP(usd) {
    // Convertir USD a COP y redondear al múltiplo de 100 más cercano.
    const amount = usd * USD_TO_COP;
    // Dividimos por 100, redondeamos y multiplicamos por 100 para obtener múltiplos de 100
    return Math.round(amount / 100) * 100;
}

// Formatea una cantidad en COP para mostrar en UI: $12.000
function formatCOP(amountCOP) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amountCOP);
}

// --- SISTEMA DE PÁGINAS ---
function showPage(pageId) {
    // Ocultar todas las vistas
    document.getElementById('view-home').classList.add('hidden');
    document.getElementById('view-details').classList.add('hidden');
    document.getElementById('view-login').classList.add('hidden');
    
    // Mostrar la seleccionada
    if(pageId === 'home') document.getElementById('view-home').classList.remove('hidden');
    if(pageId === 'details') document.getElementById('view-details').classList.remove('hidden');
    if(pageId === 'login') document.getElementById('view-login').classList.remove('hidden');
    
    // Scroll arriba
    window.scrollTo(0, 0);
}

// --- RENDERIZADO ---
function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = products.map(p => `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden product-card border border-gray-100 group">
            <div class="relative h-64 overflow-hidden" onclick="openProductDetails(${p.id})">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition flex items-center justify-center">
                    <span class="text-white opacity-0 group-hover:opacity-100 font-bold border border-white px-4 py-2 rounded-full">Ver Detalles</span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-2 truncate">${p.name}</h3>
                <div class="flex justify-between items-center">
                    <span class="text-xl font-bold text-indigo-600">${formatCOP(p.price)}</span>
                    <button onclick="addToCart(${p.id})" class="bg-gray-900 hover:bg-indigo-600 text-white p-3 rounded-full transition shadow-md">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// --- DETALLES DE PRODUCTO ---
function openProductDetails(id) {
    const product = products.find(p => p.id === id);
    
    // Llenar info principal
    const detailContainer = document.getElementById('detail-content');
    detailContainer.innerHTML = `
        <div class="h-96 rounded-2xl overflow-hidden shadow-xl">
            <img src="${product.image}" class="w-full h-full object-cover">
        </div>
        <div class="flex flex-col justify-center space-y-6">
            <h2 class="text-4xl font-bold text-gray-900">${product.name}</h2>
            <p class="text-2xl text-indigo-600 font-semibold">${formatCOP(product.price)}</p>
            <p class="text-gray-600 text-lg leading-relaxed">${product.description}</p>
            
            <div class="flex gap-4 items-center border-t pt-6">
                <button onclick="addToCart(${product.id})" class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition flex justify-center gap-2">
                    <i class="fa-solid fa-cart-plus"></i> Agregar al Carrito
                </button>
                <button class="p-4 bg-gray-100 rounded-xl hover:bg-red-100 hover:text-red-500 transition"><i class="fa-regular fa-heart text-xl"></i></button>
            </div>
            
            <div class="text-sm text-gray-500 space-y-2">
                <p><i class="fa-solid fa-truck text-indigo-500"></i> Envío gratis en pedidos superiores a ${formatCOP(toCOP(50))}</p>
                <p><i class="fa-solid fa-shield text-indigo-500"></i> Garantía de devolución de 30 días</p>
            </div>
        </div>
    `;

    // Llenar recomendaciones (3 productos random que no sean el actual)
    const recommendations = products.filter(p => p.id !== id).sort(() => 0.5 - Math.random()).slice(0, 3);
    document.getElementById('recommendations-list').innerHTML = recommendations.map(p => `
        <div onclick="openProductDetails(${p.id})" class="cursor-pointer bg-white rounded-lg shadow p-4 hover:shadow-lg transition flex gap-4 items-center">
            <img src="${p.image}" class="w-20 h-20 object-cover rounded-md">
            <div>
                <h4 class="font-bold text-sm">${p.name}</h4>
                <span class="text-indigo-600 font-bold">${formatCOP(p.price)}</span>
            </div>
        </div>
    `).join('');

    showPage('details');
}

// --- LOGIN ---
function handleLogin(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "Ingresando...";
    btn.disabled = true;

    setTimeout(() => {
        alert("¡Bienvenido! Has iniciado sesión correctamente.");
        btn.innerText = originalText;
        btn.disabled = false;
        showPage('home');
    }, 1000);
}

// --- CARRITO (Lógica igual a la anterior pero optimizada) ---
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(i => i.id === id);
    if (existing) existing.quantity++;
    else cart.push({ ...product, quantity: 1 });
    updateCartUI();
    
    // Animación visual botón carrito
    const cartBtn = document.querySelector('.fa-cart-shopping').parentElement;
    cartBtn.classList.add('scale-110', 'text-indigo-600');
    setTimeout(() => cartBtn.classList.remove('scale-110', 'text-indigo-600'), 200);
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.reduce((s, i) => s + i.quantity, 0);
    const container = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center text-gray-400 mt-10"><i class="fa-solid fa-basket-shopping text-4xl mb-2"></i><p>Vacío</p></div>`;
    } else {
        container.innerHTML = cart.map(i => `
            <div class="flex items-center gap-3 bg-white p-2 border rounded shadow-sm">
                <img src="${i.image}" class="w-12 h-12 object-cover rounded">
                <div class="flex-1">
                    <h4 class="text-xs font-bold">${i.name}</h4>
                    <div class="flex justify-between items-center mt-1">
                                <span class="text-xs text-gray-500">${i.quantity} x ${formatCOP(i.price)}</span>
                                <span class="text-indigo-600 text-sm font-bold">${formatCOP(i.price * i.quantity)}</span>
                    </div>
                </div>
                <button onclick="removeFromCart(${i.id})" class="text-red-400 hover:text-red-600"><i class="fa-solid fa-trash"></i></button>
            </div>
        `).join('');
    }
    const totalCOP = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
    document.getElementById('cart-total').innerText = formatCOP(totalCOP);
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal.classList.contains('invisible')) {
        modal.classList.remove('invisible');
        document.body.classList.add('cart-open');
    } else {
        document.body.classList.remove('cart-open');
        setTimeout(() => modal.classList.add('invisible'), 300);
    }
}

function checkout() {
    if(cart.length === 0) return alert("Tu carrito está vacío");
    alert("¡Redirigiendo a la pasarela de pago!");
    cart = [];
    updateCartUI();
    toggleCart();
}

// Inicializar
renderProducts();

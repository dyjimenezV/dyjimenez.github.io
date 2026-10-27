const products = [
    {
        id: 'amuse-dew',
        name: 'Dew Tint',
        brand: 'Amuse',
        price: 18.50,
        tag: 'Bestseller',
        desc: 'Acabado de rocío fresco. Hidratación profunda con un toque translúcido.',
        image: 'img/dew-tint.jpg'
    },
    {
        id: 'romand-juicy',
        name: 'Juicy Lasting Tint',
        brand: 'Romand',
        price: 17.00,
        tag: 'Iconic',
        desc: 'El tinte brillante definitivo. Tonos inspirados en frutas naturales.',
        image: 'img/romand-juicy.jpg'
    },
    {
        id: 'dasique-water',
        name: 'Water Dewy Gel',
        brand: 'Dasique',
        price: 19.00,
        tag: 'New',
        desc: 'Textura gel-agua innovadora. Volumen sutil y brillo sofisticado.',
        image: 'img/dasique-gel.jpg'
    },
    {
        id: 'peripera-ink',
        name: 'Ink Velvet',
        brand: 'Peripera',
        price: 13.50,
        tag: 'Classic',
        desc: 'Textura nube mate aterciopelada. Efecto difuminado impecable.',
        image: 'img/velvet-peripera.jpg'
    },
    {
        id: 'muzigae-mansion',
        name: 'Objet Liquid',
        brand: 'Muzigae',
        price: 21.00,
        tag: 'Vegan',
        desc: 'Lujo en estado líquido. Fórmula vegana con acabado soft-matte.',
        image: 'img/muzigae.jpg'
    },
    {
        id: 'clio-crystal',
        name: 'Crystal Glam',
        brand: 'Clio',
        price: 18.00,
        tag: 'Glass Skin',
        desc: 'Brillo efecto cristal. Labios pulposos con reflejo de luz instantáneo.',
        image: 'img/clio-crystal.jpg'
    },
    {
        id: 'etude-fixing',
        name: 'Fixing Tint',
        brand: 'Etude',
        price: 16.50,
        tag: 'Mask-proof',
        desc: 'Fijación extrema y peso pluma. Color intacto durante horas.',
        image: 'img/fixing-tint.jpg'
    },
    {
        id: 'judydoll-water',
        name: 'Water Gloss',
        brand: 'Judydoll',
        price: 14.00,
        tag: 'Trending',
        desc: 'Espejo líquido. Transparencia elegante que realza el tono natural.',
        image: 'img/judydoll.jpg'
    }
];

let currentFilter = 'all';
let cart = [];

window.filterProducts = function(filter) {
    currentFilter = filter;
    const grid = document.getElementById('products-grid');
    
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if(btn.id === `filter-${filter}`) {
            btn.className = "filter-btn text-dorami-dark font-medium border-b border-dorami-dark pb-1 transition-all";
        } else {
            btn.className = "filter-btn text-dorami-muted hover:text-dorami-dark pb-1 transition-all";
        }
    });

    const filtered = filter === 'all' ? products : products.filter(p => p.brand === filter);

    let html = '';
    filtered.forEach(p => {
        html += `
            <div class="chic-card p-5 flex flex-col h-full group">
                <div class="relative h-64 mb-5 overflow-hidden bg-dorami-cream">
                    <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                    <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-widest text-dorami-dark border border-gray-100">
                        ${p.tag}
                    </div>
                </div>
                <div class="flex-1 flex flex-col">
                    <span class="text-[10px] uppercase tracking-[0.2em] text-dorami-muted mb-1">${p.brand}</span>
                    <h3 class="font-serif text-lg text-dorami-dark">${p.name}</h3>
                    <p class="text-xs text-dorami-muted font-light mt-2 leading-relaxed flex-1">${p.desc}</p>
                    
                    <div class="pt-5 mt-4 border-t border-dorami-border flex items-center justify-between">
                        <span class="font-serif text-lg text-dorami-dark">$${p.price.toFixed(2)}</span>
                        <button onclick="addToCart('${p.id}')" class="text-xs uppercase tracking-widest text-dorami-dark hover:text-dorami-blush transition-colors flex items-center space-x-2">
                            <span>Añadir</span>
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;
};

window.toggleCartDrawer = function() {
    const drawer = document.getElementById('cart-drawer');
    drawer.classList.toggle('hidden');
};

window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if(!product) return;

    const existing = cart.find(item => item.id === productId);
    if(existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
    showToast(`Añadido: ${product.brand} ${product.name}`);
};

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const counter = document.getElementById('cart-counter');
    const totalEl = document.getElementById('cart-total');

    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    counter.innerText = totalCount;

    if(cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-32 text-dorami-muted" id="empty-cart-msg">
                <p class="font-serif text-lg italic text-dorami-dark mb-2">Tu bolsa está vacía.</p>
                <p class="text-xs uppercase tracking-widest">Descubre tu tono ideal en nuestra colección.</p>
            </div>
        `;
        totalEl.innerText = "$0.00";
        return;
    }

    let html = '';
    let totalSum = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        totalSum += itemTotal;
        html += `
            <div class="flex items-center space-x-4 pb-4 border-b border-dorami-border last:border-0">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-20 object-cover bg-dorami-cream">
                <div class="flex-1">
                    <span class="text-[9px] uppercase tracking-widest text-dorami-muted block">${item.brand}</span>
                    <h4 class="font-serif text-base text-dorami-dark mt-0.5">${item.name}</h4>
                    <p class="text-sm font-medium text-dorami-dark mt-1">$${item.price.toFixed(2)} <span class="text-xs text-dorami-muted font-normal ml-1">x ${item.qty}</span></p>
                </div>
                <button onclick="removeFromCart('${item.id}')" class="text-dorami-muted hover:text-dorami-dark transition-colors p-2">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        `;
    });

    container.innerHTML = html;
    totalEl.innerText = `$${totalSum.toFixed(2)}`;
}

window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showToast("Producto eliminado.");
};

window.checkoutCart = function() {
    if(cart.length === 0) {
        showToast("Añade productos a tu bolsa primero.");
        return;
    }
    const totalSum = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    showToast(`Redirigiendo a Outlook. Total: $${totalSum.toFixed(2)}`);
    setTimeout(() => {
        toggleCartDrawer();
    }, 1500);
};

const quotes = [
    "\"La verdadera elegancia reside en resaltar lo que ya eres. Un toque de color, un brillo sutil, y la confianza de ser tú misma.\"",
    "\"El maquillaje no es para ocultar, es para revelar. Descubre la textura de tu propia belleza.\"",
    "\"Menos cobertura, más luz. El secreto del K-Beauty es tratar a tu piel como un lienzo de seda.\"",
    "\"Un labial orgánico no solo embellece tu sonrisa, respeta la naturaleza de tus labios.\""
];

window.nextPoetryQuote = function() {
    const display = document.getElementById('poetry-display');
    let random = quotes[Math.floor(Math.random() * quotes.length)];
    while(display.innerText === random && quotes.length > 1) {
        random = quotes[Math.floor(Math.random() * quotes.length)];
    }
    display.style.opacity = 0;
    setTimeout(() => {
        display.innerText = random;
        display.style.opacity = 1;
    }, 500);
};

let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toast');
    const msg = toast.querySelector('#toast-message');
    msg.innerText = message;
    
    clearTimeout(toastTimeout);
    toast.classList.remove('translate-y-32', 'opacity-0');
    
    toastTimeout = setTimeout(() => {
        toast.classList.add('translate-y-32', 'opacity-0');
    }, 3000);
}

window.handleContactSubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    showToast(`Gracias, ${name}. Te contactaremos pronto.`);
    e.target.reset();
};

window.onload = function() {
    filterProducts('all');
}

/* 
===================================================
SPECIAL OFFERS PAGE LOGIC
===================================================
*/

// 1. LIVE NOTIFICATION SYSTEM
const FAKE_BUYERS = [
    { name: 'Rahim H.',    location: 'Dhaka'      },
    { name: 'Karim M.',    location: 'Chittagong' },
    { name: 'Sadia A.',    location: 'Sylhet'     },
    { name: 'Nusrat J.',   location: 'Rajshahi'   },
    { name: 'Tanvir R.',   location: 'Khulna'     },
    { name: 'Mitu B.',     location: 'Barisal'    },
    { name: 'Arif K.',     location: 'Rangpur'    },
    { name: 'Shahin P.',   location: 'Comilla'    },
    { name: 'Farida L.',   location: 'Gazipur'    },
    { name: 'Imran S.',    location: 'Narayanganj'},
    { name: 'Rupa T.',     location: 'Mymensingh' },
    { name: 'Jahid C.',    location: 'Bogura'     }
];

const FAKE_PRODUCTS = [
    'Wireless Earbuds Pro',
    'Smart Watch Series X',
    'Portable Charger 20000mAh',
    'Gaming Mouse RGB',
    'Bluetooth Speaker Mini',
    'Phone Stand Holder',
    'USB-C Hub 7-in-1',
    'Mechanical Keyboard',
    'Webcam HD 1080p',
    'LED Desk Lamp'
];

const TIME_AGO = [
    'Just now', '1 min ago', '2 mins ago', 
    '3 mins ago', '5 mins ago'
];

function showLiveNotification() {
    const buyer   = FAKE_BUYERS[Math.floor(Math.random() * FAKE_BUYERS.length)];
    const product = FAKE_PRODUCTS[Math.floor(Math.random() * FAKE_PRODUCTS.length)];
    const time    = TIME_AGO[Math.floor(Math.random() * TIME_AGO.length)];

    const existing = document.getElementById('live-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'live-toast';
    toast.className = 'live-toast';
    toast.innerHTML = `
        <div class="toast-avatar">
            <i class="fa-solid fa-user"></i>
        </div>
        <div class="toast-content">
            <p class="toast-name">${buyer.name} from ${buyer.location}</p>
            <p class="toast-action">🛒 just purchased <strong>${product}</strong></p>
            <p class="toast-time">${time}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;

    document.body.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideOutToast 0.4s ease forwards';
            setTimeout(() => toast.remove(), 400);
        }
    }, 5000);
}

// Show first notification after 3 seconds
setTimeout(showLiveNotification, 3000);

// Then repeat every 8-14 seconds (random interval)
function scheduleNext() {
    const delay = 8000 + Math.random() * 6000;
    setTimeout(() => {
        showLiveNotification();
        scheduleNext();
    }, delay);
}
scheduleNext();

// 2. FLASH SALE COUNTDOWN
function getFlashSaleEndTime() {
    let endTime = localStorage.getItem('flashSaleEnd');
    if (!endTime || Date.now() > parseInt(endTime)) {
        // Set new 48-hour window
        endTime = Date.now() + (48 * 60 * 60 * 1000);
        localStorage.setItem('flashSaleEnd', endTime);
    }
    return parseInt(endTime);
}

function updateFlashCountdown() {
    const endTime = getFlashSaleEndTime();
    const now     = Date.now();
    const diff    = endTime - now;

    if (diff <= 0) {
        localStorage.removeItem('flashSaleEnd');
        return;
    }

    const days  = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const mins  = Math.floor((diff % (1000*60*60)) / (1000*60));
    const secs  = Math.floor((diff % (1000*60)) / 1000);

    const dEl = document.getElementById('flash-days');
    const hEl = document.getElementById('flash-hours');
    const mEl = document.getElementById('flash-mins');
    const sEl = document.getElementById('flash-secs');

    if (dEl) dEl.textContent = String(days).padStart(2,'0');
    if (hEl) hEl.textContent = String(hours).padStart(2,'0');
    if (mEl) mEl.textContent = String(mins).padStart(2,'0');
    if (sEl) sEl.textContent = String(secs).padStart(2,'0');
}

setInterval(updateFlashCountdown, 1000);
updateFlashCountdown();

// 3. OFFER PRODUCTS DATA
const OFFER_PRODUCTS = [
    {
        id: 'op1',
        name: 'Wireless Noise Cancelling Earbuds Pro X200',
        desc: 'Premium sound, 30hr battery, IPX5 waterproof',
        price: 2499,  original: 3999,
        discount: 38, image: 'https://placehold.co/400x240/0A1628/FFFFFF?text=Earbuds+Pro',
        type: 'flash',    badge: '⚡ FLASH',
        stock: 8,     stockPct: 25,
        viewers: 23,
        offerHours: 5, offerMins: 30
    },
    {
        id: 'op2',
        name: 'Smart Watch Fitness Tracker Series 5',
        desc: 'Heart rate, SpO2, GPS, 7-day battery life',
        price: 3799,  original: 5500,
        discount: 31, image: 'https://placehold.co/400x240/E84C0A/FFFFFF?text=Smart+Watch',
        type: 'hot',      badge: '🔥 HOT DEAL',
        stock: 15,    stockPct: 45,
        viewers: 41,
        offerHours: 12, offerMins: 0
    },
    {
        id: 'op3',
        name: 'Gaming Combo Bundle: Mouse + Keyboard + Pad',
        desc: 'RGB backlit mechanical keyboard, 7200 DPI mouse',
        price: 4299,  original: 6800,
        discount: 37, image: 'https://placehold.co/400x240/1A1A2E/FFFFFF?text=Gaming+Combo',
        type: 'bundle',   badge: '📦 BUNDLE',
        stock: 20,    stockPct: 60,
        viewers: 17,
        offerHours: 24, offerMins: 0
    },
    {
        id: 'op4',
        name: 'Portable Power Bank 20000mAh Fast Charge',
        desc: '65W PD fast charge, dual USB-A + USB-C output',
        price: 1899,  original: 2800,
        discount: 32, image: 'https://placehold.co/400x240/16A34A/FFFFFF?text=Power+Bank',
        type: 'bestseller', badge: '⭐ BESTSELLER',
        stock: 34,    stockPct: 75,
        viewers: 38,
        offerHours: 36, offerMins: 15
    },
    {
        id: 'op5',
        name: 'Bluetooth Speaker 360° Surround Sound',
        desc: 'IPX7 waterproof, 24hr playtime, deep bass',
        price: 2199,  original: 3200,
        discount: 31, image: 'https://placehold.co/400x240/7C3AED/FFFFFF?text=Speaker',
        type: 'new',      badge: '🆕 NEW',
        stock: 50,    stockPct: 90,
        viewers: 12,
        offerHours: 48, offerMins: 0
    },
    {
        id: 'op6',
        name: 'USB-C 7-in-1 Multiport Hub Adapter',
        desc: 'HDMI 4K, 3x USB 3.0, SD card, 100W PD',
        price: 1499,  original: 2200,
        discount: 32, image: 'https://placehold.co/400x240/F59E0B/FFFFFF?text=USB-C+Hub',
        type: 'flash',    badge: '⚡ FLASH',
        stock: 6,     stockPct: 15,
        viewers: 29,
        offerHours: 3, offerMins: 45
    },
    {
        id: 'op7',
        name: 'Ring Light 18" with Tripod Stand + Phone Holder',
        desc: 'Dimmable 3 color modes, perfect for streaming',
        price: 1699,  original: 2500,
        discount: 32, image: 'https://placehold.co/400x240/E63946/FFFFFF?text=Ring+Light',
        type: 'hot',      badge: '🔥 HOT DEAL',
        stock: 22,    stockPct: 55,
        viewers: 35,
        offerHours: 18, offerMins: 30
    },
    {
        id: 'op8',
        name: 'Home Office Bundle: Webcam + Headset + Hub',
        desc: '1080p webcam, noise-cancelling mic headset',
        price: 5499,  original: 8200,
        discount: 33, image: 'https://placehold.co/400x240/0A1628/FFFFFF?text=Office+Bundle',
        type: 'bundle',   badge: '📦 BUNDLE',
        stock: 10,    stockPct: 30,
        viewers: 19,
        offerHours: 30, offerMins: 0
    },
    {
        id: 'op9',
        name: 'Mechanical Gaming Keyboard TKL RGB Backlit',
        desc: 'Blue switches, anti-ghosting, USB braided cable',
        price: 3299,  original: 4800,
        discount: 31, image: 'https://placehold.co/400x240/1e3a5f/FFFFFF?text=Keyboard',
        type: 'bestseller', badge: '⭐ BESTSELLER',
        stock: 28,    stockPct: 70,
        viewers: 44,
        offerHours: 42, offerMins: 20
    }
];

// 4. PER-CARD COUNTDOWN TIMERS
const offerEndTimes = {};

function initOfferTimers() {
    OFFER_PRODUCTS.forEach(product => {
        const ms = (product.offerHours * 60 * 60 * 1000) + (product.offerMins * 60 * 1000);
        const key = 'offer_end_' + product.id;
        let endTime = localStorage.getItem(key);
        if (!endTime || Date.now() > parseInt(endTime)) {
            endTime = Date.now() + ms;
            localStorage.setItem(key, endTime);
        }
        offerEndTimes[product.id] = parseInt(endTime);
    });
}

function updateAllTimers() {
    OFFER_PRODUCTS.forEach(product => {
        const diff = offerEndTimes[product.id] - Date.now();
        const hEl  = document.getElementById('h-' + product.id);
        const mEl  = document.getElementById('m-' + product.id);
        const sEl  = document.getElementById('s-' + product.id);
        
        if (!hEl) return;

        if (diff <= 0) {
            hEl.textContent = '00';
            mEl.textContent = '00';
            sEl.textContent = '00';
            const card = document.getElementById('card-' + product.id);
            if (card) card.classList.add('offer-expired');
            return;
        }

        const h = Math.floor(diff / (1000*60*60));
        const m = Math.floor((diff % (1000*60*60)) / (1000*60));
        const s = Math.floor((diff % (1000*60)) / 1000);

        hEl.textContent = String(h).padStart(2,'0');
        mEl.textContent = String(m).padStart(2,'0');
        sEl.textContent = String(s).padStart(2,'0');

        if (h < 1) {
            [hEl, mEl, sEl].forEach(el => {
                const box = el.closest('.timer-box');
                if (box) box.style.background = '#E63946';
            });
        }
    });
}

setInterval(updateAllTimers, 1000);

// 5. VIEWERS COUNT UPDATE
function updateViewers() {
    OFFER_PRODUCTS.forEach(product => {
        const el = document.getElementById('viewers-' + product.id);
        if (!el) return;
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const current = parseInt(el.textContent);
        const newVal = Math.max(3, Math.min(99, current + change));
        el.textContent = newVal;
    });
}
setInterval(updateViewers, 30000);

// 6. RENDER OFFER CARDS
function renderOfferCards(filter = 'all') {
    const grid = document.getElementById('offers-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = filter === 'all' 
        ? OFFER_PRODUCTS 
        : OFFER_PRODUCTS.filter(p => p.type === filter);

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="no-offers">
                <i class="fa-solid fa-tag"></i>
                <p>No offers in this category right now.</p>
                <span>Check back soon!</span>
            </div>
        `;
        return;
    }

    filtered.forEach(product => {
        const saved = product.original - product.price;
        const card = document.createElement('div');
        card.className = 'offer-card';
        card.id = 'card-' + product.id;
        card.dataset.type = product.type;

        card.innerHTML = `
            <div class="offer-card-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="discount-badge">${product.discount}% OFF</div>
                <div class="type-badge badge-${product.type}">${product.badge}</div>
                <div class="stock-strip">
                    <div class="viewers-row">
                        <i class="fa-solid fa-fire"></i>
                        <span id="viewers-${product.id}">${product.viewers}</span> people viewing
                    </div>
                    <div class="stock-bar-wrap">
                        <div class="stock-bar-fill" style="width:${product.stockPct}%"></div>
                    </div>
                    <div class="stock-label">Only <strong>${product.stock} left</strong> in stock!</div>
                </div>
            </div>
            <div class="offer-card-info">
                <h3 class="offer-product-name">${product.name}</h3>
                <p class="offer-product-desc">${product.desc}</p>
                <div class="offer-price-row">
                    <span class="offer-price">৳${product.price.toLocaleString('en-IN')}</span>
                    <span class="offer-original">৳${product.original.toLocaleString('en-IN')}</span>
                    <span class="offer-saved">Save ৳${saved.toLocaleString('en-IN')}</span>
                </div>
            </div>
            <div class="offer-card-footer">
                <div class="offer-countdown">
                    <p class="countdown-label">⏱ Offer ends in:</p>
                    <div class="countdown-boxes">
                        <div class="timer-box"><span id="h-${product.id}" class="timer-num">00</span><span class="timer-unit">HRS</span></div>
                        <span class="timer-sep">:</span>
                        <div class="timer-box"><span id="m-${product.id}" class="timer-num">00</span><span class="timer-unit">MIN</span></div>
                        <span class="timer-sep">:</span>
                        <div class="timer-box"><span id="s-${product.id}" class="timer-num">00</span><span class="timer-unit">SEC</span></div>
                    </div>
                </div>
                <div class="offer-action-row">
                    <button class="btn-order-now offer-order-btn" type="button"
                            data-name="${product.name}" data-price="${product.price}"
                            data-original="${product.original}" data-image="${product.image}"
                            data-code="${product.id}">
                        <i class="fa-solid fa-bolt"></i> Order Now
                    </button>
                    <button class="btn-icon-sm wishlist-btn" type="button" data-product-id="${product.id}"><i class="fa-regular fa-heart"></i></button>
                    <button class="btn-icon-sm whatsapp-btn" type="button"
                            onclick="window.open('https://wa.me/8801XXXXXXXXX?text=Hi, interested in: ${encodeURIComponent(product.name)}','_blank')">
                        <i class="fa-brands fa-whatsapp"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Attach Order Now buttons to modal
    document.querySelectorAll('.offer-order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (typeof openCartModal === 'function') {
                openCartModal({
                    name:     btn.dataset.name,
                    price:    parseInt(btn.dataset.price),
                    original: parseInt(btn.dataset.original),
                    image:    btn.dataset.image,
                    model:    btn.dataset.code
                });
            }
        });
    });

    // Wishlist toggle
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.dataset.productId;
            if (typeof window.toggleWishlist === 'function') {
                window.toggleWishlist(productId, btn);
            } else {
                // Fallback to visual toggle if global function is missing
                const icon = btn.querySelector('i');
                icon.classList.toggle('fa-regular');
                icon.classList.toggle('fa-solid');
                icon.style.color = icon.classList.contains('fa-solid') ? '#E63946' : '';
            }
        });
    });

    initOfferTimers();
    updateAllTimers();
}

// 7. TAB SWITCHING
document.querySelectorAll('.offer-tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.offer-tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderOfferCards(this.dataset.filter);
    });
});

// 8. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    renderOfferCards('all');
    
    // Update hero stats with some fake numbers
    const dealsEl = document.getElementById('hero-total-deals');
    const savedEl = document.getElementById('hero-total-saved');
    if (dealsEl) dealsEl.textContent = OFFER_PRODUCTS.length;
    if (savedEl) savedEl.textContent = '৳5,000+';

    // Flash sale button scroll
    const flashBtn = document.querySelector('.flash-btn');
    if (flashBtn) {
        flashBtn.addEventListener('click', () => {
            const flashTab = document.querySelector('[data-filter="flash"]');
            if (flashTab) flashTab.click();
            document.getElementById('offers-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});

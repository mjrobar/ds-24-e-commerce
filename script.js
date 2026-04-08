/* =============================================================
   DS-24 E-commerce Script
   ============================================================= */

// =============================================================
// CART UTILITIES (Global)
// =============================================================

// 1. Get Cart from LocalStorage
window.getCart = function() {
    const cart = localStorage.getItem('ds24_cart');
    return cart ? JSON.parse(cart) : [];
}

// 2. Save Cart to LocalStorage
window.saveCart = function(cart) {
    localStorage.setItem('ds24_cart', JSON.stringify(cart));
    updateCartBadge();
}

// 3. Update Cart Badge in Navbar
window.updateCartBadge = function() {
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.textContent = totalQty;
    }
}

// 4. Update Wishlist Badge in Navbar
window.updateWishlistBadge = function() {
    const wishlist = JSON.parse(localStorage.getItem('ds24_wishlist')) || [];
    const badge = document.getElementById('wishlistBadge');
    if (badge) {
        badge.textContent = wishlist.length;
    }
}

// 5. Toggle Wishlist
window.toggleWishlist = function(productId, btnElement) {
    let wishlist = JSON.parse(localStorage.getItem('ds24_wishlist')) || [];
    const index = wishlist.indexOf(productId);

    if (index === -1) {
        wishlist.push(productId);
        if (btnElement) {
            btnElement.classList.add('active');
            btnElement.setAttribute('title', 'Remove from Wishlist');
        }
    } else {
        wishlist.splice(index, 1);
        if (btnElement) {
            btnElement.classList.remove('active');
            btnElement.setAttribute('title', 'Add to Wishlist');
        }
    }

    localStorage.setItem('ds24_wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
}

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Swiper Slider
    const heroSwiperEl = document.querySelector('.heroSwiper');
    if (heroSwiperEl) {
        const swiper = new Swiper('.heroSwiper', {
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // 2. Category Dropdown Toggle
    const categoryBtn = document.getElementById('categoryBtn');
    const categoryDropdown = document.getElementById('categoryDropdown');

    categoryBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        categoryDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!categoryBtn.contains(e.target) && !categoryDropdown.contains(e.target)) {
            categoryDropdown.classList.remove('active');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-active');
        overlay.classList.toggle('active');
        
        // Change icon
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('mobile-active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    overlay.addEventListener('click', () => {
        navMenu.classList.remove('mobile-active');
        overlay.classList.remove('active');
        mobileToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });

    // =============================================================
    // CART & MODAL LOGIC
    // =============================================================

    // 4. Open Cart Modal
    window.openCartModal = function(product) {
        const overlay = document.getElementById('cart-modal-overlay');
        const modal = document.querySelector('.cart-modal');
        
        if (!overlay || !modal) return;

        // Populate Modal Data
        document.getElementById('modal-product-name').textContent = product.name;
        document.getElementById('modal-product-name-sm').textContent = product.name;
        document.getElementById('modal-product-image').src = product.image;
        document.getElementById('modal-product-code').textContent = `Model: ${product.model || 'N/A'}`;
        
        const unitPrice = product.price;
        const unitPriceDisplay = document.getElementById('modal-unit-price');
        const totalPriceDisplay = document.getElementById('modal-total-price');
        const qtyDisplay = document.getElementById('modal-qty-display');
        
        unitPriceDisplay.textContent = `৳${unitPrice.toLocaleString()} / unit`;
        
        let currentQty = 1;
        qtyDisplay.textContent = currentQty;
        totalPriceDisplay.textContent = `৳${(unitPrice * currentQty).toLocaleString()}`;

        // Show Modal
        overlay.classList.add('active');

        // Qty Controls
        const plusBtn = document.getElementById('modal-qty-plus');
        const minusBtn = document.getElementById('modal-qty-minus');

        // Remove old listeners to avoid duplicates
        const newPlusBtn = plusBtn.cloneNode(true);
        const newMinusBtn = minusBtn.cloneNode(true);
        plusBtn.parentNode.replaceChild(newPlusBtn, plusBtn);
        minusBtn.parentNode.replaceChild(newMinusBtn, minusBtn);

        newPlusBtn.onclick = () => {
            currentQty++;
            qtyDisplay.textContent = currentQty;
            totalPriceDisplay.textContent = `৳${(unitPrice * currentQty).toLocaleString()}`;
        };

        newMinusBtn.onclick = () => {
            if (currentQty > 1) {
                currentQty--;
                qtyDisplay.textContent = currentQty;
                totalPriceDisplay.textContent = `৳${(unitPrice * currentQty).toLocaleString()}`;
            }
        };

        // Action Buttons
        const viewCartBtn = document.getElementById('btn-view-cart');
        const confirmOrderBtn = document.getElementById('btn-confirm-order');

        viewCartBtn.onclick = () => {
            addToCart(product, currentQty);
            window.location.href = 'cart.html';
        };

        confirmOrderBtn.onclick = () => {
            addToCart(product, currentQty);

            // Maika Pixel: Track InitiateCheckout
            if (typeof maika === 'function') {
                // Generate unique Event ID for Deduplication
                var currentTimestamp = Date.now();
                var randomString = Math.random().toString(36).substr(2, 9);
                var uniqueEventId = 'evt_' + currentTimestamp + '_' + randomString;

                // Calculate cart data
                var cartProductIds = [String(product.id)];
                var totalCartValue = parseFloat(product.price) * currentQty;
                var totalItemsCount = currentQty;

                // Send InitiateCheckout data
                maika('track', 'InitiateCheckout', {
                    event_id: uniqueEventId,
                    content_ids: cartProductIds,
                    content_type: 'product',
                    value: totalCartValue,
                    currency: 'BDT',
                    num_items: totalItemsCount,
                    source_url: window.location.href
                });
            }

            // Redirect to checkout
            window.location.href = 'checkout.html';
        };
    }

    // 5. Close Cart Modal
    window.closeCartModal = function() {
        const overlay = document.getElementById('cart-modal-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    // 6. Add to Cart Logic
    window.addToCart = function(product, qty) {
        let cart = getCart();
        const existingItemIndex = cart.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].qty += qty;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                model: product.model || 'N/A',
                rewardPoints: product.rewardPoints || 0,
                qty: qty
            });
        }

        // Maika Pixel: Track AddToCart
        if (typeof maika === 'function') {
            // Generate a unique Event ID for Deduplication
            var currentTimestamp = Date.now();
            var randomString = Math.random().toString(36).substr(2, 9);
            var uniqueEventId = 'evt_' + currentTimestamp + '_' + randomString;

            // Calculate total value
            var totalValue = parseFloat(product.price) * (qty || 1);

            // Send AddToCart data
            maika('track', 'AddToCart', {
                event_id: uniqueEventId,
                content_ids: [String(product.id)],
                content_type: 'product',
                content_name: product.name,
                value: totalValue,
                currency: 'BDT',
                num_items: qty || 1,
                source_url: window.location.href
            });
        }

        saveCart(cart);
    }

    // Close modal on X or Overlay click
    const closeBtn = document.getElementById('modal-close');
    const cartOverlay = document.getElementById('cart-modal-overlay');

    if (closeBtn) closeBtn.onclick = closeCartModal;
    if (cartOverlay) {
        cartOverlay.onclick = (e) => {
            if (e.target === cartOverlay) closeCartModal();
        };
    }

    // Global listener for "Order Now" buttons (delegation)
    document.addEventListener('click', (e) => {
        const orderBtn = e.target.closest('.order-now-btn, .order-btn');
        if (orderBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            // Try to get product data from attributes or parent
            const productCard = orderBtn.closest('.product-card, .product-detail-container');
            if (productCard) {
                const product = {
                    id: orderBtn.dataset.id || Math.random().toString(36).substr(2, 9),
                    name: orderBtn.dataset.name || productCard.querySelector('h3, .product-title')?.textContent.trim(),
                    price: parseInt(orderBtn.dataset.price) || parseInt(productCard.querySelector('.new-price, .current-price')?.textContent.replace(/[^0-9]/g, '')),
                    image: orderBtn.dataset.image || productCard.querySelector('img')?.src,
                    model: orderBtn.dataset.model || 'N/A',
                    rewardPoints: parseInt(orderBtn.dataset.points) || 0
                };

                if (product.name && product.price) {
                    openCartModal(product);
                }
            }
        }
    });

    updateCartBadge();

    // 4. Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 5. Generate Sample Products
    const productGrid = document.getElementById('productGrid');

    const sampleProducts = [
        {
            id: 1,
            name: "Asus NUC 14 Essential Core 3 N355",
            desc: "Portable Mini PC with Intel Core 3 N355 processor",
            price: 32000,
            oldPrice: 36000,
            discount: "20% OFF",
            status: "instock",
            brand: "Asus",
            code: "41825",
            image: "https://placehold.co/520x400/0A1628/FFFFFF?text=Asus+NUC+14",
            features: "Model: NUC 14 Essential|Processor: Intel Core 3 N355|Graphics: Integrated Intel|RAM: 8GB DDR5|Storage: 256GB NVMe SSD"
        },
        {
            id: 2,
            name: "Smart Watch Series 7 Pro",
            desc: "Track your health and stay connected on the go.",
            price: 12500,
            oldPrice: 15000,
            discount: "HOT DEAL",
            status: "instock",
            brand: "Apple",
            code: "55210",
            image: "https://placehold.co/520x400/E84C0A/FFFFFF?text=Smart+Watch",
            features: "Display: Always-on Retina|Sensors: Blood Oxygen, ECG|Water Resistance: 50m|Battery: Up to 18 hours|Connectivity: GPS + Cellular"
        },
        {
            id: 3,
            name: "Minimalist Leather Wallet",
            desc: "Genuine leather wallet with RFID protection.",
            price: 1200,
            oldPrice: 1500,
            discount: "0",
            status: "instock",
            brand: "Bellroy",
            code: "11204",
            image: "https://placehold.co/520x400/112240/FFFFFF?text=Wallet",
            features: "Material: Premium Eco-tanned Leather|Capacity: 4-11 cards|Protection: RFID Blocking|Dimensions: 95 x 80mm|Warranty: 3 Years"
        },
        {
            id: 4,
            name: "Mechanical Gaming Keyboard",
            desc: "RGB backlit keys with blue switches for ultimate gaming.",
            price: 4500,
            oldPrice: 5500,
            discount: "18% OFF",
            status: "instock",
            brand: "Logitech",
            code: "99821",
            image: "https://placehold.co/520x400/0A1628/FFFFFF?text=Keyboard",
            features: "Switch Type: Mechanical Blue|Backlight: RGB 16.8M Colors|Connectivity: Wired USB|Keycaps: Double-shot PBT|Anti-ghosting: Full N-Key Rollover"
        },
        {
            id: 5,
            name: "Ultra HD Action Camera 4K",
            desc: "Capture your adventures in stunning 4K resolution.",
            price: 8900,
            oldPrice: 10000,
            discount: "0",
            status: "outofstock",
            brand: "GoPro",
            code: "77321",
            image: "https://placehold.co/520x400/E84C0A/FFFFFF?text=Camera",
            features: "Resolution: 4K @ 60fps|Stabilization: HyperSmooth 4.0|Waterproof: Up to 10m|Display: Dual Screens|Voice Control: Yes"
        },
        {
            id: 6,
            name: "Portable Bluetooth Speaker",
            desc: "Waterproof speaker with 20 hours of battery life.",
            price: 3200,
            oldPrice: 4000,
            discount: "20% OFF",
            status: "instock",
            brand: "JBL",
            code: "22109",
            image: "https://placehold.co/520x400/112240/FFFFFF?text=Speaker",
            features: "Output: 20W RMS|Battery Life: 20 Hours|Waterproof: IPX7 Rated|Connectivity: Bluetooth 5.1|Charging: USB-C"
        },
        {
            id: 7,
            name: "Ergonomic Office Chair",
            desc: "Comfortable mesh chair for long working hours.",
            price: 15500,
            oldPrice: 18000,
            discount: "NEW",
            status: "instock",
            brand: "Herman Miller",
            code: "88432",
            image: "https://placehold.co/520x400/0A1628/FFFFFF?text=Chair",
            features: "Material: Breathable Mesh|Adjustment: Height, Tilt, Armrest|Base: Heavy-duty Nylon|Weight Capacity: 150kg|Assembly: Required"
        },
        {
            id: 8,
            name: "Stainless Steel Water Bottle",
            desc: "Eco-friendly bottle that keeps drinks cold for 24 hours.",
            price: 950,
            oldPrice: 1200,
            discount: "0",
            status: "instock",
            brand: "Hydro Flask",
            code: "33211",
            image: "https://placehold.co/520x400/E84C0A/FFFFFF?text=Bottle",
            features: "Material: 18/8 Stainless Steel|Insulation: TempShield Double Wall|Capacity: 32 oz|BPA Free: Yes|Lid: Flex Cap"
        },
        {
            id: 9,
            name: "Wireless Gaming Mouse",
            desc: "High-precision sensor with customizable buttons.",
            price: 2800,
            oldPrice: 3500,
            discount: "20% OFF",
            status: "instock",
            brand: "Razer",
            code: "66543",
            image: "https://placehold.co/520x400/112240/FFFFFF?text=Mouse",
            features: "Sensor: 20K DPI Optical|Buttons: 8 Programmable|Battery: Up to 70 Hours|Weight: 74g|Connectivity: 2.4GHz Wireless"
        },
        {
            id: 10,
            name: "Noise Cancelling Earbuds",
            desc: "True wireless earbuds with deep bass and clear calls.",
            price: 4200,
            oldPrice: 5000,
            discount: "16% OFF",
            status: "instock",
            brand: "Sony",
            code: "44321",
            image: "https://placehold.co/520x400/0A1628/FFFFFF?text=Earbuds",
            features: "ANC: Active Noise Cancellation|Battery: 8h (Buds) + 16h (Case)|Waterproof: IPX4|Driver: 6mm Dynamic|Microphone: Beamforming"
        }
    ];

    function renderProducts() {
        if (!productGrid) return;
        const wishlist = JSON.parse(localStorage.getItem('ds24_wishlist')) || [];
        productGrid.innerHTML = sampleProducts.map(product => {
            const isWishlisted = wishlist.includes(product.id);
            return `
                <div class="product-card" 
                    data-id="${product.id}"
                    data-name="${product.name}"
                    data-price="${product.price}"
                    data-original="${product.oldPrice || product.price}"
                    data-discount="${product.discount === '0' ? '0' : (product.discount || '0')}"
                    data-status="${product.status}"
                    data-brand="${product.brand}"
                    data-code="${product.code}"
                    data-desc="${product.desc}"
                    data-image="${product.image}"
                    data-features="${product.features}">
                    <div class="product-image-container">
                        ${product.discount && product.discount !== '0' ? `<div class="discount-badge">${product.discount}</div>` : ''}
                        <img src="${product.image}" alt="${product.name}" class="product-image" referrerPolicy="no-referrer">
                    </div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-desc">${product.desc}</p>
                    <div class="product-price-row">
                        <span class="current-price">৳${product.price.toLocaleString('en-IN')}</span>
                        ${product.oldPrice ? `<span class="old-price">৳${product.oldPrice.toLocaleString('en-IN')}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                                data-id="${product.id}" 
                                title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
                            <i class="fa-solid fa-heart"></i>
                        </button>
                        <button type="button" class="order-btn">Order Now</button>
                        <button class="whatsapp-btn" onclick="event.stopPropagation(); openWhatsApp('${product.name}')" title="Order via WhatsApp">
                            <i class="fa-brands fa-whatsapp"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Add event listeners to product cards for dynamic navigation
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function(e) {
                // If the user clicked the button or an icon, STOP HERE.
                if (e.target.closest('.order-btn') || 
                    e.target.closest('button') || 
                    e.target.closest('i')) {
                    return; 
                }
                
                const params = new URLSearchParams({
                    id:       this.dataset.id,
                    name:     this.dataset.name,
                    price:    this.dataset.price,
                    original: this.dataset.original,
                    discount: this.dataset.discount,
                    status:   this.dataset.status,
                    brand:    this.dataset.brand,
                    code:     this.dataset.code,
                    desc:     this.dataset.desc,
                    image:    this.dataset.image,
                    features: this.dataset.features
                });
                window.location.href = `product-detail.html?${params}`;
            });
        });

        // Add event listeners to wishlist buttons
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click
                const productId = parseInt(this.getAttribute('data-id'));
                toggleWishlist(productId, this);
            });
        });

        // Order button click listener
        document.querySelectorAll('.order-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();   // ← stops bubbling to card
                e.preventDefault();    // ← stops any default button behavior
                
                // Get the card (parent) to read its data- attributes
                const card = e.target.closest('.product-card');
                
                const productData = {
                    id:    card.dataset.id,
                    name:  card.dataset.name,
                    price: card.dataset.price,
                    code:  card.dataset.code,
                    image: card.dataset.image
                };

                openCartModal(productData);
            });
        });
    }

    updateWishlistBadge();
    renderProducts();
});

// WhatsApp Function
function openWhatsApp(productName) {
    const phoneNumber = "8801XXXXXXXXX"; // Replace with actual number
    const message = `Hi, I am interested in: ${productName}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

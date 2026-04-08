/* =============================================================
   PRODUCT DETAIL PAGE INTERACTIONS
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Read URL Parameters & Render Page Dynamically
    const params = new URLSearchParams(window.location.search);

    const product = {
        id:       parseInt(params.get('id')) || 101,
        name:     params.get('name')     || 'Asus NUC 14 Essential Core 3 N355 Portable Mini PC',
        price:    params.get('price')    || '45500',
        original: params.get('original') || '48000',
        discount: params.get('discount') || '5',
        status:   params.get('status')   || 'instock',
        brand:    params.get('brand')    || 'Asus',
        code:     params.get('code')     || '34567',
        desc:     params.get('desc')     || '',
        image:    params.get('image')    || 'https://placehold.co/520x400',
        features: params.get('features') || 'Model: NUC 14 Essential|Processor: Intel Core 3 N355|Graphics: Integrated Intel|RAM: 8GB DDR5|Storage: 256GB NVMe SSD'
    };

    // Update Page Content
    if (document.getElementById('product-title')) document.getElementById('product-title').textContent = product.name;
    if (document.getElementById('breadcrumb-product')) document.getElementById('breadcrumb-product').textContent = product.name;
    
    const mainImg = document.getElementById('main-image');
    if (mainImg) {
        mainImg.src = product.image;
        mainImg.alt = product.name;
    }

    document.querySelectorAll('.thumbnail-img').forEach(img => {
        img.src = product.image;
        img.alt = product.name;
    });

    if (document.getElementById('product-price')) {
        document.getElementById('product-price').textContent = '৳' + Number(product.price).toLocaleString('en-IN');
    }
    if (document.getElementById('product-original')) {
        document.getElementById('product-original').textContent = '৳' + Number(product.original).toLocaleString('en-IN');
    }

    // Hide original price tag if no discount
    const originalPriceTag = document.getElementById('original-price-tag');
    if (originalPriceTag && (!product.discount || product.discount === '0')) {
        originalPriceTag.style.display = 'none';
        const mainOriginal = document.getElementById('product-original');
        if (mainOriginal) mainOriginal.style.display = 'none';
    }

    // Status
    const statusEl = document.getElementById('product-status');
    if (statusEl) {
        statusEl.textContent = product.status === 'instock' ? 'In Stock' : 'Out of Stock';
        statusEl.style.color = product.status === 'instock' ? '#16A34A' : '#E63946';
    }

    if (document.getElementById('product-code')) document.getElementById('product-code').textContent = product.code;
    if (document.getElementById('product-brand')) document.getElementById('product-brand').textContent = product.brand;

    // Page Title
    document.title = product.name + ' — DS-24 Store';

    // Maika Pixel: Track ViewContent
    if (typeof maika === 'function') {
        // Generate unique Event ID for Deduplication
        var currentTimestamp = Date.now();
        var randomString = Math.random().toString(36).substr(2, 9);
        var uniqueEventId = 'evt_' + currentTimestamp + '_' + randomString;

        // Setup dynamic product data
        var viewContentData = {
            event_id: uniqueEventId,
            content_ids: [String(product.id)],
            content_type: 'product',
            content_name: product.name,
            value: parseFloat(product.price),
            currency: 'BDT',
            source_url: window.location.href
        };

        // Send data via Maika Pixel
        maika('track', 'ViewContent', viewContentData);
    }

    // Key Features List
    const featuresList = document.getElementById('features-list');
    if (featuresList && product.features) {
        featuresList.innerHTML = '';
        product.features.split('|').forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature.trim();
            featuresList.appendChild(li);
        });
    }

    // Payment Options
    if (document.getElementById('emi-regular-price')) {
        document.getElementById('emi-regular-price').textContent = '৳' + Number(product.original).toLocaleString('en-IN');
    }
    if (document.getElementById('cash-price')) {
        document.getElementById('cash-price').textContent = '৳' + Number(product.price).toLocaleString('en-IN');
    }
    if (document.getElementById('cash-original')) {
        document.getElementById('cash-original').textContent = '৳' + Number(product.original).toLocaleString('en-IN');
    }

    // WhatsApp button dynamic link
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.onclick = function() {
            const msg = encodeURIComponent(
                'Hi, I am interested in: ' + product.name + 
                ' (Code: ' + product.code + ')'
            );
            window.open('https://wa.me/8801XXXXXXXXX?text=' + msg, '_blank');
        };
    }

    // Out of Stock Handling
    if (product.status !== 'instock') {
        const buyBtn = document.getElementById('buyNowBtn');
        if (buyBtn) {
            buyBtn.textContent = 'Out of Stock';
            buyBtn.disabled = true;
            buyBtn.style.background = '#9CA3AF';
            buyBtn.style.cursor = 'not-allowed';
        }

        const qtyMinus = document.getElementById('qtyMinus');
        const qtyPlus  = document.getElementById('qtyPlus');
        if (qtyMinus) qtyMinus.disabled = true;
        if (qtyPlus) qtyPlus.disabled  = true;
    }

    // 2. Thumbnail click → swap main image
    const thumbnails = document.querySelectorAll('.thumb');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            thumb.classList.add('active');
            // Swap main image src
            if (mainImg) mainImg.src = thumb.src;
        });
    });

    // 2. "View More Info" toggle → smooth expand/collapse features
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const hiddenFeatures = document.getElementById('hiddenFeatures');
    const viewMoreText = viewMoreBtn.querySelector('span');
    const viewMoreIcon = viewMoreBtn.querySelector('i');

    viewMoreBtn.addEventListener('click', () => {
        hiddenFeatures.classList.toggle('show');
        
        if (hiddenFeatures.classList.contains('show')) {
            viewMoreText.textContent = 'View Less';
            viewMoreIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            viewMoreText.textContent = 'View More Info';
            viewMoreIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });

    // 3. Payment option card click → toggle selected/unselected styles
    const paymentCards = document.querySelectorAll('.payment-card');

    paymentCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected class from all cards
            paymentCards.forEach(c => c.classList.remove('selected'));
            // Add selected class to clicked card
            card.classList.add('selected');
        });
    });

    // 4. Quantity +/- buttons → increment/decrement with min/max limits
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const qtyDisplay = document.getElementById('qtyDisplay');
    let quantity = 1;

    qtyMinus.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            qtyDisplay.textContent = quantity;
        }
    });

    qtyPlus.addEventListener('click', () => {
        if (quantity < 99) {
            quantity++;
            qtyDisplay.textContent = quantity;
        }
    });

    // 5. Wishlist toggle → filled/unfilled heart icon swap
    const detailWishlistBtn = document.getElementById('detailWishlistBtn');
    const wishlistIcon = detailWishlistBtn.querySelector('i');
    const wishlistBadge = document.getElementById('wishlistBadge');
    
    // Dynamic product ID for this page
    const productId = product.id; 
    let wishlist = JSON.parse(localStorage.getItem('ds24_wishlist')) || [];

    function updateWishlistBadge() {
        if (wishlistBadge) wishlistBadge.textContent = wishlist.length;
        localStorage.setItem('ds24_wishlist', JSON.stringify(wishlist));
    }

    // Initial state
    if (wishlist.includes(productId)) {
        detailWishlistBtn.classList.add('active');
        wishlistIcon.classList.replace('fa-regular', 'fa-solid');
        wishlistIcon.style.color = '#E63946';
    }

    detailWishlistBtn.addEventListener('click', () => {
        const index = wishlist.indexOf(productId);
        if (index === -1) {
            wishlist.push(productId);
            detailWishlistBtn.classList.add('active');
            wishlistIcon.classList.replace('fa-regular', 'fa-solid');
            wishlistIcon.style.color = '#E63946';
        } else {
            wishlist.splice(index, 1);
            detailWishlistBtn.classList.remove('active');
            wishlistIcon.classList.replace('fa-solid', 'fa-regular');
            wishlistIcon.style.color = '#D1D5DB';
        }
        updateWishlistBadge();
    });

    // Related products wishlist toggle
    const relatedWishlistBtns = document.querySelectorAll('#relatedGrid .wishlist-btn');
    
    relatedWishlistBtns.forEach(btn => {
        const rProductId = parseInt(btn.getAttribute('data-id'));
        
        // Set initial state
        if (wishlist.includes(rProductId)) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            const index = wishlist.indexOf(rProductId);
            if (index === -1) {
                wishlist.push(rProductId);
                btn.classList.add('active');
            } else {
                wishlist.splice(index, 1);
                btn.classList.remove('active');
            }
            updateWishlistBadge();
        });
    });

    // 6. WhatsApp button → open wa.me link with product name
    // (Handled above in dynamic population section)

    // 7. Buy Now button → open modal
    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const productData = {
                id:    product.id,
                name:  product.name,
                price: product.price,
                code:  product.code,
                image: product.image
            };

            if (typeof openCartModal === 'function') {
                openCartModal(productData);
                
                // Pre-set the quantity in the modal to match what's on the page
                const currentQty = parseInt(document.getElementById('qtyDisplay').textContent);
                setTimeout(() => {
                    const modalQtyDisplay = document.getElementById('modal-qty-display');
                    if (modalQtyDisplay) {
                        modalQtyDisplay.textContent = currentQty;
                        // Trigger price update in modal if needed
                        if (typeof updateModalPrice === 'function') {
                            updateModalPrice();
                        }
                    }
                }, 10);
            }
        });
    }

    // 8. Tab Switching Logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels  = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active from all buttons
            tabButtons.forEach(b => b.classList.remove('active'));

            // Hide all panels
            tabPanels.forEach(p => {
                p.style.display = 'none';
                p.classList.remove('fade-in');
            });

            // Activate clicked button
            this.classList.add('active');

            // Show target panel with animation
            const target = document.getElementById(this.dataset.tab);
            if (target) {
                target.style.display = 'block';
                // Trigger reflow for animation restart
                void target.offsetWidth;
                target.classList.add('fade-in');
            }

            // Smooth scroll to tab section
            const tabSection = document.getElementById('tab-section');
            if (tabSection) {
                tabSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Init: show first panel on load
    const initialTab = document.querySelector('.tab-btn[data-tab="tab-specification"]');
    if (initialTab) {
        initialTab.classList.add('active');
        const initialPanel = document.getElementById('tab-specification');
        if (initialPanel) {
            initialPanel.style.display = 'block';
            initialPanel.classList.add('fade-in');
        }
    }

    // 9. Star Rating Logic
    const stars = document.querySelectorAll('.star-rating-input i');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            if (selectedRating === 0) {
                const rating = parseInt(this.dataset.rating);
                highlightStars(rating);
            }
        });

        star.addEventListener('mouseout', function() {
            if (selectedRating === 0) {
                resetStars();
            }
        });

        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.rating);
            highlightStars(selectedRating, true);
        });
    });

    function highlightStars(rating, isSelected = false) {
        stars.forEach(s => {
            const sRating = parseInt(s.dataset.rating);
            if (sRating <= rating) {
                s.classList.add(isSelected ? 'selected' : 'hover');
            } else {
                s.classList.remove('hover');
                if (isSelected) s.classList.remove('selected');
            }
        });
    }

    function resetStars() {
        stars.forEach(s => s.classList.remove('hover'));
    }
});

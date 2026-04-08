// =============================================================
// SHOPPING CART PAGE LOGIC
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Ensure cart utilities are available before rendering
    if (typeof getCart === 'function') {
        renderCart();
    }
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }

    // Clear Cart Listener
    const clearBtn = document.getElementById('clear-cart');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (typeof saveCart !== 'function') {
                console.error('saveCart function not found');
                return;
            }
            
            // Removing window.confirm as it is often blocked in iframes
            saveCart([]);
            renderCart();
        });
    }

    // Checkout Button Listener
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            // Maika Pixel: Track InitiateCheckout
            if (typeof maika === 'function') {
                // Generate unique Event ID for Deduplication
                var currentTimestamp = Date.now();
                var randomString = Math.random().toString(36).substr(2, 9);
                var uniqueEventId = 'evt_' + currentTimestamp + '_' + randomString;

                // Get cart data
                const cart = getCart();
                var cartProductIds = cart.map(item => String(item.id));
                var totalCartValue = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
                var totalItemsCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

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
            window.location.href = 'checkout.html';
        });
    }
});

// 1. Render Cart Items
function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cart-items-container');
    const emptyMsg = document.getElementById('empty-cart-msg');
    const summaryPanel = document.querySelector('.cart-summary-panel');
    const extrasSection = document.querySelector('.cart-extras');
    const panelHeader = document.querySelector('.panel-header');

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '';
        emptyMsg.style.display = 'block';
        if (summaryPanel) summaryPanel.style.display = 'none';
        if (extrasSection) extrasSection.style.display = 'none';
        if (panelHeader) panelHeader.style.display = 'none';
        return;
    }

    emptyMsg.style.display = 'none';
    if (summaryPanel) summaryPanel.style.display = 'block';
    if (extrasSection) extrasSection.style.display = 'grid';
    if (panelHeader) panelHeader.style.display = 'flex';

    container.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="item-img">
                <img src="${item.image}" alt="${item.name}" referrerPolicy="no-referrer">
            </div>
            <div class="item-info">
                <h3>${item.name}</h3>
                <div class="item-meta">
                    <span>Reward Points: <strong>${item.rewardPoints || 0}</strong></span>
                    <span>Model: ${item.model || 'N/A'}</span>
                </div>
            </div>
            <div class="item-qty">
                <button class="qty-btn minus" onclick="changeQty('${item.id}', -1)">
                    <i class="fa-solid fa-minus"></i>
                </button>
                <div class="qty-val">${item.qty}</div>
                <button class="qty-btn plus" onclick="changeQty('${item.id}', 1)">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="item-price">
                <span class="price">৳${(item.price * item.qty).toLocaleString()}</span>
                <span class="unit-price">৳${parseInt(item.price).toLocaleString()} / unit</span>
            </div>
            <button class="btn-remove" onclick="removeItem('${item.id}')" title="Remove Item">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `).join('');

    updateSummary(cart);
}

// 2. Change Quantity
function changeQty(id, delta) {
    let cart = getCart();
    // Use loose equality to handle string vs number IDs
    const item = cart.find(i => i.id == id);
    if (item) {
        item.qty += delta;
        if (item.qty < 1) item.qty = 1;
        saveCart(cart);
        renderCart();
    }
}

// 3. Remove Item
function removeItem(id) {
    let cart = getCart();
    // Use loose equality to handle string vs number IDs
    cart = cart.filter(i => i.id != id);
    saveCart(cart);
    renderCart();
}

// 4. Update Summary
function updateSummary(cart) {
    const subTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const discount = 0; // Placeholder for future coupon logic
    const total = subTotal - discount;

    document.getElementById('sub-total').textContent = `৳${subTotal.toLocaleString()}`;
    document.getElementById('discount-amount').textContent = `৳${discount.toLocaleString()}`;
    document.getElementById('final-total').textContent = `৳${total.toLocaleString()}`;
}

/**
 * CHECKOUT PAGE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. INITIALIZE DATA
    renderCheckoutProducts();
    updateOrderSummary();

    // 2. EVENT LISTENERS
    
    // Delivery method change -> update delivery charge
    const deliveryRadios = document.querySelectorAll('input[name="delivery-method"]');
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateOrderSummary();
        });
    });

    // Coupon Tabs
    const tabCoupon = document.getElementById('tab-coupon');
    const tabVoucher = document.getElementById('tab-voucher');
    const couponInput = document.getElementById('coupon-input');

    if (tabCoupon && tabVoucher && couponInput) {
        tabCoupon.addEventListener('click', () => {
            tabCoupon.classList.add('active');
            tabVoucher.classList.remove('active');
            couponInput.placeholder = "Promo / Coupon Code";
        });

        tabVoucher.addEventListener('click', () => {
            tabVoucher.classList.add('active');
            tabCoupon.classList.remove('active');
            couponInput.placeholder = "Gift Voucher Code";
        });
    }

    // Apply Coupon Button
    const btnApplyCoupon = document.getElementById('btn-apply-coupon');
    if (btnApplyCoupon) {
        btnApplyCoupon.addEventListener('click', () => {
            const code = couponInput.value.trim();
            if (!code) {
                showToast("Please enter a code", "error");
                return;
            }
            showToast("Coupon applied successfully (Demo)", "success");
        });
    }

    // Confirm Order Button
    const btnConfirmOrder = document.getElementById('btn-confirm-order-action');
    if (btnConfirmOrder) {
        btnConfirmOrder.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            confirmOrder();
        });
    }
});

// --- UTILITY FUNCTIONS ---

/**
 * Renders products from cart into the checkout summary panel
 */
function renderCheckoutProducts() {
    const productListContainer = document.getElementById('checkout-product-list');
    if (!productListContainer) return;

    const cart = typeof getCart === 'function' ? getCart() : JSON.parse(localStorage.getItem('ds24_cart') || '[]');
    
    if (cart.length === 0) {
        productListContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        return;
    }

    let html = '';
    cart.forEach(item => {
        // Calculate Star Points: (price / 80) rounded to nearest 10, * qty
        const basePoints = Math.round((item.price / 80) / 10) * 10;
        const totalPoints = basePoints * item.qty;

        html += `
            <div class="checkout-product-item">
                <div class="product-info-left">
                    <h4>${item.qty} X ${item.name}</h4>
                    <div class="star-points">
                        <i class="fa-solid fa-star"></i>
                        <span>${totalPoints} Star Points</span>
                    </div>
                </div>
                <div class="product-price-right">
                    ৳${(item.price * item.qty).toLocaleString()}
                </div>
            </div>
        `;
    });

    productListContainer.innerHTML = html;
}

/**
 * Updates subtotal, delivery, and total in the UI
 */
function updateOrderSummary() {
    const subtotalEl = document.getElementById('checkout-subtotal');
    const deliveryEl = document.getElementById('checkout-delivery');
    const totalEl = document.getElementById('checkout-total');
    const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked').value;
    const deliveryLabel = document.getElementById('delivery-label-text');

    if (!subtotalEl || !totalEl || !deliveryEl) return;

    let charge = 120; // Default Home Delivery
    if (deliveryMethod === 'pickup') {
        charge = 0;
        if (deliveryLabel) deliveryLabel.textContent = "Store Pickup:";
    } else if (deliveryMethod === 'express') {
        charge = 200;
        if (deliveryLabel) deliveryLabel.textContent = "Request Express:";
    } else {
        if (deliveryLabel) deliveryLabel.textContent = "Home Delivery:";
    }

    deliveryEl.textContent = `৳${charge}`;
    deliveryEl.dataset.charge = charge;

    const cart = typeof getCart === 'function' ? getCart() : JSON.parse(localStorage.getItem('ds24_cart') || '[]');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const total = subtotal + charge;

    subtotalEl.textContent = `৳${subtotal.toLocaleString()}`;
    totalEl.textContent = `৳${total.toLocaleString()}`;
}

/**
 * Validates form and confirms the order
 */
function confirmOrder() {
    console.log('confirmOrder function called'); // DEBUG
    
    const cart = typeof getCart === 'function' ? getCart() : JSON.parse(localStorage.getItem('ds24_cart') || '[]');
    
    if (cart.length === 0) {
        showToast("Your cart is empty!", "error");
        return;
    }

    // 1. Get Form Values
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const address = document.getElementById('address').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const email = document.getElementById('email').value.trim();
    const comment = document.getElementById('comment') ? document.getElementById('comment').value.trim() : '';
    const termsChecked = document.getElementById('terms-checkbox').checked;

    // 2. Reset Errors
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));

    let isValid = true;

    // 3. Validation Logic
    if (!firstName) {
        showError('first-name', 'First name is required');
        isValid = false;
    }
    if (!lastName) {
        showError('last-name', 'Last name is required');
        isValid = false;
    }
    if (!address) {
        showError('address', 'Address is required');
        isValid = false;
    }

    // Mobile validation (BD format: 01[3-9]XXXXXXXX)
    const mobileRegex = /^01[3-9]\d{8}$/;
    if (!mobile) {
        showError('mobile', 'Mobile number is required');
        isValid = false;
    } else if (!mobileRegex.test(mobile)) {
        showError('mobile', 'Invalid mobile number (e.g. 01712345678)');
        isValid = false;
    }

    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('email', 'Invalid email address');
        isValid = false;
    }

    if (!termsChecked) {
        showToast("Please agree to the Terms and Conditions", "error");
        isValid = false;
    }

    if (!isValid) {
        console.log('Validation failed'); // DEBUG
        showToast("Please fix the errors in the form", "error");
        return;
    }

    try {
        // 4. Process Order
        const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked').value;
        const deliveryCharge = parseInt(document.getElementById('checkout-delivery').dataset.charge || 0);
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const totalOrderAmount = subtotal + deliveryCharge;

        const order = {
            orderId,
            customer: { firstName, lastName, address, mobile, email, comment },
            items: cart,
            paymentMethod,
            deliveryMethod,
            deliveryCharge,
            subtotal,
            total: totalOrderAmount,
            date: new Date().toISOString()
        };

        // Maika Pixel: Track InitiateCheckout (before order confirmation)
        if (typeof maika === 'function') {
            // Generate unique Event ID for Deduplication
            var currentTimestamp = Date.now();
            var randomString = Math.random().toString(36).substr(2, 9);
            var uniqueEventId = 'evt_' + currentTimestamp + '_' + randomString;

            // Get cart product IDs and count
            var cartProductIds = cart.map(item => String(item.id));
            var totalCartValue = totalOrderAmount;
            var totalItemsCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

            // Send InitiateCheckout data with customer info
            maika('track', 'InitiateCheckout', {
                event_id: uniqueEventId,
                content_ids: cartProductIds,
                content_type: 'product',
                value: totalCartValue,
                currency: 'BDT',
                num_items: totalItemsCount,
                source_url: window.location.href,
                raw_email: email,
                raw_phone: mobile
            });
        }

        console.log('Order created:', order); // DEBUG

        // Save to orders history
        const orders = JSON.parse(localStorage.getItem('ds24_orders') || '[]');
        orders.push(order);
        localStorage.setItem('ds24_orders', JSON.stringify(orders));

        // Clear Cart
        if (typeof saveCart === 'function') {
            saveCart([]);
        } else {
            localStorage.removeItem('ds24_cart');
        }

        // Show success toast before redirect
        showToast("Order confirmed! Redirecting...", "success");

        // Redirect to success page
        console.log('Redirecting to:', `order-success.html?orderId=${orderId}`); // DEBUG
        setTimeout(() => {
            window.location.href = `order-success.html?orderId=${orderId}`;
        }, 500);
        
    } catch (error) {
        console.error('Order processing error:', error); // DEBUG
        showToast("Error processing order. Please try again.", "error");
    }
}

/**
 * Helper to show error message for a field
 */
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(`error-${fieldId}`);
    if (field && errorEl) {
        field.closest('.form-group').classList.add('error');
        errorEl.textContent = message;
    }
}

/**
 * Displays a toast notification
 */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    
    toast.innerHTML = `
        <i class="fa-solid ${icon} toast-icon"></i>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

/* =============================================================
   CONTACT PAGE — ENHANCED JAVASCRIPT
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. FORM VALIDATION & SUBMISSION ─────────────────────── */
    const contactForm = document.getElementById('contactForm');
    const submitBtn   = document.getElementById('submitBtn');
    const charCount   = document.getElementById('charCount');
    const messageArea = document.getElementById('message');

    if (messageArea && charCount) {
        messageArea.addEventListener('input', () => {
            const len = messageArea.value.length;
            charCount.textContent = len;
            const counterEl = charCount.parentElement;
            if (len > 450) counterEl.classList.add('counter-warning');
            else counterEl.classList.remove('counter-warning');
        });
    }

    const fields = ['name', 'email', 'subject', 'message'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('blur', () => validateField(el));
        el.addEventListener('input', () => {
            if (el.classList.contains('is-invalid')) validateField(el);
        });
    });

    function validateField(el) {
        const id      = el.id;
        const value   = el.value.trim();
        const errorEl = document.getElementById(id + 'Error');
        let   isValid = true;
        let   errorMsg = '';

        if (id === 'name') {
            if (!value) { errorMsg = 'Name is required.'; isValid = false; }
            else if (value.length < 2) { errorMsg = 'Name must be at least 2 characters.'; isValid = false; }
        }
        if (id === 'email') {
            if (!value) { errorMsg = 'Email is required.'; isValid = false; }
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { errorMsg = 'Please enter a valid email address.'; isValid = false; }
        }
        if (id === 'subject') {
            if (!value) { errorMsg = 'Please select a topic.'; isValid = false; }
        }
        if (id === 'message') {
            if (!value) { errorMsg = 'Message is required.'; isValid = false; }
            else if (value.length < 10) { errorMsg = 'Message must be at least 10 characters.'; isValid = false; }
        }

        if (errorEl) errorEl.textContent = errorMsg;
        el.classList.toggle('is-valid',   isValid && value.length > 0);
        el.classList.toggle('is-invalid', !isValid);
        return isValid;
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameValid     = validateField(document.getElementById('name'));
            const emailValid    = validateField(document.getElementById('email'));
            const subjectValid  = validateField(document.getElementById('subject'));
            const msgValid      = validateField(document.getElementById('message'));

            if (!nameValid || !emailValid || !subjectValid || !msgValid) {
                showToast('Please fix the errors above.', 'error');
                return;
            }

            const btnText   = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            const btnIcon   = submitBtn.querySelector('.btn-icon');

            submitBtn.disabled = true;
            btnText.style.display  = 'none';
            btnLoader.style.display = 'inline-flex';
            if (btnIcon) btnIcon.style.display = 'none';

            setTimeout(() => {
                submitBtn.disabled = false;
                btnText.style.display  = 'inline';
                btnLoader.style.display = 'none';
                if (btnIcon) btnIcon.style.display = 'inline';

                showToast("Message sent successfully! We'll get back to you soon. 🎉", 'success');
                contactForm.reset();

                fields.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) { el.classList.remove('is-valid', 'is-invalid'); }
                });
                if (charCount) charCount.textContent = '0';
            }, 1800);
        });
    }


    /* ── 2. FAQ ACCORDION ─────────────────────────────────────── */
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item     = btn.closest('.faq-item');
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item.active').forEach(el => el.classList.remove('active'));

            if (!isActive) item.classList.add('active');
        });
    });


    /* ── 3. LIVE CHAT WIDGET ──────────────────────────────────── */
    const chatWidget   = document.getElementById('liveChatWidget');
    const chatToggle   = document.getElementById('chatToggleBtn');
    const chatCloseBtn = document.getElementById('chatCloseBtn');

    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            chatWidget.classList.toggle('open');
        });
    }
    if (chatCloseBtn) {
        chatCloseBtn.addEventListener('click', () => {
            chatWidget.classList.remove('open');
        });
    }

    document.addEventListener('click', (e) => {
        if (chatWidget && !chatWidget.contains(e.target)) {
            chatWidget.classList.remove('open');
        }
    });
});


/* ── QUICK REPLY ─────────────────────────────────────────────── */
function selectQuickReply(topic) {
    const subjectEl = document.getElementById('subject');
    const msgEl     = document.getElementById('message');

    if (subjectEl) {
        const map = {
            'Track my order': 'order',
            'Return a product': 'return',
            'Payment issue': 'payment',
            'Other query': 'other'
        };
        const val = map[topic] || 'other';
        subjectEl.value = val;
        subjectEl.classList.add('is-valid');
    }
    if (msgEl) {
        msgEl.value = `Hi, I need help with: ${topic}. `;
        msgEl.focus();
        const charCount = document.getElementById('charCount');
        if (charCount) charCount.textContent = msgEl.value.length;
    }

    const chatWidget = document.getElementById('liveChatWidget');
    if (chatWidget) chatWidget.classList.remove('open');

    const formSection = document.querySelector('.contact-form-container');
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}


/* ── TOAST NOTIFICATION ──────────────────────────────────────── */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast  = document.createElement('div');
    toast.className = `toast ${type}`;

    const isSuccess = type === 'success';
    const iconClass = isSuccess ? 'fa-circle-check' : 'fa-circle-exclamation';
    const iconColor = isSuccess ? '#16A34A' : '#EF4444';
    toast.style.borderLeftColor = iconColor;

    toast.innerHTML = `
        <i class="fa-solid ${iconClass}" style="color:${iconColor};font-size:18px;flex-shrink:0;"></i>
        <span style="font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:#1F2937;">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity    = '0';
        toast.style.transform  = 'translateX(30px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
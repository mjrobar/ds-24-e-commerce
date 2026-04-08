/* =============================================================
   PRODUCTS PAGE JAVASCRIPT
   ============================================================= */

// 1. CATEGORY DATA
const CATEGORIES = [
    { id: 'all',         name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing',    name: 'Clothing' },
    { id: 'home',        name: 'Home & Kitchen' },
    { id: 'toys',        name: 'Toys & Games' },
    { id: 'beauty',      name: 'Beauty & Health' },
    { id: 'sports',      name: 'Sports & Outdoors' },
    { id: 'books',       name: 'Books & Stationery' },
    { id: 'auto',        name: 'Automotive' },
    { id: 'baby',        name: 'Baby Products' },
    { id: 'garden',      name: 'Garden & Tools' },
    { id: 'pets',        name: 'Pet Supplies' }
];

// 2. DYNAMIC FILTERS DATA
const DYNAMIC_FILTERS = [
    {
        id: 'brand',
        title: 'Brand',
        options: [
            { label: 'Asus',    count: 12 },
            { label: 'Samsung', count: 8  },
            { label: 'Apple',   count: 6  },
            { label: 'Xiaomi',  count: 15 },
            { label: 'Sony',    count: 4  }
        ]
    },
    {
        id: 'series',
        title: 'Series',
        options: [
            { label: 'NUC Series',    count: 5 },
            { label: 'ROG Series',    count: 7 },
            { label: 'Galaxy Series', count: 9 },
            { label: 'iPhone Series', count: 6 }
        ]
    },
    {
        id: 'color',
        title: 'Color',
        options: [
            { label: 'Black',  count: 20 },
            { label: 'White',  count: 14 },
            { label: 'Silver', count: 8  },
            { label: 'Blue',   count: 6  }
        ]
    }
];

// 3. MASTER PRODUCT DATA (24 items)
const PRODUCTS = [
    {
        id: 1,
        name: 'Asus NUC 14 Pro Mini PC',
        price: 32000,
        original: 36000,
        discount: 11,
        category: 'electronics',
        stock: 'instock',
        brand: 'asus',
        series: 'nuc series',
        color: 'black',
        description: 'Intel Core i5-1340P, 16GB RAM, 512GB SSD, Windows 11 Pro.',
        image: 'https://placehold.co/400x200/0A1628/FFFFFF?text=Asus+NUC+14',
        code: 'P001'
    },
    {
        id: 2,
        name: 'Samsung Galaxy S24 Ultra',
        price: 125000,
        original: 135000,
        discount: 7,
        category: 'electronics',
        stock: 'instock',
        brand: 'samsung',
        series: 'galaxy series',
        color: 'silver',
        description: '256GB Storage, 12GB RAM, Titanium Gray, AI Features.',
        image: 'https://placehold.co/400x200/E84C0A/FFFFFF?text=Galaxy+S24',
        code: 'P002'
    },
    {
        id: 3,
        name: 'Apple iPhone 15 Pro Max',
        price: 158000,
        original: 170000,
        discount: 7,
        category: 'electronics',
        stock: 'instock',
        brand: 'apple',
        series: 'iphone series',
        color: 'blue',
        description: 'A17 Pro chip, 256GB, Natural Titanium, Pro Camera System.',
        image: 'https://placehold.co/400x200/112240/FFFFFF?text=iPhone+15',
        code: 'P003'
    },
    {
        id: 4,
        name: 'Xiaomi Redmi Note 13 Pro+',
        price: 45000,
        original: 48000,
        discount: 6,
        category: 'electronics',
        stock: 'instock',
        brand: 'xiaomi',
        series: 'redmi series',
        color: 'white',
        description: '200MP Camera, 120W HyperCharge, 512GB Storage.',
        image: 'https://placehold.co/400x200/374151/FFFFFF?text=Redmi+Note+13',
        code: 'P004'
    },
    {
        id: 5,
        name: 'Sony WH-1000XM5 Headphones',
        price: 38000,
        original: 42000,
        discount: 10,
        category: 'electronics',
        stock: 'instock',
        brand: 'sony',
        series: 'audio series',
        color: 'black',
        description: 'Industry-leading Noise Canceling, 30-hour Battery Life.',
        image: 'https://placehold.co/400x200/0A1628/FFFFFF?text=Sony+XM5',
        code: 'P005'
    },
    {
        id: 6,
        name: 'Men\'s Premium Cotton T-Shirt',
        price: 1200,
        original: 1500,
        discount: 20,
        category: 'clothing',
        stock: 'instock',
        brand: 'local',
        series: 'basic',
        color: 'blue',
        description: '100% Organic Cotton, Breathable, Regular Fit.',
        image: 'https://placehold.co/400x200/E84C0A/FFFFFF?text=Cotton+T-Shirt',
        code: 'P006'
    },
    {
        id: 7,
        name: 'Non-Stick Cookware Set',
        price: 5500,
        original: 6500,
        discount: 15,
        category: 'home',
        stock: 'instock',
        brand: 'prestige',
        series: 'kitchen',
        color: 'black',
        description: '12-piece set, Induction base, Heat-resistant handles.',
        image: 'https://placehold.co/400x200/112240/FFFFFF?text=Cookware+Set',
        code: 'P007'
    },
    {
        id: 8,
        name: 'LEGO Star Wars Millennium Falcon',
        price: 18000,
        original: 20000,
        discount: 10,
        category: 'toys',
        stock: 'preorder',
        brand: 'lego',
        series: 'star wars',
        color: 'silver',
        description: '7541 pieces, Detailed interior, 7 minifigures.',
        image: 'https://placehold.co/400x200/374151/FFFFFF?text=LEGO+Falcon',
        code: 'P008'
    },
    {
        id: 9,
        name: 'L\'Oreal Paris Revitalift Serum',
        price: 2500,
        original: 3000,
        discount: 17,
        category: 'beauty',
        stock: 'instock',
        brand: 'loreal',
        series: 'skincare',
        color: 'white',
        description: '1.5% Pure Hyaluronic Acid, Anti-aging, Hydrating.',
        image: 'https://placehold.co/400x200/0A1628/FFFFFF?text=Loreal+Serum',
        code: 'P009'
    },
    {
        id: 10,
        name: 'Yoga Mat Anti-Slip',
        price: 1500,
        original: 1800,
        discount: 17,
        category: 'sports',
        stock: 'instock',
        brand: 'nike',
        series: 'fitness',
        color: 'blue',
        description: '6mm thickness, TPE material, Carry strap included.',
        image: 'https://placehold.co/400x200/E84C0A/FFFFFF?text=Yoga+Mat',
        code: 'P010'
    },
    {
        id: 11,
        name: 'The Alchemist by Paulo Coelho',
        price: 450,
        original: 600,
        discount: 25,
        category: 'books',
        stock: 'instock',
        brand: 'harpercollins',
        series: 'fiction',
        color: 'white',
        description: 'A fable about following your dream.',
        image: 'https://placehold.co/400x200/112240/FFFFFF?text=The+Alchemist',
        code: 'P011'
    },
    {
        id: 12,
        name: 'Car Vacuum Cleaner High Power',
        price: 3500,
        original: 4500,
        discount: 22,
        category: 'auto',
        stock: 'instock',
        brand: 'baseus',
        series: 'car accessories',
        color: 'black',
        description: 'Portable, 5000Pa suction, HEPA filter.',
        image: 'https://placehold.co/400x200/374151/FFFFFF?text=Car+Vacuum',
        code: 'P012'
    },
    {
        id: 13,
        name: 'Baby Diaper Large Pack (64 pcs)',
        price: 1800,
        original: 2200,
        discount: 18,
        category: 'baby',
        stock: 'instock',
        brand: 'pampers',
        series: 'baby care',
        color: 'white',
        description: 'Soft and dry, 12-hour protection, Breathable.',
        image: 'https://placehold.co/400x200/0A1628/FFFFFF?text=Baby+Diapers',
        code: 'P013'
    },
    {
        id: 14,
        name: 'Garden Tool Set (5 pieces)',
        price: 2200,
        original: 2800,
        discount: 21,
        category: 'garden',
        stock: 'instock',
        brand: 'bosch',
        series: 'tools',
        color: 'black',
        description: 'Stainless steel, Ergonomic handles, Durable.',
        image: 'https://placehold.co/400x200/E84C0A/FFFFFF?text=Garden+Tools',
        code: 'P014'
    },
    {
        id: 15,
        name: 'Premium Cat Food (2kg)',
        price: 1500,
        original: 1800,
        discount: 17,
        category: 'pets',
        stock: 'instock',
        brand: 'whiskas',
        series: 'pet food',
        color: 'white',
        description: 'Real chicken flavor, Rich in vitamins.',
        image: 'https://placehold.co/400x200/112240/FFFFFF?text=Cat+Food',
        code: 'P015'
    },
    {
        id: 16,
        name: 'Asus ROG Strix G16 Laptop',
        price: 185000,
        original: 200000,
        discount: 8,
        category: 'electronics',
        stock: 'upcoming',
        brand: 'asus',
        series: 'rog series',
        color: 'black',
        description: 'RTX 4060, Intel i7-13650HX, 165Hz Display.',
        image: 'https://placehold.co/400x200/374151/FFFFFF?text=ROG+Strix+G16',
        code: 'P016'
    },
    {
        id: 17,
        name: 'Samsung 55" QLED 4K TV',
        price: 85000,
        original: 95000,
        discount: 11,
        category: 'electronics',
        stock: 'instock',
        brand: 'samsung',
        series: 'tv series',
        color: 'black',
        description: 'Quantum HDR, Smart TV, Tizen OS.',
        image: 'https://placehold.co/400x200/0A1628/FFFFFF?text=Samsung+QLED',
        code: 'P017'
    },
    {
        id: 18,
        name: 'Women\'s Floral Summer Dress',
        price: 2500,
        original: 3500,
        discount: 29,
        category: 'clothing',
        stock: 'instock',
        brand: 'local',
        series: 'fashion',
        color: 'white',
        description: 'Lightweight fabric, Elegant design, Perfect for summer.',
        image: 'https://placehold.co/400x200/E84C0A/FFFFFF?text=Summer+Dress',
        code: 'P018'
    },
    {
        id: 19,
        name: 'Electric Kettle 1.8L',
        price: 1800,
        original: 2200,
        discount: 18,
        category: 'home',
        stock: 'instock',
        brand: 'miyako',
        series: 'appliances',
        color: 'silver',
        description: 'Stainless steel body, Auto shut-off, Fast boiling.',
        image: 'https://placehold.co/400x200/112240/FFFFFF?text=Electric+Kettle',
        code: 'P019'
    },
    {
        id: 20,
        name: 'Remote Control Monster Truck',
        price: 4500,
        original: 5500,
        discount: 18,
        category: 'toys',
        stock: 'instock',
        brand: 'maisto',
        series: 'rc toys',
        color: 'blue',
        description: '4WD, Rechargeable battery, Off-road capability.',
        image: 'https://placehold.co/400x200/374151/FFFFFF?text=RC+Truck',
        code: 'P020'
    },
    {
        id: 21,
        name: 'Matte Liquid Lipstick Set',
        price: 1200,
        original: 1800,
        discount: 33,
        category: 'beauty',
        stock: 'instock',
        brand: 'maybelline',
        series: 'makeup',
        color: 'blue',
        description: 'Long-lasting, 6 shades, Smudge-proof.',
        image: 'https://placehold.co/400x200/0A1628/FFFFFF?text=Lipstick+Set',
        code: 'P021'
    },
    {
        id: 22,
        name: 'Adjustable Dumbbell Set (20kg)',
        price: 8500,
        original: 10000,
        discount: 15,
        category: 'sports',
        stock: 'preorder',
        brand: 'decathlon',
        series: 'weights',
        color: 'black',
        description: 'Cast iron plates, Chrome handles, Case included.',
        image: 'https://placehold.co/400x200/E84C0A/FFFFFF?text=Dumbbell+Set',
        code: 'P022'
    },
    {
        id: 23,
        name: 'Atomic Habits by James Clear',
        price: 650,
        original: 800,
        discount: 19,
        category: 'books',
        stock: 'instock',
        brand: 'penguin',
        series: 'self-help',
        color: 'white',
        description: 'An easy and proven way to build good habits.',
        image: 'https://placehold.co/400x200/112240/FFFFFF?text=Atomic+Habits',
        code: 'P023'
    },
    {
        id: 24,
        name: 'Portable Tire Inflator',
        price: 4800,
        original: 6000,
        discount: 20,
        category: 'auto',
        stock: 'instock',
        brand: 'xiaomi',
        series: 'car accessories',
        color: 'black',
        description: 'Digital display, Auto-stop, Multi-purpose nozzles.',
        image: 'https://placehold.co/400x200/374151/FFFFFF?text=Tire+Inflator',
        code: 'P024'
    }
];

// 4. STATE VARIABLES
let currentPage = 1;
let filteredProducts = [...PRODUCTS];

// 5. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    renderCategoryButtons();
    renderDynamicFilters();
    initPriceSlider();
    handleUrlParams();
    setupEventListeners();
    applyFilters();
});

// 6. RENDER FUNCTIONS
function renderCategoryButtons() {
    const catContainer = document.getElementById('category-buttons');
    if (!catContainer) return;

    CATEGORIES.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'cat-btn' + (cat.id === 'all' ? ' active' : '');
        btn.dataset.category = cat.id;
        btn.textContent = cat.name;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('result-category-name').textContent = cat.name;
            applyFilters();
        });
        catContainer.appendChild(btn);
    });
}

function renderDynamicFilters() {
    const dynamicContainer = document.getElementById('dynamic-filters');
    if (!dynamicContainer) return;

    DYNAMIC_FILTERS.forEach(filter => {
        const block = document.createElement('div');
        block.className = 'filter-block';
        block.dataset.filterId = filter.id;
        block.innerHTML = `
            <div class="filter-header" onclick="toggleFilter(this)">
                <span class="filter-title">${filter.title}</span>
                <i class="fa-solid fa-chevron-down filter-arrow expanded"></i>
            </div>
            <div class="filter-body" id="filter-${filter.id}-body" style="max-height: 500px;">
                ${filter.options.map(opt => `
                    <label class="filter-checkbox-item">
                        <input type="checkbox" 
                               data-filter="${filter.id}" 
                               value="${opt.label.toLowerCase()}"
                               onchange="applyFilters()">
                        <span class="custom-checkbox"></span>
                        <span class="checkbox-label">${opt.label}</span>
                        <span class="checkbox-count">(${opt.count})</span>
                    </label>
                `).join('')}
            </div>
        `;
        dynamicContainer.appendChild(block);
    });
}

function renderProducts(products) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = '';
    
    if (products.length === 0) {
        grid.innerHTML = '<div class="no-results">No products found matching your criteria.</div>';
        return;
    }

    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = p.id;
        card.dataset.category = p.category;
        card.dataset.price = p.price;
        card.dataset.stock = p.stock;
        card.dataset.brand = p.brand;
        card.dataset.series = p.series;
        card.dataset.name = p.name;
        card.dataset.image = p.image;
        card.dataset.code = p.code;
        card.dataset.original = p.original || p.price;
        card.dataset.discount = p.discount || 0;
        card.dataset.desc = p.description;

        card.innerHTML = `
            ${p.discount > 0 ? `<div class="discount-badge">${p.discount}% Off</div>` : ''}
            <div class="product-image-container">
                <img src="${p.image}" alt="${p.name}" class="product-image" referrerPolicy="no-referrer">
            </div>
            <h3 class="product-name">${p.name}</h3>
            <p class="product-desc">${p.description}</p>
            <div class="product-price-row">
                <span class="current-price">৳${p.price.toLocaleString()}</span>
                ${p.original > p.price ? `<span class="old-price">৳${p.original.toLocaleString()}</span>` : ''}
            </div>
            <div class="product-actions">
                <button type="button" class="wishlist-btn ${JSON.parse(localStorage.getItem('ds24_wishlist') || '[]').includes(p.id) ? 'active' : ''}" onclick="toggleWishlist(${p.id}, this)">
                    <i class="fa-solid fa-heart"></i>
                </button>
                <button type="button" class="order-btn">Order Now</button>
                <a href="https://wa.me/8801700000000?text=I'm interested in ${p.name}" target="_blank" class="whatsapp-btn">
                    <i class="fa-brands fa-whatsapp"></i>
                </a>
            </div>
        `;
        grid.appendChild(card);
    });

    // Add event listeners to newly rendered cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // If the user clicked the button or an icon, STOP HERE.
            if (e.target.closest('.order-btn') || 
                e.target.closest('button') || 
                e.target.closest('i')) {
                return; 
            }
            navigateToDetail(parseInt(this.dataset.id));
        });
    });

    // Order button click listener
    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();   // ← stops bubbling to card
            e.preventDefault();    // ← stops any default button behavior
            
            const card = e.target.closest('.product-card');
            const productData = {
                id:    card.dataset.id,
                name:  card.dataset.name,
                price: card.dataset.price,
                code:  card.dataset.code,
                image: card.dataset.image
            };

            if (typeof openCartModal === 'function') {
                openCartModal(productData);
            }
        });
    });
}

function renderPagination(totalPages, filtered) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) return;

    // Prev Button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn' + (currentPage === 1 ? ' disabled' : '');
    prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage(filtered);
            window.scrollTo({ top: document.getElementById('product-grid').offsetTop - 100, behavior: 'smooth' });
        }
    });
    paginationContainer.appendChild(prevBtn);

    // Page Numbers with "..." logic
    const renderPageBtn = (i) => {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'page-btn' + (currentPage === i ? ' active' : '');
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderPage(filtered);
            window.scrollTo({ top: document.getElementById('product-grid').offsetTop - 100, behavior: 'smooth' });
        });
        paginationContainer.appendChild(pageBtn);
    };

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            renderPageBtn(i);
        }
    } else {
        // Always show first page
        renderPageBtn(1);

        if (currentPage > 3) {
            const dot = document.createElement('span');
            dot.className = 'page-btn disabled';
            dot.textContent = '...';
            paginationContainer.appendChild(dot);
        }

        // Show pages around current page
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        
        for (let i = start; i <= end; i++) {
            renderPageBtn(i);
        }

        if (currentPage < totalPages - 2) {
            const dot = document.createElement('span');
            dot.className = 'page-btn disabled';
            dot.textContent = '...';
            paginationContainer.appendChild(dot);
        }

        // Always show last page
        renderPageBtn(totalPages);
    }

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn' + (currentPage === totalPages ? ' disabled' : '');
    nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage(filtered);
            window.scrollTo({ top: document.getElementById('product-grid').offsetTop - 100, behavior: 'smooth' });
        }
    });
    paginationContainer.appendChild(nextBtn);
}

// 7. CORE LOGIC
function applyFilters() {
    let filtered = [...PRODUCTS];

    // 1. Category filter
    const activeCat = document.querySelector('.cat-btn.active')?.dataset.category;
    if (activeCat && activeCat !== 'all') {
        filtered = filtered.filter(p => p.category === activeCat);
    }

    // 2. Price range filter
    const minPrice = parseInt(document.getElementById('price-min').value);
    const maxPrice = parseInt(document.getElementById('price-max').value);
    filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);

    // 3. Stock availability filter
    const checkedStocks = [...document.querySelectorAll('input[name="stock"]:checked')].map(cb => cb.value);
    if (checkedStocks.length > 0) {
        filtered = filtered.filter(p => checkedStocks.includes(p.stock));
    }

    // 4. Dynamic attribute filters
    const activeCheckboxes = document.querySelectorAll('.filter-body input[type="checkbox"]:checked');
    if (activeCheckboxes.length > 0) {
        // Group by filter type for OR within same type, AND across different types
        const groupedFilters = {};
        activeCheckboxes.forEach(cb => {
            const type = cb.dataset.filter;
            if (!groupedFilters[type]) groupedFilters[type] = [];
            groupedFilters[type].push(cb.value);
        });

        Object.keys(groupedFilters).forEach(type => {
            filtered = filtered.filter(p => {
                const val = p[type]?.toLowerCase();
                return groupedFilters[type].includes(val);
            });
        });
    }

    // 5. Sort
    const sortVal = document.getElementById('sort-by').value;
    if (sortVal === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sortVal === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sortVal === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sortVal === 'name-desc') filtered.sort((a, b) => b.name.localeCompare(a.name));
    if (sortVal === 'newest') filtered.sort((a, b) => b.id - a.id);

    // 6. Update result count
    document.getElementById('result-count').textContent = `(${filtered.length} products)`;
    
    // Update stock counts (optional but nice)
    updateStockCounts(filtered);

    // 7. Paginate + render
    currentPage = 1;
    filteredProducts = filtered;
    renderPage(filtered);
}

function renderPage(filtered) {
    const qty = parseInt(document.getElementById('show-qty').value);
    const start = (currentPage - 1) * qty;
    const end = start + qty;
    const paged = filtered.slice(start, end);
    const total = Math.ceil(filtered.length / qty);

    renderProducts(paged);
    renderPagination(total, filtered);
}

// 8. HELPERS
function toggleFilter(header) {
    const body = header.nextElementSibling;
    const arrow = header.querySelector('.filter-arrow');
    const isOpen = body.style.maxHeight && body.style.maxHeight !== '0px';

    if (isOpen) {
        body.style.maxHeight = '0px';
        body.style.overflow = 'hidden';
        arrow.classList.remove('expanded');
    } else {
        body.style.maxHeight = body.scrollHeight + 'px';
        body.style.overflow = 'visible';
        arrow.classList.add('expanded');
    }
}

function initPriceSlider() {
    const minInput = document.getElementById('price-min');
    const maxInput = document.getElementById('price-max');
    const display = document.getElementById('price-display');
    const track = document.getElementById('slider-track');

    function updateSlider() {
        let minVal = parseInt(minInput.value);
        let maxVal = parseInt(maxInput.value);

        if (minVal > maxVal) {
            let temp = minVal;
            minVal = maxVal;
            maxVal = temp;
        }

        display.textContent = `৳${minVal.toLocaleString()} — ৳${maxVal.toLocaleString()}`;
        
        const minPercent = (minVal / minInput.max) * 100;
        const maxPercent = (maxVal / maxInput.max) * 100;
        
        track.style.background = `linear-gradient(to right, #E5E7EB ${minPercent}%, #0A1628 ${minPercent}%, #0A1628 ${maxPercent}%, #E5E7EB ${maxPercent}%)`;
    }

    minInput.addEventListener('input', () => { updateSlider(); applyFilters(); });
    maxInput.addEventListener('input', () => { updateSlider(); applyFilters(); });
    
    updateSlider();
}

function updateStockCounts(filtered) {
    const counts = { instock: 0, preorder: 0, upcoming: 0 };
    // Note: This counts based on the CURRENTLY filtered set, which might be confusing.
    // Usually, counts show total available in that category.
    const activeCat = document.querySelector('.cat-btn.active')?.dataset.category;
    const catFiltered = activeCat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCat);
    
    catFiltered.forEach(p => {
        if (counts[p.stock] !== undefined) counts[p.stock]++;
    });

    document.getElementById('count-instock').textContent = `(${counts.instock})`;
    document.getElementById('count-preorder').textContent = `(${counts.preorder})`;
    document.getElementById('count-upcoming').textContent = `(${counts.upcoming})`;
}

function handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlCat = urlParams.get('category');

    if (urlCat) {
        const matchBtn = document.querySelector(`.cat-btn[data-category="${urlCat}"]`);
        if (matchBtn) {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            matchBtn.classList.add('active');
            document.getElementById('result-category-name').textContent = matchBtn.textContent;
        }
    }
}

function setupEventListeners() {
    // Dropdowns
    document.getElementById('show-qty').addEventListener('change', () => applyFilters());
    document.getElementById('sort-by').addEventListener('change', () => applyFilters());
    
    // Stock Checkboxes
    document.querySelectorAll('input[name="stock"]').forEach(cb => {
        cb.addEventListener('change', () => applyFilters());
    });

    // Clear All
    document.getElementById('clear-all-filters').addEventListener('click', () => {
        document.getElementById('price-min').value = 0;
        document.getElementById('price-max').value = 100000;
        document.querySelectorAll('.filter-sidebar input[type="checkbox"]').forEach(cb => cb.checked = false);
        initPriceSlider();
        applyFilters();
    });

    // Mobile Drawer
    const trigger = document.getElementById('mobile-filter-trigger');
    const sidebar = document.getElementById('filter-sidebar');
    const backdrop = document.getElementById('filter-backdrop');
    const closeBtn = document.getElementById('close-filter-drawer');

    trigger.addEventListener('click', () => {
        sidebar.classList.add('active');
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const closeDrawer = () => {
        sidebar.classList.remove('active');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
    };

    backdrop.addEventListener('click', closeDrawer);
    closeBtn.addEventListener('click', closeDrawer);
}

function navigateToDetail(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (product) {
        const params = new URLSearchParams({
            id: product.id,
            name: product.name,
            price: product.price,
            original: product.original || product.price,
            discount: product.discount || 0,
            status: product.stock,
            brand: product.brand,
            desc: product.description,
            code: product.code,
            image: product.image
        });
        window.location.href = `product-detail.html?${params.toString()}`;
    }
}

// Global toggleFilter for inline onclick
window.toggleFilter = toggleFilter;

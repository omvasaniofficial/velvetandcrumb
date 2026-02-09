// <!-- Logic -->

// --- DATA STORAGE ---
// Menu Data Object
const products = [
    {
        id: 1,
        name: "Double Chocolate Fudge",
        category: "cake",
        price: "Rs. 700",
        description: "Rich dark chocolate sponge layered with ganache.",
        image: "braggsdiner-F8RKds2YdqA-unsplash.jpg"
    },
    {
        id: 2,
        name: "Vanilla Bean Dream",
        category: "cupcake",
        price: "Rs. 100",
        description: "Light vanilla sponge with swiss meringue buttercream.",
        image: "sara-cervera-FAnSK-gVGZU-unsplash.jpg"
    },
    {
        id: 3,
        name: "Rustic Floral Tier",
        category: "wedding",
        price: "Rs. 2500",
        description: "Two-tier semi-naked cake with fresh organic flowers.",
        image: "jason-leung-fXAuCMEYGY4-unsplash.jpg"
    },
    {
        id: 4,
        name: "Lemon Raspberry",
        category: "cake",
        price: "Rs. 500",
        description: "Zesty lemon cake with fresh raspberry preserve filling.",
        image: "balavan-carter-keW1-QqBMYQ-unsplash.jpg"
    },
    {
        id: 5,
        name: "Red Velvet Swirl",
        category: "cupcake",
        price: "Rs. 125",
        description: "Classic southern red velvet with cream cheese frosting.",
        image: "luisana-zerpa-fa59muUjyec-unsplash.jpg"
    },
    {
        id: 6,
        name: "Salted Caramel Drip",
        category: "cake",
        price: "Rs. 550",
        description: "Caramel sponge, salted butterscotch sauce, toffee bits.",
        image: "christian-dala-0285C0q5VTU-unsplash.jpg"
    }
];

// Chart Data
const chartData = {
    labels: ['Chocolate', 'Vanilla', 'Red Velvet', 'Salted Caramel', 'Lemon', 'Other'],
    data: [5, 4, 3, 1, 1, 1]
};

// --- DOM ELEMENTS ---
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const statCakes = document.getElementById('stat-cakes');
const statClients = document.getElementById('stat-clients');

// --- FUNCTIONS ---

// 1. Render Products
function renderProducts(filter = 'all') {
    productGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group';
        
        card.innerHTML = `
            <div class="h-64 overflow-hidden relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transform group-hover:scale-105 transition duration-500">
                <span class="absolute top-4 right-4 bg-white/90 px-3 py-1 text-xs font-bold text-[#8B4513] uppercase tracking-wide rounded-full shadow-sm">${product.category}</span>
            </div>
            <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-[#4A4A4A] mb-2 font-serif">${product.name}</h3>
                <p class="text-gray-500 text-sm mb-4 h-10 overflow-hidden">${product.description}</p>
                <div class="flex justify-center items-center gap-4">
                    <span class="text-lg font-bold text-[#D2B48C]">${product.price}</span>
                    <button onclick="location.href='#contact'" class="text-xs border border-[#8B4513] text-[#8B4513] px-4 py-2 hover:bg-[#8B4513] hover:text-white transition uppercase tracking-wider">Order</button>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// 2. Initialize Chart.js
function initChart() {
    const ctx = document.getElementById('flavorChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: chartData.labels,
            datasets: [{
                data: chartData.data,
                backgroundColor: [
                    '#3E2723', // Chocolate
                    '#FFF9C4', // Vanilla
                    '#C62828', // Red Velvet
                    '#D2B48C', // Caramel
                    '#FDD835', // Lemon
                    '#9E9E9E'  // Other
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: "'Lato', sans-serif",
                            size: 11
                        },
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#4A4A4A',
                    bodyColor: '#4A4A4A',
                    borderColor: '#D2B48C',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return ` ${context.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

// 3. Stats Animation
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Add specific formatting based on the element ID
        if (obj.id === 'stat-cakes') {
            obj.innerHTML = Math.floor(progress * (end - start) + start) + "+";
        } else if (obj.id === 'stat-clients') {
            obj.innerHTML = Math.floor(progress * (end - start) + start) + "%";
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// --- EVENT LISTENERS ---

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initChart();
    
    // Trigger animation slightly after load
    setTimeout(() => {
        animateValue(statCakes, 0, 15, 2000);
        animateValue(statClients, 0, 98, 2000);
    }, 500);
});

// Filter Logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update Active State
        filterBtns.forEach(b => {
            b.classList.remove('bg-[#8B4513]', 'text-white');
            b.classList.add('bg-gray-100', 'text-gray-600');
        });
        btn.classList.remove('bg-gray-100', 'text-gray-600');
        btn.classList.add('bg-[#8B4513]', 'text-white');

        // Filter Grid
        renderProducts(btn.dataset.filter);
    });
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Form Submission (Simulated)
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = "Sent!";
    btn.classList.add('bg-green-600');
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.classList.remove('bg-green-600');
        e.target.reset();
        alert("Thank you! We've received your inquiry and will bake up a response shortly.");
    }, 2000);
});
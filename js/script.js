
// Track active calculators with proper ID management
let availableIds = [1, 2, 3];
let activeCalculators = new Set();
const maxCalculators = 3;

// Initialize theme on page load
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    applyTheme(theme);
}

// Apply theme to the document
function applyTheme(theme) {
    const html = document.documentElement;
    const icon = document.getElementById('themeIcon');
    
    if (theme === 'light') {
        html.classList.remove('dark-theme');
        html.classList.add('light-theme');
        icon.textContent = '🌞';
    } else {
        html.classList.remove('light-theme');
        html.classList.add('dark-theme');
        icon.textContent = '🌙';
    }
    
    localStorage.setItem('theme', theme);
}

// Toggle between light and dark themes
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    applyTheme(newTheme);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    addCalculator(); // Add first calculator
});

// Add a new calculator instance
function addCalculator() {
    if (activeCalculators.size >= maxCalculators) {
        alert(`Maximum ${maxCalculators} calculators allowed`);
        return;
    }
    
    // Find the first available ID
    let id = null;
    for (let availableId of availableIds) {
        if (!activeCalculators.has(availableId)) {
            id = availableId;
            break;
        }
    }
    
    if (id === null) return;
    
    activeCalculators.add(id);
    const grid = document.getElementById('calculatorsGrid');
    
    const calculatorHTML = `
        <div class="calculator-wrapper" id="calc-${id}">
            <div class="calculator-header">
                <button class="close-calculator-btn" onclick="removeCalculator(${id})">×</button>
                <h2>Calculator ${id}</h2>
            </div>
            
            <select id="switcher-${id}" class="calculator-select" onchange="switchCalc(${id})">
                <option value="avgStock">Average Stock Price</option>
                <option value="requiredQty">Required Quantity & Price</option>
            </select>

            <!-- AVERAGE STOCK PRICE CALCULATOR -->
            <div id="avgStock-${id}" class="calculator-section">
                <h3>Average Stock Price</h3>
                <div class="input-group">
                    <label for="oldAvgPrice-${id}">Old Average Stock Price</label>
                    <input type="number" id="oldAvgPrice-${id}" placeholder="Old Average Stock Price" step="0.01" oninput="calcAvgStock(${id})" onkeypress="handleEnter(event)">
                    <label for="oldQty-${id}">Quantity of Old Stock</label>
                    <input type="number" id="oldQty-${id}" placeholder="Quantity of Old Stock" oninput="calcAvgStock(${id})" onkeypress="handleEnter(event)">
                    <label for="newPrice-${id}">Price of New Stock</label>
                    <input type="number" id="newPrice-${id}" placeholder="Price of New Stock" step="0.01" oninput="calcAvgStock(${id})" onkeypress="handleEnter(event)">
                    <label for="newQty-${id}">Quantity to Buy</label>
                    <input type="number" id="newQty-${id}" placeholder="Quantity to Buy" oninput="calcAvgStock(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result">New Average Price: <span id="rAvgStock-${id}">0</span></div>
            </div>

            <!-- REQUIRED QUANTITY & PRICE CALCULATOR -->
            <div id="requiredQty-${id}" class="calculator-section" hidden>
                <h3>Required Quantity & Price</h3>
                <div class="input-group">
                    <label for="targetAvgPrice-${id}">Target Average Stock Price</label>
                    <input type="number" id="targetAvgPrice-${id}" placeholder="Target Average Stock Price" step="0.01" oninput="calcRequiredQty(${id})" onkeypress="handleEnter(event)">
                    <label for="oldQtyReq-${id}">Old Quantity</label>
                    <input type="number" id="oldQtyReq-${id}" placeholder="Old Quantity" oninput="calcRequiredQty(${id})" onkeypress="handleEnter(event)">
                    <label for="oldAvgPriceReq-${id}">Old Average Price</label>
                    <input type="number" id="oldAvgPriceReq-${id}" placeholder="Old Average Price" step="0.01" oninput="calcRequiredQty(${id})" onkeypress="handleEnter(event)">
                    <label for="newPriceReq-${id}">New Purchase Price</label>
                    <input type="number" id="newPriceReq-${id}" placeholder="New Purchase Price" step="0.01" oninput="calcRequiredQty(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result-group">
                    <div class="result">Required Quantity: <span id="rRequiredQty-${id}">0</span></div>
                    <div class="result">Total Price: <span id="rTotalPrice-${id}">0</span></div>
                </div>
            </div>
            
            <button class="reset-calculator-btn" onclick="resetCalculator(${id})">Reset</button>
        </div>
    `;
    
    grid.insertAdjacentHTML('beforeend', calculatorHTML);
    updateAddButton();
}

// Remove a calculator instance
function removeCalculator(id) {
    const element = document.getElementById(`calc-${id}`);
    if (element) {
        element.remove();
        activeCalculators.delete(id);
        updateAddButton();
    }
}

// Update add button state
function updateAddButton() {
    const addBtn = document.getElementById('addCalcBtn');
    addBtn.disabled = activeCalculators.size >= maxCalculators;
}

// Reset all calculators
function resetAllCalculators() {
    const inputs = document.querySelectorAll('.calculator-wrapper input[type="number"]');
    inputs.forEach(input => {
        input.value = '';
        // Trigger calculation for affected calculator
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    // Reset all result displays to 0
    const results = document.querySelectorAll('.result span');
    results.forEach(result => {
        result.innerText = '0';
    });
}

// Reset individual calculator
function resetCalculator(id) {
    const inputs = document.querySelectorAll(`#calc-${id} input[type="number"]`);
    inputs.forEach(input => {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    // Reset result displays for this calculator
    const results = document.querySelectorAll(`#calc-${id} .result span`);
    results.forEach(result => {
        result.innerText = '0';
    });
}

// Switch calculator type
function switchCalc(id) {
    const selected = document.getElementById(`switcher-${id}`).value;
    
    document.getElementById(`avgStock-${id}`).hidden = true;
    document.getElementById(`requiredQty-${id}`).hidden = true;
    
    document.getElementById(`${selected}-${id}`).hidden = false;
}

// Handle Enter key to move to next input
function handleEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        
        const visibleSection = event.target.closest('.calculator-section');
        if (!visibleSection) return;
        
        const inputs = Array.from(visibleSection.querySelectorAll('input'));
        const currentInput = event.target;
        const currentIndex = inputs.indexOf(currentInput);
        
        if (currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].focus();
        } else {
            currentInput.blur();
        }
    }
}

// Calculate average stock price
function calcAvgStock(id) {
    const oldAvgPrice = parseFloat(document.getElementById(`oldAvgPrice-${id}`).value) || 0;
    const oldQty = parseFloat(document.getElementById(`oldQty-${id}`).value) || 0;
    const newPrice = parseFloat(document.getElementById(`newPrice-${id}`).value) || 0;
    const newQty = parseFloat(document.getElementById(`newQty-${id}`).value) || 0;
    
    const totalQuantity = oldQty + newQty;
    
    if (totalQuantity === 0) {
        document.getElementById(`rAvgStock-${id}`).innerText = "0";
        return;
    }
    
    const newAvgPrice = ((oldAvgPrice * oldQty) + (newPrice * newQty)) / totalQuantity;
    document.getElementById(`rAvgStock-${id}`).innerText = newAvgPrice.toFixed(2);
}

// Calculate required quantity
function calcRequiredQty(id) {
    const targetAvgPrice = parseFloat(document.getElementById(`targetAvgPrice-${id}`).value) || 0;
    const oldQty = parseFloat(document.getElementById(`oldQtyReq-${id}`).value) || 0;
    const oldAvgPrice = parseFloat(document.getElementById(`oldAvgPriceReq-${id}`).value) || 0;
    const newPrice = parseFloat(document.getElementById(`newPriceReq-${id}`).value) || 0;
    
    const denominator = newPrice - targetAvgPrice;
    
    if (denominator === 0) {
        document.getElementById(`rRequiredQty-${id}`).innerText = "Invalid";
        document.getElementById(`rTotalPrice-${id}`).innerText = "0";
        return;
    }
    
    if (oldQty === 0) {
        document.getElementById(`rRequiredQty-${id}`).innerText = "0";
        document.getElementById(`rTotalPrice-${id}`).innerText = "0";
        return;
    }
    
    const requiredQty = (oldQty * (targetAvgPrice - oldAvgPrice)) / denominator;
    
    if (requiredQty < 0) {
        document.getElementById(`rRequiredQty-${id}`).innerText = "Not possible";
        document.getElementById(`rTotalPrice-${id}`).innerText = "0";
        return;
    }
    
    const totalPrice = requiredQty * newPrice;
    
    document.getElementById(`rRequiredQty-${id}`).innerText = requiredQty.toFixed(2);
    document.getElementById(`rTotalPrice-${id}`).innerText = totalPrice.toFixed(2);
}


// Track active calculators with proper ID management
let availableIds = [1, 2, 3];
let activeCalculators = new Set();
const maxCalculators = 3;
let numberFormat = 'million'; // Default format

// Initialize theme on page load
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    applyTheme(theme);
}

// Initialize number format
function initNumberFormat() {
    const savedFormat = localStorage.getItem('numberFormat') || 'million';
    numberFormat = savedFormat;
    document.getElementById('numberFormat').value = savedFormat;
}

// Change number format
function changeNumberFormat(format) {
    numberFormat = format;
    localStorage.setItem('numberFormat', format);
    // Refresh all calculations to update display
    const inputs = document.querySelectorAll('.calculator-wrapper input[type="number"]');
    inputs.forEach(input => {
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });
}

// Format number based on selected format
function formatNumber(num) {
    const value = parseFloat(num);
    if (isNaN(value)) return '0';
    
    const fixed = value.toFixed(2);
    const parts = fixed.split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1];
    
    if (numberFormat === 'plain') {
        return fixed;
    } else if (numberFormat === 'million') {
        // Standard format: 1,000,000
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else if (numberFormat === 'indian') {
        // Indian format: 10,00,000
        integerPart = integerPart.split('').reverse().join('');
        integerPart = integerPart.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
        integerPart = integerPart.split('').reverse().join('');
    }
    
    return integerPart + '.' + decimalPart;
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
    initNumberFormat();
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
                <option value="sip">SIP Calculator</option>
            </select>

            <!-- AVERAGE STOCK PRICE CALCULATOR -->
            <div id="avgStock-${id}" class="calculator-section">
                <div class="section-header">
                    <h3>Average Stock Price</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'avgStock-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="avgStock-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Calculate the new average price when buying additional stocks at a different price. Useful for portfolio management and understanding your cost basis.</p>
                    <h4>Formula</h4>
                    <p class="formula">New Avg = ((Old Avg × Old Qty) + (New Price × New Qty)) / (Old Qty + New Qty)</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Old Avg: 100, Old Qty: 50, New Price: 120, New Qty: 30</p>
                    <p><strong>Calculation:</strong> ((100 × 50) + (120 × 30)) / (50 + 30) = (5000 + 3600) / 80 = <strong>107.50</strong></p>
                </div>
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
                <div class="section-header">
                    <h3>Required Quantity & Price</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'requiredQty-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="requiredQty-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Find how many shares to buy at a new price to reach your target average cost. Helps you plan strategic purchases to optimize your cost basis.</p>
                    <h4>Formula</h4>
                    <p class="formula">Required Qty = (Old Qty × (Target Avg - Old Avg)) / (New Price - Target Avg)</p>
                    <p class="formula">Total Price = Required Qty × New Price</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Target: 105, Old Qty: 100, Old Avg: 100, New Price: 110</p>
                    <p><strong>Calculation:</strong> (100 × (105 - 100)) / (110 - 105) = (100 × 5) / 5 = <strong>100</strong> units</p>
                    <p>Total Price = 100 × 110 = <strong>11,000</strong></p>
                </div>
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

            <!-- SIP CALCULATOR -->
            <div id="sip-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>SIP Calculator</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'sip-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="sip-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Project your investment growth with regular monthly contributions combined with an initial amount. Perfect for retirement planning, mutual fund investments, and building long-term wealth.</p>
                    <h4>Formula</h4>
                    <p class="formula">FV = PV(1 + r)^n + PMT × [((1 + r)^n - 1) / r]</p>
                    <p style="font-size: 12px; margin-top: 8px;">Where: PV = Initial Corpus, PMT = Monthly SIP, r = Monthly Rate, n = Total Months</p>
                    <p class="formula">Total Invested = PV + (PMT × months)</p>
                    <p class="formula">Gains = FV - Total Invested</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Corpus: ₹100,000, Monthly SIP: ₹5,000, Annual Return: 12%, Years: 10</p>
                    <p><strong>Calculation:</strong> Monthly rate = 12% / 12 = 1%, Total months = 120</p>
                    <p>FV ≈ ₹1,004,000 | Total Invested = ₹700,000 | Gains ≈ ₹304,000</p>
                </div>
                <div class="input-group">
                    <label for="currentCorpus-${id}">Current Corpus</label>
                    <input type="number" id="currentCorpus-${id}" placeholder="Initial Investment" step="0.01" oninput="calcSIP(${id})" onkeypress="handleEnter(event)">
                    <label for="monthlySIP-${id}">Monthly SIP Amount</label>
                    <input type="number" id="monthlySIP-${id}" placeholder="Monthly Investment" step="0.01" oninput="calcSIP(${id})" onkeypress="handleEnter(event)">
                    <label for="annualReturn-${id}">Expected Annual Return %</label>
                    <input type="number" id="annualReturn-${id}" placeholder="Annual Growth %" step="0.01" oninput="calcSIP(${id})" onkeypress="handleEnter(event)">
                    <label for="sipYears-${id}">Investment Period (Years)</label>
                    <input type="number" id="sipYears-${id}" placeholder="Number of Years" step="0.1" oninput="calcSIP(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result-group">
                    <div class="result">Total Invested: <span id="rTotalInvested-${id}">0</span></div>
                    <div class="result">Future Value: <span id="rFutureValue-${id}">0</span></div>
                    <div class="result">Gains: <span id="rGains-${id}">0</span></div>
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

// Toggle tooltip visibility
function toggleTooltip(event, tooltipId) {
    event.stopPropagation();
    const tooltip = document.getElementById(tooltipId);
    const isVisible = tooltip.classList.contains('visible');
    
    // Hide all tooltips in this calculator
    const calculator = event.target.closest('.calculator-wrapper');
    const allTooltips = calculator.querySelectorAll('.tooltip-box');
    allTooltips.forEach(t => t.classList.remove('visible'));
    
    // Toggle current tooltip
    if (!isVisible) {
        tooltip.classList.add('visible');
        
        // Position tooltip above the icon
        const icon = event.target;
        const rect = icon.getBoundingClientRect();
        const tooltipHeight = tooltip.offsetHeight || 300;
        const tooltipWidth = tooltip.offsetWidth || 320;
        
        let top = rect.top - tooltipHeight - 15;
        let left = rect.left + rect.width / 2 - tooltipWidth / 2;
        
        // Keep tooltip within viewport
        if (top < 10) {
            top = rect.bottom + 15;
        }
        
        if (left < 10) {
            left = 10;
        }
        
        if (left + tooltipWidth > window.innerWidth) {
            left = window.innerWidth - tooltipWidth - 10;
        }
        
        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';
    }
}

// Close tooltip
function closeTooltip(event) {
    event.stopPropagation();
    const tooltip = event.target.closest('.tooltip-box');
    if (tooltip) {
        tooltip.classList.remove('visible');
    }
}

// Calculate SIP (Systematic Investment Plan)
function calcSIP(id) {
    const currentCorpus = parseFloat(document.getElementById(`currentCorpus-${id}`).value) || 0;
    const monthlySIP = parseFloat(document.getElementById(`monthlySIP-${id}`).value) || 0;
    const annualReturn = parseFloat(document.getElementById(`annualReturn-${id}`).value) || 0;
    const years = parseFloat(document.getElementById(`sipYears-${id}`).value) || 0;
    
    if (years === 0) {
        document.getElementById(`rTotalInvested-${id}`).innerText = '0';
        document.getElementById(`rFutureValue-${id}`).innerText = '0';
        document.getElementById(`rGains-${id}`).innerText = '0';
        return;
    }
    
    // Convert annual return to monthly return
    const monthlyReturn = annualReturn / 100 / 12;
    const totalMonths = years * 12;
    
    // Future value of current corpus (lump sum)
    const futureValueCorpus = currentCorpus * Math.pow(1 + monthlyReturn, totalMonths);
    
    // Future value of SIP (annuity formula)
    let futureValueSIP = 0;
    if (monthlyReturn === 0) {
        futureValueSIP = monthlySIP * totalMonths;
    } else {
        futureValueSIP = monthlySIP * (Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn;
    }
    
    // Total future value
    const totalFutureValue = futureValueCorpus + futureValueSIP;
    
    // Total amount invested
    const totalInvested = currentCorpus + (monthlySIP * totalMonths);
    
    // Gains/Returns
    const gains = totalFutureValue - totalInvested;
    
    document.getElementById(`rTotalInvested-${id}`).innerText = formatNumber(totalInvested);
    document.getElementById(`rFutureValue-${id}`).innerText = formatNumber(totalFutureValue);
    document.getElementById(`rGains-${id}`).innerText = formatNumber(gains);
}

// Switch calculator type
function switchCalc(id) {
    const selected = document.getElementById(`switcher-${id}`).value;
    
    document.getElementById(`avgStock-${id}`).hidden = true;
    document.getElementById(`requiredQty-${id}`).hidden = true;
    document.getElementById(`sip-${id}`).hidden = true;
    
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
    document.getElementById(`rAvgStock-${id}`).innerText = formatNumber(newAvgPrice);
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
    
    document.getElementById(`rRequiredQty-${id}`).innerText = formatNumber(requiredQty);
    document.getElementById(`rTotalPrice-${id}`).innerText = formatNumber(totalPrice);
}

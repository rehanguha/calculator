// ==================== CALCULATOR MANAGER ====================

// Filter calculators based on search input
function filterCalculators(id) {
    const searchInput = document.getElementById(`search-${id}`);
    const searchTerm = searchInput.value.toLowerCase().trim();
    const resultsContainer = document.getElementById(`search-results-${id}`);
    
    if (!searchTerm) {
        resultsContainer.style.display = 'none';
        return;
    }
    
    const matches = [];
    
    for (const [key, data] of Object.entries(calculatorData)) {
        const nameMatch = data.name.toLowerCase().includes(searchTerm);
        const categoryMatch = data.category.toLowerCase().includes(searchTerm);
        const termsMatch = data.terms.some(term => term.includes(searchTerm));
        
        if (nameMatch || categoryMatch || termsMatch) {
            matches.push({ key, ...data });
        }
    }
    
    // Group results by category
    const grouped = {};
    matches.forEach(item => {
        if (!grouped[item.category]) {
            grouped[item.category] = [];
        }
        grouped[item.category].push(item);
    });
    
    // Build HTML
    let html = '';
    if (matches.length === 0) {
        html = '<div class="search-no-results">No calculators found</div>';
    } else {
        for (const [category, items] of Object.entries(grouped)) {
            html += `<div class="search-result-category">${category}</div>`;
            items.forEach(item => {
                html += `<div class="search-result-item" onclick="selectCalculator(${id}, '${item.key}', event)">${item.name}</div>`;
            });
        }
    }
    
    resultsContainer.innerHTML = html;
    resultsContainer.style.display = 'block';
}

// Show all calculators when search input is clicked
function showAllCalculators(id) {
    const resultsContainer = document.getElementById(`search-results-${id}`);
    const searchInput = document.getElementById(`search-${id}`);
    
    // If search input already has text, don't override
    if (searchInput.value.trim()) {
        return;
    }
    
    // Group all calculators by category
    const grouped = {};
    for (const [key, data] of Object.entries(calculatorData)) {
        if (!grouped[data.category]) {
            grouped[data.category] = [];
        }
        grouped[data.category].push({ key, ...data });
    }
    
    // Build HTML showing all calculators
    let html = '';
    for (const [category, items] of Object.entries(grouped)) {
        html += `<div class="search-result-category">${category}</div>`;
        items.forEach(item => {
            html += `<div class="search-result-item" onclick="selectCalculator(${id}, '${item.key}', event)">${item.name}</div>`;
        });
    }
    
    resultsContainer.innerHTML = html;
    resultsContainer.style.display = 'block';
}

// Select calculator from search results
function selectCalculator(id, value, event) {
    event.stopPropagation();
    const searchInput = document.getElementById(`search-${id}`);
    const resultsContainer = document.getElementById(`search-results-${id}`);
    const select = document.getElementById(`switcher-${id}`);
    
    // Set the select value and trigger change
    select.value = value;
    searchInput.value = calculatorData[value].name;
    resultsContainer.style.display = 'none';
    
    // Trigger the calculator switch
    switchCalc(id);
}

// Close search results when clicking outside
document.addEventListener('click', function(event) {
    const searchResults = document.querySelectorAll('.search-results');
    searchResults.forEach(result => {
        if (!result.closest('.calculator-search-wrapper').contains(event.target)) {
            result.style.display = 'none';
        }
    });
});

// Open calculator list modal
function openCalculatorList() {
    const modal = document.getElementById('calculatorListModal');
    modal.style.display = 'flex';
    populateCalculatorList();
}

// Close calculator list modal
function closeCalculatorList() {
    const modal = document.getElementById('calculatorListModal');
    modal.style.display = 'none';
    document.getElementById('modalSearch').value = '';
}

// Populate calculator list in modal
function populateCalculatorList() {
    const body = document.getElementById('calculatorListBody');
    const grouped = {};
    
    // Group calculators by category
    for (const [key, data] of Object.entries(calculatorData)) {
        if (!grouped[data.category]) {
            grouped[data.category] = [];
        }
        grouped[data.category].push({ key, ...data });
    }
    
    // Build HTML
    let html = '';
    for (const [category, calculators] of Object.entries(grouped)) {
        html += `
            <div class="calculator-category">
                <div class="category-title">${category}</div>
                <div class="calculator-grid-list">
        `;
        
        calculators.forEach(calc => {
            html += `
                <div class="calculator-card" data-search-text="${calc.name.toLowerCase()} ${calc.terms.join(' ').toLowerCase()}">
                    <div class="calculator-card-name">${calc.name}</div>
                    <button class="calculator-card-btn" onclick="addCalculatorFromModal('${calc.key}')">Add</button>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    }
    
    body.innerHTML = html;
}

// Filter calculators in modal
function filterModalCalculators() {
    const searchTerm = document.getElementById('modalSearch').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.calculator-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const searchText = card.getAttribute('data-search-text');
        if (searchTerm === '' || searchText.includes(searchTerm)) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show no results message if needed
    const body = document.getElementById('calculatorListBody');
    let noResults = body.querySelector('.no-results');
    
    if (visibleCount === 0) {
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No calculators found';
            body.appendChild(noResults);
        }
        noResults.style.display = 'block';
    } else {
        if (noResults) {
            noResults.style.display = 'none';
        }
    }
}

// Add calculator from modal list
function addCalculatorFromModal(calcKey) {
    closeCalculatorList();
    addCalculator();
    
    // Wait for the calculator to be added, then select the calculator
    setTimeout(() => {
        const lastCalculatorId = Array.from(activeCalculators).sort().pop();
        if (lastCalculatorId) {
            const select = document.getElementById(`switcher-${lastCalculatorId}`);
            select.value = calcKey;
            switchCalc(lastCalculatorId);
        }
    }, 100);
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('calculatorListModal');
    if (event.target === modal) {
        closeCalculatorList();
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
    
    const calculatorHTML = generateCalculatorHTML(id);
    
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

// Switch calculator type
function switchCalc(id) {
    const selected = document.getElementById(`switcher-${id}`).value;
    const searchInput = document.getElementById(`search-${id}`);
    const resultsContainer = document.getElementById(`search-results-${id}`);
    
    // Update search input with selected calculator name
    if (calculatorData[selected]) {
        searchInput.value = calculatorData[selected].name;
    }
    
    // Hide search results
    resultsContainer.style.display = 'none';
    
    // Hide all calculator sections
    const allSections = document.querySelectorAll(`#calc-${id} .calculator-section`);
    allSections.forEach(section => section.hidden = true);
    
    // Show selected section
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
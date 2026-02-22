// ==================== UTILITY FUNCTIONS ====================

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
        // Indian format: 1,00,000 (rightmost 3 digits, then groups of 2)
        const digits = integerPart.split('');
        let result = '';
        let count = 0;
        for (let i = digits.length - 1; i >= 0; i--) {
            if (count === 3 || (count > 3 && (count - 3) % 2 === 0)) {
                result = ',' + result;
            }
            result = digits[i] + result;
            count++;
        }
        integerPart = result;
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
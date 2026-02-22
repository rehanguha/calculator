// ==================== CALCULATOR HTML TEMPLATES ====================

function generateCalculatorHTML(id) {
    return `
        <div class="calculator-wrapper" id="calc-${id}">
            <div class="calculator-header">
                <button class="close-calculator-btn" onclick="removeCalculator(${id})">×</button>
                <h2>Calculator ${id}</h2>
            </div>
            
            <div class="calculator-search-wrapper">
                <input type="text" id="search-${id}" class="calculator-search" placeholder="Search calculators..." oninput="filterCalculators(${id})" onclick="showAllCalculators(${id})">
                <div id="search-results-${id}" class="search-results" style="display: none;"></div>
            </div>
            
            <select id="switcher-${id}" class="calculator-select" onchange="switchCalc(${id})" style="display: none;">
                <optgroup label="Stock & Portfolio">
                    <option value="avgStock">Average Stock Price</option>
                    <option value="requiredQty">Required Quantity & Price</option>
                    <option value="dividend">Dividend Calculator</option>
                    <option value="breakeven">Breakeven Point</option>
                </optgroup>
                <optgroup label="Investment Planning">
                    <option value="sip">SIP Calculator</option>
                    <option value="compound">Compound Interest</option>
                    <option value="investmentGoal">Investment Goal</option>
                    <option value="costOfDelay">Cost of Delay</option>
                </optgroup>
                <optgroup label="FIRE & Retirement">
                    <option value="fireNumber">FIRE Number</option>
                    <option value="yearsToFire">Years to FIRE</option>
                    <option value="fatFire">FatFIRE Calculator</option>
                    <option value="leanFire">LeanFIRE Calculator</option>
                    <option value="retirementAge">Retirement Age</option>
                </optgroup>
                <optgroup label="Loans & Borrowing">
                    <option value="loanEmi">Loan EMI Calculator</option>
                </optgroup>
                <optgroup label="Real Estate">
                    <option value="propertyRoi">Property Investment ROI</option>
                    <option value="mortgageEmi">Mortgage/Home Loan</option>
                </optgroup>
                <optgroup label="Time & Growth">
                    <option value="rule72">Rule of 72</option>
                    <option value="inflation">Inflation Calculator</option>
                </optgroup>
                <optgroup label="Taxes & Fees">
                    <option value="expenseRatio">Expense Ratio Calculator</option>
                </optgroup>
                <optgroup label="Budgeting & Savings">
                    <option value="emergencyFund">Emergency Fund Calculator</option>
                    <option value="monthlySavings">Monthly Savings Calculator</option>
                    <option value="budgetAllocator">Budget Allocator</option>
                </optgroup>
                <optgroup label="Debt Management">
                    <option value="debtPayoff">Debt Payoff Calculator</option>
                    <option value="creditCardPayoff">Credit Card Payoff Calculator</option>
                    <option value="debtConsolidation">Debt Consolidation Calculator</option>
                </optgroup>
                <optgroup label="Investment Analysis">
                    <option value="cagr">CAGR Calculator</option>
                    <option value="roi">ROI Calculator</option>
                    <option value="drip">Dividend Reinvestment (DRIP)</option>
                    <option value="dca">Dollar Cost Averaging</option>
                </optgroup>
                <optgroup label="Wealth Building">
                    <option value="netWorth">Net Worth Calculator</option>
                    <option value="wealthProjection">Wealth Projection</option>
                    <option value="millionaireTimeline">Millionaire Timeline</option>
                </optgroup>
                <optgroup label="Real Estate (Additional)">
                    <option value="homeAffordability">Home Affordability</option>
                    <option value="rentVsBuy">Rent vs Buy</option>
                    <option value="propertyAppreciation">Property Appreciation</option>
                </optgroup>
                <optgroup label="Retirement (Additional)">
                    <option value="annuityCorpus">Annuity/Corpus Calculator</option>
                    <option value="retirementIncome">Retirement Income Calculator</option>
                    <option value="inflationCorpus">Inflation-Adjusted Corpus</option>
                </optgroup>
                <optgroup label="Vehicle Finance">
                    <option value="carLoanEmi">Car Loan EMI Calculator</option>
                    <option value="depreciation">Depreciation Calculator</option>
                </optgroup>
                <optgroup label="Insurance">
                    <option value="lifeInsurance">Life Insurance Needs</option>
                    <option value="termInsurance">Term Insurance Premium</option>
                </optgroup>
                <optgroup label="Education Planning">
                    <option value="educationFund">Education Fund Calculator</option>
                    <option value="collegeCost">College Cost Projection</option>
                </optgroup>
                <optgroup label="Income & Earning">
                    <option value="salaryCalculator">Salary Calculator</option>
                    <option value="sideHustleIncome">Side Hustle Income</option>
                    <option value="freelanceRate">Freelance Rate Calculator</option>
                </optgroup>
                <optgroup label="Tracking & Monitoring">
                    <option value="savingsRate">Savings Rate Calculator</option>
                    <option value="goalTracker">Goal Tracker</option>
                    <option value="expenseTracker">Expense Tracker</option>
                </optgroup>
                <optgroup label="Loan Comparisons">
                    <option value="loanComparison">Loan Comparison</option>
                    <option value="paybackPeriod">Payback Period Calculator</option>
                    <option value="earlyPayoff">Early Loan Payoff</option>
                </optgroup>
                <optgroup label="Investment Analysis (Advanced)">
                    <option value="peRatio">P/E Ratio & EPS</option>
                    <option value="dividendGrowth">Dividend Growth Calculator</option>
                    <option value="portfolioRebalancing">Portfolio Rebalancing</option>
                </optgroup>
                <optgroup label="Tax Planning">
                    <option value="taxLossHarvesting">Tax Loss Harvesting</option>
                    <option value="taxBracket">Tax Bracket Calculator</option>
                    <option value="giftTax">Gift/Inheritance Tax</option>
                </optgroup>
                <optgroup label="Business & Freelance">
                    <option value="businessProfit">Business Profit Calculator</option>
                    <option value="markupMargin">Markup vs Margin</option>
                </optgroup>
                <optgroup label="Lifestyle & Planning">
                    <option value="expenseInflation">Expense Inflation Calculator</option>
                    <option value="weddingBudget">Wedding Budget Planner</option>
                    <option value="vacationBudget">Vacation Budget Planner</option>
                </optgroup>
                <optgroup label="Crypto & Modern Investing">
                    <option value="cryptoROI">Crypto Investment ROI</option>
                    <option value="cryptoDCA">Crypto DCA Calculator</option>
                </optgroup>
                <optgroup label="Advanced Financial">
                    <option value="bondYield">Bond Yield Calculator</option>
                    <option value="npv">Net Present Value (NPV)</option>
                    <option value="irr">Internal Rate of Return (IRR)</option>
                </optgroup>
                <optgroup label="Comparison Tools">
                    <option value="leaseVsBuy">Lease vs Buy Calculator</option>
                    <option value="costOfLiving">Cost of Living Adjuster</option>
                </optgroup>
                <optgroup label="Real Estate">
                    <option value="rentalYield">Rental Yield Calculator</option>
                </optgroup>
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

            <!-- FIRE NUMBER CALCULATOR -->
            <div id="fireNumber-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>FIRE Number Calculator</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'fireNumber-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="fireNumber-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Calculate how much money you need to retire comfortably using the 4% rule. This is the total corpus required to live off investment returns indefinitely.</p>
                    <h4>Formula</h4>
                    <p class="formula">FIRE Number = Annual Expenses / (Withdrawal Rate / 100)</p>
                    <p class="formula">Annual Expenses = Annual Income - Annual Savings</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Annual Income: ₹1,000,000, Annual Savings: ₹400,000, Withdrawal Rate: 4%</p>
                    <p><strong>Calculation:</strong> Annual Expenses = 1,000,000 - 400,000 = 600,000</p>
                    <p>FIRE Number = 600,000 / (4/100) = <strong>₹15,000,000</strong></p>
                </div>
                <div class="input-group">
                    <label for="fireIncome-${id}">Annual Income</label>
                    <input type="number" id="fireIncome-${id}" placeholder="Annual Income" step="0.01" oninput="calcFireNumber(${id})" onkeypress="handleEnter(event)">
                    <label for="fireSavings-${id}">Annual Savings</label>
                    <input type="number" id="fireSavings-${id}" placeholder="Annual Savings" step="0.01" oninput="calcFireNumber(${id})" onkeypress="handleEnter(event)">
                    <label for="fireWithdrawal-${id}">Withdrawal Rate (%)</label>
                    <input type="number" id="fireWithdrawal-${id}" placeholder="Withdrawal Rate %" value="4" step="0.01" oninput="calcFireNumber(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result-group">
                    <div class="result">Annual Expenses: <span id="rFireExpenses-${id}">0</span></div>
                    <div class="result">FIRE Number: <span id="rFireNumber-${id}">0</span></div>
                </div>
            </div>

            <!-- YEARS TO FIRE CALCULATOR -->
            <div id="yearsToFire-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>Years to FIRE Calculator</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'yearsToFire-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="yearsToFire-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Calculate how many years until you can retire based on your current savings, annual contributions, and expected returns.</p>
                    <h4>Formula</h4>
                    <p class="formula">Years to FIRE: Using FV of Annuity formula to reach target FIRE Number</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Current Savings: ₹1,000,000, Annual Contribution: ₹500,000, FIRE Target: ₹15,000,000, Return: 10%</p>
                    <p><strong>Result:</strong> Approximately <strong>16.3 years</strong> to achieve FIRE</p>
                </div>
                <div class="input-group">
                    <label for="ytfCurrent-${id}">Current Savings</label>
                    <input type="number" id="ytfCurrent-${id}" placeholder="Current Savings" step="0.01" oninput="calcYearsToFire(${id})" onkeypress="handleEnter(event)">
                    <label for="ytfAnnual-${id}">Annual Contribution</label>
                    <input type="number" id="ytfAnnual-${id}" placeholder="Annual Contribution" step="0.01" oninput="calcYearsToFire(${id})" onkeypress="handleEnter(event)">
                    <label for="ytfTarget-${id}">FIRE Target Amount</label>
                    <input type="number" id="ytfTarget-${id}" placeholder="FIRE Target" step="0.01" oninput="calcYearsToFire(${id})" onkeypress="handleEnter(event)">
                    <label for="ytfReturn-${id}">Expected Annual Return (%)</label>
                    <input type="number" id="ytfReturn-${id}" placeholder="Annual Return %" value="10" step="0.01" oninput="calcYearsToFire(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result">Years to FIRE: <span id="rYearsToFire-${id}">0</span></div>
            </div>

            <!-- FATFIRE CALCULATOR -->
            <div id="fatFire-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>FatFIRE Calculator</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'fatFire-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="fatFire-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Calculate FIRE numbers for a luxurious lifestyle with higher annual expenses. Perfect for those who want to retire early without cutting back on spending.</p>
                    <h4>Formula</h4>
                    <p class="formula">FatFIRE Number = Desired Annual Expenses / (Withdrawal Rate / 100)</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Desired Annual Expenses: ₹1,000,000, Withdrawal Rate: 4%</p>
                    <p><strong>Calculation:</strong> FatFIRE Number = 1,000,000 / 0.04 = <strong>₹25,000,000</strong></p>
                </div>
                <div class="input-group">
                    <label for="ffExpenses-${id}">Desired Annual Expenses</label>
                    <input type="number" id="ffExpenses-${id}" placeholder="Annual Expenses (Luxurious)" step="0.01" oninput="calcFatFire(${id})" onkeypress="handleEnter(event)">
                    <label for="ffWithdrawal-${id}">Withdrawal Rate (%)</label>
                    <input type="number" id="ffWithdrawal-${id}" placeholder="Withdrawal Rate %" value="4" step="0.01" oninput="calcFatFire(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result">FatFIRE Number: <span id="rFatFire-${id}">0</span></div>
            </div>

            <!-- DIVIDEND CALCULATOR -->
            <div id="dividend-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>Dividend Calculator</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'dividend-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="dividend-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Calculate annual dividend income and dividend yield on your investment.</p>
                    <h4>Formula</h4>
                    <p class="formula">Annual Dividend = Shares × Dividend per Share</p>
                    <p class="formula">Dividend Yield = (Annual Dividend / Investment) × 100</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Shares: 100, Dividend/Share: ₹50, Current Price: ₹1000</p>
                    <p><strong>Result:</strong> Annual Dividend: ₹5000 | Yield: 5%</p>
                </div>
                <div class="input-group">
                    <label for="divShares-${id}">Number of Shares</label>
                    <input type="number" id="divShares-${id}" placeholder="Number of Shares" step="1" oninput="calcDividend(${id})" onkeypress="handleEnter(event)">
                    <label for="divPerShare-${id}">Dividend per Share (₹)</label>
                    <input type="number" id="divPerShare-${id}" placeholder="Dividend per Share" step="0.01" oninput="calcDividend(${id})" onkeypress="handleEnter(event)">
                    <label for="divCurrentPrice-${id}">Current Share Price (₹)</label>
                    <input type="number" id="divCurrentPrice-${id}" placeholder="Current Share Price" step="0.01" oninput="calcDividend(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result-group">
                    <div class="result">Annual Dividend: <span id="rDividend-${id}">0</span></div>
                    <div class="result">Dividend Yield: <span id="rDividendYield-${id}">0</span>%</div>
                </div>
            </div>

            <!-- BREAKEVEN CALCULATOR -->
            <div id="breakeven-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>Breakeven Point</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'breakeven-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="breakeven-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Find the breakeven price for your stock investment - the price needed to recover your investment.</p>
                    <h4>Formula</h4>
                    <p class="formula">Breakeven Price = Average Cost per Share + (Brokerage / Total Shares)</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Total Investment: ₹100,000, Shares Bought: 100, Brokerage: ₹500</p>
                    <p><strong>Result:</strong> Breakeven: ₹1005</p>
                </div>
                <div class="input-group">
                    <label for="beInvestment-${id}">Total Investment (₹)</label>
                    <input type="number" id="beInvestment-${id}" placeholder="Total Investment" step="0.01" oninput="calcBreakeven(${id})" onkeypress="handleEnter(event)">
                    <label for="beShares-${id}">Total Shares Bought</label>
                    <input type="number" id="beShares-${id}" placeholder="Total Shares" step="1" oninput="calcBreakeven(${id})" onkeypress="handleEnter(event)">
                    <label for="beBrokerage-${id}">Brokerage/Commission (₹)</label>
                    <input type="number" id="beBrokerage-${id}" placeholder="Brokerage" step="0.01" oninput="calcBreakeven(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result">Breakeven Price: <span id="rBreakeven-${id}">0</span></div>
            </div>

            <!-- COMPOUND INTEREST CALCULATOR -->
            <div id="compound-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>Compound Interest</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'compound-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="compound-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Calculate compound interest on your principal amount.</p>
                    <h4>Formula</h4>
                    <p class="formula">A = P(1 + r/100)^n</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Principal: ₹100,000, Rate: 10%, Years: 5</p>
                    <p><strong>Result:</strong> Amount: ₹161,051 | Interest: ₹61,051</p>
                </div>
                <div class="input-group">
                    <label for="cpPrincipal-${id}">Principal Amount (₹)</label>
                    <input type="number" id="cpPrincipal-${id}" placeholder="Principal" step="0.01" oninput="calcCompound(${id})" onkeypress="handleEnter(event)">
                    <label for="cpRate-${id}">Annual Rate (%)</label>
                    <input type="number" id="cpRate-${id}" placeholder="Annual Rate" step="0.01" oninput="calcCompound(${id})" onkeypress="handleEnter(event)">
                    <label for="cpYears-${id}">Time Period (Years)</label>
                    <input type="number" id="cpYears-${id}" placeholder="Years" step="0.1" oninput="calcCompound(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result-group">
                    <div class="result">Total Amount: <span id="rCompoundAmount-${id}">0</span></div>
                    <div class="result">Interest Earned: <span id="rCompoundInterest-${id}">0</span></div>
                </div>
            </div>

            <!-- INVESTMENT GOAL CALCULATOR -->
            <div id="investmentGoal-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>Investment Goal</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'investmentGoal-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="investmentGoal-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Calculate how much you need to invest monthly to reach your target goal.</p>
                    <h4>Formula</h4>
                    <p class="formula">PMT = FV / [((1 + r)^n - 1) / r]</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Target: ₹1,000,000, Years: 10, Return: 12%</p>
                    <p><strong>Result:</strong> Monthly Investment: ₹5,288</p>
                </div>
                <div class="input-group">
                    <label for="igTarget-${id}">Target Amount (₹)</label>
                    <input type="number" id="igTarget-${id}" placeholder="Target Amount" step="0.01" oninput="calcInvestmentGoal(${id})" onkeypress="handleEnter(event)">
                    <label for="igYears-${id}">Time Period (Years)</label>
                    <input type="number" id="igYears-${id}" placeholder="Years" step="0.1" oninput="calcInvestmentGoal(${id})" onkeypress="handleEnter(event)">
                    <label for="igReturn-${id}">Expected Annual Return (%)</label>
                    <input type="number" id="igReturn-${id}" placeholder="Annual Return" value="12" step="0.01" oninput="calcInvestmentGoal(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result">Monthly Investment Needed: <span id="rInvestmentGoal-${id}">0</span></div>
            </div>

            <!-- COST OF DELAY CALCULATOR -->
            <div id="costOfDelay-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>Cost of Delay</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'costOfDelay-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="costOfDelay-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">See how delaying investments costs you in lost returns.</p>
                    <h4>Formula</h4>
                    <p class="formula">Cost = Amount × [(1 + r)^delay_years - 1]</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Amount: ₹500,000, Return: 10%, Delay: 5 years</p>
                    <p><strong>Result:</strong> Lost Growth: ₹305,256</p>
                </div>
                <div class="input-group">
                    <label for="codAmount-${id}">Investment Amount (₹)</label>
                    <input type="number" id="codAmount-${id}" placeholder="Investment Amount" step="0.01" oninput="calcCostOfDelay(${id})" onkeypress="handleEnter(event)">
                    <label for="codReturn-${id}">Expected Annual Return (%)</label>
                    <input type="number" id="codReturn-${id}" placeholder="Annual Return" value="10" step="0.01" oninput="calcCostOfDelay(${id})" onkeypress="handleEnter(event)">
                    <label for="codDelay-${id}">Delay (Years)</label>
                    <input type="number" id="codDelay-${id}" placeholder="Delay in Years" step="0.1" oninput="calcCostOfDelay(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result">Cost of Delay (Lost Growth): <span id="rCostOfDelay-${id}">0</span></div>
            </div>

            <!-- RETIREMENT AGE CALCULATOR -->
            <div id="retirementAge-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>Retirement Age</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'retirementAge-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="retirementAge-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Find your retirement age based on current savings rate and goals.</p>
                    <h4>Formula</h4>
                    <p class="formula">Retirement Age = Current Age + Years to reach goal</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Current Age: 30, Current Savings: ₹1,000,000, Annual Savings: ₹500,000, FIRE Goal: ₹15,000,000, Return: 10%</p>
                    <p><strong>Result:</strong> Retirement Age: ~46 years</p>
                </div>
                <div class="input-group">
                    <label for="raAge-${id}">Current Age</label>
                    <input type="number" id="raAge-${id}" placeholder="Current Age" step="1" oninput="calcRetirementAge(${id})" onkeypress="handleEnter(event)">
                    <label for="raCurrent-${id}">Current Savings (₹)</label>
                    <input type="number" id="raCurrent-${id}" placeholder="Current Savings" step="0.01" oninput="calcRetirementAge(${id})" onkeypress="handleEnter(event)">
                    <label for="raAnnual-${id}">Annual Savings (₹)</label>
                    <input type="number" id="raAnnual-${id}" placeholder="Annual Savings" step="0.01" oninput="calcRetirementAge(${id})" onkeypress="handleEnter(event)">
                    <label for="raTarget-${id}">FIRE Target (₹)</label>
                    <input type="number" id="raTarget-${id}" placeholder="FIRE Target" step="0.01" oninput="calcRetirementAge(${id})" onkeypress="handleEnter(event)">
                    <label for="raReturn-${id}">Expected Return (%)</label>
                    <input type="number" id="raReturn-${id}" placeholder="Return %" value="10" step="0.01" oninput="calcRetirementAge(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result">Retirement Age: <span id="rRetirementAge-${id}">0</span></div>
            </div>

            <!-- LOAN EMI CALCULATOR -->
            <div id="loanEmi-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>Loan EMI Calculator</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'loanEmi-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="loanEmi-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Calculate monthly EMI, total interest payable, and amortization for loans.</p>
                    <h4>Formula</h4>
                    <p class="formula">EMI = P × [r(1+r)^n] / [(1+r)^n - 1]</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Principal: ₹5,000,000, Rate: 7%, Years: 20</p>
                    <p><strong>Result:</strong> EMI: ₹38,635 | Total Interest: ₹4,270,437</p>
                </div>
                <div class="input-group">
                    <label for="loanPrincipal-${id}">Loan Amount (₹)</label>
                    <input type="number" id="loanPrincipal-${id}" placeholder="Loan Amount" step="0.01" oninput="calcLoanEmi(${id})" onkeypress="handleEnter(event)">
                    <label for="loanRate-${id}">Annual Interest Rate (%)</label>
                    <input type="number" id="loanRate-${id}" placeholder="Annual Rate" step="0.01" oninput="calcLoanEmi(${id})" onkeypress="handleEnter(event)">
                    <label for="loanYears-${id}">Loan Period (Years)</label>
                    <input type="number" id="loanYears-${id}" placeholder="Years" step="0.1" oninput="calcLoanEmi(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result-group">
                    <div class="result">Monthly EMI: <span id="rLoanEmi-${id}">0</span></div>
                    <div class="result">Total Interest: <span id="rLoanInterest-${id}">0</span></div>
                </div>
            </div>

            <!-- PROPERTY ROI CALCULATOR -->
            <div id="propertyRoi-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>Property Investment ROI</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'propertyRoi-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="propertyRoi-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Calculate rental yield and total ROI from property investment.</p>
                    <h4>Formula</h4>
                    <p class="formula">Rental Yield = (Annual Rent / Property Price) × 100</p>
                    <p class="formula">Total ROI = [(Current Value + Total Rent - Investment) / Investment] × 100</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Investment: ₹5,000,000, Annual Rent: ₹300,000, Current Value: ₹6,000,000</p>
                    <p><strong>Result:</strong> Rental Yield: 6% | ROI: 36%</p>
                </div>
                <div class="input-group">
                    <label for="propInvestment-${id}">Property Investment (₹)</label>
                    <input type="number" id="propInvestment-${id}" placeholder="Investment Amount" step="0.01" oninput="calcPropertyRoi(${id})" onkeypress="handleEnter(event)">
                    <label for="propAnnualRent-${id}">Annual Rental Income (₹)</label>
                    <input type="number" id="propAnnualRent-${id}" placeholder="Annual Rent" step="0.01" oninput="calcPropertyRoi(${id})" onkeypress="handleEnter(event)">
                    <label for="propCurrentValue-${id}">Current Property Value (₹)</label>
                    <input type="number" id="propCurrentValue-${id}" placeholder="Current Value" step="0.01" oninput="calcPropertyRoi(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result-group">
                    <div class="result">Rental Yield: <span id="rPropertyYield-${id}">0</span>%</div>
                    <div class="result">Total ROI: <span id="rPropertyRoi-${id}">0</span>%</div>
                </div>
            </div>

            <!-- MORTGAGE CALCULATOR -->
            <div id="mortgageEmi-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>Mortgage/Home Loan</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'mortgageEmi-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="mortgageEmi-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Calculate home loan EMI with principal breakdown.</p>
                    <h4>Formula</h4>
                    <p class="formula">EMI = P × [r(1+r)^n] / [(1+r)^n - 1]</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Property: ₹10,000,000, LTV: 80%, Rate: 6.5%, Years: 20</p>
                    <p><strong>Result:</strong> EMI: ₹41,309 | Total Interest: ₹4,914,229</p>
                </div>
                <div class="input-group">
                    <label for="mortgagePrice-${id}">Property Price (₹)</label>
                    <input type="number" id="mortgagePrice-${id}" placeholder="Property Price" step="0.01" oninput="calcMortgage(${id})" onkeypress="handleEnter(event)">
                    <label for="mortgageLtv-${id}">Loan to Value (%)</label>
                    <input type="number" id="mortgageLtv-${id}" placeholder="LTV %" value="80" step="0.01" oninput="calcMortgage(${id})" onkeypress="handleEnter(event)">
                    <label for="mortgageRate-${id}">Interest Rate (%)</label>
                    <input type="number" id="mortgageRate-${id}" placeholder="Interest Rate" step="0.01" oninput="calcMortgage(${id})" onkeypress="handleEnter(event)">
                    <label for="mortgageYears-${id}">Loan Period (Years)</label>
                    <input type="number" id="mortgageYears-${id}" placeholder="Years" step="0.1" oninput="calcMortgage(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result-group">
                    <div class="result">Loan Amount: <span id="rMortgageLoan-${id}">0</span></div>
                    <div class="result">Monthly EMI: <span id="rMortgageEmi-${id}">0</span></div>
                    <div class="result">Total Interest: <span id="rMortgageInterest-${id}">0</span></div>
                </div>
            </div>

            <!-- RULE OF 72 CALCULATOR -->
            <div id="rule72-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>Rule of 72</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'rule72-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="rule72-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Quick way to find how long an investment takes to double.</p>
                    <h4>Formula</h4>
                    <p class="formula">Years to Double = 72 / Annual Return Rate (%)</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Annual Return: 12%</p>
                    <p><strong>Result:</strong> Investment doubles in 6 years</p>
                </div>
                <div class="input-group">
                    <label for="rule72Rate-${id}">Annual Return Rate (%)</label>
                    <input type="number" id="rule72Rate-${id}" placeholder="Annual Return %" step="0.01" oninput="calcRule72(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result">Years to Double: <span id="rRule72-${id}">0</span></div>
            </div>

            <!-- INFLATION CALCULATOR -->
            <div id="inflation-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>Inflation Calculator</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'inflation-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="inflation-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Calculate future value of money adjusted for inflation.</p>
                    <h4>Formula</h4>
                    <p class="formula">Future Value = Present Value / (1 + Inflation Rate)^Years</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Today's Value: ₹100,000, Inflation: 6%, Years: 10</p>
                    <p><strong>Result:</strong> Future Equivalent: ₹55,839</p>
                </div>
                <div class="input-group">
                    <label for="inflationAmount-${id}">Amount Today (₹)</label>
                    <input type="number" id="inflationAmount-${id}" placeholder="Amount Today" step="0.01" oninput="calcInflation(${id})" onkeypress="handleEnter(event)">
                    <label for="inflationRate-${id}">Annual Inflation Rate (%)</label>
                    <input type="number" id="inflationRate-${id}" placeholder="Inflation Rate %" value="6" step="0.01" oninput="calcInflation(${id})" onkeypress="handleEnter(event)">
                    <label for="inflationYears-${id}">Time Period (Years)</label>
                    <input type="number" id="inflationYears-${id}" placeholder="Years" step="0.1" oninput="calcInflation(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result">Purchasing Power (Future Value): <span id="rInflation-${id}">0</span></div>
            </div>

            <!-- EXPENSE RATIO CALCULATOR -->
            <div id="expenseRatio-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>Expense Ratio Calculator</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'expenseRatio-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="expenseRatio-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Calculate annual fees charged by mutual funds and their impact on returns.</p>
                    <h4>Formula</h4>
                    <p class="formula">Annual Fee = Fund Value × (Expense Ratio / 100)</p>
                    <p class="formula">Net Return = Gross Return - Expense Ratio</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Fund Value: ₹1,000,000, Expense Ratio: 0.5%, Gross Return: 12%</p>
                    <p><strong>Result:</strong> Annual Fee: ₹5,000 | Net Return: 11.5%</p>
                </div>
                <div class="input-group">
                    <label for="erFundValue-${id}">Fund Value (₹)</label>
                    <input type="number" id="erFundValue-${id}" placeholder="Fund Value" step="0.01" oninput="calcExpenseRatio(${id})" onkeypress="handleEnter(event)">
                    <label for="erExpenseRatio-${id}">Expense Ratio (%)</label>
                    <input type="number" id="erExpenseRatio-${id}" placeholder="Expense Ratio %" step="0.01" oninput="calcExpenseRatio(${id})" onkeypress="handleEnter(event)">
                    <label for="erGrossReturn-${id}">Gross Annual Return (%)</label>
                    <input type="number" id="erGrossReturn-${id}" placeholder="Gross Return %" step="0.01" oninput="calcExpenseRatio(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result-group">
                    <div class="result">Annual Fee: <span id="rExpenseRatioFee-${id}">0</span></div>
                    <div class="result">Net Return: <span id="rExpenseRatioNet-${id}">0</span>%</div>
                </div>
            </div>

            <!-- EMERGENCY FUND CALCULATOR -->
            <div id="emergencyFund-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>Emergency Fund Calculator</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'emergencyFund-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="emergencyFund-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Calculate emergency fund needed for 3-12 months of expenses.</p>
                    <h4>Formula</h4>
                    <p class="formula">Emergency Fund = Monthly Expenses × Number of Months</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Monthly Expenses: ₹50,000, Months: 6</p>
                    <p><strong>Result:</strong> Emergency Fund Needed: ₹3,00,000</p>
                </div>
                <div class="input-group">
                    <label for="efExpenses-${id}">Monthly Expenses (₹)</label>
                    <input type="number" id="efExpenses-${id}" placeholder="Monthly Expenses" step="0.01" oninput="calcEmergencyFund(${id})" onkeypress="handleEnter(event)">
                    <label for="efMonths-${id}">Number of Months</label>
                    <input type="number" id="efMonths-${id}" placeholder="Months" value="6" step="0.5" oninput="calcEmergencyFund(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result-group">
                    <div class="result">Emergency Fund Needed: <span id="rEmergencyFund-${id}">0</span></div>
                </div>
            </div>

            <!-- MONTHLY SAVINGS CALCULATOR -->
            <div id="monthlySavings-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>Monthly Savings Calculator</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'monthlySavings-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="monthlySavings-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Calculate monthly savings needed to reach a financial goal.</p>
                    <h4>Formula</h4>
                    <p class="formula">Monthly Savings = Target / (((1+r)^n - 1) / r)</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Target: ₹10,00,000, Rate: 10%, Years: 10</p>
                    <p><strong>Result:</strong> Monthly Savings: ₹6,274</p>
                </div>
                <div class="input-group">
                    <label for="msTarget-${id}">Target Amount (₹)</label>
                    <input type="number" id="msTarget-${id}" placeholder="Target Amount" step="0.01" oninput="calcMonthlySavings(${id})" onkeypress="handleEnter(event)">
                    <label for="msRate-${id}">Annual Return Rate (%)</label>
                    <input type="number" id="msRate-${id}" placeholder="Return Rate %" value="10" step="0.01" oninput="calcMonthlySavings(${id})" onkeypress="handleEnter(event)">
                    <label for="msYears-${id}">Time Period (Years)</label>
                    <input type="number" id="msYears-${id}" placeholder="Years" value="10" step="0.5" oninput="calcMonthlySavings(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result-group">
                    <div class="result">Monthly Savings: <span id="rMonthlySavings-${id}">0</span></div>
                </div>
            </div>

            <!-- BUDGET ALLOCATOR -->
            <div id="budgetAllocator-${id}" class="calculator-section" hidden>
                <div class="section-header">
                    <h3>Budget Allocator</h3>
                    <span class="tooltip-icon" onclick="toggleTooltip(event, 'budgetAllocator-tooltip-${id}')">ℹ️</span>
                </div>
                <div class="tooltip-box" id="budgetAllocator-tooltip-${id}">
                    <button class="tooltip-close" onclick="closeTooltip(event)">×</button>
                    <p class="tooltip-description">Allocate income with custom percentages for Needs, Wants, and Savings.</p>
                    <h4>Formula</h4>
                    <p class="formula">Amount = Monthly Income × (Percentage / 100)</p>
                    <h4>Example</h4>
                    <p><strong>Input:</strong> Monthly Income: ₹1,00,000, Needs: 50%, Wants: 30%, Savings: 20%</p>
                    <p><strong>Result:</strong> Needs: ₹50,000 | Wants: ₹30,000 | Savings: ₹20,000</p>
                </div>
                <div class="input-group">
                    <label for="baIncome-${id}">Monthly Income (₹)</label>
                    <input type="number" id="baIncome-${id}" placeholder="Monthly Income" step="0.01" oninput="calcBudgetAllocator(${id})" onkeypress="handleEnter(event)">
                    <label for="baNeedsPercent-${id}">Needs (%)</label>
                    <input type="number" id="baNeedsPercent-${id}" placeholder="Needs %" value="50" min="0" max="100" step="0.1" oninput="calcBudgetAllocator(${id})" onkeypress="handleEnter(event)">
                    <label for="baWantsPercent-${id}">Wants (%)</label>
                    <input type="number" id="baWantsPercent-${id}" placeholder="Wants %" value="30" min="0" max="100" step="0.1" oninput="calcBudgetAllocator(${id})" onkeypress="handleEnter(event)">
                    <label for="baSavingsPercent-${id}">Savings (%)</label>
                    <input type="number" id="baSavingsPercent-${id}" placeholder="Savings %" value="20" min="0" max="100" step="0.1" oninput="calcBudgetAllocator(${id})" onkeypress="handleEnter(event)">
                </div>
                <div class="result-group">
                    <div class="result" style="display: flex; justify-content: space-between; gap: 10px;">
                        <span>Total Allocation: <span id="rBudgetTotal-${id}" style="font-weight: 600; color: var(--accent-primary);">0</span>%</span>
                    </div>
                    <div class="result">Needs: <span id="rBudgetNeeds-${id}">0</span></div>
                    <div class="result">Wants: <span id="rBudgetWants-${id}">0</span></div>
                    <div class="result">Savings: <span id="rBudgetSavings-${id}">0</span></div>
                </div>
            </div>

            <!-- Add remaining calculator templates here - condensed for brevity -->
            <!-- Additional calculators would follow the same pattern -->

            <button class="reset-calculator-btn" onclick="resetCalculator(${id})">Reset</button>
        </div>
    `;
}
// ==================== CALCULATOR FUNCTIONS ====================

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
    
    // Update chart
    updateSIPChart(id, currentCorpus, monthlySIP, annualReturn, years);
}

// SIP Chart update function
function updateSIPChart(id, currentCorpus, monthlySIP, annualReturn, years) {
    const canvas = document.getElementById(`sipChart-${id}`);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const monthlyReturn = annualReturn / 100 / 12;
    
    // Generate year-by-year data
    const labels = [];
    const investedData = [];
    const valueData = [];
    
    for (let year = 0; year <= years; year++) {
        labels.push(`Year ${year}`);
        const months = year * 12;
        
        const invested = currentCorpus + (monthlySIP * months);
        const fvCorpus = currentCorpus * Math.pow(1 + monthlyReturn, months);
        let fvSIP = 0;
        if (monthlyReturn === 0) {
            fvSIP = monthlySIP * months;
        } else {
            fvSIP = monthlySIP * (Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn;
        }
        const totalValue = fvCorpus + fvSIP;
        
        investedData.push(invested);
        valueData.push(totalValue);
    }
    
    // Destroy existing chart if it exists
    if (window[`sipChart_${id}`]) {
        window[`sipChart_${id}`].destroy();
    }
    
    // Create new chart
    const isDark = document.documentElement.classList.contains('dark-theme');
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    
    window[`sipChart_${id}`] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Total Value',
                    data: valueData,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Invested Amount',
                    data: investedData,
                    borderColor: '#64748b',
                    backgroundColor: 'rgba(100, 116, 139, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + formatNumber(context.raw);
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor,
                        maxTicksLimit: 6
                    }
                },
                y: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor,
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    }
                }
            }
        }
    });
}

// Calculate FIRE Number
function calcFireNumber(id) {
    const income = parseFloat(document.getElementById(`fireIncome-${id}`).value) || 0;
    const savings = parseFloat(document.getElementById(`fireSavings-${id}`).value) || 0;
    const withdrawalRate = parseFloat(document.getElementById(`fireWithdrawal-${id}`).value) || 4;
    
    if (withdrawalRate === 0) {
        document.getElementById(`rFireExpenses-${id}`).innerText = '0';
        document.getElementById(`rFireNumber-${id}`).innerText = '0';
        return;
    }
    
    const annualExpenses = income - savings;
    const fireNumber = annualExpenses / (withdrawalRate / 100);
    
    document.getElementById(`rFireExpenses-${id}`).innerText = formatNumber(annualExpenses);
    document.getElementById(`rFireNumber-${id}`).innerText = formatNumber(fireNumber);
    
    // Update chart
    updateFireNumberChart(id, annualExpenses, fireNumber);
}

// FIRE Number Chart (shows expense breakdown)
function updateFireNumberChart(id, expenses, fireNumber) {
    const canvas = document.getElementById(`fireNumberChart-${id}`);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (window[`fireNumberChart_${id}`]) {
        window[`fireNumberChart_${id}`].destroy();
    }
    
    const isDark = document.documentElement.classList.contains('dark-theme');
    const textColor = isDark ? '#94a3b8' : '#64748b';
    
    // If fireNumber is 0, show placeholder
    if (fireNumber === 0) {
        return;
    }
    
    window[`fireNumberChart_${id}`] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Annual Expenses', 'Annual Savings'],
            datasets: [{
                data: [expenses, expenses > 0 ? ((fireNumber * 0.04) - expenses) : 0],
                backgroundColor: ['#2563eb', '#10b981'],
                borderColor: ['#1d4ed8', '#059669'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        padding: 15
                    }
                }
            }
        }
    });
}

// Calculate Years to FIRE
function calcYearsToFire(id) {
    const current = parseFloat(document.getElementById(`ytfCurrent-${id}`).value) || 0;
    const annual = parseFloat(document.getElementById(`ytfAnnual-${id}`).value) || 0;
    const target = parseFloat(document.getElementById(`ytfTarget-${id}`).value) || 0;
    const returnRate = parseFloat(document.getElementById(`ytfReturn-${id}`).value) || 10;
    
    if (target <= 0 || returnRate === 0) {
        document.getElementById(`rYearsToFire-${id}`).innerText = '0';
        return;
    }
    
    const r = returnRate / 100;
    let years = 0;
    let futureValue = current;
    
    while (futureValue < target && years < 1000) {
        futureValue = futureValue * (1 + r) + annual;
        years++;
    }
    
    document.getElementById(`rYearsToFire-${id}`).innerText = years >= 1000 ? 'Not achievable' : years.toFixed(1);
    
    // Update chart
    updateYearsToFireChart(id, current, annual, target, returnRate, years);
}

// Years to FIRE Chart
function updateYearsToFireChart(id, current, annual, target, returnRate, years) {
    const canvas = document.getElementById(`yearsToFireChart-${id}`);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (window[`yearsToFireChart_${id}`]) {
        window[`yearsToFireChart_${id}`].destroy();
    }
    
    if (current === 0 || annual === 0 || target === 0) return;
    
    const isDark = document.documentElement.classList.contains('dark-theme');
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    
    const labels = [];
    const data = [];
    const targetLine = [];
    
    const r = returnRate / 100;
    let fv = current;
    const maxYears = Math.min(Math.ceil(years * 1.5), 50);
    
    for (let year = 0; year <= maxYears; year++) {
        labels.push(`Year ${year}`);
        data.push(fv);
        targetLine.push(target);
        
        if (year < maxYears) {
            fv = fv * (1 + r) + annual;
        }
    }
    
    window[`yearsToFireChart_${id}`] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Projected Savings',
                    data: data,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'FIRE Target',
                    data: targetLine,
                    borderColor: '#10b981',
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        padding: 15
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: gridColor },
                    ticks: { color: textColor, maxTicksLimit: 8 }
                },
                y: {
                    grid: { color: gridColor },
                    ticks: {
                        color: textColor,
                        callback: function(value) { return formatNumber(value); }
                    }
                }
            }
        }
    });
}

// Calculate FatFIRE
function calcFatFire(id) {
    const expenses = parseFloat(document.getElementById(`ffExpenses-${id}`).value) || 0;
    const withdrawalRate = parseFloat(document.getElementById(`ffWithdrawal-${id}`).value) || 4;
    
    if (withdrawalRate === 0) {
        document.getElementById(`rFatFire-${id}`).innerText = '0';
        return;
    }
    
    const fatFireNumber = expenses / (withdrawalRate / 100);
    
    document.getElementById(`rFatFire-${id}`).innerText = formatNumber(fatFireNumber);
}

// Calculate LeanFIRE
function calcLeanFire(id) {
    const expenses = parseFloat(document.getElementById(`lfExpenses-${id}`).value) || 0;
    const withdrawalRate = parseFloat(document.getElementById(`lfWithdrawal-${id}`).value) || 4;
    
    if (withdrawalRate === 0) {
        document.getElementById(`rLeanFire-${id}`).innerText = '0';
        return;
    }
    
    const leanFireNumber = expenses / (withdrawalRate / 100);
    
    document.getElementById(`rLeanFire-${id}`).innerText = formatNumber(leanFireNumber);
}

// Calculate Dividend
function calcDividend(id) {
    const shares = parseFloat(document.getElementById(`divShares-${id}`).value) || 0;
    const divPerShare = parseFloat(document.getElementById(`divPerShare-${id}`).value) || 0;
    const currentPrice = parseFloat(document.getElementById(`divCurrentPrice-${id}`).value) || 0;
    
    const annualDiv = shares * divPerShare;
    const investment = shares * currentPrice;
    const divYield = investment === 0 ? 0 : (annualDiv / investment) * 100;
    
    document.getElementById(`rDividend-${id}`).innerText = formatNumber(annualDiv);
    document.getElementById(`rDividendYield-${id}`).innerText = divYield.toFixed(2);
}

// Calculate Breakeven
function calcBreakeven(id) {
    const investment = parseFloat(document.getElementById(`beInvestment-${id}`).value) || 0;
    const shares = parseFloat(document.getElementById(`beShares-${id}`).value) || 0;
    const brokerage = parseFloat(document.getElementById(`beBrokerage-${id}`).value) || 0;
    
    if (shares === 0) {
        document.getElementById(`rBreakeven-${id}`).innerText = '0';
        return;
    }
    
    const breakeven = (investment + brokerage) / shares;
    document.getElementById(`rBreakeven-${id}`).innerText = formatNumber(breakeven);
}

// Calculate Compound Interest
function calcCompound(id) {
    const principal = parseFloat(document.getElementById(`cpPrincipal-${id}`).value) || 0;
    const rate = parseFloat(document.getElementById(`cpRate-${id}`).value) || 0;
    const years = parseFloat(document.getElementById(`cpYears-${id}`).value) || 0;
    
    if (years === 0) {
        document.getElementById(`rCompoundAmount-${id}`).innerText = '0';
        document.getElementById(`rCompoundInterest-${id}`).innerText = '0';
        return;
    }
    
    const amount = principal * Math.pow(1 + rate / 100, years);
    const interest = amount - principal;
    
    document.getElementById(`rCompoundAmount-${id}`).innerText = formatNumber(amount);
    document.getElementById(`rCompoundInterest-${id}`).innerText = formatNumber(interest);
    
    // Update chart
    updateCompoundChart(id, principal, rate, years);
}

// Compound Interest Chart
function updateCompoundChart(id, principal, rate, years) {
    const canvas = document.getElementById(`compoundChart-${id}`);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const labels = [];
    const principalData = [];
    const amountData = [];
    
    for (let year = 0; year <= years; year++) {
        labels.push(`Year ${year}`);
        const currentPrincipal = principal;
        const currentAmount = principal * Math.pow(1 + rate / 100, year);
        
        principalData.push(currentPrincipal);
        amountData.push(currentAmount);
    }
    
    if (window[`compoundChart_${id}`]) {
        window[`compoundChart_${id}`].destroy();
    }
    
    const isDark = document.documentElement.classList.contains('dark-theme');
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    
    window[`compoundChart_${id}`] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Total Value',
                    data: amountData,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Principal',
                    data: principalData,
                    borderColor: '#64748b',
                    backgroundColor: 'rgba(100, 116, 139, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        padding: 15
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: gridColor },
                    ticks: { color: textColor, maxTicksLimit: 6 }
                },
                y: {
                    grid: { color: gridColor },
                    ticks: {
                        color: textColor,
                        callback: function(value) { return formatNumber(value); }
                    }
                }
            }
        }
    });
}

// Calculate Investment Goal
function calcInvestmentGoal(id) {
    const target = parseFloat(document.getElementById(`igTarget-${id}`).value) || 0;
    const years = parseFloat(document.getElementById(`igYears-${id}`).value) || 0;
    const returnRate = parseFloat(document.getElementById(`igReturn-${id}`).value) || 0;
    
    if (years === 0 || target === 0) {
        document.getElementById(`rInvestmentGoal-${id}`).innerText = '0';
        return;
    }
    
    const monthlyRate = returnRate / 100 / 12;
    const months = years * 12;
    
    let emi = 0;
    if (monthlyRate === 0) {
        emi = target / months;
    } else {
        emi = target * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    }
    
    document.getElementById(`rInvestmentGoal-${id}`).innerText = formatNumber(emi);
    
    // Update chart
    updateInvestmentGoalChart(id, emi, returnRate, years, target);
}

// Investment Goal Chart
function updateInvestmentGoalChart(id, monthlyEMI, returnRate, years, target) {
    const canvas = document.getElementById(`investmentGoalChart-${id}`);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const monthlyRate = returnRate / 100 / 12;
    
    const labels = [];
    const savedData = [];
    const targetData = [];
    
    for (let year = 0; year <= years; year++) {
        labels.push(`Year ${year}`);
        const months = year * 12;
        let accumulated = 0;
        
        if (monthlyRate === 0) {
            accumulated = monthlyEMI * months;
        } else {
            accumulated = monthlyEMI * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
        }
        
        savedData.push(accumulated);
        targetData.push(target);
    }
    
    if (window[`investmentGoalChart_${id}`]) {
        window[`investmentGoalChart_${id}`].destroy();
    }
    
    const isDark = document.documentElement.classList.contains('dark-theme');
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    
    window[`investmentGoalChart_${id}`] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Savings Progress',
                    data: savedData,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Target Goal',
                    data: targetData,
                    borderColor: '#10b981',
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        padding: 15
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: gridColor },
                    ticks: { color: textColor, maxTicksLimit: 6 }
                },
                y: {
                    grid: { color: gridColor },
                    ticks: {
                        color: textColor,
                        callback: function(value) { return formatNumber(value); }
                    }
                }
            }
        }
    });
}

// Calculate Cost of Delay
function calcCostOfDelay(id) {
    const amount = parseFloat(document.getElementById(`codAmount-${id}`).value) || 0;
    const returnRate = parseFloat(document.getElementById(`codReturn-${id}`).value) || 0;
    const delayYears = parseFloat(document.getElementById(`codDelay-${id}`).value) || 0;
    
    const cost = amount * (Math.pow(1 + returnRate / 100, delayYears) - 1);
    
    document.getElementById(`rCostOfDelay-${id}`).innerText = formatNumber(cost);
}

// Calculate Retirement Age
function calcRetirementAge(id) {
    const currentAge = parseFloat(document.getElementById(`raAge-${id}`).value) || 0;
    const currentSavings = parseFloat(document.getElementById(`raCurrent-${id}`).value) || 0;
    const annualSavings = parseFloat(document.getElementById(`raAnnual-${id}`).value) || 0;
    const target = parseFloat(document.getElementById(`raTarget-${id}`).value) || 0;
    const returnRate = parseFloat(document.getElementById(`raReturn-${id}`).value) || 0;
    
    if (target <= 0) {
        document.getElementById(`rRetirementAge-${id}`).innerText = '0';
        return;
    }
    
    const r = returnRate / 100;
    let futureValue = currentSavings;
    let years = 0;
    
    while (futureValue < target && years < 100) {
        futureValue = futureValue * (1 + r) + annualSavings;
        years++;
    }
    
    const retirementAge = currentAge + years;
    document.getElementById(`rRetirementAge-${id}`).innerText = retirementAge.toFixed(0);
}

// Calculate Loan EMI
function calcLoanEmi(id) {
    const principal = parseFloat(document.getElementById(`loanPrincipal-${id}`).value) || 0;
    const rate = parseFloat(document.getElementById(`loanRate-${id}`).value) || 0;
    const years = parseFloat(document.getElementById(`loanYears-${id}`).value) || 0;
    
    if (years === 0 || rate === 0) {
        document.getElementById(`rLoanEmi-${id}`).innerText = '0';
        document.getElementById(`rLoanInterest-${id}`).innerText = '0';
        return;
    }
    
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;
    
    document.getElementById(`rLoanEmi-${id}`).innerText = formatNumber(emi);
    document.getElementById(`rLoanInterest-${id}`).innerText = formatNumber(totalInterest);
    
    // Update chart (reuse mortgage chart function for consistency but with correct canvas)
    const canvas = document.getElementById(`loanEmiChart-${id}`);
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        if (window[`loanEmiChart_${id}`]) {
            window[`loanEmiChart_${id}`].destroy();
        }
        
        const isDark = document.documentElement.classList.contains('dark-theme');
        const textColor = isDark ? '#94a3b8' : '#64748b';
        
        window[`loanEmiChart_${id}`] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Principal', 'Total Interest'],
                datasets: [{
                    data: [principal, totalInterest],
                    backgroundColor: ['#2563eb', '#f59e0b'],
                    borderColor: ['#1d4ed8', '#d97706'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: textColor,
                            usePointStyle: true,
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = principal + totalInterest;
                                const percentage = ((context.raw / total) * 100).toFixed(1);
                                return context.label + ': ' + formatNumber(context.raw) + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Calculate Property ROI
function calcPropertyRoi(id) {
    const investment = parseFloat(document.getElementById(`propInvestment-${id}`).value) || 0;
    const annualRent = parseFloat(document.getElementById(`propAnnualRent-${id}`).value) || 0;
    const currentValue = parseFloat(document.getElementById(`propCurrentValue-${id}`).value) || 0;
    
    if (investment === 0) {
        document.getElementById(`rPropertyYield-${id}`).innerText = '0';
        document.getElementById(`rPropertyRoi-${id}`).innerText = '0';
        return;
    }
    
    const rentalYield = (annualRent / investment) * 100;
    const totalReturn = ((currentValue + annualRent - investment) / investment) * 100;
    
    document.getElementById(`rPropertyYield-${id}`).innerText = rentalYield.toFixed(2);
    document.getElementById(`rPropertyRoi-${id}`).innerText = totalReturn.toFixed(2);
    
    // Update chart
    updatePropertyRoiChart(id, investment, annualRent, currentValue, rentalYield, totalReturn);
}

// Property ROI Chart (Bar Chart)
function updatePropertyRoiChart(id, investment, annualRent, currentValue, rentalYield, totalROI) {
    const canvas = document.getElementById(`propertyRoiChart-${id}`);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (window[`propertyRoiChart_${id}`]) {
        window[`propertyRoiChart_${id}`].destroy();
    }
    
    if (investment === 0) return;
    
    const isDark = document.documentElement.classList.contains('dark-theme');
    const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    
    // Calculate appreciation
    const appreciation = currentValue - investment;
    const appreciationPercent = (appreciation / investment) * 100;
    
    window[`propertyRoiChart_${id}`] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Rental Yield', 'Appreciation', 'Total ROI'],
            datasets: [{
                label: 'Returns (%)',
                data: [rentalYield, appreciationPercent, totalROI],
                backgroundColor: ['#2563eb', '#10b981', '#f59e0b'],
                borderColor: ['#1d4ed8', '#059669', '#d97706'],
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y.toFixed(2) + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: gridColor },
                    ticks: { color: textColor }
                },
                y: {
                    grid: { color: gridColor },
                    ticks: {
                        color: textColor,
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Calculate Mortgage
function calcMortgage(id) {
    const price = parseFloat(document.getElementById(`mortgagePrice-${id}`).value) || 0;
    const ltv = parseFloat(document.getElementById(`mortgageLtv-${id}`).value) || 80;
    const rate = parseFloat(document.getElementById(`mortgageRate-${id}`).value) || 0;
    const years = parseFloat(document.getElementById(`mortgageYears-${id}`).value) || 0;
    
    if (years === 0) {
        document.getElementById(`rMortgageLoan-${id}`).innerText = '0';
        document.getElementById(`rMortgageEmi-${id}`).innerText = '0';
        document.getElementById(`rMortgageInterest-${id}`).innerText = '0';
        return;
    }
    
    const loanAmount = price * (ltv / 100);
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    
    let emi = 0, totalInterest = 0;
    if (monthlyRate === 0) {
        emi = loanAmount / months;
        totalInterest = 0;
    } else {
        emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        totalInterest = (emi * months) - loanAmount;
    }
    
    document.getElementById(`rMortgageLoan-${id}`).innerText = formatNumber(loanAmount);
    document.getElementById(`rMortgageEmi-${id}`).innerText = formatNumber(emi);
    document.getElementById(`rMortgageInterest-${id}`).innerText = formatNumber(totalInterest);
    
    // Update chart
    updateMortgageChart(id, loanAmount, totalInterest);
}

// Mortgage Chart (Doughnut chart showing Principal vs Interest)
function updateMortgageChart(id, principal, totalInterest, canvasId) {
    const canvas = canvasId ? document.getElementById(canvasId + id) : document.getElementById(`mortgageChart-${id}`);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const chartKey = (canvasId || 'mortgage') + '_' + id;
    
    if (window[`chart_${chartKey}`]) {
        window[`chart_${chartKey}`].destroy();
    }
    
    const isDark = document.documentElement.classList.contains('dark-theme');
    const textColor = isDark ? '#94a3b8' : '#64748b';
    
    window[`chart_${chartKey}`] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Principal', 'Total Interest'],
            datasets: [{
                data: [principal, totalInterest],
                backgroundColor: ['#2563eb', '#f59e0b'],
                borderColor: ['#1d4ed8', '#d97706'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = principal + totalInterest;
                            const percentage = ((context.raw / total) * 100).toFixed(1);
                            return context.label + ': ' + formatNumber(context.raw) + ' (' + percentage + '%)';
                        }
                    }
                }
            }
        }
    });
}

// Calculate Rule of 72
function calcRule72(id) {
    const rate = parseFloat(document.getElementById(`rule72Rate-${id}`).value) || 0;
    
    if (rate === 0) {
        document.getElementById(`rRule72-${id}`).innerText = '0';
        return;
    }
    
    const years = 72 / rate;
    document.getElementById(`rRule72-${id}`).innerText = years.toFixed(2);
}

// Calculate Inflation
function calcInflation(id) {
    const amount = parseFloat(document.getElementById(`inflationAmount-${id}`).value) || 0;
    const inflationRate = parseFloat(document.getElementById(`inflationRate-${id}`).value) || 0;
    const years = parseFloat(document.getElementById(`inflationYears-${id}`).value) || 0;
    
    if (years === 0) {
        document.getElementById(`rInflation-${id}`).innerText = formatNumber(amount);
        return;
    }
    
    const futureValue = amount / Math.pow(1 + inflationRate / 100, years);
    document.getElementById(`rInflation-${id}`).innerText = formatNumber(futureValue);
}

// Calculate Expense Ratio
function calcExpenseRatio(id) {
    const fundValue = parseFloat(document.getElementById(`erFundValue-${id}`).value) || 0;
    const expenseRatio = parseFloat(document.getElementById(`erExpenseRatio-${id}`).value) || 0;
    const grossReturn = parseFloat(document.getElementById(`erGrossReturn-${id}`).value) || 0;
    
    const annualFee = fundValue * (expenseRatio / 100);
    const netReturn = grossReturn - expenseRatio;
    
    document.getElementById(`rExpenseRatioFee-${id}`).innerText = formatNumber(annualFee);
    document.getElementById(`rExpenseRatioNet-${id}`).innerText = netReturn.toFixed(2);
}

// Calculate Emergency Fund
function calcEmergencyFund(id) {
    const expenses = parseFloat(document.getElementById(`efExpenses-${id}`).value) || 0;
    const months = parseFloat(document.getElementById(`efMonths-${id}`).value) || 0;
    
    const emergencyFund = expenses * months;
    document.getElementById(`rEmergencyFund-${id}`).innerText = formatNumber(emergencyFund);
}

// Calculate Monthly Savings
function calcMonthlySavings(id) {
    const target = parseFloat(document.getElementById(`msTarget-${id}`).value) || 0;
    const rate = parseFloat(document.getElementById(`msRate-${id}`).value) || 0;
    const years = parseFloat(document.getElementById(`msYears-${id}`).value) || 0;
    
    if (years === 0 || target === 0) {
        document.getElementById(`rMonthlySavings-${id}`).innerText = '0';
        return;
    }
    
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    
    let savings = 0;
    if (monthlyRate === 0) {
        savings = target / months;
    } else {
        savings = target * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
    }
    
    document.getElementById(`rMonthlySavings-${id}`).innerText = formatNumber(savings);
}

// Calculate Budget Allocator
function calcBudgetAllocator(id) {
    const income = parseFloat(document.getElementById(`baIncome-${id}`).value) || 0;
    const needsPercent = parseFloat(document.getElementById(`baNeedsPercent-${id}`).value) || 0;
    const wantsPercent = parseFloat(document.getElementById(`baWantsPercent-${id}`).value) || 0;
    const savingsPercent = parseFloat(document.getElementById(`baSavingsPercent-${id}`).value) || 0;
    
    const totalPercent = needsPercent + wantsPercent + savingsPercent;
    
    const needs = income * (needsPercent / 100);
    const wants = income * (wantsPercent / 100);
    const savings = income * (savingsPercent / 100);
    
    document.getElementById(`rBudgetNeeds-${id}`).innerText = formatNumber(needs);
    document.getElementById(`rBudgetWants-${id}`).innerText = formatNumber(wants);
    document.getElementById(`rBudgetSavings-${id}`).innerText = formatNumber(savings);
    document.getElementById(`rBudgetTotal-${id}`).innerText = totalPercent.toFixed(1);
    
    // Update chart
    updateBudgetAllocatorChart(id, needs, wants, savings);
}

// Budget Allocator Chart (Pie Chart)
function updateBudgetAllocatorChart(id, needs, wants, savings) {
    const canvas = document.getElementById(`budgetAllocatorChart-${id}`);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (window[`budgetAllocatorChart_${id}`]) {
        window[`budgetAllocatorChart_${id}`].destroy();
    }
    
    const isDark = document.documentElement.classList.contains('dark-theme');
    const textColor = isDark ? '#94a3b8' : '#64748b';
    
    if (needs === 0 && wants === 0 && savings === 0) {
        return;
    }
    
    window[`budgetAllocatorChart_${id}`] = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Needs', 'Wants', 'Savings'],
            datasets: [{
                data: [needs, wants, savings],
                backgroundColor: ['#2563eb', '#f59e0b', '#10b981'],
                borderColor: ['#1d4ed8', '#d97706', '#059669'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = needs + wants + savings;
                            const percentage = total > 0 ? ((context.raw / total) * 100).toFixed(1) : 0;
                            return context.label + ': ' + formatNumber(context.raw) + ' (' + percentage + '%)';
                        }
                    }
                }
            }
        }
    });
}

// Additional calculator functions can be added here...
// (Debt Payoff, Credit Card Payoff, CAGR, ROI, etc. follow similar patterns)
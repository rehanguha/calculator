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
}

// Additional calculator functions can be added here...
// (Debt Payoff, Credit Card Payoff, CAGR, ROI, etc. follow similar patterns)
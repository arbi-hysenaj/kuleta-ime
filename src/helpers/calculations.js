export const calculateTotalWorth = (transactions) =>{
    let total = 0, totalInvested = 0;
    transactions.forEach(element => { 
        total += (element.currentPrice * element.amount)
        totalInvested += (element.purchasePrice * element.amount)
    }); 
    return {total, totalInvested};
    
}

export const calculatePnL = (total, totalInvested) =>{
    if(!total && !totalInvested) return 0;
    return ((total-totalInvested)/ totalInvested ) *100; 
}

export const calculatePnLDollars = (total, totalInvested) => {
    return (total - totalInvested);
}
export const calculateTotalWorth = (transactions, currentValue = 0, worth = 0,currentPrice) =>{
    
    transactions.forEach(element => { 
        if(element.type === 'buy'){
            currentPrice = element.currentPrice;
            currentValue += (element.currentPrice * element.amount);
            worth += (element.purchasePrice * element.amount);

        }else{
            currentValue -= (element.currentPrice * element.amount);
            worth -= (element.purchasePrice * element.amount);
        }            
    }); 
    return {currentValue, worth,currentPrice};
}

export const calculatePnL = (currentValue, worth) =>{
    if(!currentValue && !worth) return 0;
    if(currentValue<0){
        return (currentValue);
    }
        return ((currentValue-worth)/ worth ) *100; 
}
    
export const calculatePnLDollars = (currentValue, worth) => {
    return (currentValue - worth);
}
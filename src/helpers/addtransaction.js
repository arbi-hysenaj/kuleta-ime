const buyButton = document.querySelector("#buy");
const sellButton = document.querySelector("#sell");


const updateTransactions = () => {
    const transactions = [{
        id: 1,
        walletId: 1,
        type: 'buy',
        coin: 'btc',
        buyPrice: 10000,
        amount: 1,
    }]   
    
 storage.setItem('transactions', JSON.stringify(transactions))
}

buyButton.addEventListener("click", () => {
    if(sellButton.classList.contains("active")){
        sellButton.classList.remove("active")
    } 
    buyButton.classList.add("active")
})

sellButton.addEventListener("click", ()=>{
    if(buyButton.classList.contains("active")){
        buyButton.classList.remove("active")
    } 
    sellButton.classList.add("active")
})

const addTransactionButton = document.querySelector(".add-transaction li");
addTransactionButton.addEventListener("click", ()=>{
    document.querySelector(".transaction-popup").classList.add("show")
})

const buttonCancelTransaction = document.querySelector(".btn-cancel-transaction");
buttonCancelTransaction.addEventListener("click", () => {
    document.querySelector(".transaction-popup").classList.remove("show");
})
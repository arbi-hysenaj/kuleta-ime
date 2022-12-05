import {coins} from "./coins.js"

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


const coinResults = document.querySelector(".results-coinlist");
const coinSearch = document.querySelector("#coin-search");

const render = (query = "") => {
    const cleanedupQuery = query.trim().toLowerCase();
    const filtered = coins.filter(item => item.coin.toLowerCase().includes(cleanedupQuery));

    coinResults.innerHTML = "";
    filtered.forEach(item =>{
        coinResults.insertAdjacentHTML("beforeend", `<li>${item.coin}</li>`)
    });
}

coinSearch.addEventListener("keyup", ()=>{
    if(coinSearch.value.length>0){
    document.querySelector(".results-coinlist").classList.add("show");
    render(coinSearch.value);}
    else{document.querySelector(".results-coinlist").classList.remove("show");
    document.querySelector(".results-coinlist").innerHTML="";
    }
});


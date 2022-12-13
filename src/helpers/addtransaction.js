const buyButton = document.querySelector("#buy");
const sellButton = document.querySelector("#sell");
let storage = window.localStorage;
let transactionStorage = storage.getItem('transactions');

import autocomplete from "/src/helpers/autocomplete.js"
import {coins} from "/src/helpers/coins.js"
autocomplete(document.getElementById("search-coin"), coins);   

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

const updateTransactions = (transaction) => {
    if(!transactionStorage){
        transactionStorage= [transaction]
    }else{
        transactionStorage = JSON.parse(transactionStorage);
        transactionStorage.push(transaction)
    }
    transactionStorage = JSON.stringify(transactionStorage);
    storage.setItem('transactions', transactionStorage)
    let event = new Event('transactionInserted');
    document.dispatchEvent(event);
}

const saveButton = document.querySelector("#new-transaction");
saveButton.addEventListener("submit", event => {
    event.preventDefault();
    const type = document.querySelector(".transaction-buttons .active").id;    
    const purchasePrice = document.querySelector("#purchase-price").value;
    const walletId = document.querySelector("#portfolio-dropdown").value;
    const coin = document.querySelector("#search-coin").value;
    const amount = JSON.parse(document.querySelector("#amount").value);
    const transaction = {
        walletId,
        type,
        coin,
        purchasePrice,
        amount
    }
    updateTransactions(transaction);
    document.querySelector(".transaction-popup").classList.remove("show");
    document.querySelector("#amount").value = "";        
    document.querySelector("#purchase-price").value = "";  
    document.querySelector("#search-coin").value = "";    
 
})

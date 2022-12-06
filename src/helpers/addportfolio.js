let storage = window.localStorage;
let portfolioStorage = JSON.parse(storage.getItem('portfolios'));
let transactionStorage = JSON.parse(storage.getItem('transactions'));
import { calculatePnL, calculateTotalWorth } from "./calculations.js";
import {getCoin} from "/src/helpers/fetches.js";

const addPortofolioButton = document.querySelector(".btn-list");
const popup = document.querySelector(".bg-popup");
const addPortfolioForm = document.querySelector("#new-portfolio");
const assetList = document.querySelector("#asset-list");
const portfolioDropdown = document.querySelector("#portfolio-dropdown");

document.addEventListener('transactionInserted', ()=> {
  transactionStorage = JSON.parse(storage.getItem('transactions'));
})

addPortofolioButton.addEventListener("click", ()=> {
    popup.classList.add("show");
    document.querySelector("#portfolio-name").value = "";

 })

const buttonCancel = document.querySelector(".btn-cancel");
buttonCancel.addEventListener("click", () => {
    popup.classList.remove("show");
})

const updatePortfolioList = ({id , name}) => {   
    assetList.insertAdjacentHTML("beforeend",  
    `<li><img src="/src/assets/images/portfolio_icon.png" width="21px">&nbsp;&nbsp;&nbsp;<button class="portfolio-list" data-content="#${id}">${name}</button></li>`);
    portfolioDropdown.insertAdjacentHTML("beforeend", `<option value="${id}">${name}</option>`)
}

const insertPortfolios = (portfolio) => {
    if(!portfolioStorage){
      portfolioStorage = [portfolio]
    } else{ 
      portfolioStorage.push(portfolio);
    } 
    storage.setItem('portfolios' , JSON.stringify(portfolioStorage));
}

if(portfolioStorage){
    portfolioStorage.forEach(portfolio => {
        updatePortfolioList(portfolio)
    })
}

const filterTransactions = (walletId) => {
 return transactionStorage.filter(transaction => transaction.walletId === walletId.toLowerCase())

}

const updatePortfolioData = () => {
const currentPortfolio = document.querySelector(".portfolio-list.active").innerHTML;
const walletTransactions = filterTransactions(currentPortfolio)
console.log(getCoin);
let updatedTransaction = walletTransactions.map(item => {
   item.currentPrice = getCoin(item.coin.toLowerCase()).current_price;
   return item;
  })
console.log(calculateTotalWorth(updatedTransaction));
let totalWorthElement = document.querySelector("#total-worth");
let allPLElement = document.querySelector("#all-pl");
let {total, totalInvested} = calculateTotalWorth(updatedTransaction)
totalWorthElement.innerHTML= Math.round(total * 100)/ 100 + "$";
allPLElement.innerHTML = Math.round(calculatePnL(total, totalInvested)*100) /100 + "%";

}



const checkList = () =>{
    const portfoliosList = document.querySelectorAll(".portfolios-list .portfolio-list");
    portfoliosList.forEach(portfolioList => {
        portfolioList.addEventListener("click", event => {
            document.querySelector(".portfolio-list.active").classList.remove("active");
            event.currentTarget.classList.add("active")
            updatePortfolioData();
        })
    })
  }


addPortfolioForm.addEventListener("submit", event => {
    event.preventDefault();
    const portfolioName = document.querySelector("#portfolio-name").value;
    const portfolio = {id: portfolioName.toLowerCase() , name: portfolioName}
    updatePortfolioList(portfolio);
    insertPortfolios(portfolio);
    checkList();
    document.querySelector(".bg-popup").classList.remove("show");    
})

checkList();
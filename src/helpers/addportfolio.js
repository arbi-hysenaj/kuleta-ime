let storage = window.localStorage;
let portfolioStorage = JSON.parse(storage.getItem('portfolios'));
let transactionStorage = JSON.parse(storage.getItem('transactions'));
import { calculatePnL, calculatePnLDollars, calculateTotalWorth } from "./calculations.js";
import {getCoin, fetchData, setBoxColor} from "/src/helpers/fetches.js";

const addPortofolioButton = document.querySelector(".add-portfolio-btn");
const popup = document.querySelector(".bg-popup");
const addPortfolioForm = document.querySelector("#new-portfolio");
const assetList = document.querySelector("#asset-list");
const portfolioDropdown = document.querySelector("#portfolio-dropdown");

document.addEventListener('transactionInserted', ()=> {
  transactionStorage = JSON.parse(storage.getItem('transactions'));
  updatePortfolioData();
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
    `<li><img src="/src/assets/images/portfolio_icon.png" width="21px">&nbsp;&nbsp;&nbsp;<button class="portfolio-list" id="${id}">${name}</button></li>`);
    portfolioDropdown.insertAdjacentHTML("beforeend", `<option value="${id}">${name}</option>`);
}

const insertPortfolios = (portfolio) => {
  if(!portfolioStorage){
    portfolioStorage = [portfolio]
  }else{ 
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
  if(!transactionStorage) return [];
  if(walletId === 'all-assets') return transactionStorage;
  return transactionStorage.filter(transaction => transaction.walletId === walletId.toLowerCase());
}

await fetchData();

const updatePortfolioData = () => {
  const currentPortfolio = document.querySelector(".portfolio-list.active").id;
  const walletTransactions = filterTransactions(currentPortfolio);

  let updatedTransaction = walletTransactions.map((item) => {
    const {current_price, image} = getCoin(item.coin.toLowerCase());
    item.currentPrice = current_price;
    item.image = image;
    return item;
  })     

  let totalWorthElement = document.querySelector("#total-worth");
  let allPLElement = document.querySelector("#all-pl-percentage");
  let allPLDollarsElement = document.querySelector("#all-pl-dollar");
  let {currentValue, worth} = calculateTotalWorth(updatedTransaction);
  let allPLEValue = Math.round(calculatePnL(currentValue, worth)*100) /100;
  let allPLDollarsValue =  Math.round(calculatePnLDollars(currentValue, worth) * 100)/100;  

  totalWorthElement.innerHTML= Math.round(currentValue * 100)/ 100 + "$";
  allPLElement.innerHTML = allPLEValue + "%" ;
  setBoxColor(allPLElement, allPLEValue, true);  
  setBoxColor(allPLDollarsElement, allPLDollarsValue);
  allPLDollarsElement.innerHTML = allPLDollarsValue + "$";
  updateHoldingsTable(mergeTransactionByCoin(updatedTransaction));
}

const mergeTransactionByCoin = (transactions)=>{
  let holdings = [];
  transactions.forEach(transaction => {
    let foundHolding = holdings.find(holding => holding.coin === transaction.coin);
    if(foundHolding){
      const {currentValue, worth,currentPrice} = calculateTotalWorth([transaction], foundHolding.currentValue, foundHolding.worth, foundHolding.currentPrice)
      if(transaction.type === 'buy'){
        foundHolding.amount += transaction.amount;
        foundHolding.worth = worth;
      }else{
        foundHolding.amount -= transaction.amount;
      }
        foundHolding.currentValue = currentValue;
        foundHolding.currentPrice = currentPrice;
        foundHolding.allTImePnLDollars = Math.round(calculatePnLDollars(currentValue, worth) * 100)/100;  
        foundHolding.allTimePnL = Math.round(calculatePnL(currentValue, worth)*100) /100;
    }else{
      const {currentValue, worth} = calculateTotalWorth([transaction])

      holdings.push({
        image: transaction.image,
        coin: transaction.coin,
        amount: transaction.amount,
        worth,
        currentPrice: transaction.currentPrice,
        currentValue,
        allTImePnLDollars: calculatePnLDollars(currentValue, worth),
        allTimePnL: calculatePnL(currentValue, worth )
      });
    };
  });
  return holdings;
}

const updateHoldingsTable = (holdings) => {
  let holdingsData = document.querySelector("#holdings-data");
  holdingsData.innerHTML="";
  holdings.forEach(holding => { 
    holdingsData.insertAdjacentHTML("beforeend", 
    `<tr class="holdings-row">
    <td><div class="photoname"><img src="${holding.image}" width="26px"><div>${holding.coin}</div></div></td>
    <td>${holding.amount}</td>
    <td id="current-price">${holding.currentPrice}$</td>
    <td>${Math.round(holding.currentValue *100)/100}$</td>
    <td>${Math.round(holding.allTimePnL *100)/100} %</td>
    </tr>`)
  })
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
updatePortfolioData();
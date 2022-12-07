let storage = window.localStorage;
let portfolioStorage = JSON.parse(storage.getItem('portfolios'));
let transactionStorage = JSON.parse(storage.getItem('transactions'));
import { calculatePnL, calculatePnLDollars, calculateTotalWorth } from "./calculations.js";
import {getCoin, fetchData} from "/src/helpers/fetches.js";

const addPortofolioButton = document.querySelector(".btn-list");
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
  let {total, totalInvested} = calculateTotalWorth(updatedTransaction)
  totalWorthElement.innerHTML= Math.round(total * 100)/ 100 + "$";
  allPLElement.innerHTML = Math.round(calculatePnL(total, totalInvested)*100) /100 + "%";
  allPLDollarsElement.innerHTML = Math.round(calculatePnLDollars(total, totalInvested) * 100)/100 + "$";
  updateHoldingsTable(mergeTransactionByCoin(updatedTransaction));
}

const mergeTransactionByCoin = (transactions)=>{
  let holdings = [];
  transactions.forEach(transaction => {
    const {total, totalInvested} = calculateTotalWorth([transaction])
    let foundHolding = holdings.find(holding => holding.coin === transaction.coin);
    if(foundHolding){
      foundHolding.amount += transaction.amount;
      foundHolding.total += total;
      foundHolding.totalInvested += totalInvested;
      foundHolding.allTimePnL = calculatePnL(foundHolding.total, foundHolding.totalInvested)
    }else{
      holdings.push({
        coin: transaction.coin,
        amount: transaction.amount,
        currentPrice: transaction.currentPrice,
        image: transaction.image,
        total,
        totalInvested,
        allTimePnL: calculatePnL(total, totalInvested)
      })
    }
  }) 
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
      <td id="current-price">${holding.currentPrice}</td>
      <td>${holding.total}</td>
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
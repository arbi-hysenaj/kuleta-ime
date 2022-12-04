let storage = window.localStorage;
let portfolioStorage = storage.getItem('portfolios');
console.log(storage, 'mystorage');

const addPortofolioButton = document.querySelector(".btn-list");
const popup = document.querySelector(".bg-popup");
const addPortfolioForm = document.querySelector("#new-portfolio");
const assetList = document.querySelector("#asset-list");
const portfolioDropdown = document.querySelector("#portfolio-dropdown");

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

const updatePortfolios = (portfolio) => {
    console.log(portfolioStorage, 'kitja')
    if(!portfolioStorage){
      portfolioStorage = [portfolio]
    } else{ 
      portfolioStorage = JSON.parse(portfolioStorage);
      portfolioStorage.push(portfolio);
    }
      storage.setItem('portfolios' , JSON.stringify(portfolioStorage));
}

if(portfolioStorage){
    JSON.parse(portfolioStorage).forEach(portfolio => {
        updatePortfolioList(portfolio)
    })
}

const checkList = () =>{
    const portfoliosList = document.querySelectorAll(".portfolios-list .portfolio-list");
    portfoliosList.forEach(portfolioList => {
        portfolioList.addEventListener("click", event => {
            document.querySelector(".portfolio-list.active").classList.remove("active");
            event.currentTarget.classList.add("active")

            document.querySelector(".tracking-data.active").classList.remove("active")
            const selector= event.currentTarget.dataset.content;
            document.querySelector(selector).classList.add("active");
        })
    })
}

addPortfolioForm.addEventListener("submit", event => {
    event.preventDefault();
    const portfolioName = document.querySelector("#portfolio-name").value;
    const portfolio = {id: portfolioName.toLowerCase() , name: portfolioName}
    updatePortfolioList(portfolio);
    // const dataContainer = document.querySelector(".data-container");
    // dataContainer.insertAdjacentHTML("beforeend", 
    // `<div class="tracking-data" id="${portfolioName.value.toLowerCase()}">
    // <div class="tracking-container">
    //     <div class="current-net-worth">
    //         10$
    //     </div>
    //     <div class="add-transaction">
    //     <a href="">Add Transaction</a> 
    //     </div>
    // </div>
    // <div class="all-time-pl">
    //     +10%
    // </div>
    // </div>`)
    updatePortfolios(portfolio);
    checkList();
    document.querySelector(".bg-popup").classList.remove("show");    
})


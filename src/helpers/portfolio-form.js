const addPortofolioButton = document.querySelector(".btn-list");
const popup = document.querySelector(".bg-popup");
addPortofolioButton.addEventListener("click", ()=> {
   popup.classList.add("show");
})

const buttonCancel = document.querySelector(".btn-cancel");
buttonCancel.addEventListener("click", () => {
    popup.classList.remove("show");
})



document.addEventListener('DOMContentLoaded', () => {
    const addPortfolioForm = document.querySelector("#new-portfolio");
    const assetList = document.querySelector("#asset-list");
})

const addPortfolioForm = document.querySelector("#new-portfolio");
const assetList = document.querySelector("#asset-list");


addPortfolioForm.addEventListener("submit", event => {
    event.preventDefault();
    const portfolioName = document.querySelector("#portfolio-name");
    console.log(portfolioName.value)
    assetList.insertAdjacentHTML("beforeend",  
    `<li><img src="/src/assets/images/portfolio_icon.png" width="21px">&nbsp;&nbsp;&nbsp;<button class="portfolio-list" data-content="#${portfolioName.value.toLowerCase()}">${portfolioName.value}</button></li>`)
    const dataContainer = document.querySelector(".data-container");
    dataContainer.insertAdjacentHTML("beforeend", 
    `<div class="tracking-data" id="${portfolioName.value.toLowerCase()}">
    <div class="tracking-container">
        <div class="current-net-worth">
            10$
        </div>
        <div class="add-transaction">
        <a href="">Add Transaction</a> 
        </div>
    </div>
    <div class="all-time-pl">
        +10%
    </div>
    </div>`)
    checkList();
    document.querySelector(".bg-popup").classList.remove("show");    
})

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



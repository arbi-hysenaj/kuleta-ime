const addPortofolioButton = document.querySelector(".btn-list");
const popup = document.querySelector(".bg-popup");
addPortofolioButton.addEventListener("click", ()=> {
   popup.classList.add("show");
})


document.addEventListener('DOMContentLoaded', () => {
    const addPortfolioForm = document.querySelector("#new-portfolio");
    const assetList = document.querySelector("#asset-list");
    console.log(assetList);
})

const addPortfolioForm = document.querySelector("#new-portfolio");
const assetList = document.querySelector("#asset-list");


addPortfolioForm.addEventListener("submit", event => {
    event.preventDefault();
    const portfolioName = document.querySelector("#portfolio-name");
    console.log(portfolioName.value)
    assetList.insertAdjacentHTML("beforeend",  `<li><img src="/src/assets/images/portfolio_icon.png" width="21px">&nbsp;&nbsp;${portfolioName.value}</li>`)
    popup.classList.remove("show");
})

const buttonCancel = document.querySelector(".btn-cancel");
buttonCancel.addEventListener("click", () => {
    popup.classList.remove("show");
})
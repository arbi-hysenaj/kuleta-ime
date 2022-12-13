let market = [];

export const setBoxColor = (item,value, arrow) => {
    if(value> 0){
        item.classList.remove("red");
        item.classList.add("green");
        if(arrow){
            document.querySelector(".arrow").classList.remove("down");
            document.querySelector(".arrow").classList.add("up");
        }   
    }else if(value===0){
        item.classList.remove("red");
        item.classList.remove("green");
        if(arrow){
            document.querySelector(".arrow").classList.remove("down");
            document.querySelector(".arrow").classList.remove("up");
        }
    }else{
        item.classList.remove("green");
        item.classList.add("red");
        if(arrow){
            document.querySelector(".arrow").classList.remove("up");
            document.querySelector(".arrow").classList.add("down");
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const marketCapResult = document.querySelector("#market-cap-result");
    const marketVolumeResult = document.querySelector("#market-volume-result");
    const marketCapPercentage = document.querySelector("#market-cap-percentage");
    const percentageBtn = document.querySelectorAll(".percentage-btn");

    if(marketCapResult){
        fetch("https://api.coingecko.com/api/v3/global").then(response => response.json()).then(data => { 
        marketCapResult.textContent = `${(Math.round(data.data.total_market_cap.usd)).toLocaleString()}$`;
        marketVolumeResult.textContent = `${(Math.round(data.data.total_volume.usd)).toLocaleString()}$`;
        percentageBtn.forEach(item => {
            setBoxColor(item, data.data.market_cap_change_percentage_24h_usd);
            marketCapPercentage.textContent = `${(parseFloat(data.data.market_cap_change_percentage_24h_usd)).toFixed(2)}%`;
        })
        
    })}
})
    
const tableContent= document.querySelector("#table-content");
const fetchData = async () => {
let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h")
const data = await response.json()
market = data;
    if(tableContent){
        tableContent.innerHTML= "";
        data.forEach(item=> {
            const priceChange = parseFloat(item.price_change_percentage_24h).toFixed(2);
            const colorClass = priceChange >0 ? 'green' : 'red'
        tableContent.insertAdjacentHTML("beforeend", `<tr>
            <th scope="row">${item.market_cap_rank}</th>
            <td><div class="photoname"><img src="${item.image}" width="26px"><div>${item.name}</div></div></td>
            <td id="percentage-btn-${item.name}" class="percentage-btn ${colorClass} list">${priceChange}%</td>
            <td>${item.current_price}$</td>
            <td>$${item.market_cap.toLocaleString()}</td>
            <td>$${item.total_volume.toLocaleString()} </td>
            </tr>`)
        })
    }
}

if(tableContent) fetchData();

const getCoin = (coinId) => {
    return market.find(coin => coin.id === coinId);
}

export {market, getCoin, fetchData} ;

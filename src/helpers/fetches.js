let market = []

document.addEventListener('DOMContentLoaded', () => {
    const marketCapResult = document.querySelector("#market-cap-result");
    const marketVolumeResult = document.querySelector("#market-volume-result");

    if(marketCapResult){
        fetch("https://api.coingecko.com/api/v3/global").then(response => response.json()).then(data => { 
        marketCapResult.textContent = `${(Math.round(data.data.total_market_cap.usd)).toLocaleString()}$`;
        marketVolumeResult.textContent = `${(Math.round(data.data.total_volume.usd)).toLocaleString()}$`;
    })}
})


const tableContent= document.querySelector("#table-content");
fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h")
.then(response => response.json()).then(data => {
    market = data;
    if(tableContent){
        tableContent.innerHTML= "";
        data.forEach(item=> {
            tableContent.insertAdjacentHTML("beforeend", `<tr>
                <th scope="row">${item.market_cap_rank}</th>
                <td><div class="photoname"><img src="${item.image}" width="26px"><div>${item.name}</div></div></td>
                <td>${parseFloat(item.price_change_percentage_24h).toFixed(2)} %</td>
                <td>${item.current_price}$</td>
                <td>${item.market_cap.toLocaleString()} $</td>
                <td>${item.total_volume.toLocaleString()} $</td>
                </tr>`)
        })
    }
})

const getCoin = (coinId) => {
    return market.find(coin => coin.id === coinId)
}


export {market, getCoin};

document.addEventListener('DOMContentLoaded', () => {
    const marketCapResult = document.querySelector("#market-cap-result");
    marketCapResult.innerHTML = fetch("https://api.coingecko.com/api/v3/global").then(response => response.json()).then(data => { 
        marketCapResult.textContent = (Math.round(data.data.total_market_cap.usd)).toLocaleString();
    });
})


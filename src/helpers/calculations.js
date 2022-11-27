document.addEventListener('DOMContentLoaded', () => {
    const marketCapResult = document.querySelector("#market-cap-result");
    const marketVolumeResult = document.querySelector("#market-volume-result");

    fetch("https://api.coingecko.com/api/v3/global").then(response => response.json()).then(data => { 
        marketCapResult.textContent = (Math.round(data.data.total_market_cap.usd)).toLocaleString();
        marketVolumeResult.textContent = (Math.round(data.data.total_volume.usd)).toLocaleString();
    });

})


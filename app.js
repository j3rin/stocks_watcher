var axios = require("axios");

var symbols = [{
    symbol: "SNAP",
    watchPrice: 12
}]


setInterval(function(){
    symbols.map((data) => {
        axios.get('https://api.robinhood.com/quotes/'+data.symbol+'/')
        .then((data) => {
            if(data.data.ask_price <= data.watchPrice){
                console.log("You making money on"+data.symbol)   
            }
        })
    })
}, 60000)
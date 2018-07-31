var axios = require("axios");
var prompt = require('prompt');
let symbol = []
let refreshTime = 60000;
let myholding = 63

prompt.start();

prompt.get(['Symbol', 'WatchPrice'], function (err, result) {
  if (err) { return onErr(err); }
  
  let symbol = result.Symbol;
  let watchPrice = result.WatchPrice;

  axios.get('https://api.robinhood.com/quotes/'+symbol+'/')
  .then((symbol_data) => {
     console.log(symbol_data.data.ask_price+" => "+symbol)
     console.log("Sell Now $"+symbol_data.data.ask_price*myholding)
      if(symbol_data.data.ask_price > watchPrice){
          console.log("You making money on "+symbol+" Price "+symbol_data.data.ask_price)   
      }
  })
  .catch(function(error){
    if(error) console.log("There was an error")
   if(error.response.status === 404){
       console.log("INVALID SYMBOL")
   }
  })

  console.log("Every 60 seconds will refresh..............")
  setInterval(() => {
  
        axios.get('https://api.robinhood.com/quotes/'+symbol+'/')
        .then((symbol_data) => {
            console.log(symbol_data.data.ask_price+" => "+symbol)
            console.log("Sell Now $"+symbol_data.data.ask_price*myholding)
            if(symbol_data.data.ask_price > watchPrice){
                console.log("You making money on "+symbol+"Price "+symbol_data.data.ask_price)   
            }
        })
        .catch(function(error){
            if(error) console.log("There was an error")
            if(error.response.status === 404){
                console.log("INVALID SYMBOL")
            }
           })

}, refreshTime)
  
});

function onErr(err) {
  console.log(err);
  return 1;
}

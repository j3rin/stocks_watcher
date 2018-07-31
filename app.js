var axios = require("axios");

axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=SNAP&interval=1min&apikey=VY7WKFSQR8I5B8H6')
.then((data) => {
    console.log(data.data)
})
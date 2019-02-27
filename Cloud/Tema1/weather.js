var http = require('http');
var url = require('url');
var config = require('./config');
var utils = require('./utlis');

http.createServer(function (req, res) {
    var url_parts = url.parse(req.url, true);
    var path = url_parts.pathname;
    if (path === '/getWeatherInfo') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        let apiKey = config.weather.api_key;
        let api_url = `${config.weather.api_url}${url_parts.query.location}&appid=${apiKey}`;
        var getWeatherInfo = utils.getData(api_url);
        getWeatherInfo.then(function (result) {
            console.log(result);
            res.write(JSON.stringify(result));
            res.end();
        }).catch((err) => {
            res.write("Location cannot be found !");
            res.end();
        });;
    }
}).listen(3000, function () {
    console.log("Weather microservice 3000 ... ");
});




var http = require('http');
var url = require('url');
var config = require('./config');
var utils = require('./utlis');

http.createServer(function (req, res) {
    var url_parts = url.parse(req.url, true);
    var path = url_parts.pathname;
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (path === '/getWeatherInfo') {
        utils.cacheLocation(url_parts.query.location);
        let weather_url = `${config.weather.weather_url}${url_parts.query.location}`;
        var getWeatherInfo = utils.getData(weather_url);
        getWeatherInfo.then(function (result) {
            console.log(result);
            res.write(JSON.stringify(result));
            res.end();
        })
            .catch((err) => {
                res.write("Location cannot be found !");
                res.end();
            });
    }
    if (path === '/getTimeInfo') {
        let time_url = `${config.time.time_url}${url_parts.query.location}`;
        var getTimeInfo = utils.getData(time_url);
        getTimeInfo.then(function (result) {
            res.write(JSON.stringify(result));
            res.end();
        })
            .catch((err) => {
                res.write("Location cannot be found !");
                res.end();
            });
    }
    if (path === '/getMetrics') {
        var content = utils.readFile("logs.txt");
        res.write(content);
        res.end();
    }
    if (path === '/getImage') {
        let image_url = `${config.image.image_service_url}`;
        var getImage = utils.getData(image_url);
        getImage.then(function (result) {
            res.write(JSON.stringify(result.photos[0].image.web));
            res.end();
        })
        .catch((err) => {
                res.write("Location cannot be found !");
                res.end();
        });
    }
}).listen(3001, function () {
    console.log("Main server 3001 ... ");
});


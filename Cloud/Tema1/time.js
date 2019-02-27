var http = require('http');
var url = require('url');
var config = require('./config');
var utils = require('./utlis');

http.createServer(function (req, res) {
    var url_parts = url.parse(req.url, true);
    var path = url_parts.pathname;
    if (path === '/getTimeInfo') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        let token = config.time.token;
        let api_url = `${config.time.api_url}${url_parts.query.location}&token=${token}`;
        var getTimeInfo = utils.getData(api_url);
        getTimeInfo.then(function (result) {
            res.write(JSON.stringify(result));
            res.end();
        })
            .catch((err) => {
                res.write("Location cannot be found !");
                res.end();
            });
    }
}).listen(3002, function () {
    console.log("Time microservice 3000 ... ");
});





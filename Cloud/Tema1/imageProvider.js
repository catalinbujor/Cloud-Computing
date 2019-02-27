var http = require('http');
var url = require('url');
var config = require('./config');
var utils = require('./utlis');

http.createServer(function (req, res) {
    var url_parts = url.parse(req.url, true);
    var path = url_parts.pathname;
    if (path === '/getImage') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var locatie = utils.readFile("location.txt");
        let api_url = `${config.image.api_url}${locatie}/images`;
        var getImage = utils.getData(api_url);
        getImage.then(function (result) {
            //console.log(result.photos[0].image.web);
            res.write(JSON.stringify(result));
            res.end();
        }).catch((err) => {
            res.write("Location cannot be found !");
            res.end();
        });;
    }
}).listen(3003, function () {
    console.log("Image-provider microservice 3003 ... ");
});





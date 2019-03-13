var http = require('http');
var url = require('url');
var utils = require('./utils');
const { ObjectId } = require('mongodb')

http.createServer(function (req, res) {
    var url_parts = url.parse(req.url, true);
    var path = url_parts.pathname;
    res.setHeader('Content-Type', 'application/json');

    if (path === '/addCar' && req.method == 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString();
        })
        req.on('end', function () {
            try {
                body = JSON.parse(body);
            } catch (e) {
                console.log('Request Type:' + req.method + ' Invalid Endpoint: ' + path.pathname);
                res.statusCode = 400;
                res.end('Bad request');
                return;
            }
            var addCar = utils.addNewProduct(body, "masini");
            addCar.then(function (newCarId) {
                res.statusCode = 201;
                res.end('New car at ' + newCarId);
            }).catch((err) => {
                console.log(err);
                res.statusCode = 500;
                res.end('Oops');
            })
        })
    }
    else if (path === '/addCars' && req.method == 'POST') {

        let body = ''
        req.on('data', chunk => {
            body += chunk.toString();
        })
        req.on('end', function () {
            try {
                body = JSON.parse(body);
            } catch (e) {
                console.log('Request Type:' + req.method + ' Invalid Endpoint: ' + path.pathname);
                res.statusCode = 400;
                res.end('Bad request');
                return;
            }
            var addCars = utils.addProducts(body, "masini");
            addCars.then(function (newCarId) {
                console.log(newCarId.insertedIds)
                res.statusCode = 201;
                res.end(JSON.stringify(newCarId.insertedIds));
            }).catch((err) => {
                console.log(err);
                res.statusCode = 500;
                res.end('Oops');
            })
        })
    }
    else if (path === '/getCar' && req.method == 'GET') {
        var id = url_parts.query.id;
        if (!ObjectId.isValid(id)) {
            console.log("Objectid invalid !");
            res.statusCode = 404;
            res.end("Bad request invalid ID");
            return;
        }
        var getCar = utils.getProduct(id, "masini");
        getCar.then(function (car) {
            if (car == null) {
                res.statusCode = 404;
                res.end("Resource not found");
            }
            else {
                res.statusCode = 200;
                res.end(JSON.stringify(car));
            }
        }).catch((err) => {
            console.log(err);
            res.statusCode = 500;
            res.end('Oops');
        })
    }
    else if (path === '/getCars' && req.method == 'GET') {
        var getCars = utils.getProducts("masini");
        getCars.then(function (cars) {
            res.statusCode = 200;
            res.end(JSON.stringify(cars));
        }).catch((err) => {
            console.log(err);
            res.statusCode = 500;
            res.end('Oops');
        })
    }
    else if (path == '/updateCar' && req.method == 'PUT') {
        var id = url_parts.query.id;
        if (!ObjectId.isValid(id)) {
            console.log("Objectid invalid !");
            res.statusCode = 404;
            res.end("Bad request invalid ID");
            return;
        }

        let body = ''
        req.on('data', chunk => {
            body += chunk.toString();
        })
        req.on('end', function () {
            try {
                body = JSON.parse(body);
            } catch (e) {
                console.log('Request Type:' + req.method + ' Invalid Endpoint: ' + path.pathname);
                res.statusCode = 400;
                res.end('Bad request');
                return;
            }

            var updateCar = utils.updateProduct(id, "masini", body);
            updateCar.then(function (car) {
                if (car.result.n == 0) {
                    res.statusCode = 404;
                    res.end("Resource not found");
                }
                else {
                    res.statusCode = 200;
                    res.end("Resource : " + id + " updated  succesfully !");
                }
            }).catch((err) => {
                console.log(err);
                res.statusCode = 500;
                res.end('Oops');
            })
        })
    }
    else if (path == '/updateCars' && req.method == 'PUT') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString();
        })
        req.on('end', function () {
            try {
                body = JSON.parse(body);
            } catch (e) {
                console.log('Request Type:' + req.method + ' Invalid Endpoint: ' + path.pathname);
                res.statusCode = 400;
                res.end('Bad request');
                return;
            }
            var updateCars = utils.updateProducts(body , "masini");
            updateCars.then(function (result) {
                res.statusCode = 200;
                res.end(result.result.n + " cars modified");
            }).catch((err) => {
                console.log(err);
                res.statusCode = 500;
                res.end('Oops');
            })
        })
    }
    else if (path == '/deleteCar' && req.method == 'DELETE') {
        var id = url_parts.query.id;
        if (!ObjectId.isValid(id)) {
            console.log("Objectid invalid !");
            res.statusCode = 400;
            res.end("Bad request");
            return;
        }
        var deleteCar = utils.deleteProduct(id, "masini");
        deleteCar.then(function (car) {
            if (car.result.n == 0) {
                res.statusCode = 404;
                res.end("Resource not found");
            }
            else {
                res.statusCode = 200;
                res.end("Deleted !");
            }
        }).catch((err) => {
            console.log(err);
            res.statusCode = 500;
            res.end('Oops');
        })
    }
    else if (path == '/deleteCars' && req.method == 'DELETE') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString();
        })
        req.on('end', function () {
            try {
                body = JSON.parse(body);
            } catch (e) {
                console.log('Request Type:' + req.method + ' Invalid Endpoint: ' + path.pathname);
                res.statusCode = 400;
                res.end('Bad request');
                return;
            }
            var deleteCars = utils.deleteProducts(body, "masini");
            deleteCars.then(function (car) {
                if (car.result.n == 0) {
                    res.statusCode = 404;
                    res.end("Resource not found");
                }
                else {
                    res.statusCode = 200;
                    res.end("All cars have been deleted !");
                }
            }).catch((err) => {
                console.log(err);
                res.statusCode = 500;
                res.end('Oops');
            })
        })
    }
    else {
        console.log('Request Type:' + req.method + ' Invalid Endpoint: ' + path.pathname);
        res.statusCode = 400;
        res.end('Bad request');
    }
}).listen(3001, function () {
    console.log("Server 3001 ... ");
});


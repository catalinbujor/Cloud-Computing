var request = require('request');
const fs = require('fs');

exports.getData = function (url) {
    return new Promise(function (resolve, reject) {
        request(url, function (err, response, body) {
            if (err) {
                reject(err);
            } else {
                logCall(url);
                resolve(JSON.parse(body));
            }
        });
    });
}

exports.readFile = function (file) {
    var contents = fs.readFileSync(file, 'utf8');
    return contents;
}

function logCall(url) {
    fs.appendFile("logs.txt", url + " " + getDateTime() + "\n", function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("New log added!");
    });
}
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

exports.cacheLocation=function(location)
{
    fs.writeFile("location.txt", location.toLowerCase(), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("New log added!");
    });
}
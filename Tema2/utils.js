var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const { ObjectId } = require('mongodb')

exports.addNewProduct = function (car, collectionName) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) {
                reject();
                return;
            }
            var dbo = db.db("produse");
            dbo.collection(collectionName).insertOne(car, function (err, newCar) {
                if (err) {
                    reject();
                }
                else {
                    resolve(newCar.insertedId);
                }
                db.close();
            });
        });
    });
}

exports.addProducts = function (car, collectionName) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) {
                reject();
                return;
            }
            var dbo = db.db("produse");
            dbo.collection(collectionName).insertMany(car, function (err, newCar) {
                if (err) {
                    reject();
                }
                else {
                    resolve(newCar);
                }
                db.close();
            });
        });
    });
}

exports.getProduct = function (id, collectionName) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) {
                reject();
                return;
            }
            var dbo = db.db("produse");
            dbo.collection(collectionName).findOne({ "_id": ObjectId(id) }, function (err, product) {
                if (err) {
                    reject();
                }
                else {
                    resolve(product);
                }
                db.close();
            });
        });
    });
}

exports.getProducts = function (collectionName) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) {
                reject();
                return;
            }
            var dbo = db.db("produse");
            dbo.collection(collectionName).find({}).toArray(function (err, products) {
                if (err) {
                    reject();
                }
                else {
                    resolve(products);
                }
                db.close();
            });
        });
    });
}

exports.updateProduct = function (id, collectionName, newvalues) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) {
                reject();
                return;
            }
            var dbo = db.db("produse");

            console.log(id,collectionName,newvalues);
            dbo.collection(collectionName).updateOne({ "_id": ObjectId(id) }, {$set:newvalues}, function (err, res) {
                if (err) {
                    reject();
                }
                else {
                    resolve(res);
                }
                db.close();
            });
        });
    });
}

exports.updateProducts = function (newvalues, collectionName) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) {
                reject();
                return;
            }
            var dbo = db.db("produse");
            dbo.collection(collectionName).updateMany({}, {$set:newvalues}, function (err, res) {
                if (err) {
                    reject();
                }
                else {
                    resolve(res);
                }
                db.close();
            });
        });
    });
}
exports.deleteProduct = function(id,collectionName)
{
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) {
                reject();
                return;
            }
            var dbo = db.db("produse");
            dbo.collection(collectionName).deleteOne({ "_id": ObjectId(id) }, function(err, products) {
                if (err) {
                    reject();
                }
                else {
                    resolve(products);
                }
                db.close();
            });
        });
    });
}
exports.deleteProducts = function(body,collectionName)
{
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) {
                reject();
                return;
            }
            var dbo = db.db("produse");
            dbo.collection(collectionName).deleteMany(body, function(err, products) {
                if (err) {
                    reject();
                }
                else {
                    resolve(products);
                }
                db.close();
            });
        });
    });
}




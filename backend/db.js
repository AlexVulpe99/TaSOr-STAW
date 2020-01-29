// db.js

// mongodb driver
const MongoClient = require("mongodb").MongoClient;

const dbConnectionUrl = "mongodb+srv://admin:admin@cluster0-khmul.gcp.mongodb.net/test?retryWrites=true&w=majority";

function initialize(
    dbCollectionName,
    successCallback,
    failureCallback,
) {
    MongoClient.connect(dbConnectionUrl, { useUnifiedTopology: true }, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db('tasor');
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");

            successCallback(dbCollection);
        }
    });
}

module.exports = {
    initialize
};
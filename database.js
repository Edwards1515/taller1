const mongoose = require('mongoose');
const uri = "mongodb://jj_lizarazor:ananke123@clustera-shard-00-00-eliiu.mongodb.net:27017,clustera-shard-00-01-eliiu.mongodb.net:27017,clustera-shard-00-02-eliiu.mongodb.net:27017/music?ssl=true&replicaSet=ClusterA-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
    .then(db => { console.log('Conexión exitosa con cluster MongoDB: Atlas') })
    .catch(err => { console.log(err) });

module.exports = mongoose;
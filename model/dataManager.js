const dataStore = new Map();
const Json = require('./jsonModel');
const redis = require("redis"),
    client = redis.createClient({host: '127.0.2.1'});

client.on("error", function (err) {
    console.log("Error " + err);
});


class DataManager {

    constructor(){
    }

    static newModel(){
        return (key, json) => {
            const _json = new Json(key, json);
            this.save(_json);
            return _json;
        }
    }

    static save(json){
        const stringy = JSON.stringify(json.json)
        client.hset(json.key, 'json', stringy);
        // dataStore.set(json.key, json.json);
    }

    static get(key, cb){
       client.hget(key, 'json', (err, res) =>{
            cb(res);
        })
    }

    static has(key, cb){
        client.exists(key, (err, res) => {
            cb(Boolean(res));
        })
    }

    static size(){
        return dataStore.size;
    }

}

module.exports = DataManager;
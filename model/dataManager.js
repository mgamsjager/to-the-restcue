const Json = require('./jsonModel');
const config = require('../config');
const redis = require("redis"),
    client = redis.createClient({host: config.redis.ip});

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
        client.incr('jsons');
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

    static size(cb){
        client.get('jsons', (err, data) => {
            cb(data);
        })
    }
}

module.exports = DataManager;
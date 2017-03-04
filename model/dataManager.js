const dataStore = new Map();
const Json = require('./jsonModel');

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
        dataStore.set(json.key, json.json);
    }

    static get(key){
        return dataStore.get(key);
    }

    static has(key){
        return dataStore.has(key);
    }

    static size(){
        return dataStore.size;
    }

}

module.exports = DataManager;
class Json {
    constructor(key, json){
        this.key = key;
        this.jsonString = json;
    }

    get json(){
        return this.jsonString;
    }


}

module.exports = Json;
const Store = require('electron-store');
const store = new Store();

function storeData(key, data) {
    store.set(key, data);
}

function deleteData(key) {
    store.delete(key);
}

function getData(key) {
    return store.get(key, null);
}

function getOrDefault(key, def) {
    return store.get(key, def);
}

module.exports = {
    storeData: storeData,
    deleteData: deleteData,
    getData: getData,
    getOrDefault: getOrDefault
};
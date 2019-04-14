const fs = require('fs');
const {join} = require('path');
let settingsFile = join(__dirname, "/settings/config.json");

function doSettingsExist() {
    try {
        if(fs.existsSync(settingsFile)) {
            return true;
        }
    }catch (e) {
        return false;
    }

    return false;
}

function createSettingsFile() {

}

function getJsonAsString() {

}

module.exports = {
    doSettingsExist: doSettingsExist,
    createSettingsFile: createSettingsFile,
    getJsonAsString: getJsonAsString
}
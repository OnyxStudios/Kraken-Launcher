const fs = require('fs');
const path = require('path');
const shell = require('electron').remote.shell;
const StorageUtils = require('./../utils/StorageUtils');
const instancesFolder = require('electron').remote.app.getPath('userData') + '/instances/';
const maxLength = 182;

function parseInstances() {
    let instances = [];

    StorageUtils.getOrDefault('instances', []).forEach(instanceID => {
        let instanceConfig = instancesFolder + instanceID + '/pack.json';
        if(fs.existsSync(instanceConfig)) {
            let instance = JSON.parse(fs.readFileSync(instanceConfig));
            instances.push(instanceToObj(instance));
        }
    });

    return instances;
}

function toggleMod(instanceID, modname) {
    let instanceFolder = instancesFolder + instanceID;
    let modsFolder = instanceFolder + '/mods/';
    let instance = JSON.parse(fs.readFileSync(instanceFolder + '/pack.json'));
    let fileName = instance.mods[modname].file;

    if(fs.existsSync(modsFolder + fileName)) {
        let enabled = instance.mods[modname].enabled;
        let newFile = (enabled ? fileName + '.disabled' : fileName.replace('.disabled', ''));

        instance.mods[modname].file = newFile;
        instance.mods[modname].enabled = !enabled;
        fs.writeFile(instanceFolder + '/pack.json', JSON.stringify(instance, null, 2), function (err) {
            if (err) console.log(err);
        });

        fs.rename(modsFolder + fileName, modsFolder + newFile, function (err) {
            if (err) console.log(err);
        });
    }

    return instanceToObj(instance);
}

function instanceToObj(instance) {
    let mods = [];
    let localLogoPath = instancesFolder + instance.id + '/' + instance.logo;
    let logo = fs.existsSync(localLogoPath) ? localLogoPath : instance.logo;
    for (let key in instance.mods) {
        let mod = instance.mods[key];

        mods.push({
            name: key,
            curseID: mod.curseID,
            author: mod.author,
            file: mod.file,
            enabled: mod.enabled
        });
    }

    return({
        id: instance.id,
        name: instance.name,
        logo: logo,
        version: instance.version,
        author: instance.author,
        description: instance.description ? instance.description.substr(0, maxLength) : '',
        mods: mods
    });
}

function openInstanceFolder(instance) {
    shell.openItem(instancesFolder + instance.id);
}

function deleteInstance(instance) {
    let instances = StorageUtils.getOrDefault('instances', []);
    let index = instances.indexOf(instance.id);
    if(~index) {
        instances.splice(index, 1);
    }

    if(fs.existsSync(instancesFolder + instance.id)) {
        deleteFolder(instancesFolder + instance.id);
    }
    StorageUtils.storeData('instances', instances);
}

function deleteFolder(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file, index) => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(folderPath);
    }
}

function doesModExist(instanceID, modFile) {
    return fs.existsSync(instancesFolder + instanceID + '/mods/' + modFile);
}

function createInstance(name, desc, version, author) {
    let id = Math.floor(100000 + Math.random() * 900000);
    let packData = {
        id: id.toString(),
        name,
        logo: 'https://i.imgur.com/jCnInhv.png',
        description: desc,
        version,
        author,
        launcher: {

        }
    };
}

module.exports = {
    parseInstances,
    toggleMod,
    openInstanceFolder,
    deleteInstance,
    doesModExist,
    createInstance
};
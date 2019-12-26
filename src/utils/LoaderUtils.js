const parseString = require('xml2js').parseString;
const fabricMavenURL = 'https://maven.fabricmc.net/net/fabricmc/fabric-installer/';
const fabricVersionsURL = 'https://maven.fabricmc.net/net/fabricmc/fabric-installer/maven-metadata.xml';

const forgeMavenURL = 'https://files.minecraftforge.net/maven/net/minecraftforge/forge/';
const forgeVersionsURL = 'https://files.minecraftforge.net/maven/net/minecraftforge/forge/maven-metadata.xml';

function getFabricVersions() {
    return fetch(fabricVersionsURL, {method: 'GET'}).then(response => {
        return response ? response.text() : null;
    }).then(data => {
        let versions;

        parseString(data, function(err, result) {
            if(err) console.log(err);
            versions = JSON.parse(JSON.stringify(result)).metadata.versioning[0].versions[0].version;
        });

        return versions;
    });
}

function getForgeVersions() {
    return fetch(forgeVersionsURL, {method: 'GET'}).then(response => {
        return response ? response.text() : null;
    }).then(data => {
        let versions;

        parseString(data, function(err, result) {
            if(err) console.log(err);
            versions = JSON.parse(JSON.stringify(result)).metadata.versioning[0].versions[0].version;
        });

        return versions;
    });
}

module.exports = {
    getFabricVersions,
    getForgeVersions
};
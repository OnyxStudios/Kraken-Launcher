const KrakenUtils = require('./KrakenUtils');
//Vanilla
const minecraftVersionsURL = 'https://launchermeta.mojang.com/mc/game/version_manifest.json';

//Fabric
const fabricMavenURL = 'https://maven.fabricmc.net/net/fabricmc/fabric-installer/';
const fabricMetaURL = 'https://meta.fabricmc.net/v2/versions/';

//Forge
const forgeMavenURL = 'https://files.minecraftforge.net/maven/net/minecraftforge/forge/';
const forgeVersionsURL = 'https://files.minecraftforge.net/maven/net/minecraftforge/forge/promotions.json';

function getMinecraftVersions(versionURL, includeUnstable) {
    return fetch(versionURL).then(res => res ? res.json() : null).then(data => {
        let versions = [];

        if(data.versions) {
            data.versions.forEach(entry => {
               if(entry.type !== 'release' && !includeUnstable) return;
               versions.push(entry.id);
            });
        }else {
            data.forEach(entry => {
                if(!entry.stable && !includeUnstable) return;
                versions.push(entry.version);
            });
        }

        return KrakenUtils.sortVersions(versions);
    });
}

function getLoaderVersions(loaderURL) {
    return fetch(loaderURL).then(res => res ? res.json() : null).then(async data => {
        let versions = {};

        if (data.promos) {
            for (let key in data.promos) {
                let entry = data.promos[key];
                if(!versions[entry.mcversion]) versions[entry.mcversion] = [];
                if(!~versions[entry.mcversion].indexOf(entry.version)) versions[entry.mcversion].push(entry.version);
            }
        } else {
            let mcVersions = [];
            await getMinecraftVersions(fabricMetaURL + 'game', false).then(versionsArr => {mcVersions.push(...versionsArr)});

            mcVersions.forEach(version => {
                versions[version] = [];

                data.forEach(entry => {
                    versions[version].push(entry.version);
                });
            });
        }

        return versions;
    });
}

module.exports = {
    minecraftVersionsURL,
    fabricMetaURL,
    forgeVersionsURL,
    getMinecraftVersions,
    getLoaderVersions
};
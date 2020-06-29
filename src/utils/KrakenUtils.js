const showdown = require('showdown');
const converter = new showdown.Converter();

function getNews(setNews, err, res, body) {
    if(!err) {
        setNews(converter.makeHtml(body.toString()));
    }
}

function sortVersions(arr) {
    return arr.sort((a, b) => b.localeCompare(a, undefined, {numeric: true}));
}

export {getNews, sortVersions};
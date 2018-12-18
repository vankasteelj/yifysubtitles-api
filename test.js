var ysa = require('./index.js');

var call_1;
var start = Date.now(), ms1;
var imdb = '0076759', movie = 'star wars';

var res = function (subtitles) {
    var total = 0;
    for (let i in subtitles) {
        total += subtitles[i].length;
    }
    return total;
};

/** HTTPS search **/
ysa.search({
    imdbid: imdb
})
.then(function (subtitles) {
    ms1 = Date.now() - start;
    call_1 = 'Search: ' + ms1 + 'ms and ' + res(subtitles) + ' results in ' + Object.keys(subtitles).length + ' langs';
    console.log(call_1);
})
.catch(function (err) {
    console.log(err);
});
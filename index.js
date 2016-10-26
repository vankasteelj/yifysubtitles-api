(function(exports) {
    'use strict';

    // modules
    var got = require('got'),
        _ = require('lodash'),
        lang_map = require('./langmap.json'),

        // variables
        api_url = 'http://api.yifysubtitles.com/subs/',
        down_url = 'http://www.yifysubtitles.com';

    // format response
    var format = function(langs) {
        var formatted = {};

        // loop each language
        for (var lang in langs) {
            var langcode = lang_map[lang];
            formatted[langcode] = [];

            // loop each result
            _.each(langs[lang], function(obj) {
                formatted[langcode].push({
                    url: down_url + obj.url, // compose download url
                    lang: langcode, // 2 letter code
                    langName: lang.charAt(0).toUpperCase() + lang.slice(1), // full name, capitalize first letter
                    id: obj.id.toString(),
                    hi: Boolean(obj.hi), // 1/0 to true/false
                    score: (5 + obj.rating) > 10 ? 10 : (5 + obj.rating) < 0 ? 0 : (5 + obj.rating) // scale from 0 to 10
                });
            });
        }

        return formatted;
    };

    // filter by default
    var filter = function(subtitles, limit) {
        if (!limit || (isNaN(limit) && ['best', 'all'].indexOf(limit.toLowerCase()) == -1)) {
            limit = 'best';
        }

        var filtered = {};

        _.each(subtitles, function(arr, lang) {
            // sort by score
            arr = arr.sort(function(a, b) {
                var x = a.score,
                    y = b.score;
                return y < x ? -1 : y > x ? 1 : 0;
            });

            // filter
            switch (limit.toString().toLowerCase()) {
                case 'best':
                    // keep only the first (best) item
                    filtered[lang] = arr[0];
                    break;
                case 'all':
                    // all good already
                    filtered[lang] = arr;
                    break;
                default:
                    // keep only n = limit items
                    filtered[lang] = arr.slice(0, parseInt(limit));
            };
        });

        return filtered;
    };

    // search for subtitles
    var Yify = {
        search: function(input) {
            // if input is an id
            if (typeof input !== 'object') {
                input = {
                    imdbid: input,
                    limit: 'best'
                }
            }

            // if no input
            if (!input || (input && !input.imdbid)) {
                throw new Error('Need to pass an IMDB id');
            } else if (input && typeof input.imdbid === 'number') {
                throw new Error('Need to pass an IMDB id as a string');
            }

            // format imdb id
            var id = input.imdbid.toString().match('tt') ? input.imdbid : 'tt' + input.imdbid;

            // query api
            return got(api_url + id, {
                json: true
            }).then(function(response) {
                // filter + format response
                if (!response.body.subtitles) {
                    return {};
                } else {
                    return filter(format(response.body.subs[id]), input.limit);
                }
            }).catch(function(error) {
                throw error;
            });
        }
    };

    module.exports = Yify;
}());
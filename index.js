const cheerio = require('cheerio');
const got = require('got');

const uri = 'http://www.yifysubtitles.com/movie-imdb';
const downloadUri = 'http://yifysubtitles.com';

const langmap = require('./langmap.json');

const scrape = (imdbid) => {
    imdbid = 'tt' + imdbid.toString().replace('tt', '');

    return got(`${uri}/${imdbid}`)
        .then(res => cheerio.load(res.body))
        .then($ => {
            return $('tbody tr').map((i, el) => {
                const $el = $(el);
                const language = $el.find('.flag-cell .sub-lang').text();

                return {
                    id: $el.attr('data-id'),
                    rating: $el.find('.rating-cell').text(),
                    release: $el.find('.text-muted').parent().text().slice(9),
                    hi: $el.find('.hi-subtitle')[0] ? true : false,
                    lang: langmap[language.toLowerCase()],
                    langName: language,
                    url: downloadUri + $el.find('.download-cell a').attr('href').replace('subtitles/', 'subtitle/') + '.zip',
                };
            }).get();
        });
};

const rearrange = (subs = {}) => {
    let subtitles = {};

    subs = subs.sort((a,b) => b.score - a.score);

    // rearrange by language
    for (let i in subs) {
        let lang = subs[i].lang;
        if (!subtitles[lang]) subtitles[lang] = Array();
        subtitles[lang].push(subs[i]);
    }

    return Promise.resolve(subtitles);
};

const YifySubtitles = module.exports = {
    search: (opts) => {
        return scrape(opts.imdbid).then(rearrange);
    }
};
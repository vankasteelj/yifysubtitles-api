# yifysubtitles-api
**[YifySubtitles.com](http://www.yifysubtitles.com) API wrapper for download subtitles, written in NodeJS.**

### Search a subtitle

```js
require('yifysubtitles-api').search({imdbid:'tt0120915',limit:'best'}).then(console.log)
```

Example output:
```javascript
Object {
    en: [{
        id: "192883746",
        lang: "en",
        langName: "English",
        rating: 9,
        release: 'Some Movie by UploadTeam',
        url: "http://some-url.com/link-to-archive.zip",
        hi: false
    }]
}
```

*Note: `hi` represents 'hearing impaired' subtitles.*

## License
The MIT License (MIT)
- Copyright (c) Jean van Kasteel <vankasteelj@gmail.com>

>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

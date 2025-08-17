const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');
const fs = require('fs');
const path = require('path');

function getLinks(html, lim, base, visited) {
    const $ = cheerio.load(html);
    const links = [];
    $('a').each((i, el) => {
        let lnk = $(el).attr('href');
        const rel = $(el).attr('rel');
        const noidx = $('meta[name="robots"]').attr('content')?.includes('noindex');
        const noflw = rel?.includes('nofollow');

        if (lnk && !lnk.startsWith('http')) {
            lnk = url.resolve(base, lnk);
        }

        if (lnk) {
            if (i < lim) {
                if (!visited.has(lnk)) {
                    if (!noidx && !noflw) {
                        links.push(lnk);
                    }
                }
            }
        }
    });
    return links;
}

async function saveFile(lnk) {
    try {
        const res = await axios.get(lnk);
        if (res.status >= 200 && res.status < 300 && res.headers['content-type'].includes('text/html')) {
            const html = res.data;
            const fn = path.basename(lnk) + '.txt';
            fs.writeFileSync(fn, html);
        }
    } catch (err) {}
}

async function crawl(start, links) {
    const visited = new Set();
    visited.add(start);

    try {
        const res = await axios.get(start);
        if (res.status >= 200 && res.status < 300) {
            const lnks = getLinks(res.data, links, start, visited);

            if (lnks.length > 0) {
                const savePms = lnks.map(lnk => saveFile(lnk));
                await Promise.all(savePms);
            }
        }
    } catch (err) {}
}

function main() {
    const args = process.argv.slice(2);
    if (args.length !== 2) {
        process.exit(1);
    }

    const start = args[0];
    const links = parseInt(args[1], 10);

    if (isNaN(links)) {
        process.exit(1);
    }

    if (typeof links === 'number') {
        crawl(start, links);
    }
}

main();

//you can run via the command
//node crawler.js https://en.wikipedia.org/wiki/Main_Page 5

# Simple Web Crawler

A lightweight Node.js web crawler that:
- Starts from a given URL
- Collects up to a specified number of links from that page
- Saves the HTML content of each crawled link into `.txt` files

---

## 📂 Project Structure

- **crawler.js** → Main crawler script  
- **output files** → Each visited page’s HTML is saved as a `.txt` file in the same directory  

---

## ⚙️ How It Works

### Functions

- **`getLinks(html, lim, base, visited)`**  
  Extracts anchor (`<a>`) tags from a page, filters out `nofollow` and `noindex` links, and returns up to `lim` valid links that haven’t been visited yet.  

- **`saveFile(lnk)`**  
  Downloads HTML content of a link (if it’s an HTML page) and saves it as `<basename>.txt` in the current folder.  

- **`crawl(start, links)`**  
  Starts crawling from the `start` URL, extracts up to `links` hyperlinks, and downloads them using `saveFile`.  

- **`main()`**  
  Handles command-line arguments:  
  1. Starting URL  
  2. Number of links to download  

---

## 🛠️ Requirements

- [Node.js](https://nodejs.org/) (v12 or newer recommended)  
- npm packages: `axios`, `cheerio`

---

## 📦 Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo

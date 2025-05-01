const { browser } = require('@wdio/globals')

const baseUrl = 'https://trello.com'

module.exports = class Page {
    get btnSubmit() {
        return $('button[type="submit"]');
    }

    open() {
        return browser.url(baseUrl)
    }

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open(path) {
        return browser.url(`${baseUrl}/${path}`)
    }
}

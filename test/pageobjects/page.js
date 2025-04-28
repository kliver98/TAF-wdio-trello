const { browser } = require('@wdio/globals')

const baseUrl = 'https://trello.com'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
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

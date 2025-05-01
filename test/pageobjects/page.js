const { browser } = require('@wdio/globals')

const baseUrl = 'https://trello.com'

module.exports = class Page {
    get btnSubmit() {
        return $('button[type="submit"]');
    }

    open(path = '') {
        if (path === '') return browser.url(baseUrl)
        return browser.url(`${baseUrl}/${path}`)
    }
}

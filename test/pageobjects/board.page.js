const { $ } = require('@wdio/globals')
const Page = require('./page');

class BoardPage extends Page {
    get boardNameDisplay() {
        return $('h1[data-testid="board-name-display"]');
    }

    get btnAddList() {
        return $('button[data-testid="list-composer-button"]');
    }

    get textareaListName() {
        return $('textarea[data-testid="list-name-textarea"]');
    }

    get btnCreateList() {
        return $('button[data-testid="list-composer-add-list-button"]');
    }

    get listName() {
        return $('h2[data-testid="list-name"]');
    }
}

module.exports = new BoardPage();

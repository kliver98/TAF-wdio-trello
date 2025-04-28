const { $ } = require('@wdio/globals')
const Page = require('../page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class BoardModalPage extends Page {
    get btnCreateBoard() {
        return $('button[data-testid="header-create-board-button"]');
    }

    get inputBoardTitle() {
        return $('input[data-testid="create-board-title-input"]');
    }

    get btnSubmit() {
        return $('button[data-testid="create-board-submit-button"]');
    }

    get btnCloseBoard() {
        return $('button[title="Close board"]');
    }

    get btnCloseConfirm() {
        return $('button[data-testid="popover-close-board-confirm"]');
    }
}

module.exports = new BoardModalPage();

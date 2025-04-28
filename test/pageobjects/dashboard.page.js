const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DashboardPage extends Page {
    get btnCreateMenu() {
        return $('button[data-testid="header-create-menu-button"]');
    }

    async hoverOverBoardCard(title) {
        $(`//a[contains(@title, '${title}')]`).moveTo();
    }

    btnBoardActionMenu(boardTitle) {
        this.hoverOverBoardCard(boardTitle);
        return $(`//a[contains(text(), '${boardTitle}')]/following::div[@role='menu']/button`);
    }
}

module.exports = new DashboardPage();

const { $ } = require('@wdio/globals')
const Page = require('./page');

class DashboardPage extends Page {
    async hoverOverBoardCard(title) {
        $(`//a[contains(@title, '${title}')]`).moveTo();
    }

    btnBoardActionMenu(boardTitle) {
        this.hoverOverBoardCard(boardTitle);
        return $(`//a[contains(text(), '${boardTitle}')]/following::div[@role='menu']/button`);
    }
}

module.exports = new DashboardPage();

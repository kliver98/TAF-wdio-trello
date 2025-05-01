const { $ } = require('@wdio/globals');
const Page = require('./page');

class DashboardPage extends Page {
  get linkToSettings() {
    return $('a[data-testid="home-team-settings-tab"]');
  }

  async hoverOverBoardCard(title) {
    $(`//a[contains(@title, '${title}')]`).moveTo();
  }

  btnBoardActionMenu(boardTitle) {
    this.hoverOverBoardCard(boardTitle);
    return $(
      `//a[contains(text(), '${boardTitle}')]/following::div[@role='menu']/button`
    );
  }

  open() {
    return super.open();
  }
}

module.exports = new DashboardPage();

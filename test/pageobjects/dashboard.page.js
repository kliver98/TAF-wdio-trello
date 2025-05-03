const { $ } = require('@wdio/globals');
const Page = require('./page');

class DashboardPage extends Page {
  get linkToSettings() {
    return $('a[data-testid="home-team-settings-tab"]');
  }

  linkToBoardCard(title) {
    return $(`//a[contains(@title, '${title}')]`);
  }

  btnBoardActionMenu(boardTitle = 'Board Titles') {
    return $(
      `//a[contains(text(), '${boardTitle}')]/following::div[@role='menu']/button`
    );
  }

  open() {
    return super.open();
  }
}

module.exports = new DashboardPage();

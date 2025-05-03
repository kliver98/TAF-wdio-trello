const { $ } = require('@wdio/globals');
const Page = require('./page');

class NavigationBarPage extends Page {
  get btnCreateMenu() {
    return $('button[data-testid="header-create-menu-button"]');
  }

  get btnOpenMemberMenu() {
    return $('button[data-testid="header-member-menu-button"]');
  }

  get linkMenuProfile() {
    return $('a[data-testid="account-menu-profile"]');
  }

  // Pipe (or) because selector change from manual and automation execution
  get inputSearch() {
    return $(
      '//input[@data-test-id="search-dialog-input"] | //input[@data-testid="cross-product-search-input-skeleton"]'
    );
  }

  get listBoardsFound() {
    return $$(
      '//div[@data-test-id="search-dialog-dialog-wrapper"]//div[@data-testid="persist-recent-search"]'
    );
  }
}

module.exports = new NavigationBarPage();

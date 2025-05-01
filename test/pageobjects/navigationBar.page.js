const { $ } = require('@wdio/globals')
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
        return $('//input[@data-test-id="search-dialog-input"] | //input[@data-testid="cross-product-search-input-skeleton"]');
    }

    get listBoardsFound() {
        return $$('//div[@data-test-id="search-dialog-dialog-wrapper"]//div[@data-testid="persist-recent-search"]');
    }

    async goToProfile() {
        await this.btnOpenMemberMenu.click();
        await this.linkMenuProfile.click();
    }

    async typeInSearch(textToSearch) {
        await this.inputSearch.click();
        await this.inputSearch.setValue(textToSearch);
    }

    async searchBoardFound(title) {
        const boardsFound = await this.listBoardsFound;
        for (const board of boardsFound) {
            const elementFound = await board.$(`//span[text()='${title}']`);
            if (elementFound.isExisting()) return elementFound;
        }
        
    }
}

module.exports = new NavigationBarPage();

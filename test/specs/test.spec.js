const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const DashboardPage = require('../pageobjects/dashboard.page')
const BoardPage = require('../pageobjects/board.page')
const BoardModalPage = require('../pageobjects/modals/board.page')

const BOARD_TITLE = `Board ${Date.now()}`;
const LIST_NAME = 'My first list';

describe('Trello automation', () => {
    it('should create a board from dashboard', async () => {
        await LoginPage.open()

        await LoginPage.login('kliver1998@hotmail.com', '123Trello456')
        await browser.pause(5000); //Verification code
        await DashboardPage.btnCreateMenu.click()
        await BoardModalPage.btnCreateBoard.click()
        await BoardModalPage.inputBoardTitle.setValue(BOARD_TITLE);
        await BoardModalPage.btnSubmit.waitForClickable({ timeout: 5000 });
        await BoardModalPage.btnSubmit.click();
        
        await expect(BoardPage.boardNameDisplay).toHaveText(BOARD_TITLE)
        expect(await browser.getTitle()).toHaveText(BOARD_TITLE)
    });

    it(`should create a list from board ${BOARD_TITLE}`, async () => {
        await BoardPage.textareaListName.waitForEnabled({ timeout: 5000});
        await BoardPage.textareaListName.setValue(LIST_NAME);
        await BoardPage.btnCreateList.click();

        await expect(BoardPage.listName).toHaveText(LIST_NAME);
    });

    after(async () => {
        //Close board, no delete them
        await DashboardPage.hoverOverBoardCard(BOARD_TITLE);
        await DashboardPage.btnBoardActionMenu(BOARD_TITLE).click();
        await BoardModalPage.btnCloseBoard.click();
        await BoardModalPage.btnCloseConfirm.click();
    });
})

require('dotenv').config();
const { expect } = require('@wdio/globals');
const LoginPage = require('../pageobjects/login.page');
const BoardPage = require('../pageobjects/board.page');
const DashboardPage = require('../pageobjects/dashboard.page');
const ProfilePage = require('../pageobjects/profile.page');
const BoardModalPage = require('../pageobjects/modals/board.page');
const NavigationBarPage = require('../pageobjects/navigationBar.page');
const WorkspaceSettingsPage = require('../pageobjects/workspaceSettings.page');
const {
  addHoursToCurrentTime,
  addDaysToGivenDate,
  formatDateToMDY,
} = require('../utils/timeUtils');

const currentTimeMils = Date.now();
const BOARD_TITLE = `Board ${currentTimeMils}`;
const LIST_NAME = 'My first list';
const CARDS = ['First Card', 'Second Card'];
const NEW_WORKSPACE_NAME = `Super Duper Workspace ${currentTimeMils}`;

describe('Trello automation', () => {
  it('should successful Sign-In', async () => {
    await LoginPage.open();

    await LoginPage.login(
      process.env.TRELLO_EMAIL,
      process.env.TRELLO_PASSWORD
    );
    await browser.pause(500); //Verification code

    await expect(NavigationBarPage.btnCreateMenu).toBeDisplayed();
  });

  it('should edit user profile', async () => {
    let newUsername = `username${currentTimeMils}`;

    await NavigationBarPage.goToProfile();
    await ProfilePage.typeUsername(newUsername);
    await ProfilePage.typeBio(`New Bio info ${currentTimeMils}`);
    await ProfilePage.btnSubmit.click();

    await expect(ProfilePage.spanSavedFlag).toBeDisplayed();
    expect(await browser.getUrl()).toContain(newUsername);
  });

  it('should create new board from dashboard', async () => {
    await NavigationBarPage.btnCreateMenu.click();
    await BoardModalPage.btnCreateBoard.click();
    await BoardModalPage.inputBoardTitle.setValue(BOARD_TITLE);
    await BoardModalPage.btnSubmit.waitForClickable();
    await BoardModalPage.btnSubmit.click();

    await expect(BoardPage.boardNameDisplay).toHaveText(BOARD_TITLE);
    expect(await browser.getTitle()).toHaveText(BOARD_TITLE);
  });

  it('should search for existing board', async () => {
    await NavigationBarPage.typeInSearch(BOARD_TITLE);
    await browser.waitUntil(
      async () => (await NavigationBarPage.listBoardsFound).length > 0,
      {
        timeout: 1000,
        timeoutMsg:
          'Expected at least one board to be found, but none appeared',
      }
    );
    const found = await NavigationBarPage.listBoardsFound;
    const boardFound = await NavigationBarPage.searchBoardFound(BOARD_TITLE);

    await expect(found).toHaveLength(1);
    await expect(boardFound).toBeExisting();
  });

  it(`should create new list from board ${BOARD_TITLE}`, async () => {
    await browser.refresh();
    await BoardPage.btnAddList.click();
    await BoardPage.textareaListName.waitForEnabled({ timeout: 1000 });
    await BoardPage.textareaListName.setValue(LIST_NAME);
    await BoardPage.btnCreateList.click();

    await expect(BoardPage.listName).toHaveText(LIST_NAME);
  });

  it('should create a new card', async () => {
    await browser.pause(1000); //TODO: remove this
    await BoardPage.createCardInList(LIST_NAME, CARDS[0]);

    await expect(BoardPage.linkCard(CARDS[0])).toBeExisting();
  });

  it('should filter cards by due date', async () => {
    await browser.refresh(); //TODO: remove this
    await browser.pause(1000); //TODO: remove this
    await BoardPage.createCardInList(LIST_NAME, CARDS[1]);

    await BoardPage.linkCard(CARDS[0]).click();
    await BoardPage.setDateDueDate(formatDateToMDY(new Date()), false);
    await BoardPage.setTimeDueDate(addHoursToCurrentTime(1));
    await BoardPage.linkCard(CARDS[1]).click();
    await BoardPage.setDateDueDate(addDaysToGivenDate(3, new Date()));

    await BoardPage.selectFilterDueDate('Due in the next day');
    await BoardPage.headerSubtitle.waitForDisplayed();

    await expect(BoardPage.headerSubtitle).toHaveText('1 card matches filters');
  });

  it('should edit workspace name', async () => {
    await DashboardPage.open();
    await DashboardPage.linkToSettings.click();
    await WorkspaceSettingsPage.btnEditName.click();

    await WorkspaceSettingsPage.typeWorkspaceName(NEW_WORKSPACE_NAME);
    await WorkspaceSettingsPage.btnSubmit.click();
    await DashboardPage.open();
    await DashboardPage.linkToSettings.click();

    await expect(
      await WorkspaceSettingsPage.workspaceTitle(NEW_WORKSPACE_NAME)
    ).toBeExisting();
  });

  after(async () => {
    //Close board, does not delete it
    await DashboardPage.hoverOverBoardCard(BOARD_TITLE);
    await DashboardPage.btnBoardActionMenu(BOARD_TITLE).click();
    await BoardModalPage.btnCloseBoard.click();
    await BoardModalPage.btnCloseConfirm.click();
  });
});

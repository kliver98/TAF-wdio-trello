/**
 * waitUtils.js
 * Common utility functions for explicit waits in WebdriverIO tests.
 */

module.exports = {
  /**
   * Wait until the given element is displayed
   * @param {WebdriverIO.Element} element
   * @param {number} timeout - milliseconds to wait (default: 5000)
   * @param {string} message - optional error message
   */
  async waitForElementDisplayed(
    element,
    timeout = 5000,
    message = 'Element was not displayed in time'
  ) {
    await element.waitForDisplayed({
      timeout,
      timeoutMsg: message,
    });
  },

  /**
   * Wait until the given element exists in the DOM
   * @param {WebdriverIO.Element} element
   * @param {number} timeout
   * @param {string} message
   */
  async waitForElementExist(
    element,
    timeout = 5000,
    message = 'Element did not exist in time'
  ) {
    await element.waitForExist({
      timeout,
      timeoutMsg: message,
    });
  },

  /**
   * Wait until an element becomes clickable
   * @param {WebdriverIO.Element} element
   * @param {number} timeout
   * @param {string} message
   */
  async waitForElementClickable(
    element,
    timeout = 5000,
    message = 'Element was not clickable in time'
  ) {
    await element.waitForClickable({
      timeout,
      timeoutMsg: message,
    });
  },

  /**
   * Wait until an element no longer exists in the DOM.
   * @param {WebdriverIO.Element} element - The element to wait to disappear.
   * @param {number} [timeout=5000] - Max wait time in milliseconds.
   */
  async waitUntilElementNotExists(element, timeout = 5000) {
    await browser.waitUntil(async () => !(await element.isExisting()), {
      timeout,
      timeoutMsg: 'Expected element to be removed from the DOM',
    });
  },

  async waitForListsHasElements(getListFn, timeout = 5000) {
    await browser.waitUntil(
      async () => {
        const list = await getListFn();
        return list.length > 0;
      },
      {
        timeout,
        timeoutMsg: 'List still has no elements after timeout',
      }
    );
  },
};

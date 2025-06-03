# TAF-wdio-trello

Test Automation Framework for Trello Website in WebDriverIO

## How to run tests

> Note: Please install the browser you will run the tests, also be sure to have the driver updated

First install dependencies

```
npm install
```

Second you need to create a Trello account and setup to be ready to work. (The tests will create and try to close the new boards).

Third you need to create `.env` file in root with information of account

```
TRELLO_EMAIL="example@email.com"
TRELLO_PASSWORD="your_password"
```

Then type

```
npx wdio run wdio.conf.js
```

## Better coding practices applied

- Layered architecture:
  - Page Object Layer: This layer encapsulates the web elements and actions on the web pages. This promotes code reusability and encapsulation.
  - Workflows Layer: This layer abstracts business logic or user flows, combining multiple page actions into higher-level operations (e.g., login, creating a board).
  - Test Specs Layer: The topmost layer where actual test cases are written.
  - Utilities Layer: Holds helper methods like time-related utilities (timeUtils.js) and wait logic (waitUtils.js). These are commonly reused across pages, workflows, and tests.
- Page Object pattern: You can find this structure in folder `test/pageobjects` where each page, component or modal in trello workflows is reflected accordingly.
- Code smells: used camelCase for file names, class names, methods.

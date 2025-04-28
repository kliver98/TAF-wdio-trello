# TAF-wdio-trello
Test Automation Framework for Trello Website in WebDriverIO

## How to run tests
First install dependencies
```
npm install
```
Second you need to create `.env` file in root with
```
TRELLO_USERNAME="example@email.com"
TRELLO_PASSWORD="your_password"
```
Then type
```
HEADLESS=true BROWSER=chrome npx wdio run wdio.conf.js
```
You can set HEADLESS to [true or false] and BROWSER to [safari, chrome or firefox]

# playwright-test-software
Project to explore Playwright.dev in e2e tests and some plugins such as allure-playwright, faker, etc. All tests were built to run against a simple web application in the teste-software repository. 


## Run
Beyond the web app running you can run the command:
> `npx` playwright test

### Clean generated files
`npm` run clean

### Compile
> Yarn: `yarn` build
> NPM: `npm` run build

### Allure Reports
> #### Generate
`npm` run allure:generate

> ### Open report
`npm` run allure:open

> ### All in one
>If you want to run just one command you can use
`npm` run allure 
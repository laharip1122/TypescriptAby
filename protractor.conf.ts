import { Config, browser } from "protractor"

const ProtractorJasmineRetry = require('protractor-jasmine-retry');

export let config: Config = {

    ////
    // The timeout in milliseconds for each script run on the browser. This
    // should be longer than the maximum time your application needs to
    // stabilize between tasks.
    //
    allScriptsTimeout: 120000,
    maxAttempts: 2,
    ////
    // How long to wait (milliseconds) for a page to load.
    //
    getPageTimeout: 120000,

    ////
    // WebDriver control flow is deprecated and will be
    // removed soon, lets not use it.
    //   https://github.com/SeleniumHQ/selenium/issues/2969


    baseUrl: 'https://qed.onvio.us',

    // Framework to use. Jasmine is recommended.
    framework: "jasmine",

    seleniumAddress: 'http://localhost:4444/wd/hub/',

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 120000
    },


    specs: ['./specs/calculator.js'],
    suites: {
        E2E: ['./specs/*.js'],

    },
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        allScriptsTimeout: 120000,

        directConnect: true,

        browserName: 'chrome',
        chromeOptions: {
            args: ["--start-maximized", '--no-sandbox', "--ignore-certificate-errors", "--disable-popup-blocking",
                'disable-infobars', '--disable-browser-side-navigation', '--default', '--disable-default-apps', 'test-type=browser', '--enable-precise-memory-info', 'test-type'],
            prefs: { protocol_handler: { excluded_schemes: { 'onvio': false } } },
        },

        // allows different specs to run in parallel.
        // If this is set to be true, specs will be sharded by file
        // (i.e. all files to be run by this set of capabilities will run in parallel).
        // Default is false.
        shardTestFiles: true,
        // Maximum number of browser instances that can run in parallel for this
        // set of capabilities. This is only needed if shardTestFiles is true.
        // Default is 1.
        count: 1,
        maxInstances: 2

    },
    //
    plugins: [
        ProtractorJasmineRetry({ maxAttempts: 2 }),
    ],

    params: {

        // Although we prefer this 'false', there are some common BlueMoon library
        // implementations for background timers, intervals, etc that are not registering
        // outside of the Angular Zone correctly.  As such, Protractor synchronization is
        // broken and we need to disable the check.  See @blue/services/src/utils
        // conflicting with window.getAllAngularTestabilities()[0].isStable() and
        // https://christianliebel.com/2016/11/angular-2-protractor-timeout-heres-fix/
        disableSync: true,

        // Flag whether to maximimize the browser on startup, default 'true'
        maximizeBrowser: true,

        // Amount of retries to allow.  Helps to prevent against flaky tests
        testRetries: 3,

        // The intended starting URL for these parameters.
        // If not specified, will inherit baseUrl.
        startUrl: 'https://qed.onvio.us/?d=https:%2F%2Fqed.onvio.us%2Fstaff%2F%23%2F',
    },
    ////
    // A callback function called once configs are read but before any
    // environment setup. This will only run once, and before onPrepare.
    //
    // You can specify a file containing code to run by setting beforeLaunch to
    // the filename string.
    //
    // At this point, global variable 'protractor' object will NOT be set up,
    // and globals from the test framework will NOT be available. The main
    // purpose of this function should be to bring up test dependencies.
    //

    ////
    // A callback function called once all tests have finished running and
    // the WebDriver instance has been shut down. It is passed the exit code
    // (0 if the tests passed). afterLaunch must return a promise if you want
    // asynchronous code to be executed before the program exits.
    // This is called only once before the program exits (after onCleanUp).
    //
    afterLaunch(exitCode) {
        ////
        //
        return ProtractorJasmineRetry.afterLaunch(exitCode);
    },

}
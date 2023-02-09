
// ************************* LOGGING SECTION ******************************/
let LOGGING = true;
let LOG_DETAILS = true;
let LOG_TEST_HEADER = true;
let LOG_FUNCTION_HEADER = true;
let LOG_SETUP = false;

logSetup = (details) => {
    if (LOG_SETUP) {
        log(details);
    }
}

logTestHeader = (testHeader) => {
    if (LOG_TEST_HEADER) {
        log("==============================================================================");
        log("************** " + testHeader + " **************");
    }
}

logFunctionHeader = (functionHeader) => {
    if (LOG_FUNCTION_HEADER) {
        log("******************************************************************************");
        log("************** " + functionHeader + " **************");
    }
}

logDetails = (details) => {
    if (LOG_DETAILS) {
        log(details);
    }
}

const log = (text) => {
    if (LOGGING) {
        console.log(text);
    }
}

module.exports = {
    LOGGING,
    LOG_DETAILS,
    LOG_TEST_HEADER,
    LOG_FUNCTION_HEADER,
    LOG_SETUP,
    logSetup,
    logTestHeader,
    logFunctionHeader,
    logDetails,
    log,
}


// ************************* LOGGING SECTION ******************************/
let LOGGING = true;
let LOG_DETAIL = false;
let LOG_TEST_HEADER = false;
let LOG_FUNCTION_HEADER = false;
let LOG_SETUP = false;

logSetup = (details) => {
    if (LOG_SETUP) {
        log(details);
    }
}

logTestHeader = (testHeader) => {
    if (LOG_TEST_HEADER) {
        log("=============== TEST HEADER " + testHeader + " ===============");
    }
}

logFunctionHeader = (functionHeader) => {
    if (LOG_FUNCTION_HEADER) {
        log("************** HEADER FUNCTION " + functionHeader + " **************");
    }
}

logDetail = (details) => {
    if (LOG_DETAIL) {
        log(details);
    }
}

log = (text) => {
    if (LOGGING) {
        console.log(text);
    }
}
module.exports = {
    LOGGING,
    LOG_DETAIL,
    LOG_TEST_HEADER,
    LOG_FUNCTION_HEADER,
    LOG_SETUP,
    logSetup,
    logTestHeader,
    logFunctionHeader,
    logDetail,
    log,
}

// ************************* LOG SECTION ******************************/
let LOG = true;
let LOG_DETAIL = false;
let LOG_TEST_HEADER = false;
let LOG_FUNCTION_HEADER = false;
let LOG_SETUP = false;

const LOG_MODE = {
    LOG : "LOG",
    LOG_DETAIL : "LOG_DETAIL",
    LOG_TEST_HEADER : "LOG_TEST_HEADER",
    LOG_FUNCTION_HEADER : "LOG_FUNCTION_HEADER",
    LOG_SETUP : "LOG_SETUP"
  }

  setLogDefaults = (log_mode, state) => {

    LOG = true;
    LOG_DETAIL = false;
    LOG_TEST_HEADER = false;
    LOG_FUNCTION_HEADER = false;
    LOG_SETUP = false;
  }
    
  setLogMode = (log_mode, state) => {
        console.log("EXECUTING setLogMode = (" + log_mode + ", " + state);

    switch(log_mode) {
        case LOG_MODE.LOG:
           console.log("Setting log_mode LOG: " + state)
           LOG = state;
        break;
        case LOG_MODE.LOG_DETAIL:
            console.log("Setting log_mode LOG_DETAIL: " + state)
            LOG_DETAIL = state;
         break;
         case LOG_MODE.LOG_TEST_HEADER:
            console.log("Setting log_mode LOG_TEST_HEADER: " + state)
            LOG_TEST_HEADER = state;
         break;
         case LOG_MODE.LOG_FUNCTION_HEADER:
            console.log("Setting log_mode LOG_FUNCTION_HEADER: " + state)
            LOG_FUNCTION_HEADER = state;
         break;
         case LOG_MODE.LOG_SETUP:
            console.log("Setting log_mode LOG_SETUP: " + state)
            LOG_SETUP = state;
         break;
        default:
        text = "Unknown log_mode " + log_mode;
    }
}

logSetup = (text) => {
    if (LOG_SETUP) {
        log(text);
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
    if (LOG) {
        console.log(text);
    }
}
module.exports = {
    LOG_MODE,
    setLogDefaults,
    logSetup,
    setLogMode,
    logTestHeader,
    logFunctionHeader,
    logDetail,
    log
}

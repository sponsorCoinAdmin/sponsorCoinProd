dumpList = (_prefix, _arr) => {
    spCoinLoggingMethods.logFunctionHeader("dumpList = async(" + _prefix + ", _arr)");
    let maxCount = _arr.length;
//    spCoinLoggingMethods.logDetail("JS => DUMPING " + maxCount + " RECORDS");
    for(idx = 0; idx < maxCount; idx++) {
        let element = _arr[idx];
       spCoinLoggingMethods.log(_prefix + idx + ": " + element );
      }
    spCoinLoggingMethods.logExitFunction();
}

module.exports = {
    dumpList
}
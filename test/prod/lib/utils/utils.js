dumpArray = (_prefix, _arr) => {
    logFunctionHeader("dumpArray = async(" + _prefix + ", _arr)");
    let maxCount = _arr.length;
//    logDetail("JS => DUMPING " + maxCount + " RECORDS");
    for(idx = 0; idx < maxCount; idx++) {
        let element = _arr[idx];
        log(_prefix + idx + ": " + element );
      }
}

module.exports = {
    dumpArray
}
dumpList = (_prefix, _arr) => {
    logFunctionHeader("dumpList = async(" + _prefix + ", _arr)");
    let maxSize = _arr.length;
//    logDetail("JS => DUMPING " + maxSize + " RECORDS");
    for(idx = 0; idx < maxSize; idx++) {
        let element = _arr[idx];
        log(_prefix + idx + ": " + element );
      }
}

module.exports = {
    dumpList
}
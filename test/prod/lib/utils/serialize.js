const {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  RateHeaderStruct,
  TransactionStruct,
} = require("../dataTypes");

deSerializedAccountRec = async (serializedAccountRec) => {
  // LOG_DETAIL = true;
  logFunctionHeader(
    "deSerializedAccountRec = async(" + serializedAccountRec + ")"
  );
  logDetail("serializedAccountRec:\n" + serializedAccountRec);
  let accountStruct = new AccountStruct();
  let elements = serializedAccountRec.split("\\,");
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i].trim();
    let keyValue = element.split(":");
    logDetail("keyValue = " + keyValue);

    let key = keyValue[0].trim();
    let value = keyValue[1].trim();
    // logDetail("key     = " + key);
    // logDetail("value   = " + value);
    addAccountField(key, value, accountStruct);
  }

  logDetail("scPrintStructureTest.js, accountStruct:");
  logDetail(
    "accountStruct               = " + JSON.stringify(accountStruct, 0, 2)
  );
  logDetail(
    "============================================================================"
  );
  return accountStruct;
};

addAccountField = (key, value, accountStruct) => {
  logFunctionHeader("addAccountField = (" + key + "," + value + ")");
  switch (key.trim()) {
    case "index":
      logDetail("setting accountStruct.index = " + value);
      accountStruct.index = value;
      break;
    case "accountKey":
      logDetail("setting accountStruct.index = " + value);
      accountStruct.accountKey = value;
      break;
    case "insertionTime":
      logDetail("setting accountStruct.insertionTime = " + value);
      accountStruct.insertionTime = value;
      break;
    case "inserted":
      logDetail("setting accountStruct.inserted = " + value);
      accountStruct.inserted = value;
      break;
    case "verified":
      logDetail("setting accountStruct.verified = " + value);
      accountStruct.verified = value;
      break;
    case "KYC":
      logDetail("setting accountStruct.KYC = " + value);
      accountStruct.KYC = value;
      break;
    case "sponsorKeys":
      logDetail("setting accountStruct.sponsorKeys = " + value);
      accountStruct.sponsorKeys = value;
      break;
    case "sponsorArr":
      logDetail("setting accountStruct.sponsorArr = " + value);
      accountStruct.sponsorArr = value;
      break;
    case "agentKeys":
      logDetail("setting accountStruct.agentKeys = " + value);
      accountStruct.agentKeys = parseAddressStrArray(value);
      break;
    case "beneficiaryKeys":
      logDetail("setting accountStruct.beneficiaryKeys = " + value);
      accountStruct.beneficiaryKeys = parseAddressStrArray(value);
      break;
    default:
      break;
  }
};

parseAddressStrArray = (strArray) => {
  logFunctionHeader("parseAddressStrArray = " + strArray);
  console.log("parseAddressStrArray = " + strArray);

  strArray = strArray.substring(0, strArray.length - 1);
  addressStrArray = strArray.split(",");
  return addressStrArray;
};

module.exports = {
  addAccountField,
};

const {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  AgentRateStruct,
  TransactionStruct,
} = require("../spCoinDataTypes");

deSerializedAccountRec = async (serializedAccountRec) => {
  // LOG_DETAIL = true;
  logFunctionHeader(
    "deSerializedAccountRec = async(" + serializedAccountRec + ")"
  );
  logDetail("JS => serializedAccountRec:\n" + serializedAccountRec);
  let accountStruct = new AccountStruct();
  let elements = serializedAccountRec.split("\\,");
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i].trim();
    let keyValue = element.split(":");
    logDetail("JS => keyValue = " + keyValue);

    let key = keyValue[0].trim();
    let value = keyValue[1].trim();
    // logDetail("JS => key     = " + key);
    // logDetail("JS => value   = " + value);
    addAccountField(key, value, accountStruct);
  }

  logDetail("JS => scPrintStructureTest.js, accountStruct:");
  logDetail("JS => accountStruct               = " + JSON.stringify(accountStruct, 0, 2)
  );
  logDetail("JS => ============================================================================"
  );
  return accountStruct;
};
const hexToDecimal = hex => parseInt(hex, 16);
const bigIntToDecimal = bigInt => parseInt(bigInt, 10);

addAccountField = (key, value, accountStruct) => {
  logFunctionHeader("addAccountField = (" + key + "," + value + ")");
  switch (key.trim()) {
    case "accountKey":
      logDetail("JS => setting accountStruct.accountKey = " + value);
      accountStruct.accountKey = value;
      break;
    case "balanceOf":
      logDetail("JS => setting accountStruct.balanceOf = " + value);
      accountStruct.balanceOf = hexToDecimal(value);
    break;
    case "stakedSPCoins":
      logDetail("JS => setting accountStruct.stakedSPCoins = " + value);
      accountStruct.stakedSPCoins = hexToDecimal(value);
    break;
    case "decimals":
      logDetail("JS => setting accountStruct.decimals = " + value);
      accountStruct.decimals = hexToDecimal(value);
    break;
    case "insertionTime":
      logDetail("JS => setting accountStruct.insertionTime = " + value);
      accountStruct.insertionTime = hexToDecimal(value);
      break;
    case "inserted":
      logDetail("JS => setting accountStruct.inserted = " + value);
      accountStruct.inserted = value;
      break;
    case "verified":
      logDetail("JS => setting accountStruct.verified = " + value);
      accountStruct.verified = value;
      break;
    case "KYC":
      logDetail("JS => setting accountStruct.KYC = " + value);
      accountStruct.KYC = value;
      break;
    case "sponsorAccount2Keys":
      logDetail("JS => setting accountStruct.sponsorAccount2Keys = " + value);
      accountStruct.sponsorAccount2Keys = value;
      break;
    case "sponsorRecordList":
      logDetail("JS => setting accountStruct.sponsorRecordList = " + value);
      accountStruct.sponsorRecordList = value;
      break;
    case "agentAccountKeys":
      logDetail("JS => setting accountStruct.agentAccountKeys = " + value);
      accountStruct.agentAccountKeys = parseAddressStrRecord(value);
      break;
    case "patronAccountKeys":
      logDetail("JS => setting accountStruct.patronAccountKeys = " + value);
      accountStruct.patronAccountKeys = parseAddressStrRecord(value);
      break;
    default:
      break;
  }
};

parseAddressStrRecord = (strRecord) => {
  logFunctionHeader("parseAddressStrRecord = " + strRecord);
//  console.log("parseAddressStrRecord = " + strRecord);

  strRecord = strRecord.substring(0, strRecord.length - 1);
  addressStrRecord = strRecord.split(",");
  return addressStrRecord;
};

module.exports = {
  addAccountField,
  deSerializedAccountRec,
  hexToDecimal,
  bigIntToDecimal
};

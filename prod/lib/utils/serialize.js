const {
  AccountStruct,
  RecipientStruct,
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
  logExitFunction();
  return accountStruct;
};
const hexToDecimal = hex => parseInt(hex, 16);
const bigIntToDecimal = bigInt => parseInt(bigInt).toLocaleString('fullwide', {useGrouping:false});
// parseInt(bigInt, 10);

addAccountField = (key, value, accountStruct) => {
  logFunctionHeader("addAccountField = (" + key + "," + value + ")");
  // log("addAccountField = (" + key + "," + value + ")");
  switch (key.trim()) {
    case "accountKey":
      accountStruct.accountKey = value;
      break;
    case "balanceOf":
      accountStruct.balanceOf = bigIntToDecimal(value);
    break;
    case "stakedSPCoins":
      accountStruct.stakedSPCoins = hexToDecimal(value);
    break;
    case "decimals":
      accountStruct.decimals = hexToDecimal(value);
    break;
    case "insertionTime":
      accountStruct.insertionTime = hexToDecimal(value);
      break;
    case "inserted":
      accountStruct.inserted = value;
      break;
    case "verified":
      accountStruct.verified = value;
      break;
    case "KYC":
      accountStruct.KYC = value;
      break;
      case "sponsorAccountList":
        accountStruct.sponsorAccountList = parseAddressStrRecord(value);
        break;
      case "recipientAccountList":
        accountStruct.recipientAccountList = parseAddressStrRecord(value);
      break;
      case "agentAccountList":
          accountStruct.agentAccountList = parseAddressStrRecord(value);
        break;
      case "agentsParentRecipientAccountList":
        accountStruct.agentsParentRecipientAccountList = parseAddressStrRecord(value);
      break;
      case "recipientRecordList":
        accountStruct.recipientRecordList = value;
      break;
    default:
      break;
  }
  logExitFunction();
};

parseAddressStrRecord = (strRecord) => {
  if (strRecord == "") {
    logExitFunction();
    return [];
  }
  else {
    logFunctionHeader("parseAddressStrRecord = " + strRecord + ")");
    addressStrRecord = strRecord.split(",");
    logExitFunction();
    return addressStrRecord;
  }
};

module.exports = {
  addAccountField,
  deSerializedAccountRec,
  hexToDecimal,
  bigIntToDecimal
};

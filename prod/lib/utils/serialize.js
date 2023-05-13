// const {  spCoinContractDeployed } = require("../contracts/spCoin");
// const { BigNumber, ethers, utils } = require("ethers");
const { SpCoinLogger } = require("./logging");
const { bigIntToDateTimeString,
        bigIntToDecString,
        bigIntToHexString,
        bigIntToString } = require("./dateTime");
const {
  AccountStruct,
  RecipientStruct,
  AgentStruct,
  AgentRateStruct,
  TransactionStruct,
} = require("../spCoinDataTypes");

/*
const bigIntToDateTimeString = ( _value ) => { 
  let milliSecs = bigIntToDecMilliSecs(_value);

  const options = { month: "long", 
  // era: 'long',
  day: "numeric", 
  year: "numeric",
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'short'};
  const date = new Date(1683963292000);
  const dateString = new Intl.DateTimeFormat("en-US", options).format(milliSecs);
  let location = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  return dateString + " " + location;
};

const bigIntToDecMilliSecs = ( _value ) => { return bigIntToDecString(_value) + "000"; };
const bigIntToDecString = ( _value ) => { return bigIntToString(_value, 10); };
const bigIntToHexString = ( _value ) => { return bigIntToString(_value, 16); };
const bigIntToString = ( _value, _base ) => { return BigInt(_value).toString(_base); };
*/

let spCoinLogger;

class SpCoinSerialize {
  constructor( _spCoinContractDeployed) {
    if ( _spCoinContractDeployed != undefined) {
      this.spCoinContractDeployed = _spCoinContractDeployed;
      spCoinLogger = new SpCoinLogger(_spCoinContractDeployed);
      this.setSigner(_spCoinContractDeployed.signer);
    }
  }

  setSigner = (_signer) => {
    this.signer = _signer;
  }

  setContract = ( _spCoinContractDeployed ) => {
    this.spCoinContractDeployed = _spCoinContractDeployed;
    this.signer = _spCoinContractDeployed.signer;
  };

  deSerializedAccountRec = async ( _serializedAccountRec ) => {
    // LOG_DETAIL = true;
    spCoinLogger.logFunctionHeader(
      "deSerializedAccountRec = async(" + _serializedAccountRec + ")"
    );
    spCoinLogger.logDetail("JS => _serializedAccountRec:\n" + _serializedAccountRec);
    let accountStruct = new AccountStruct();
    let elements = _serializedAccountRec.split("\\,");
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i].trim();
      let keyValue = element.split(":");
      spCoinLogger.logDetail("JS => keyValue = " + keyValue);

      let key = keyValue[0].trim();
      let value = keyValue[1].trim();
      // spCoinLogger.logDetail("JS => key     = " + key);
      // spCoinLogger.logDetail("JS => value   = " + value);
      this.addAccountField(key, value, accountStruct);
    }

    spCoinLogger.logDetail("JS => scPrintStructureTest.js, accountStruct:");
    spCoinLogger.logDetail("JS => accountStruct               = " + JSON.stringify(accountStruct, 0, 2)
    );
    spCoinLogger.logDetail("JS => ============================================================================"
    );
    spCoinLogger.logExitFunction();
    return accountStruct;
  };

  addAccountField = ( _key, _value, accountStruct ) => {
    spCoinLogger.logFunctionHeader("addAccountField = (" + _key + "," + _value + ")");
    //spCoinLogger.log("addAccountField = (" + _key + "," + _value + ")");
    switch (_key.trim()) {
      case "accountKey":
        accountStruct.accountKey = _value;
        break;
      case "balanceOf":
        accountStruct.balanceOf = bigIntToDecString(_value);
      break;
      case "stakedSPCoins":
        accountStruct.stakedSPCoins = bigIntToDecString(_value);
      break;
      case "decimals":
        accountStruct.decimals = bigIntToDecString(_value);
      break;
      case "insertionTime":
        accountStruct.insertionTime = bigIntToDateTimeString(_value);
        break;
      case "inserted":
        accountStruct.inserted = _value;
        break;
      case "verified":
        accountStruct.verified = _value;
        break;
      case "KYC":
        accountStruct.KYC = _value;
        break;
        case "sponsorAccountList":
          accountStruct.sponsorAccountList = this.parseAddressStrRecord(_value);
          break;
        case "recipientAccountList":
          accountStruct.recipientAccountList = this.parseAddressStrRecord(_value);
        break;
        case "agentAccountList":
            accountStruct.agentAccountList = this.parseAddressStrRecord(_value);
          break;
        case "agentsParentRecipientAccountList":
          accountStruct.agentsParentRecipientAccountList = this.parseAddressStrRecord(_value);
        break;
        case "recipientRecordList":
          accountStruct.recipientRecordList = _value;
        break;
      default:
        break;
    }
    spCoinLogger.logExitFunction();
  };

  parseAddressStrRecord = ( strRecord ) => {
    if (strRecord == "") {
      spCoinLogger.logExitFunction();
      return [];
    }
    else {
      spCoinLogger.logFunctionHeader("parseAddressStrRecord = " + strRecord + ")");
      let addressStrRecord = strRecord.split(",");
      spCoinLogger.logExitFunction();
      return addressStrRecord;
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  getSerializedRecipientRateList = async (_sponsorKey, _recipientKey, _recipientRateKey ) => {
    // console.log("==>11 getSerializedRecipientRecordList = async(" + _sponsorKey + ", " + _recipientKey + ", "+ _recipientRateKey + ", " + ")");
    spCoinLogger.logFunctionHeader("getSerializedRecipientRateList = async(" + _sponsorKey + _recipientKey + ", " + _recipientRateKey + ")");
      let recipientRateRecordStr = await this.spCoinContractDeployed.connect(this.signer).getSerializedRecipientRateList(_sponsorKey, _recipientKey, _recipientRateKey);
    let recipientRateList = recipientRateRecordStr.split(",");
    spCoinLogger.logExitFunction();
    return recipientRateList;
  }

  getSerializedRecipientRecordList = async(_sponsorKey, _recipientKey) => {
    // console.log("==>7 getSerializedRecipientRecordList = async(" + _sponsorKey + ", " + _recipientKey+ ", " + ")");
    spCoinLogger.logFunctionHeader("getSerializedRecipientRecordList = async(" + _sponsorKey + ", " + _recipientKey+ ", " + ")");
    let recipientRecordStr = await this.spCoinContractDeployed.connect(this.signer).getSerializedRecipientRecordList(_sponsorKey, _recipientKey);
    let recipientRecordList = recipientRecordStr.split(",");
    spCoinLogger.logExitFunction();
    return recipientRecordList;
  }

  getSerializedAgentRateList = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
    // console.log("==>19 getSerializedAgentRateList = async(", _recipientKey, _recipientRateKey, _agentKey, _agentRateKey, ")");
    spCoinLogger.logFunctionHeader("getSerializedAgentRateList = async(" + _sponsorKey + ", " + _recipientKey + ", " + _agentKey + ", " + _agentRateKey + ")");
    let agentRateRecordStr = await this.spCoinContractDeployed.connect(this.signer).serializeAgentRateRecordStr(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
    let agentRateRecordStrList = agentRateRecordStr.split(",");
    spCoinLogger.logExitFunction();
    return agentRateRecordStrList;
  }

  getSerializedAccountRecord = async (_accountKey) => {
    // console.log("==>3 getSerializedAccountRecord = async(" + _accountKey + ")");
    spCoinLogger.logFunctionHeader("getSerializedAccountRecord = async(" + _accountKey + ")");
    let serializedAccountRec =
      await this.spCoinContractDeployed.connect(this.signer).getSerializedAccountRecord(_accountKey);
      spCoinLogger.logExitFunction();
    return this.deSerializedAccountRec(serializedAccountRec);
  };

}

module.exports = {
  SpCoinSerialize,
  bigIntToDateTimeString,
  bigIntToDecString,
  bigIntToHexString,
  bigIntToString,
  // deSerializedAccountRec,
  // getSerializedRecipientRateList
};

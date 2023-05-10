// const {  spCoinContractDeployed } = require("../contracts/spCoin");
// const { BigNumber, ethers, utils } = require("ethers");
const {
  AccountStruct,
  RecipientStruct,
  AgentStruct,
  AgentRateStruct,
  TransactionStruct,
} = require("../spCoinDataTypes");

const bigIntToDecString = ( _value ) => { return bigIntToString(_value, 10) };
const bigIntToHexString = ( _value ) => { return bigIntToString(_value, 16) };
const bigIntToString = ( _value, _base ) => { let dec = BigInt(_value); return dec.toString(_base) };

class SpCoinSerialize {
  constructor( _spCoinContractDeployed) {
    console.log("constructor called with " + _spCoinContractDeployed);
    this.spCoinContractDeployed = _spCoinContractDeployed;
    // this.signer = _spCoinContractDeployed.signer;
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
    logFunctionHeader(
      "deSerializedAccountRec = async(" + _serializedAccountRec + ")"
    );
    logDetail("JS => _serializedAccountRec:\n" + _serializedAccountRec);
    let accountStruct = new AccountStruct();
    let elements = _serializedAccountRec.split("\\,");
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i].trim();
      let keyValue = element.split(":");
      logDetail("JS => keyValue = " + keyValue);

      let key = keyValue[0].trim();
      let value = keyValue[1].trim();
      // logDetail("JS => key     = " + key);
      // logDetail("JS => value   = " + value);
      this.addAccountField(key, value, accountStruct);
    }

    logDetail("JS => scPrintStructureTest.js, accountStruct:");
    logDetail("JS => accountStruct               = " + JSON.stringify(accountStruct, 0, 2)
    );
    logDetail("JS => ============================================================================"
    );
    logExitFunction();
    return accountStruct;
  };

  addAccountField = ( _key, _value, accountStruct ) => {
    logFunctionHeader("addAccountField = (" + _key + "," + _value + ")");
    // log("addAccountField = (" + _key + "," + _value + ")");
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
        accountStruct.insertionTime = bigIntToDecString(_value);
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
    logExitFunction();
  };

  parseAddressStrRecord = ( strRecord ) => {
    if (strRecord == "") {
      logExitFunction();
      return [];
    }
    else {
      logFunctionHeader("parseAddressStrRecord = " + strRecord + ")");
      let addressStrRecord = strRecord.split(",");
      logExitFunction();
      return addressStrRecord;
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  getSerializedRecipientRateList = async (_sponsorKey, _recipientKey, _recipientRateKey ) => {
    // console.log("==>11 getSerializedRecipientRecordList = async(" + _sponsorKey + ", " + _recipientKey + ", "+ _recipientRateKey + ", " + ")");
    logFunctionHeader("getSerializedRecipientRateList = async(" + _sponsorKey + _recipientKey + ", " + _recipientRateKey + ")");
      let recipientRateRecordStr = await this.spCoinContractDeployed.connect(this.signer).getSerializedRecipientRateList(_sponsorKey, _recipientKey, _recipientRateKey);
    let recipientRateList = recipientRateRecordStr.split(",");
    logExitFunction();
    return recipientRateList;
  }

  getSerializedRecipientRecordList = async(_sponsorKey, _recipientKey) => {
    // console.log("==>7 getSerializedRecipientRecordList = async(" + _sponsorKey + ", " + _recipientKey+ ", " + ")");
    logFunctionHeader("getSerializedRecipientRecordList = async(" + _sponsorKey + ", " + _recipientKey+ ", " + ")");
    let recipientRecordStr = await this.spCoinContractDeployed.connect(this.signer).getSerializedRecipientRecordList(_sponsorKey, _recipientKey);
    let recipientRecordList = recipientRecordStr.split(",");
    logExitFunction();
    return recipientRecordList;
  }

  getSerializedAgentRateList = async(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey) => {
    // console.log("==>19 getSerializedAgentRateList = async(", _recipientKey, _recipientRateKey, _agentKey, _agentRateKey, ")");
    logFunctionHeader("getSerializedAgentRateList = async(" + _sponsorKey + ", " + _recipientKey + ", " + _agentKey + ", " + _agentRateKey + ")");
    let agentRateRecordStr = await this.spCoinContractDeployed.connect(this.signer).serializeAgentRateRecordStr(_sponsorKey, _recipientKey, _recipientRateKey, _agentKey, _agentRateKey);
    let agentRateRecordStrList = agentRateRecordStr.split(",");
    logExitFunction();
    return agentRateRecordStrList;
  }

  getSerializedAccountRecord = async (_accountKey) => {
    // console.log("==>3 getSerializedAccountRecord = async(" + _accountKey + ")");
    logFunctionHeader("getSerializedAccountRecord = async(" + _accountKey + ")");
    let serializedAccountRec =
      await this.spCoinContractDeployed.connect(this.signer).getSerializedAccountRecord(_accountKey);
      logExitFunction();
    return this.deSerializedAccountRec(serializedAccountRec);
  };

}

module.exports = {
  SpCoinSerialize,
  bigIntToDecString,
  bigIntToHexString,
  bigIntToString,
  // deSerializedAccountRec,
  // getSerializedRecipientRateList
};

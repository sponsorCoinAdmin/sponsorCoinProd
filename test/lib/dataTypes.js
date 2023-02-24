const EOLN = "\n";
let prefix = "";
let indentation = 2;

class AccountStruct {
  constructor(_accountKey) {
    this.index;
    this.accountKey = _accountKey;
    this.insertionTime;
    this.inserted;
    this.verified;
    this.KYC;
    this.sponsorKeys = {};
    this.sponsorArr = [];
    this.sponsorMap = new Map();
  }

//   toString = () => {
//     let str = prefix + "index         = " + this.index + EOLN;
//     str += prefix + "accountKey    = " + this.accountKey + EOLN;
//     str += prefix + "insertionTime = " + this.insertionTime + EOLN;
//     str += prefix + "inserted      = " + this.inserted + EOLN;
//     str += prefix + "verified      = " + this.verified + EOLN;
//     str += prefix + "KYC           = " + this.KYC + EOLN;
//     str += prefix + "sponsorKeys   = " + this.sponsorKeys.toString() + EOLN;
//     str += prefix + "sponsorMap    = " + this.sponsorMap;

//     dumpMap("sponsorKey", this.sponsorMap);

//     return str;
//   };
}

class SponsorStruct {
  constructor(_sponsorKey) {
    this.index;
    this.parentAccountKey;
    this.sponsorKey = _sponsorKey;
    this.insertionTime;
    this.inserted;
    this.verified;
    this.rates;
    this.verified;
    this.agentKeys = {};
    this.agentArr = [];
    this.agentMap = new Map();
  }

//   toString = () => {
//     let str = prefix + "index            = " + this.index + EOLN;
//     str += prefix + "parentAccountKey = " + this.parentAccountKey + EOLN;
//     str += prefix + "sponsorKey       = " + this.sponsorKey + EOLN;
//     str += prefix + "insertionTime    = " + this.insertionTime + EOLN;
//     str += prefix + "inserted         = " + this.inserted + EOLN;
//     str += prefix + "verified         = " + this.verified + EOLN;
//     str += prefix + "rates            = " + this.rates + EOLN;
//     str += prefix + "verified         = " + this.verified;
//     str += prefix + "agentKeys        = " + this.agentKeys.toString() + EOLN;
//     str += prefix + "agentMap         = " + this.agentMap.toString();

//     dumpMap("agentKey", this.agentMap);

//     return str;
//   };
}

class AgentStruct {
  constructor(_agentKey) {
    this.index;
    this.parentSponsorKey;
    this.agentKey = _agentKey;
    this.insertionTime;
    this.inserted;
    this.verified;
    this.rates;
    this.rateMap;
  }
//   toString = () => {
//     let str = prefix + "index            = " + this.index + EOLN;
//     str += prefix + "parentSponsorKey = " + this.parentSponsorKey + EOLN;
//     str += prefix + "agentKey         = " + this.agentKey + EOLN;
//     str += prefix + "insertionTime    = " + this.insertionTime + EOLN;
//     str += prefix + "inserted         = " + this.inserted + EOLN;
//     str += prefix + "verified         = " + this.verified + EOLN;
//     str += prefix + "rates            = " + this.rates;
//     //        str    += prefix + "rateMap          = " + this.rateMap;

//     return str;
//   };
}

class RateHeaderStruct {
  constructor(_rate) {
    this.insertionTime;
    this.lastUpdateTime;
    this.totalQuantity;
    this.rate = new Map();
    this.TransactionStruct = [];
  }
}

class TransactionStruct {
  constructor(_quantity) {
    this.insertionTime;
    this.quantity = _quantity;
  }
}

dumpMap = (keyName, map) => {
  indent();
  for (const [key, value] of map) {
    console.log(prefix + keyName + " " + key + ":");
    indent();
    console.log(value);
    outdent();
  }
  outdent();
};

indent = () => {
  for (let i = 0; i < indentation; i++) {
    prefix += " ";
  }
};

outdent = () => {
  prefix = prefix.slice(0, indentation);
};

module.exports = {
  AccountStruct,
  SponsorStruct,
  AgentStruct,
  RateHeaderStruct,
  TransactionStruct,
  dumpMap,
};

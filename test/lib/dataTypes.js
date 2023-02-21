const EOLN = "\n"

class AccountStruct {
    constructor(_accountKey) {
        this.index;
        this.accountKey = _accountKey;
        this.insertionTime;
        this.inserted;
        this.verified;
        this.KYC;   
        this.sponsorKeys = [];
        this.sponsorMap = new Map;
      }

      toString = (_prefix) => {
        let str = _prefix + "index         = " + this.index + EOLN;
        str    += _prefix + "accountKey    = " + this.accountKey + EOLN;
        str    += _prefix + "insertionTime = " + this.insertionTime + EOLN;
        str    += _prefix + "inserted      = " + this.inserted + EOLN;
        str    += _prefix + "verified      = " + this.verified + EOLN;
        str    += _prefix + "KYC           = " + this.KYC + EOLN;
        str    += _prefix + "sponsorKeys   = " + this.sponsorKeys.toString(_prefix) + EOLN;
        str    += _prefix + "sponsorMap    = " + this.sponsorMap.toString(_prefix) + EOLN;
        return(str);
    }

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
        this.agentKeys = [];
        this.agentMap = new Map;
    }

    toString = (_prefix) => {
        let str = _prefix + "index            = " + this.index + EOLN;
        str    += _prefix + "parentAccountKey = " + this.parentAccountKey + EOLN;
        str    += _prefix + "sponsorKey       = " + this.sponsorKey + EOLN;
        str    += _prefix + "insertionTime    = " + this.insertionTime + EOLN;
        str    += _prefix + "inserted         = " + this.inserted + EOLN;
        str    += _prefix + "verified         = " + this.verified + EOLN;
        str    += _prefix + "rates            = " + this.rates + EOLN;
        str    += _prefix + "verified         = " + this.verified + EOLN;
        str    += _prefix + "agentKeys        = " + this.agentKeys.toString() + EOLN;
        str    += _prefix + "agentMap         = " + this.agentMap.toString() + EOLN;
        return(str);
    }
}

class AgentStruct {
    constructor(_agentKey) {
        this.index;
        this.parentSponsorKey;
        this.agentKey = _agentKey;
        this.insertionTime
        this.inserted;
        this.verified;
        this.rates = new Map;
        this.rateMap = new Map;
    }
    toString = (_prefix) => {
        let str = _prefix + "index            = " + this.index + EOLN;
        str    += _prefix + "parentSponsorKey = " + this.parentSponsorKey + EOLN;
        str    += _prefix + "agentKey         = " + this.agentKey + EOLN;
        str    += _prefix + "insertionTime    = " + this.insertionTime + EOLN;
        str    += _prefix + "inserted         = " + this.inserted + EOLN;
        str    += _prefix + "verified         = " + this.verified + EOLN;
        str    += _prefix + "rates            = " + this.rates + EOLN;
        str    += _prefix + "verified         = " + this.verified + EOLN;
        str    += _prefix + "rateMap         = " + this.rateMap.toString() + EOLN;
        return(str);
    }
 }

class RateHeaderStruct {
    constructor(_rate) {
        this.insertionTime;
        this.lastUpdateTime;
        this.totalQuantity;
        this.rate = new Map;
        this.TransactionStruct = [];
    }
}

class TransactionStruct {
    constructor(_quantity) {
        this.insertionTime;
        this.quantity = _quantity;
     }
 }

module.exports = {
    AccountStruct,
    SponsorStruct,
    AgentStruct,
    RateHeaderStruct,
    TransactionStruct
}

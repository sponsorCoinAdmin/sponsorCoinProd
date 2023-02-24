const { expect } = require("chai");
const {} = require("./lib/loadTreeStructures");
const { testHHAccounts } = require("./lib/hhTestAccounts");
const {   setContract,
          insertAccounts,
          insertSponsorAccounts,
          insertAgentAccounts,
          getInsertedAccounts,
          getInsertedAccountSponsors, 
          getInsertedSponsorAgents,
    } = require("./lib/scAccountMethods");

const { AccountStruct,
        SponsorStruct,
        AgentStruct,
        RateHeaderStruct,
        TransactionStruct
    } = require("./lib/dataTypes");

const {     
    LOG_MODE,
    logSetup,
    setLogDefaults,
    setIndentPrefixLevel,
    setLogMode,
    logTestHeader,
    logFunctionHeader,
    logDetail,
    log
} = require("./lib/logging");

let account;
let sponsor;
let agent;

let spCoinContractDeployed;

logSetup("JAVASCRIPT => Setup Test");

describe("spCoinContract", function() {
    let spCoinContract;
    let msgSender;
    beforeEach(async() =>  {
        spCoinContract = await hre.ethers.getContractFactory("SPCoin");
        logSetup("JAVASCRIPT => spCoinContract retreived from Factory");

        logSetup("JAVASCRIPT => Deploying spCoinContract to Network");
        spCoinContractDeployed = await spCoinContract.deploy();
        logSetup("JAVASCRIPT => spCoinContract is being mined");

        await spCoinContractDeployed.deployed();
        logSetup("JAVASCRIPT => spCoinContract Deployed to Network");
        msgSender = await spCoinContractDeployed.msgSender();

        setContract(spCoinContractDeployed);
        setLogDefaults();
    });

    it("Dump Sponsor Coin Records", async function () {
        log("DUMP Sponsor Coin Records");
        // USAGE: insertSponsorAccounts(_accountRecIdx, _startSpIdx, _lastSpIdx);
        await insertSponsorAccounts(2, [1, 7, 14, 7, 18, 9]);
        await insertSponsorAccounts(3, [14, 17]);
        await insertSponsorAccounts(1, [5, 11, 13,15]);
        await insertSponsorAccounts(14, [18, 19, 7]);
        await insertSponsorAccounts(3, [4]);
        await insertSponsorAccounts(1, [2, 5]);
        await insertSponsorAccounts(11, [5, 9, 0]);

//        USAGE: insertAgentAccounts(_accountRecIdx, _sponsorRecIdx, _startAgIdx, _lastAgIdx);
        await insertAgentAccounts(1, 5, [7, 2, 17, 3, 9, 19]);
        await insertAgentAccounts(3, 6, [1]);
        await insertAgentAccounts(11, 18, [5, 7, 9, 6]);
        await insertAgentAccounts(14, 7, [1, 11, 0, 12, 2]);
        await insertAgentAccounts(14, 2, [3]);
        await insertAgentAccounts(14, 3, [1, 2]);
        await insertAgentAccounts(0, 2, [6, 7, 16]);

        let accountArr = await loadTreeStructures(spCoinContractDeployed);
        console.log(JSON.stringify(accountArr, null, 2));


        // console.log(JSON.stringify(accountMap, null, 4));
        // console.log ("AAAAAAAAAAAAAAAAAAAAAAAA *** TESTING *** AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        // console.log(accountMap);

        // testMap = new Map;

        // let accountStruct = new AccountStruct(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
        // let sponsorStruct1 = new SponsorStruct(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
        // let sponsorStruct2 = new SponsorStruct(2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
        // accountStruct.sponsorMap.set(123, sponsorStruct1);
        // accountStruct.sponsorMap.set(456, sponsorStruct2);
        // testMap.set(1, accountStruct);
        // testMap.set(2, new AccountStruct(2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2));
        // testMap.set(3, new AccountStruct(3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3));
        // console.log(testMap);

        // console.log("0000000000000000000000000000000000000000000000000000000000000000");
        // console.log(JSON.stringify(accountMap, null, indent));
        // console.log("1111111111111111111111111111111111111111111111111111111111111111");
        // console.log(JSON.stringify(accountMap.entries(), null, indent));
        // console.log("2222222222222222222222222222222222222222222222222222222222222222");
        // console.log(JSON.stringify(Array.from(accountMap), null, indent));
        // console.log("3333333333333333333333333333333333333333333333333333333333333333");
        // console.log(JSON.parse(JSON.stringify([...accountMap], null, indent)));
        // console.log("4444444444444444444444444444444444444444444444444444444444444444");
        // console.log(JSON.parse(JSON.stringify(Array.from(accountMap.entries())), null, indent));
        // console.log("5555555555555555555555555555555555555555555555555555555555555555");
        // console.log(JSON.stringify(stringifyMap(accountMap)));
        // console.log("6666666666666666666666666666666666666666666666666666666666666666");
        // jsonString = JSON.stringify(serialize(accountMap), null, indent);
        // jsonString = jsonString.replace(/\\"*/g, '"');
        // jsonString = jsonString.substring(1, jsonString.length - 1);
        // jsonString = JSON.parse(jsonString);
        // console.log(jsonString);

    //    dumpTreeStructures(accountMap);
    });
});

function stringifyMap(myMap) {
    function selfIterator(map) {
        return Array.from(map).reduce((acc, [key, value]) => {
            if (value instanceof Map) {
                acc[key] = selfIterator(value);
            } else {
                acc[key] = value;
            }

            return acc;
        }, {})
    }

    const res = selfIterator(myMap)
    return JSON.stringify(res);
}

const serialize = (value) => JSON.stringify(value, stringifyReplacer);
const deserialize = (text) => JSON.parse(text, parseReviver);

// License: CC0
function stringifyReplacer(key, value) {
  if (typeof value === "object" && value !== null) {
    if (value instanceof Map) {
      return {
        _meta: { type: "map" },
        value: Array.from(value.entries()),
      };
    } else if (value instanceof Set) { // bonus feature!
      return {
        _meta: { type: "set" },
        value: Array.from(value.values()),
      };
    } else if ("_meta" in value) {
      // Escape "_meta" properties
      return {
        ...value,
        _meta: {
          type: "escaped-meta",
          value: value["_meta"],
        },
      };
    }
  }
  return value;
}

function parseReviver(key, value) {
  if (typeof value === "object" && value !== null) {
    if ("_meta" in value) {
      if (value._meta.type === "map") {
        return new Map(value.value);
      } else if (value._meta.type === "set") {
        return new Set(value.value);
      } else if (value._meta.type === "escaped-meta") {
        // Un-escape the "_meta" property
        return {
          ...value,
          _meta: value._meta.value,
        };
      } else {
        console.warn("Unexpected meta", value._meta);
      }
    }
  }
  return value;
}
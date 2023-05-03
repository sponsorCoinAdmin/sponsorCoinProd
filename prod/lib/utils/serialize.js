// const { BigNumber } = require('bignumber.js');
// const { ethers } = require("ethers");

const { BigNumber, ethers, utils } = require("ethers");

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
      console.log("balanceOf: " + value + "," + accountStruct.balance)
      // convert("115792089237316195423570985008687907853269984665640564039457584007913129639935");
      //convert("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
      // let dec = h2d("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");

      // console.log("ZZZZZ DEC = " + dec);
      // dec = h2d(value);
      console.log("ZZZZZ value", value, "= DEC", + h2d(value));

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

//////////////////////////////////////////////////////////////////////////////////////////////////////

function h2d(s) {

  function add(x, y) {
      var c = 0, r = [];
      var x = x.split('').map(Number);
      var y = y.split('').map(Number);
      while(x.length || y.length) {
          var s = (x.pop() || 0) + (y.pop() || 0) + c;
          r.unshift(s < 10 ? s : s - 10); 
          c = s < 10 ? 0 : 1;
      }
      if(c) r.unshift(c);
      return r.join('');
  }

  var dec = '0';
  s.split('').forEach(function(chr) {
    console.log("S=",s,"chr=",chr);
      var n = parseInt(chr, 16);
      for(var t = 8; t; t >>= 1) {
          dec = add(dec, dec);
          if(n & t) dec = add(dec, '1');
      }
  });
  return dec;
}

function convert(hex) {
  console.log(">>>>>>>>>>>>>>converting hex: " + hex);
//  var hex = document.calcform.x.value;
//  hex = hex.replace("0x","");
//  hex = hex.replace("0X","");
//  try {
  //  var x = new BigNumber(hex, 16);
   console.log(">>>>>>>>>>>>>>converting BigNumber.from(hex).toString()   : " + BigNumber.from(hex).toString());
   console.log(">>>>>>>>>>>>>>converting BigNumber.from(hex).toHexString(): " + BigNumber.from(hex).toHexString());
   console.log("=====================================================");

//    xelem.style.backgroundColor = "white";
//  }
//  catch(err) {
//    xelem.style.backgroundColor = "#fff0f0";
//    return;
//  }
/*
 var xx=x.toString(10);
//  yelem.value = xx;
 y3elem = x.toString(2);
 if( x.isInt() && x.gte(0) ) {
   if( hex.length==2 && x.gte("80", 16) ) { x=x.minus("100",16); }
   if( hex.length==4 && x.gte("8000", 16) ) { x=x.minus("10000",16); }
   if( hex.length==8 && x.gte("80000000", 16) ) { x=x.minus("100000000",16); }
   var t1 = new BigNumber("8000000000000000",16);
   var t2 = new BigNumber("10000000000000000",16);
   if( hex.length==16 && x.gte(t1) ) { x=x.minus(t2); }
   if( hex.length==2 || hex.length==4 || hex.length==8 || hex.length==16 )
     y2elem.value = x.toString(10);
   else
     y2elem.value = "N/A";
 }
 else
   y2elem.value = "N/A";
  //  var yd=yelem.value.match(/\d/g);
  var y2d=y2elem.value.match(/\d/g);
  var y3d=y3elem.match(/\d/g);
  //  var ylabel="Decimal number";
   var y2label="Decimal from signed 2's complement";
   var y3label="Binary number";
  //  if( yd!=null ) ylabel+=" ("+yd.length+((yd.length==1)?" digit)":" digits)");
   if( y2d!=null ) y2label+=" ("+y2d.length+((y2d.length==1)?" digit)":" digits)");
   if( y3d!=null ) y3label+=" ("+y3d.length+((y3d.length==1)?" digit)":" digits)");
//  document.getElementById("ylabel").innerHTML = ylabel;
//  document.getElementById("y2label").innerHTML = y2label;
//  document.getElementById("y3label").innerHTML = y3label;
 hex=hex.toUpperCase();
 var txt="("+hex+")\u2081\u2086 = ";
 var d,e,minus=false;
 var len=hex.length;
 if( hex[0]=="-" ) { txt+="-["; hex=hex.substr(1); len--; minus=true; }
//  var idot=hex.indexOf(".");
 if( idot>=0 ) { hex=hex.substring(0,idot)+hex.substring(idot+1,len); len--; }
//  else idot=len;
//  etbl = ["\u2070","\u00B9","\u00B2","\u00B3","\u2074","\u2075","\u2076","\u2077","\u2078","\u2079"];
 for(var i=0; i<len; i++) {
   d = hex.charCodeAt(i);
   if( d<58 ) d-=48;
   else if( d>64 ) d-=55;
   //e = len-i-1;
   e = idot-i-1;
   e=e.toString();
   txt+="("+d+" \u00D7 16";
   for(var k=0; k<e.length; k++)
     if( e[k]=="-" )
       txt+="\u207B";
     else
       txt+=etbl[e[k]];
   txt+=")";
   if( i<len-1 ) txt+=" + ";
 }
 if( minus ) txt+="]";
 txt+=" = ("+xx+")\u2081\u2080";
 document.getElementById("y4").value = txt;
 */
}


module.exports = {
  addAccountField,
  deSerializedAccountRec,
  hexToDecimal,
  bigIntToDecimal
};

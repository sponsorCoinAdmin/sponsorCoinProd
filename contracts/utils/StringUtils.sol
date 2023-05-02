// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract StringUtils {
// string public text;

   uint8 decimal = 46;

   function concat(address addr1, address addr2) internal pure returns (string memory) {
      string memory a = toString(addr1);
      string memory b = toString(addr2);
      return string(abi.encodePacked(a, ",", b, "", ""));
   }

   function concat(address addr1, address addr2, address addr3) internal pure returns (string memory) {
      string memory a = toString(addr1);
      string memory b = toString(addr2);
      string memory c = toString(addr3);
      return string(abi.encodePacked(a, ",", b, ",", c));
   }

   function concat(string memory a, string memory b) internal pure returns (string memory) {
      return string(abi.encodePacked(a, b, "", "", ""));
   }

   function concat(string memory a, string memory b, string memory c) internal pure returns (string memory) {
      return string(abi.encodePacked(a, b, c, "", ""));
   }

   function concat(string memory a, string memory b, string memory c, string memory d) internal pure returns (string memory) {
      return string(abi.encodePacked(a, b, c, d, ""));
   }

   function concat(string memory a, string memory b, string memory c, string memory d, string memory e) internal pure returns (string memory) {
      return string(abi.encodePacked(a, b, c, d, e));
   }

   function toString(address account) internal pure returns(string memory) {
      return toString(abi.encodePacked(account));
   }

   function toString(uint256 value) internal pure returns(string memory) {
      return toString(abi.encodePacked(value));
   }

    function toString(bytes32 value) internal pure returns(string memory) {
      return toString(abi.encodePacked(value));
    }

   function toString(bool value) internal pure returns(string memory) {
      string memory strValue  = (value == true ? "true" : "false");
      return strValue;
   }

   function toString(address[] storage arrValues) internal view returns(string memory) {
      string memory strArrValue  = "";
      for (uint i = 0; i < arrValues.length; i++) {
          if (i == 0) {
              strArrValue = concat(strArrValue, toString(arrValues[i]));
          }
          else {
              strArrValue = concat(strArrValue, ",", toString(arrValues[i]));
          }
         //  console.log(arrValues[i]);
      }
      return strArrValue;
  }

  function toString(bytes memory data) internal pure returns(string memory) {
       bytes memory alphabet = "0123456789abcdef";

       bytes memory str = new bytes(2 + data.length * 2);
       str[0] = "0";
       str[1] = "x";
       for (uint i = 0; i < data.length; i++) {
           str[2+i*2] = alphabet[uint(uint8(data[i] >> 4))];
           str[3+i*2] = alphabet[uint(uint8(data[i] & 0x0f))];
       }
       return string(str);
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////
   function decimalStringToUint(string memory _strWholeAmount, string memory _strFloatAmount, uint256 decimals)
      internal view returns(uint256 uint256Value, bool err) {
         // console.log("_strWholeAmount", _strWholeAmount); 
         // console.log("_strFloatAmount", _strFloatAmount); 
         // console.log("decimalStringToUint(", _strWholeAmount, _strFloatAmount); 
   
         bool success;
         uint256 wholeAmount;
         uint256 floatAmount;
         (wholeAmount, success) = strToUint(_strWholeAmount);
         (floatAmount, success) = strToUint(_strFloatAmount);
         wholeAmount *= 10**decimals;
         floatAmount *= 10**(decimals - bytes(_strFloatAmount).length);
         uint256Value =  wholeAmount + floatAmount;

         // console.log("strToUint(_strWholeAmount)", wholeAmount); 
         // console.log("strToUint(_strFloatAmount)", floatAmount); 
         // console.log("decimalStringToUint(", wholeAmount, floatAmount);
   
         return (uint256Value, true);
   }

   function strToUint(string memory _strWholeAmount) public view returns(uint256 result, bool err) {
      for (uint256 i = 0; i < bytes(_strWholeAmount).length; i++) {
         uint8 asciiValue = uint8(bytes(_strWholeAmount)[i]);
         // console.log("asciiValue at ", i, " = ", asciiValue);

          if ((asciiValue < 48)  || (asciiValue > 57)) {
              return (0, false);
          }
          result += (uint8(bytes(_strWholeAmount)[i]) - 48) * 10**(bytes(_strWholeAmount).length - i - 1);
         //  console.log("decimalStringToUint uint256Value = ", result);
         }   
      return (result, true);
   }
}

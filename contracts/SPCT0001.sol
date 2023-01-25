// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
// use latest solidity version at time of writing, need not worry about overflow and underflow

/// @title ERC20 Contract

contract SPC_Token {
    // My Variables
    string public name;
    string public symbol;
    uint256 public decimals;
    uint256 public totalSupply;

    // Robin Added New
    address[] public accountKeys;
    mapping(address => uint)  indexOf;
    mapping(address => bool)  inserted;

    struct account {
        uint256 balance;
        address sponsor;
        address agent;
        uint sponsoredTime;
    }

    // Keep track balances and allowances approved
    mapping(address => account)  accounts;
    mapping(address => mapping(address => uint256)) public allowance;

    // Events - fire events on state changes etc
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() {
        name = "SCT0001";
        symbol = "SCT001";
        decimals = 18;
        totalSupply = 100000000000000000000000000; 
        initToken(name, symbol, decimals, totalSupply);
    }

    function initToken(string memory _name, string memory _symbol, uint _decimals, uint _totalSupply) internal{
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _totalSupply; 
        setBalance(msg.sender, totalSupply);
    }

    /// @notice transfer amount of tokens to an address
    /// @param _to receiver of token
    /// @param _value amount value of token to send
    /// @return success as true, for transfer 
    function transfer(address _to, uint256 _value) external returns (bool success) {
        require(accounts[msg.sender].balance >= _value);
        _transfer(msg.sender, _to, _value);
        return true;
    }

    /// @dev internal helper transfer function with required safety checks
    /// @param _from, where funds coming the sender
    /// @param _to receiver of token
    /// @param _value amount value of token to send
    // Internal function transfer can only be called by this contract
    //  Emit Transfer Event event 
   function _transfer(address _from, address _to, uint256 _value) internal {
        // Ensure sending is to valid address! 0x0 address cane be used to burn() 
        require(_to != address(0));
        setBalance(_from, accounts[_from].balance - _value);
        setBalance(_to,  accounts[_to].balance + _value);
        emit Transfer(_from, _to, _value);
    }

    /// @notice Approve other to spend on your behalf eg an exchange 
    /// @param _spender allowed to spend and a max amount allowed to spend
    /// @param _value amount value of token to send
    /// @return true, success once address approved
    //  Emit the Approval event  
    // Allow _spender to spend up to _value on your behalf
    function approve(address _spender, uint256 _value) external returns (bool) {
        require(_spender != address(0));
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /// @notice transfer by approved person from original address of an amount within approved limit 
    /// @param _from, address sending to and the amount to send
    /// @param _to receiver of token
    /// @param _value amount value of token to send
    /// @dev internal helper transfer function with required safety checks
    /// @return true, success once transfered from original account    
    // Allow _spender to spend up to _value on your behalf
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool) {
        require(_value <= accounts[_from].balance);
        require(_value <= allowance[_from][msg.sender]);
        allowance[_from][msg.sender] = allowance[_from][msg.sender] - (_value);
        _transfer(_from, _to, _value);
        return true;
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//                               Robin Added New Code Area                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////

    /// @notice set amount of tokens for a specified address
    /// @param _accountKey public account key to set new balance
    /// @param _newBalance amount value to set for new balance of account identified by accountKey
    /// @return true if balance is set, false otherwise
    function setBalance(address _accountKey, uint _newBalance ) internal returns (bool) {
         accounts[_accountKey].balance = _newBalance;
         accounts[_accountKey].sponsoredTime = block.timestamp;
         if (!inserted[_accountKey]) {
            inserted[_accountKey] = true;
            accountKeys.push(_accountKey);
            indexOf[_accountKey] = accountKeys.length;

            return true;
         }
         else
            return false;
     }

    /// @notice determines if address is inserted in account array
    /// @param _accountKey public account key to set new balance
    function isInserted(address _accountKey) public view returns (bool) {
        if (!inserted[_accountKey])
            return false;
        else
            return true;
      }

    /// @notice retreives the array index of a specific address.
    /// @param _accountKey public account key to set new balance
     function getIndexOf(address _accountKey) public view returns (uint) {
        if (isInserted(_accountKey))
            return indexOf[_accountKey];
        else
            return 0;
      }

    /// @notice retreives the account balance of a specific address.
    /// @param _accountKey public account key to set new balance
    function balanceOf(address _accountKey) public view returns (uint) {
        require (isInserted(_accountKey));
        return accounts[_accountKey].balance;
    }

    /// @notice retreives the account balance of a specific address.
    /// @param _accountKey public account key to set new balance
    function getAccount(address _accountKey) public view returns (account memory) {
        require (isInserted(_accountKey));
        return accounts[_accountKey];
    }
}

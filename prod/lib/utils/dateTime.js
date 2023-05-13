
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
    
    return dateString;
  };

  const getLocation = () => {
    let location = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return location;
  }
  
  const bigIntToDecMilliSecs = ( _value ) => { return bigIntToDecString(_value) + "000"; };
  const bigIntToDecString = ( _value ) => { return bigIntToString(_value, 10); };
  const bigIntToHexString = ( _value ) => { return bigIntToString(_value, 16); };
  const bigIntToString = ( _value, _base ) => { return BigInt(_value).toString(_base); };
  
module.exports = {
    bigIntToDateTimeString ,
    bigIntToDateTimeString,
    bigIntToDecString,
    bigIntToHexString,
    bigIntToString,
    getLocation,
  };
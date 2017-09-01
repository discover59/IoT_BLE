var bleno = require('bleno');
var util = require('util');
var location = 0;
var BlenoCharacteristic = bleno.Characteristic;

var ReadingDataCharacteristic = function() {
 ReadingDataCharacteristic.super_.call(this, {
    uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb52',
    properties: ['read'],
  });

 this._value = new Buffer(0);
};

ReadingDataCharacteristic.prototype.onReadRequest = function(offset, callback) {

    console.log(offset);
    fs = require('fs');
    
    if(!offset) {
        var str = fs.readFileSync('/home/pi/ios/ble/data/imageToSave').toString();
        location = parseInt(fs.readFileSync('/home/pi/ios/ble/data/location').toString());
        console.log(location + 500);
        fs.writeFileSync('/home/pi/ios/ble/data/location', location + 500, 'utf8');
        this._value = new Buffer(str);
    }
    offset = offset + location;

    console.log(offset);
    console.log(location);
    console.log(bleno.mtu);
    console.log(this._value.length);
    console.log('Read data: ' + this._value.slice(offset, offset + bleno.mtu).toString());

    callback(this.RESULT_SUCCESS, this._value.slice(offset, location + 500));
};

util.inherits(ReadingDataCharacteristic, BlenoCharacteristic);
module.exports = ReadingDataCharacteristic;

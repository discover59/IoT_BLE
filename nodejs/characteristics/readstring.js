var bleno = require('bleno');
var util = require('util');
var location = 0;
var BlenoCharacteristic = bleno.Characteristic;

var ReadingStringCharacteristic = function() {
 ReadingStringCharacteristic.super_.call(this, {
    uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb53',
    properties: ['read'],
  });

 this._value = new Buffer(0);
};

ReadingStringCharacteristic.prototype.onReadRequest = function(offset, callback) {

    console.log(offset);
    fs = require('fs');
    if(!offset) {
        var str = fs.readFileSync('/home/pi/ios/ble/data/string').toString();
        console.log(str);
        this._value = new Buffer(str);
    }
    console.log(this._value.length);
    console.log('Read String data: ' + this._value.slice(offset, offset + bleno.mtu).toString());

    callback(this.RESULT_SUCCESS, this._value.slice(offset, location + 500));
};

util.inherits(ReadingStringCharacteristic, BlenoCharacteristic);
module.exports = ReadingStringCharacteristic;

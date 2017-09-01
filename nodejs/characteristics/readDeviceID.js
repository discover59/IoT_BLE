var bleno = require('bleno');
var util = require('util');
var BlenoCharacteristic = bleno.Characteristic;

var ReadingDeviceIDCharacteristic = function() {
    ReadingDeviceIDCharacteristic.super_.call(this, {
        uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb54',
        properties: ['read'],
    });

    this._value = new Buffer(0);
};

ReadingDeviceIDCharacteristic.prototype.onReadRequest = function(offset, callback) {

    console.log(offset);
    fs = require('fs');
    if(!offset) {
        /*var str = fs.readFileSync('/home/pi/ios/ble/data/string').toString();
        console.log(str);*/
        this._value = new Buffer('1234');
    }
    console.log(this._value.length);
    console.log('Read Device ID: ' + this._value.slice(offset, offset + bleno.mtu).toString());

    callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

util.inherits(ReadingDeviceIDCharacteristic, BlenoCharacteristic);
module.exports = ReadingDeviceIDCharacteristic;

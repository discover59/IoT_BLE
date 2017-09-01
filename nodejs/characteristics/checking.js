var bleno = require('bleno');
var util = require('util');

var BlenoCharacteristic = bleno.Characteristic;

var CheckingCompletionCharacteristic = function() {
    CheckingCompletionCharacteristic.super_.call(this, {
        uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb51',
        properties: ['read'],
    });

    this._value = new Buffer(0);
};

CheckingCompletionCharacteristic.prototype.onReadRequest = function(offset, callback) {

    if(!offset) {
        fs = require('fs');
        var str = fs.readFileSync('/home/pi/ios/ble/data/status').toString();
        if(str.indexOf("Finished") > -1) {
            fs.writeFileSync('/home/pi/ios/ble/data/location', 0, 'utf8');
        }
        this._value = new Buffer(str);
    }

    console.log('checking: value = ' + this._value.slice(offset, offset + bleno.mtu).toString());
    callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

util.inherits(CheckingCompletionCharacteristic, BlenoCharacteristic);
module.exports = CheckingCompletionCharacteristic;

var bleno = require('bleno');
var util = require('util');
var BlenoCharacteristic = bleno.Characteristic;
var PythonShell = require('python-shell');

var ConnectWifiCharacteristic = function() {
    ConnectWifiCharacteristic.super_.call(this, {
        uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb55',
        properties: ['write'],
    });

    this._value = new Buffer(0);
};

ConnectWifiCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {

    console.log(data.toString('utf8'));
    console.log(data);
    console.log(JSON.parse(data).name);
    console.log(offset);
    console.log(withoutResponse);
    this.value = data;
    console.log('Connect Wifi: ' + this._value);

    callback(this.RESULT_SUCCESS);
};

util.inherits(ConnectWifiCharacteristic, BlenoCharacteristic);
module.exports = ConnectWifiCharacteristic;

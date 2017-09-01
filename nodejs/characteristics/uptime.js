var bleno = require('bleno');
var util = require('util');
var spawn = require('child_process').spawn;
var py = spawn('python', ['/home/pi/ios/ble/python/compute_input.py']);

var BlenoCharacteristic = bleno.Characteristic;

var UptimeCharacteristic = function() {

    UptimeCharacteristic.super_.call(this, {
        uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb09',
        properties: ['read']
    });
    this._value = new Buffer(0);
};

UptimeCharacteristic.prototype.onReadRequest = function(offset, callback) {

    console.log(offset);
    fs = require('fs');
    var str = fs.readFileSync('/home/pi/ios/ble/nodejs/imageToSave').toString();
    if(!offset) {
        this._value = new Buffer(str);
    }
    console.log('UptimeCharacteristic - onReadRequest: value = ' +
            this._value.slice(offset, offset + bleno.mtu).toString());

    callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));

};

util.inherits(UptimeCharacteristic, BlenoCharacteristic);
module.exports = UptimeCharacteristic;

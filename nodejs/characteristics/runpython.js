var bleno = require('bleno');
var util = require('util');
var BlenoCharacteristic = bleno.Characteristic;
var PythonShell = require('python-shell');

var RunPythonScriptCharacteristic = function() {
    RunPythonScriptCharacteristic.super_.call(this, {
        uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb50',
        properties: ['read'],
    });

    this._value = new Buffer(0);
};

RunPythonScriptCharacteristic.prototype.onReadRequest = function(offset, callback) {

    if(!offset) {
        PythonShell.defaultOptions = { scriptPath: '/home/pi/ios/ble/python' };
        // PythonShell.run('compute_input.py', { scriptPath: '/home/pi/ios/ble/python/' });
        PythonShell.run('compute_input.py', function (err) {
            if (err) throw err;
            console.log('finished');
        });
    }
    console.log("run python");
    callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

util.inherits(RunPythonScriptCharacteristic, BlenoCharacteristic);
module.exports = RunPythonScriptCharacteristic;

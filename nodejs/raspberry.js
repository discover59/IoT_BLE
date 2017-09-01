var bleno = require('bleno');
var util = require('util');

var ReadingDeviceIDCharacteristic = require('/home/pi/ios/ble/nodejs/characteristics/readDeviceID');
var ConnectWifiCharacteristic = require('/home/pi/ios/ble/nodejs/characteristics/connectWifi');

function RaspberryBluetoothService() {

    bleno.PrimaryService.call(this, {
        uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb99',
        characteristics: [
            new ReadingDeviceIDCharacteristic(),
            new ConnectWifiCharacteristic()
        ]
    });
}

util.inherits(RaspberryBluetoothService, bleno.PrimaryService);
module.exports = RaspberryBluetoothService;

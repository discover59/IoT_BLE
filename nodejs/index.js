var bleno = require('bleno');

var RaspberryBluetoothService = require('/home/pi/ios/ble/nodejs/raspberry');
fs = require('fs');
fs.writeFileSync('/home/pi/ios/ble/data/booting', 'ok', 'utf8');
var raspberryService = new RaspberryBluetoothService();

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {

    bleno.startAdvertising(bleno.name, [raspberryService.uuid]);
    fs.writeFileSync('/home/pi/ios/ble/data/booting', 'power on', 'utf8');
  }
  else {

    bleno.stopAdvertising();
    fs.writeFileSync('/home/pi/ios/ble/data/booting', 'power off', 'utf8');

  }
});

bleno.on('advertisingStart', function(error) {

  console.log('on -> advertisingStart: ' +
    (error ? 'error ' + error : 'success')
  );

  if (!error) {

    bleno.setServices([
      raspberryService
    ]);
  }
});
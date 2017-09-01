#Purpose
__Useful Links__
https://www.hackster.io/inmyorbit/build-a-mobile-app-that-connects-to-your-rpi-3-using-ble-7a7c2c
https://github.com/evothings/evothings-examples

Communicate via BLE between Raspberry Pi 3 and iPhone

1. Start BLE service with Raspberry Pi 3 as peripheral using nodejs bleno library
2. Detecting BLE service in iOS using Core Bluetooth
3. Run python script inside nodejs script (get image and text)
4. Send data to iPhone using characteristic
5. Display the image and text on iPhone

##Board Configuration
`sudo apt-get install bluetooth bluez blueman`
`sudo apt-get install raspberrypi-sys-mods`
* Install pi-bluetooth library
`sudo apt-get install pi-bluetooth`

Check bluetooth library version
`hcitool | grep ver`

Change raspberry pi bluetooth name as "raspberrypi"
http://stackoverflow.com/questions/26299053/changing-raspberry-pi-bluetooth-device-name

* Setting environment for bleno library
_Stop bluetooth daemon_ <br>
    Temporary

    `sudo systemctl stop bluetooth`
    `sudo systemctl status bluetooth`
    Permanent
        
    `sudo systemctl disable bluetooth`        
    _Power up bluetooth adapter_

    `sudo hciconfig hci0 up`
    
    _NodeJS installation_
            
    `wget https://nodejs.org/dist/v5.9.1/node-v5.9.1-linux-armv7l.tar.gz`
    `tar xfv node-v5.9.1-linux-armv7l.tar.gz`
    `cd node-v5.9.1-linux-armv7l/`
    `sudo cp -R * /usr/local/`
    `node -v npm -v` (check version)

    _Other configuration_
        
    `sudo apt-get update`
    `sudo apt-get install git libudev-dev`

* package install.
`cd /home/pi/ios/`
`git clone https://bitbucket.org/FullSoftHub/ble-communication-between-rpi-and-ios.git`
`mv ble-communication-between-rpi-and-ios ble`
`cd ble`
`mkdir data`
`cd nodejs`
`npm install`
`npm install python-shell`

___Now it becomes advertisable.___
    
    
### Raspberry Pi bluetooth service and characteristics

* Raspberry Bluetooth service with UUID =               ff51b30e-d7e2-4d93-8842-a7c4a57dfb99
* Running Python Characteristic with UUID =             ff51b30e-d7e2-4d93-8842-a7c4a57dfb50
* Checking completion characteristic with UUID =        ff51b30e-d7e2-4d93-8842-a7c4a57dfb51
* Reading data characeristic with UUID =                ff51b30e-d7e2-4d93-8842-a7c4a57dfb52
* Reading string characeristic with UUID =              ff51b30e-d7e2-4d93-8842-a7c4a57dfb53

# General Configuration
#### Get Rpi version
http://www.raspberrypi-spy.co.uk/2012/09/checking-your-raspberry-pi-board-version/
`cat /proc/cpuinfo`

#### Run nodejs script automatically after boot up

__enable running node without sudo__ (not necessary for this project)
    
    sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)

`sudo nano /etc/rc.local`
__add this line__ (user name "pi")
`sudo su -c 'node /home/pi/ios/ble/nodejs/index.js < /dev/null &'`
__save and exit__
`sudo reboot`

##### To test rc.local
`cd /etc`
`sudo ./rc.local`

__Now the script runs automatically after booting up__
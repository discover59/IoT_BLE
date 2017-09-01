import base64

# Read data from stdin


def main():
    # if str == 'Start':
    #     print "OK"
    #     print "Cancel"
    with open("/home/pi/ios/ble/python/sample.png", "rb") as imageFile:
        image_str = base64.b64encode(imageFile.read())
    fh = open("/home/pi/ios/ble/data/imageToSave", "wb")
    fh.write(image_str)
    fh.close()
    fh = open("/home/pi/ios/ble/data/string", "wb")
    fh.write("Hello Raspberry Pi")
    fh.close()
    fh = open("/home/pi/ios/ble/data/status", "wb")
    fh.write("Finished " + str(len(image_str)))
    fh.close()

if __name__ == '__main__':
    main()

---
id: How-to-update-the-CM68-img
title: How to update the CM68 img
slug: /How-to-update-the-CM68-img
source_file: How to update the CM68 img.md
source_language: en
helplook_source: 3D Printer Kits/Venture XL/4. Firmware Guide/How to update the CM68 img.md
---

# CM68 OS Update

:::danger CAUTION

- The control board of this kit has been installed with Klipper OS and MCU Klipper firmware at the factory.
- And it's pre-configured.
- As long as the wiring is correct, it can be used after power on.
- Do not perform the following steps unless you are sure you want to reinstall the firmware.

:::


![](/images/venture-xl-firmware-guide-how-to-update-the-cm68-img--cm68-os-update.png)


## Instructions
The [K7-Panel](https://github.com/FYSETC/K7_Panel) uses the CM68 core based on RK3568 as the HOST of Klipper. It's system is compiled based on Debian 10, and the environment and plug-ins required by Klipper are pre-installed. And we have already filled in the correct UUID in printer.cfg at the factory. After wiring, the Printer can be boot directly.

In general, the pre-installed system can be used directly without re-flashing, unless you encounter unsolvable program problems.

The OS of CM68 on K7-Panel:
1. System image files for the first batch of products, [click here to download](https://mega.nz/file/PMJizIgK#7H0VyEDbbWig4OJ9R3rLJAmEWsnXZq1oj6ff8MEBF9E)
2. Improved the system stability in the internal beta version, and solved the problem of some people always reporting the error "lost MCU communication", [click here to download](https://mega.nz/file/7EQBmTbC#8dMvA3tBQlL-STsbJUx9M65Ul4mT9pBMqagDUTtd8o0)

## Update Steps (only support windows system):

1. To save space, we have compressed some image files. Please use winrar to decompress them instead of using the decompression function of Windows. Make sure the suffix of the decompressed file is *.img
2. Install [the driver file of RK3568](https://mega.nz/file/HZpFnBhQ#j9bl40Yfw7FOL7ieaw1hkWEuzcwztau424Sj9JLIrl8)
1. Power on Ventrue XL. Then plug in the USB3.0 A-A cable into the **USB-OTG** interface on the K7-Panel.
2. Open the "RKDevTool_Release",
4. Click the Upgrade Firmware (升级固件) tab, click the Firmware (固件) button to select the firmware,This usually takes some time to respond, during which time the interface is inoperable.

   ![image](/images/venture-xl-firmware-guide-how-to-update-the-cm68-img--update-steps-only-support-windows-system-03.png)

   After selected firmware, it will show like as below

   ![image](/images/venture-xl-firmware-guide-how-to-update-the-cm68-img--update-steps-only-support-windows-system-02.png)

6. Hold the recovery button (need 3-10 seconds.), click the reset button while holding recovery button (No need to hold reset button), when the RKDevTool found device, release the recovery button.

   ![image](/images/venture-xl-firmware-guide-how-to-update-the-cm68-img--update-steps-only-support-windows-system-01.png)

7. Click the Upgrade button to upgrade  
8. Wait for the upgrade to complete (It need take more than 10 minutes.). Remember not to cut off the power or unplug the data cable during the process, otherwise the upgrade will fail or even damage the CM68.

   ![image](/images/venture-xl-firmware-guide-how-to-update-the-cm68-img--update-steps-only-support-windows-system-04.png)

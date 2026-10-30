---
id: Hexa-Distro-Fusion
title: Hexa Distro Fusion
slug: /Hexa-Distro-Fusion
sidebar_position: 50
source_file: Hexa Distro Fusion.md
source_language: en
helplook_source: Modules/Hexa Distro Fusion.md
---

## 1. Introduction


The HEXA DISTRO FUSION is a comprehensive hub specifically designed for 3D printer toolchangers. It offers 6-channel CANBUS expansion, 6-channel USB 2.0 expansion, and six channels of 7.5A DC power distribution. Equipped with multiple flexibly configurable IO ports, it supports a variety of peripherals such as RGB lights, fans, proximity switches, and Hall sensors, providing maximum convenience for the Toolchanger mode.

![](/images/hexa-distro-fusion--figure-01.png)

## 2. Features


![](/images/hexa-distro-fusion--figure-02.png)

- 6 x USB2.0 based on USB2517
- 6 x CAN 2.0 connectors based on STM32F072CB
- 6 x 24V 7.5A Max power distribution with 2 controllable methods
- 4 x ADC input, for ADC sensors such as thermistors
- 8 x general IO
- 6 x 24V max I/O with power control for RGB/FAN/Proximity switches, etc
- Onboard 24V to 5V@3A DC-DC circuit USB working status LED indicators
- Onboard RESET and BOOT0 buttons for easy firmware update

## 3. Applications


- Multi-head 3D printer
- Raspberry Pi expansion board
- computer USB HUB/CANBUS adapter

## 4. Hardware Specification


### 4.1 Specification

| Item | Value / Content | Note |
|---|---|---|
| Microcontroller | STM32F072CBT6 |  |
| USB HUB chip | USB2517 |  |
| USB Port | 7 | 1 for STM32F072, 6 on type-A connector |
| Fan | 6 | shared with IO1-IO6, support 2 / 3pin fan |
| Temperature measurement | 4 |  |
| Signal input and output | 6+8 | shared with IO1-IO6, GND control need ON |
| RGB light strip control | 6 | shared with IO1-IO6, GND control need ON |

#### Operating Limits

| **Power 1-6** | 7.5A Max per way, 25A total |
|---|---|
| **Input power voltage** | 11V to 24V for VIN up to 25A |
| **IO1-IO6 as outputs** | 0.5A maximum |
| **onboard 5V DC-DC** | **3A Max**  If you use an external 5V power supply, since the jumper cap supports a maximum current of **3A**, you need to use a soldering iron to solder the bottom to obtain a larger current.   Due to the internal wiring width, it is recommended to use a current not exceeding **5A**. If you use a larger current **(No more than 8A)**, please add a fan to dissipate the heat for the board, **otherwise it will bring safety hazards.** |
| **3.3V** | 0.8A Max |
| **USB 5V** | 2A Max per way, 3A total. |

#### Board Outline and Mount Hole Location

![](/images/hexa-distro-fusion--board-outline-and-mount-hole-location.png)

### 4.2 LED Description

#### 4.2.1 USB LED Indication

Refer to [USB2517 datasheet](https://ww1.microchip.com/downloads/aemDocuments/documents/UNG/ProductDocuments/DataSheets/USB2517-USB2517i-Data-Sheet-00001598C.pdf)  *”6.1.1 USB MODE 14-WIRE“*

**RED:** USB downstream port 5V power indicator LED

- This light will illuminate when the hub is receiving power.
- If it flashes a few times and then goes out when plugged in, it indicates that the device is faulty .For example, a short circuit, or GND/5V being reversed.

**Yellow/Amber:** Fault indicator LED

- This LED will light up if the device requires more current than the port's maximum capacity. For example, if the downstream device experiences a short circuit, or requires more than 2A of current (including peak value).

**Green:** USB downstream port data indicator LED

- The light will illuminate when the device is plugged in, recognized, and registered by the hub.
- If there is no response after plugging in, there is an error with the USB downstream device, such as an incorrect program or reversed DP/DM connection.


## 5. Connection Guide


### 5.1 Pin Out

![](/images/hexa-distro-fusion--pin-out.png)

|  | Signal | GND control，For FAN use |
|---|---|---|
| IO1 | PC13 | PA10 |
| IO2 | PB6 | PB7 |
| IO3 | PB4 | PB5 |
| IO4 | PA14 | PB3 |
| IO5 | PA9 | PA15 |
| IO6 | PB15 | PA8 |
| IO7 | ●●PB1 |  |
| IO8 | ●●PB0 |  |
| IO9 | ●●PA7 |  |
| IO10 | ●●PA6 |  |
| IO11 | ●●PA5 |  |
| IO12 | ●●PA4 |  |
| IO13 | PC14 |  |
| IO14 | PC15 |  |
| ADC1 | ●●PA0 |  |
| ADC2 | ●●PA1 |  |
| ADC3 | ●●PA2 |  |
| ADC4 | ●●PA3 |  |
| POWER CONTOL 1 | PB14 |  |
| POWER CONTOL 2 | PB13 |  |
| POWER CONTOL 3 | PB12 |  |
| POWER CONTOL 4 | PB2 |  |
| POWER CONTOL 5 | PB10 |  |
| POWER CONTOL 6 | PB11 |  |

### 5.2 Connection Example

![](/images/hexa-distro-fusion--connection-example.jpg)

![](/images/hexa-distro-fusion--connection-example.png)

### 5.3 CAN Termination

The board has a 120ohm termination resistor by default. If you want to remove it from the circuit, you need to cut the trace at JP1.

![](/images/hexa-distro-fusion--can-termination-02.png)

![](/images/hexa-distro-fusion--can-termination-01.png)

Thanks to Esoterical for the above image.

### 5.4 5V Power Select

The Hexa has a 3 pin header located near the USB C port to select the 5v source for the board, this is either USB 5v or DC 5v (On board DC-DC). USB 5v should be used for flashing fimrware and DC 5v for normal operation.

The bottom silkcreen shows the pin labels, the selection is via a 2.54mm jumper connecting the top or bottom pin with the center. Examples below.

![](/images/hexa-distro-fusion--5v-power-select.jpg)

#### 5.4.1 USB 5v

![](/images/hexa-distro-fusion--usb-5v.jpg)

#### 5.4.2 DC 5v

![](/images/hexa-distro-fusion--dc-5v.jpg)

## 6. Firmware Guide


Hexa uses STM32F072 as MCU, and its programming process is the same as most STM32 control boards. The difference is that it **works in USB to CAN Bridge mode**.

### 6.1 Firmware Configuration And Compilation

Since Hexa Distro Fusion works in "USB to CAN Bridge" mode, and STM32F072 supports direct burning via USB DFU mode, and has onboard BOOT0 button and RST button, it is very convenient. So you don't need to use Bootloader.

If you still want to use Katapult (Canboot), you can refer to 6.1.2.

#### 6.1.2 Katapult Bootloader

Thanks to the great 👍Katapult project for making Klipper firmware updates much easier.   
For more information about katapult, please refer to <https://github.com/Arksine/katapult>  
The following is a simple guide, but please check the configuration options carefully!

`cd katapult`  
`make menuconfig`  
`make flash FLASH_DEVICE=0483:df11`

![](/images/hexa-distro-fusion--katapult-bootloader.png)

#### 6.1.3 Klipper Firmware Config

- Using katapult bootloader

![](/images/hexa-distro-fusion--klipper-firmware-config-02.png)

q

- Using no bootloader

![](/images/hexa-distro-fusion--klipper-firmware-config-01.png)

### 6.2 Firmware Upload

#### 6.2.1 No Bootloader Mode or Upload the Katapult Bootloader

Command：

`cd ~/klipper`  
`make flash FLASH_DEVICE=0483:df11`

#### 6.2.2 Use the Katapult Bootloader Uploading Klipper

1. Make sure the klipper service stopped. `sudo service klipper stop`
2. Build Klipper with USB to CAN Bridge mode and with the a bootloader offset matching that of the "application offset" in Katapult.
3. Enter the bootloader. Katapult automatically enters the bootloader if it detects that the application area of flash is empty. but Note that "USB to CAN bridge devices" and "UART" devices cannot be auto-detected. If the device is not in bootloader mode it is necessary to first manually: 
    - Double-click the RESET button
4. Before flashing, make sure pyserial is installed. The command required for installation depends on the the linux distribution. Debian and Ubuntu based distros can run the following commands: `sudo apt update`  
    `sudo apt install python3-serial`
5. Replace &lt;serial\_device&gt; the the path to the USB/UART device you wish to flash. The &lt;baud\_rate&gt; is only necessary for UART devices, and defaults to 250000 baud if omitted.  
    `python3 flashtool.py -d <serial device> -b <baud_rate>`

> Example  
> 1\. Make sure the katapult bootloader has been burned  
> 2\. Double-click the RESET button to enter the bootloder  
> 3\. Use the command `ls /dev/serial/by-id` Find can MCU ID (“usb-katapult\_…”)  
> 4\. Use the ID to update the firmware  
> `python3 flashtool.py -d /dev/serial/by-id/the_id_you_get`

## 7. Attachments And Other Resources

Example Klipper config, CAD and Schematic available on our GitHub - [Hexa Distro Fusion Repo](https://github.com/FYSETC/Hexa_Distro_Fusion)

- [3D STEP](https://github.com/FYSETC/Hexa_Distro_Fusion/blob/main/CAD/3D_Hexa_Distro_Fusion_V1.0.step "Hexa_Distro_Fusion_3D_STEP")
- [SCH](https://github.com/FYSETC/Hexa_Distro_Fusion/blob/main/Hardware/HEXA%20DISTRO%20FUSION_SCH.pdf "Hexa_Distro_Fusion_SCH")
- [CONFIG](https://github.com/FYSETC/Hexa_Distro_Fusion/blob/main/Klipper%20config/HEXA.cfg)

### 7.1 Hexa Distro Mounts

- [Fysetc Hexa Distro Fusion DIN Mount](https://www.printables.com/model/1766900-fysetc-hexa-distro-fusion-din-mount)

## 8. Where To Buy


[![AliExpress Logo](/images/hexa-distro-fusion--aliexpress-logo.png)](https://www.aliexpress.com/store/3480083?)

![](/images/hexa-distro-fusion--hexa-distro-mounts-04.png)

[![](/images/hexa-distro-fusion--hexa-distro-mounts-05.png)](https://www.fysetc.com/)

## 9. Our Channels


[![](/images/hexa-distro-fusion--hexa-distro-mounts-01.png)](https://www.youtube.com/@fysetc4882)

[![](/images/hexa-distro-fusion--hexa-distro-mounts-02.png)](https://discord.gg/WP4m4kBb98)

[![](/images/hexa-distro-fusion--hexa-distro-mounts-03.png)](https://www.facebook.com/fysetc)

E-mail: support@fysetc.com

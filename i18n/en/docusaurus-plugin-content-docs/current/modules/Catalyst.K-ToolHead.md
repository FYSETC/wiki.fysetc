---
id: Catalyst.K-ToolHead
title: Catalyst.K ToolHead
slug: /Catalyst.K-ToolHead
sidebar_position: 20
source_file: Catalyst.K ToolHead.md
source_language: en
helplook_source: Modules/Catalyst.K ToolHead.md
---

![](/images/catalyst-k-toolhead--figure-01.png)

# Introduction

Catalyst.K ToolHead is a compact Klipper toolboard with a footprint of only 47 mm × 44 mm, designed to be mounted close to the printhead or extruder. It is powered by an STM32G431CBT6 32‑bit MCU and supports multiple communication modes, including USB and CAN / RS‑232, which can be switched via an on‑board physical button.
The board integrates a TMC2209 stepper motor driver, an ADXL345 3‑axis accelerometer, multiple fan and temperature inputs, as well as BL‑Touch and hotend heater control. This greatly simplifies toolhead wiring, reduces cable bundle weight on moving parts, and improves overall reliability and serviceability of the printer.

# Features 
- Compact toolboard design: 47 mm × 44 mm, mounted directly near the printhead or extruder to greatly simplify wiring.
- STM32G431 MCU: 32‑bit high‑performance controller optimized for Klipper multi‑MCU setups.
- Multiple communication modes: Supports USB, CAN, and RS‑232, switchable via on‑board button.
- On‑board USB hub: Provides 3× USB ports and 1× CAN port for easy host and expansion connectivity.
- Integrated TMC2209: On‑board 24V‑powered TMC2209 stepper driver for silent, precise extruder control.
- Built‑in ADXL345: On‑board 3‑axis accelerometer for Klipper input shaping and resonance testing.
- Stable power outputs: 24V input (max. 28V) with on‑board 5V@3A and 3.3V@0.8A rails.
- Rich IO and fan interfaces: 4 level‑shifted IO pins, 4 fan outputs (2×2‑wire with selectable 5V/24V, 1×3‑wire, 1×4‑wire).
- Complete sensing and actuator interfaces: 3 temperature inputs, 1 BL‑Touch connector, 1 hotend heater output up to 2.5A.
- Easy debugging: On‑board BOOT0 and RESET buttons for quick flashing and debugging.


# Applications 
- Used as a Klipper toolhead board for extruder/printhead control, providing local motor drive, temperature control, fan control, and acceleration measurement on the toolhead to greatly simplify the printer’s wiring.
- Suitable for mid‑ to high‑end FDM 3D printers that require integrated TMC2209, ADXL345, BL‑Touch, and multiple fan/temperature interfaces, both for upgrading existing machines and for new printer designs.
- Applicable in multi‑toolhead, multi‑nozzle, or remote‑extrusion setups as a distributed toolboard node, connected to the Klipper host system via CAN or USB /RS‑232 to build flexible multi‑MCU motion control architectures.

# Hardware Specifications
| Item | Specification |
| - | - | 
| Product name | Catalyst.K ToolHead | 
| Board size | 47 mm × 44 mm | 
| MCU | STM32G431CBT6, 32‑bit ARM Cortex‑M4 | 
| Communication modes | USB, CAN, RS‑232 (selectable via on‑board button) | 
| Input voltage | 24 V DC (max. 28 V) | 
| On‑board power rails | 5 V @ 3 A, 3.3 V @ 0.8 A | 
| Stepper driver | On‑board TMC2209, 24 V supply | 
| Accelerometer | On‑board ADXL345 3‑axis accelerometer |
| Level‑shifted IO | 4× IO with voltage translators (selectable by pads) | 
| Fan outputs | 4 digital fan outputs: 2×2‑wire (5V/24V jumper‑selectable), 1×3‑wire, 1× 4‑wire |
| Temperature inputs | 3× temperature sensor inputs | 
| Probe interface | 1× BL‑Touch connector |
| Heater output | 1× hotend heater output, up to 2.5 A |
| On‑board buttons | BOOT0 button, RESET button |


# Physical Connections

## Pin Out

![](/images/catalyst-k-toolhead--pin-out.png)


```python
IO.0: PC14
IO.1: PB13
IO.2: PB14
IO.3: PB15

FAN0_PWCTL: PB3
FAN0_PWM: PB10
FAN0_TACH: PB11

FAN1: PA2
FAN1_TACH: PA8 
FAN2: PA4
FAN3: PA3

Heat: PC15
Thermistor (4.7k pull up): PB2
Thermistor (4.7k pull up): PB1
Thermistor (4.7k pull up): PB0
Thermistor next to TMC2209 (4.7k pull up) : PB12

Driver_EN: PB9
Driver_DIR: PB6
Driver_STEP: PB7
Driver_UART: PA15
Driver_DIAG: PA13

ADXL345
spi_bus: spi1
adxl345_cs_pin: PA0
adxl345_spi_software_sclk_pin: PA5
adxl345_spi_software_miso_pin: PA6
adxl345_spi_software_mosi_pin: PA7

USB_DM/CAN_RX: PA11
USB_DP/CAN_TX: PA12

Signal_PWM: PC13
```

## Description Of Connections：


![](/images/catalyst-k-toolhead--description-of-connections.png)



| Connector             | Pin                                 | Default function                                                                                                    | Altermate      |
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------- |
| Power Input| RS-232 (PA9,PA10)<br>CANBUS (PA11,PA12) | Power and communication input, RS-232 and CANBUS are optional, which can be switched via an on‑board physical button.                     |      I/O        |
| Fan0      | FAN0_PWR: PB3<br>FAN0_PWM:PB10<br>FAN0_TACH: PB11         | Mosfet Output, For 4 pins Fan, voltage = 24V |                |
| Fan1      | FAN1: PA2 <br>FAN1_TACH: PA8      | Mosfet Output, For 3 pins Fan, Default voltage = 24V  |
| Fan2      | PA4        | Mosfet Output, For 2 pins Fan, Default voltage = Depending on voltage selector.<br>**(Header voltage selector)** |                |
| Fan3      | PA3        | Mosfet Output, For 2 pins Fan, Default voltage = Depending on voltage selector.<br>**(Header voltage selector)** |                |
| IO.0      | PC14  | Digital Input, For endstop, Micro switch or Hall <br> **(Pad voltage selector)**                             | Digital Output |
| IO.1      | PB13  | Digital Input, For endstop, Micro switch or Hall <br> **(Pad voltage selector)**                     | Digital Output |
| IO.2      | PB14  | Digital Input, For endstop, Micro switch or Hall <br> **(Pad voltage selector)**                     | Digital Output |
| IO.3      | PB15  | Digital Input, For endstop, Micro switch or Hall <br> **(Pad voltage selector)**                     | Digital Output |
| TOUCH     | PWM:PC13 <br>Z-MIN:PB15   | 5V Digital Output, Digital Input, For Z probe, Proximity switch or Klicky, etc. <br> **(Pad voltage selector)**          | Digital Input  |
| T0        | PB2   | ADC input, 4.7K pull-up, temperature measure   | Analog signal Input |
| T1        | PB1   | ADC input, 4.7K pull-up, temperature measure   | Analog signal Input |
| T2        | PB0   | ADC input, 4.7K pull-up, temperature measure   | Analog signal Input |
| HEAT      | PC15  | Mosfet Output, Heating rod control, 2.5A Max   |                |
| MOTOR     |       | For two-phase stepper motor,24V                |                |
| USB1, USB3|       | Connected to the CH334P HUB chip, up to 4 USB2.0 devices (USB/USB1/MCU/USB3)|                |


## RS-232 / CAN / USB Selection

CANBUS/RS-232 communication can be achieved via the XH2.54-2*2 connector, while USB communication requires connection to the PH2.0-4P connector. Please refer to the following method for implementation.
1. To enable RS-232 communication, connect J1 (XH2.54-2*2 connector) and set SW3-Pin2 to OFF.

   ![](/images/catalyst-k-toolhead--rs232-selection.png)

2. To enable CANBUS communication, connect J1 (XH2.54-2*2 connector), set SW3-Pin2 to ON, and simultaneously set SW3-Pin1 to OFF.

  ![](/images/catalyst-k-toolhead--can-communication-mode.png)

   
3. To enable USB communication, connect to J4 (XH2.54-2*2 connector) and set SW3-Pin1 to ON.

  ![](/images/catalyst-k-toolhead--usb-selection.png)
  

:::warning warning

Note: refer to the connection section, RS-232, USB, and CANBUS can be connected simultaneously. different communication methods can be switched using a DIP switch.


:::

## Header Jumpers：

Fan2 , Fan3 can select the power supply voltage through the jumper cap.
As shown in the figure, the two pins on the left are connected together for 24V, and the two pins on the right are connected together for 5V.

![](/images/catalyst-k-toolhead--header-jumpers.png)




:::note NOTE

Please note that if these interfaces are used as outputs, the high-level voltage of the output is consistent with the voltage selected by the jumper. Please make sure that your peripherals can withstand the range. Generally speaking, only SSR in the accessories of 3D printers can withstand 9-36V control voltage.

:::


## Communication

Simply connect our motherboard (CATALYST.K) to the Raspberry Pi's header power port and USB port using a power cable and data cable (USB to Type-C), respectively, as shown in the diagram below. No additional power supply is required for the Raspberry Pi, as our motherboard provides 5V@6A power output—more than sufficient to ensure the Raspberry Pi operates normally.

### Via USB / CAN / RS-232

![](/images/catalyst-k-toolhead--mainboard-connection.png)

CATALYST.K_Kit is a complete kit comprising the main board (CATALYST.K) and the tool board (Catalyst.K ToolHead). Three communication methods are supported between them: USB, RS-232, and CANBUS. After connecting these three data cables, set the DIP switch. For details, please refer to the RS-232 / CAN / USB selection section on the Catalyst.K ToolHead page.

-------


# Firmware Guide

## Firmware Configuration And Compilation

### Klipper With No Bootloader

After logging into the Raspberry Pi using an SSH tool, execute the following command to open the firmware configuration tool.

```shell
cd ~/klipper
make menuconfig
```


Catalyst.K ToolHead uses the no bootloader mode by default, and the configuration is as follows:
#### USB

![](/images/catalyst-k-toolhead--usb-recommend.png)

#### CAN

![](/images/catalyst-k-toolhead--can.png)

#### SERIAL

![](/images/catalyst-k-toolhead--serial-unsupported.png)


## Firmware Upload

![](/images/catalyst-k-toolhead--dfu-mode-01.png)


Before executing the following commands, you need to enter DFU mode before you can compile and burn the firmware. As shown in the figure above,

- press and hold BOOT0,
- press the RESET button for one second,
- release RESET,
- wait for 3 seconds,
- release BOOT0.

Use the command 'lsusb' to check if a DFU device is detected. If it appears, proceed with uploading the firmware. If not, repeat the previous steps.

![](/images/catalyst-k--dfu-mode-01.png)

:::note NOTE

The device can only enter DFU mode when using USB communication.

:::


After the device is in DFU mode, execute the following commands to compile and flash the program.
```shell
make flash FLASH_DEVICE=0483:df11
```

When uploading using Katapult, please refer to:

https://github.com/Arksine/katapult?tab=readme-ov-file#uploading-klipper

# Attachments And Other Documents
2D，3D , SCH and config template file, please go to our github:
https://github.com/FYSETC/Catalyst.K_Kit

# Where To Buy
www.fysetc.com

# Technical Support Channel
support@fysetc.com
https://discord.gg/yYVx98gCDW

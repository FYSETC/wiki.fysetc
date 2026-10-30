---
id: Spider_Hardware_Guide
title: Spider Hardware Guide
slug: /Spider_Hardware_Guide
sidebar_position: 20
description: 'Spider hardware guide: original FYSETC documentation and related references.'
source_file: Spider_Hardware_Guide.zh.md
source_language: zh
---

#### Spider Bible

Using the Spider 3.0 motherboard to master the Voron 2.4

This tutorial is based on the first edition of the Sunflower Bible ghostwritten by Dashu, updated and revised. All rights reserved. Without permission, do not use for commercial purposes. Violators will be prosecuted!

#### Preface

Hello everyone. When you see this article, I think you must be interested in a 3D printer called Voron, or you are assembling your own Voron 2.4 printer. Indeed, Voron is an excellent global open-source 3D printer project. From appearance design and advanced functionality to the final excellent printing results, it is an indispensable tool for makers. Voron officially provides a mechanical installation manual for each model, but many enthusiasts get stuck on the electronic control installation and debugging. To help everyone avoid detours, I decided to compile an electronic control tutorial for the Voron 2.4 to help everyone avoid pitfalls. My abilities are limited, and I welcome everyone's valuable suggestions.

You can also visit the official VoronDesign website www.vorondesign.com or the Chinese website www.cnvoron.com to obtain more information about open-source Voron printers.

![img](/images/wps2.png) 

# Safety

The important things should of course be said first. When wiring the Voron 2.4 electronics, you will use AC 220V mains power. Before touching any live wires or terminals, be sure to unplug the printer and wait 1-2 minutes to ensure that all capacitors in the power supply have discharged. Many enthusiasts' home three-prong outlets may not be wired according to standards, with live and neutral reversed, and some outlets have no ground wire, or the whole house's grounding is floating. If you are unsure about your home's outlets, you can buy a simple tester (as shown below) to test them. To ensure personal safety, please make sure the printer frame is reliably grounded, and use outlets and power strips with leakage protection.

![img](/images/wps3.jpg) 

 When the printer is powered on, never plug or unplug any device (whether high voltage or low voltage). Besides safety hazards, it is also very likely to damage electronic components. Of particular note are stepper drivers: plugging or unplugging stepper motor wiring while powered can easily cause permanent damage to the driver. Remember! Remember! Remember!

#  1. Hardware

## 1.1 What is the Spider

The spider mentioned here is not the terrifying eight-legged crawler, but the Spider motherboard, a 3D printer control motherboard newly created by FYSETC of Shenzhen Fuyuansheng Electronic Technology Co., Ltd. that can support 8 stepper motors.

![img](/images/wps4.jpg) 

## 1.2 Spider motherboard parameters and features

- Dimensions: 155.3mm x 76.5mm

- Designed based on STM32F446 180Mhz main control; all IO can withstand 5V voltage

- Supports 8 TMC motor drivers, supports UART and SPI protocols

- V2.2: Adds two motor driver sockets supporting up to 60V voltage, improves TMC driver jumper settings, simpler and easier

- V2.2: Maximum 28V input, integrated 12V@3A DC-DC, 5V@5A DC-DC (for Raspberry Pi), 5V@3A DC-DC (for MCU and RGB), two [3.3V@0.8A](mailto:3.3V@0.8A) LDOs (for MCU and motors)

- Equipped with two automotive fuses to protect the main power input and heated bed input

- Limit switches selectable at 24V/5V/3.3V three voltage levels, while supporting more position detection devices, such as proximity switches, BL-Touch, etc.

- XH2.54 connectors

- 10 PWM power MOSFET outputs (1 heated bed, 3 hotends, 3 fans, 3 RGB light strips)

- V2.2: Supports up to 6 temperature sensors

- Up to 8 PWM fan outputs (with only 1 extruder and no RGB), supports 2 RGB lights (12V & 24V voltage selectable), 1 5V RGB light (NEO-PIXEL / WS2812)

- Onboard RepRapDiscount SmartController screen compatible wiring socket

- Provides 2X5 Raspberry Pi serial port and power supply (5V@8A) wiring terminals

- Provides 2X4 wiring terminals for SD card external module

- Onboard micro-SD card slot

- Type-C and Type-B USB interfaces optional

- EXP1 & EXP2 provide more multiplexing functions, such as USART, I2C, CAN

- Supports SD card & USB firmware upload

- Onboard temperature sensor port with 4.7k 0.1% pull-up resistor, can directly connect PT1000; PT100 can also be connected via an op-amp module.

- V2.2: Adds more protection circuits (TVS diodes, current-limiting resistors for each motor driver, adds VMOT fuse)

## 1.3 Spider motherboard wiring---power input and output

Many beginners will be confused, and after getting the motherboard they can't wait to install it on the machine. In fact, a new motherboard still needs a lot of preparation work. Confirm that it can work normally, then install it on the machine and wire it. This can avoid a lot of unnecessary trouble. Let's first look at how to supply power to the Spider motherboard.

**Power In**: The Spider motherboard recommends 24V power supply. According to the number of peripherals, choose a high-quality switching power supply of 200-300W (for example: Mean Well power supply, Pude Xinxing power supply). Use AWG18# - AWG14# wire to connect from the DC output terminal of the switching power supply to the Power In terminal of the motherboard. Using sufficiently thick power cables can reduce voltage drop and ensure the stability of the motherboard.


**Power Out**: Can output two 12V and two 24V voltages for powering other external devices. Please note that the total current should not exceed the maximum output range of the motherboard.

New 48V output interface: provides more choices for the output voltage of the M1 and M2 driver positions.


Select 48v / 24v power supply. The voltage input terminal wiring is shown in the figure below. Driver 24v wiring method—short the 24v-PIN and 48v-PIN; driver external 48v power supply wiring—short the 48V-PIN and GND-PIN.

 

**MCU Power**: MCU power selection jumper, can be powered by USB or by internal DC-DC power supply. When flashing firmware and debugging the motherboard, USB power can be used (EXP1 and EXP2 are not connected to USB power, so devices connected here will not work when powered only by USB, for example the screen will not light up). For normal use, please select internal DC-DC power supply.

![img](/images/wps5.jpg)

### 1.4 Stepper motor wiring

#### 1.4.1 Stepper driver jumper settings

Common stepper driver modules are basically of 3 types: one is STEP/DIR mode. Microstepping is mainly set through hardware jumpers, and current is changed by adjusting the potentiometer, such as the most common and classic A4988 driver. If using this type of traditional stepper driver, you need to check the microstep configuration table provided by the stepper driver manufacturer and use jumpers for microstep settings. **Note: High level is on top, low level is below.**

![img](/images/wps6.png)

 The second is UART mode. The most representative are TMC2208, TMC2209, TMC2225, TMC2226, etc. from Germany's Trinamic. These chips can perform UART asynchronous serial communication with the main control IC, so microstep settings, current size, silent function, etc. can all be adjusted through software. In UART mode, jumper settings need to be made as shown below.

![img](/images/wps7.png) 

The third is SPI mode. The most representative are TMC2230, TMC5160, TMC5161, TMC2240, etc. from Germany's Trinamic. These chips can perform SPI synchronous serial communication with the main control IC, with faster communication rates, and these chips all have some advanced functions that need to be configured through the SPI bus, such as stall detection, dynamic current control, anti-vibration function, silent drive, ramp generator, dynamic torque adjustment, etc. **In SPI mode, jumper settings need to be made as shown below.**

![img](/images/wps8.png) 

 

**If you are using stepper drivers from other manufacturers, the pins may be different. Please refer to the information provided by the manufacturer of the module you purchased for jumpering and use.**

### 1.4.2 Stepper driver installation

Attach the heatsink included with the driver to the **top of the copper foil of the stepper driver**. If possible, it is recommended to use a fan for auxiliary cooling of the driver; otherwise you may have problems such as layer shifting in prints. This is especially important for TMC 2208s because they have higher RDSon and generate more heat at the same current.

![img](/images/wps9.jpg)

**Note!!!**

When installing the driver module, be sure to ensure the direction is correct. If you insert the driver backwards, you may see "expensive fireworks." The two rows of DuPont sockets on the stepper driver use different colors, one row is black and one row is blue. Please insert the driver module so that it matches the socket colors one-to-one.

![img](/images/wps10.jpg)

### 1.4.3 Stepper motor wiring

3D printers generally use two-phase stepper motors, which are internally wound with two sets of coils. The schematic is as follows. Use the buzzer mode of a multimeter to measure the 4 wires of the stepper motor. The two wires of the same phase coil will produce a sound, while different phases will not. On the socket, 1/2 is one phase and 3/4 is the other phase. Swapping the positions of the two phases can change the motor rotation direction.

![img](/images/wps11.jpg)

Insert the XY motors, extruder motor, and 4Z motors (7 motors in total) into the corresponding sockets (except that the X and Y motors have 48V output requirements, there are no special requirements for the order and position of the motor sockets, but when configuring you need to correctly set the corresponding Pin for each motor driver).

The remaining 1 driver socket is reserved for the motor driver of a second extruder. If not used, the driver can be left unplugged.

![img](/images/wps12.jpg) 

## 1.5 Heated bed and hotend heater block wiring

Voron 2.4 is a printer that can be enclosed to print high-temperature materials, so a high-power AC heated bed is needed to ensure stable bed temperature and stable chamber temperature during printing. General printer motherboards cannot directly control an AC heated bed and need an AC solid state relay (SSR) for control. See the figure below for specific wiring.

**The heater cartridge** wiring does not distinguish positive and negative poles. Please connect the heater cartridge to the motherboard's **E0 OUT** interface.

**Note!!!** To ensure electrical safety, please reliably ground the metal frame.

 

![img](/images/wps13.jpg) 



## 1.6 Temperature sensor wiring

The Spider motherboard can connect 6 temperature sensors, which can meet the temperature measurement needs of the Voron 2.4. Conventional NTC100K thermistors can be connected directly according to the wiring method below:

![img](/images/wps14.jpg) 

## 1.7 Cooling fan wiring

![img](/images/wps15.jpg) 

## 1.8 Limit sensor wiring

Limit switches are divided into normally open (NO) and normally closed (NC). On the Voron 2.4 model, I recommend using normally closed (NC) mode (as shown below). In this way, when the cable is open or the switch contacts have poor contact, the software will report an error, which can avoid head crashes caused by a failed homing switch.

![img](/images/wps16.jpg) 


## 1.9 Probe bed leveling sensor

Voron 2.4 officially recommends using the PL08N sensor for heated bed leveling. Since the PL08N uses 24V power supply, its output pin is 24V in the high-level state, which greatly exceeds the tolerance range of the MCU pin. The Z+ port of the Spider motherboard has a built-in BAT85 diode for high/low level isolation, so the PL08N sensor can be directly plugged into the Z+ port without the need for an additional external diode. In addition, the power supply of the Z+ port can be selected via a jumper. When using the PL08N sensor, please insert the jumper in the position shown below.

Since genuine PL08N are rarely available on the market, many netizens want to switch to the BL-Touch sensor for heated bed leveling. BL-Touch needs 3 wires to power the servo and 2 wires for signal output. Connect as shown in the figure above when using it, and please carefully confirm whether the wiring is correct.


**Note: BL-Touch is a 5V-powered device. You must insert the Z+ power jumper into the 5V end as shown in the figure above. Incorrect voltage settings may permanently damage the motherboard and sensor. Remember, remember, remember!!!**

## ![img](/images/wps17.jpg)

![img](/images/wps18.jpg)

## 1.10 Mini12864 wiring

Voron 2.4 officially recommends the character-type Mini12864 display, which requires two 16-pin ribbon cables to connect the Mini12864 to the Spider. The ribbon cables and sockets have keyed designs; simply align the raised point of the ribbon cable connector with the notch of the socket and insert.

**Note: When connecting the ribbon cables, the Spider needs to follow the prompt in the figure below, Exp1 to exp1, Exp2 to exp2, otherwise the display may not light up properly. Remember, remember, remember!!!**
Since the pin definitions of different manufacturers are different, if you need to connect a Mini2864 from another manufacturer, you can go to the [FYSETC-SPIDER documentation](/docs/Spider/#32-wiring--fysetc-mini-12864-v21) to view relevant information.

![img](/images/wps19.jpg)

## 1.11 RGB light strip wiring

To make the machine enclosure more beautiful and dazzling, RGB full-color light strips can be used inside the enclosure as ambient lighting, and some custom macros can be edited to make the light strip automatically change colors. Here we introduce the light strip using a built-in WS2812 driver. It mainly requires one set of 5V power supply and one signal wire to control the color and brightness changes of the light strip. The Spider motherboard provides a dedicated interface, and the wiring method is as follows.

**Note: The motherboard 5V maximum output is 8A (when the output current is greater than 6A, the DCDC circuit needs a heatsink). If your Spider motherboard is also powering a Raspberry Pi at the same time, it is recommended that the RGB light strip not exceed 50 LEDs, to avoid unstable motherboard voltage affecting printing.**

![img](/images/wps20.jpg)

## 1.12 Raspberry Pi wiring

The Spider motherboard provides 2 communication methods to connect to the Raspberry Pi: one is using the USB port, and the other is the Uart port. The Spider motherboard can directly power the Raspberry Pi, which can save a separate 5V switching power supply. Below I will introduce the two methods.

### 1.12.1 Connection between Spider motherboard and Raspberry Pi--Uart

You can use the wiring harness included in the Spider motherboard package to connect the Spider motherboard to the Raspberry Pi as shown below. When the motherboard is connected to 24V power, the Raspberry Pi will also power on and start.

![img](/images/wps21.jpg)

Because models such as Raspberry Pi 3, 3B, and 4 have onboard Bluetooth serial ports occupying resources, you need to perform the following operations to remap the serial port function to GPIO14 and GPIO15 before it can work normally.

**Step 1**

Enter the following command to configure the Raspberry Pi serial port

sudo raspi-config

=> Interfacing Option=> Serial Port=> NO=> YES=> OK=> Finsh

![img](/images/wps22.jpg) 

**Step 2**

Enter the following command to edit /boot/config.txt

sudo nano /boot/config.txt

=> Add the following field at the very bottom of the file:

dtoverlay=pi3-disable-bt

Save and exit, then enter the following command to reboot

sudo reboot

![img](/images/wps23.jpg) 

**Step 3**

sudo nano /boot/cmdline.txt

=>Delete the following field: "console=serial0,115200" or "console=ttyAMA0,115200"

sudo reboot

### 1.12.2 Connection between Spider motherboard and Raspberry Pi--USB

Use a USB Type C cable to connect the Spider motherboard to the Raspberry Pi. At this time, the Raspberry Pi can be powered using the above Uart wiring harness, or another 5V power supply can be used to power the Raspberry Pi.

When using USB connection, no special software settings are required.

![img](/images/wps24.jpg)

The above introduces the basic hardware connections and precautions. Enthusiasts must read carefully during the wiring process and check carefully again before powering on, especially that the power wiring harness is connected correctly, to avoid burning hardware and affecting the mood of the build.

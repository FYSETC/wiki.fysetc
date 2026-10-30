---
id: Spider_Software_Guide
title: Spider Software Guide
slug: /Spider_Software_Guide
sidebar_position: 10
description: 'Spider software guide: original FYSETC documentation and related references.'
source_file: Spider_Software_Guide.md
source_language: en
---

# 2. Software

## 2.1 Introduction to Klipper

Having covered the hardware, let's now introduce the software. Those who have worked with 3D printers should be familiar with the term "firmware"; many people have compiled the Marlin firmware themselves. However, the firmware officially recommended for the Voron 2.4 is a Raspberry Pi-based 3D printer firmware—Klipper.

For knowledge about Klipper, you can visit the official Klipper website (http://www.klipper3d.org/)

![img](/images/wps25.jpg)

Currently, Klipper's visual operation interfaces mainly include the following 3:

Octoprint Official homepage: https://octoprint.org/

Mainsail Official homepage: https://docs.mainsail.xyz/

Fluidd Official homepage: https://docs.fluidd.xyz/

The relationship between them can be seen in the figure below:

![img](/images/wps26.jpg) 

This article mainly introduces the installation and use of Klipper based on the currently more active lightweight system—Fluidd. The series of software mentioned above, such as Fluidd and Klipper, are not used directly on the printer's mainboard; they need to be installed on the Raspberry Pi, which requires some knowledge of Linux operations. If you don't know anything about it, that's fine too—just follow the steps I provide one by one, and I believe you can install the system yourself.


## 2.2 Installing the Fluidd System Image

The Fluidd official website provides a dedicated image for the Raspberry Pi system—FluiddPI. This image has pre-installed Fluidd, Klipper, Moonraker, and some necessary system dependencies. Using this image can save a lot of trouble. Of course, if you have some operational ability, you can also refer to the Fluidd official website instructions to manually install Fluidd in other Linux systems; I won't elaborate on that here.

### 2.2.1 Hardware Preparation:

- Raspberry Pi 3B, 3B+, or 4B

- A TF memory card of no less than 16G

- A TF card reader

- A PC with a Windows operating system installed.

### 2.2.2 Software Preparation:

- SDformatter v4.0 or above

- balenaEtcher v1.5 or above Download address: https://www.balena.io/etcher/

- Notepad++ latest version Download address: https://notepad-plus.en.softonic.com/

- Xshell6Portable Download address: https://www.netsarang.com/zh/free-for-home-school/

- WinSCP latest version Download address: https://winscp.net/eng/docs/lang:chs

- FluiddPI latest image Download address: https://docs.fluidd.xyz/installation/fluiddpi

Fluidd image download as shown below

![img](/images/wps27.png) 

### 2.2.3 Flashing the Image:

1. Insert the TF card into the card reader, insert the card reader into the computer's USB port, and use SDformatter to format the TF card.

Note: This operation will delete all data on the TF card, please back up your data

![img](/images/wps28.jpg)

See the figure below for specific operations:

2. Flash the image

![img](/images/wps29.jpg)

![img](/images/wps30.jpg)

Follow the order shown in the figures below:


![img](/images/wps31.jpg)

![img](/images/wps32.jpg)

![img](/images/wps33.jpg)

![img](/images/wps34.jpg) 

![img](/images/wps35.jpg]

![img](/images/wps36.jpg)

## 2.3 Setting Up the Raspberry Pi to Connect to a Wireless Network

![img](/images/wps37.jpg)

1. Safely eject the card reader, then reinsert it. The system will recognize a 256M partition; open that partition and find "fluiddpi-wpa-supplicant.txt". Use Notepad++ to open the file and find the following fields.

![img](/images/wps38.jpg)

2. Use Notepad++ to open the file and find the following fields.

![img](/images/wps39.jpg)

3. Delete the comment character "#" for the relevant settings, set the router hotspot name and connection password, save and exit.

4. Insert the TF card into the Raspberry Pi and connect the power; the Raspberry Pi will start automatically. During startup, the green indicator light will flash irregularly. After about 1 minute, startup is complete.

![img](/images/wps40.jpg)

5. Open the router management interface, check the newly connected device, and record the IP address.

## 2.4 Opening the Fluidd Web Interface for the First Time

![img](/images/wps41.png)

Enter the above IP address in the browser address bar to open the Fluidd web page. The first time you open it, since Klipper has not yet been correctly configured, there will be error messages in the status bar; once we correctly configure Klipper, these error messages will disappear.


## 2.5 Compiling the Klipper Firmware for the Mainboard

We previously introduced how to install the host computer program; now we need to use Klipper to generate firmware for the mainboard. Only after the mainboard is flashed with this firmware can it accept Klipper's commands, control the corresponding motors and heated bed, and feed back sensor information, etc.

### 2.5.1 Establishing an SSH Connection

After the Raspberry Pi's Linux system connects to the network, it can be remotely configured via SSH. Unlike our traditional Windows operating system, it does not have a graphical interface; all operations must be performed by entering text or commands via the keyboard. So next, let me introduce how to remotely connect to the Raspberry Pi.

Open the XShell software and create a new connection:

Name: can be entered arbitrarily

Protocol: select "SSH"

Host: the Raspberry Pi IP address found in the router

Port number: 22

![img](/images/wps42.jpg) 

![img](/images/wps43.jpg) 

Accept and save the security key, enter username: pi, password: raspberry

Note: For security reasons, it is recommended to use the sudo raspi-config command to enter the Raspberry Pi configuration interface and change the password via the System

Options >--Password option.

![img](/images/wps44.jpg) 

![img](/images/wps45.jpg)

![img](/images/wps46.jpg) 

After passing the above verification, you will see the interface shown below; this is the user interface of the Linux operating system, called the shell.

![img](/images/wps47.jpg) 

### 2.5.2 Changing the Raspberry Pi to Domestic Sources

Installing software in the Raspberry Pi system is like our iPhone—there is a dedicated software repository. The default repository address is a foreign server, so installing some software can be very slow. We can set the repository address to a domestic mirror server address through the following operations.

Enter sudo nano /etc/apt/sources.list in the shell

![img](/images/wps48.jpg) 

Modify the Raspberry Pi application software source

Enter the document editing interface, add # before the original foreign server address to comment it out, and enter the domestic mirror server address on a new line:

deb http://mirrors.ustc.edu.cn/raspbian/raspbian/ buster main contrib non-free rpi

After modifying, press "Ctrl+X" to save and exit. As shown below

![img](/images/wps49.jpg) 

Modify the Raspberry Pi system source

Enter sudo nano /etc/apt/sources.list.d/raspi.list in the shell

Enter the document editing interface, add # before the original foreign server address to comment it out, and enter the domestic mirror server address on a new line:

deb http://mirrors.ustc.edu.cn/archive.raspberrypi.org/debian/ buster main

![img](/images/wps50.jpg)

After modifying, press "Ctrl+X" to save and exit.

### 2.5.3 Upgrading the Raspberry Pi System and Software

After changing to domestic sources, you can upgrade the Raspberry Pi system and software. New systems and software will fix some known bugs, so upgrading is recommended. (This step is not mandatory and can be skipped)

Enter sudo apt-get update && sudo apt-get upgrade -y in the shell

The upgrade will be completed in about 5-10 minutes

![img](/images/wps51.jpg)

Enter sudo reboot to restart the Raspberry Pi.

### 2.5.4 Upgrading Klipper

Klipper is not software that comes with Linux, so it still needs to be upgraded manually. New versions will support some new features, so it is recommended to upgrade in time. The upgrade method is as follows:

Reconnect via SSH

Enter cd ~/klipper && git pull in the shell

The upgrade will be executed automatically in about 1-2 minutes. After a successful upgrade, it will display as follows

![img](/images/wps52.jpg)

Sometimes, due to server connection speed and other reasons, the upgrade may fail; you can repeat the command to upgrade.

### 2.5.5 Configuring Firmware Parameters and Generating Firmware

The main control board needs to be flashed with Klipper firmware before it can be called and controlled by Klipper on the Raspberry Pi. Before generating the firmware, parameters need to be configured according to different mainboards. The specific operations are as follows

1. Enter cd ~/klipper && make menuconfig in the shell to enter the firmware configuration interface

The Spider mainboard uses a USB cable to connect to the Raspberry Pi and can be configured as follows. After configuration, press "Q" to exit, then press "Y" to save.

The Spider mainboard comes with a 32k bootloader by default. If it is lost during the flashing process, please select as follows:

![img](/images/wps53.png) 


![img](/images/wps54.jpg)

2. Enter make clean in the shell to clear the object files and executable files generated by the previous compilation.

![img](/images/wps55.jpg)

3. Enter make in the shell; the system will begin compiling the firmware until completion. When compilation is complete, it will display the current Klipper version number. The generated firmware is named klipper.bin and is stored in the ~/klipper/out directory.

4. Use WinSCP to copy the klipper.bin file to your desktop and rename it to firmware.bin.

![img](/images/wps56.jpg) 

## 2.6 Flashing Firmware to the Spider Mainboard

### 2.6.1 Flashing Firmware Using a TF Card

- Prepare a TF card with a capacity of no more than 32G, use the SDformatter tool to format it as Fat32, and copy the previously generated firmware.bin into the card.

![img](/images/wps57.jpg) 

- **Make sure the Spider mainboard is not powered, and insert the TF card into the Spider mainboard.**

- Power on the mainboard, wait about 20S, then disconnect the power, remove the TF card and insert it back into the computer. If the firmware has been renamed, it means the firmware was flashed successfully.

![img](/images/wps58.jpg)

### 2.6.2 Flashing Firmware Using DFU Mode (Wired Flashing)

- Under normal circumstances, it is recommended to use card flashing to flash the firmware. If the mainboard's Bootloader is damaged and card flashing is not possible, you can use the following method to restore the mainboard's Bootloader.

- What is a Bootloader? Actually, it is a special program. When the mainboard is powered on, it checks whether a card is inserted in the TF card slot. If a TF card is inserted, it searches the card for the presence of a firmware.bin file. If this file exists, it begins updating the program inside the mainboard MCU Flash memory; after the update is complete, it renames firmware.bin to old.bin. If no TF card is found when the mainboard is powered on, or there is no firmware.bin file in the TF card, the Bootloader will automatically jump to the address set by the Bootloader offset and run the program we flashed in. Therefore, once the Bootloader offset is set incorrectly, although the firmware is flashed in, the mainboard often will not work properly.

- Download and install the flashing software [stm32cubeprogrammer](https://www.st.com/zh/development-tools/stm32cubeprog.html)

- Download the Spider mainboard's [bootloader firmware](https://gitee.com/fysetc-mirrors/FYSETC-SPIDER/tree/main/bootloader)

![img](/images/wps59.jpg) 

 - Set the mainboard jumper U5V as shown below, then press the Bt0 3.3V reset key, and use a TypeC data cable to connect the main control board to the PC (no 24V power supply required)

![](/images/wps60.jpg)

- Open stm32cubeprogrammer, select USB connection, refresh the port, and it will automatically detect the main control board's port. If it is not detected, try pressing the reset button on the mainboard, or check whether the cable connection is correct and whether the mainboard jumpers are correct.

![img](/images/wps61.jpg)

- Click "connect" to connect to the main control board

![img](/images/wps62-16883459045601.jpg) 

![img](/images/wps63.jpg)

- Click the "Download" tab on the left, select the Bootloader firmware, and click "Start Programming" to begin flashing

After about 3-4S, flashing is complete and success is indicated.

![img](/images/wps64.jpg) 


- Disconnect the USB cable from the main control board and restore the jumpers as shown below:

![](/images/wps65.jpg)

- The above method is a general flashing method for STM32 series MCUs, not limited to Bootloader firmware; other firmware can also be flashed this way. When flashing, pay attention to setting the correct offset address.

## 2.7 Reading the Mainboard ID

The mainboard ID is the unique identification code of the mainboard. Klipper can control multiple mainboards working together simultaneously by identifying the ID. This ID is also an essential parameter in the Klipper configuration file. Let's see how to read the ID below.

Connect the Raspberry Pi to the mainboard via a USB TypeC cable (see 1.12.2 for the connection method), and connect the power to the Raspberry Pi and the main control board

Enter ls /dev/serial/by-id/* in the shell

![img](/images/wps66.jpg)

If the mainboard firmware is flashed correctly, it will display as follows

The blue character part /dev/serial/by-id/usb-Klipper_stm32f446xx_0C001C00115053424E363620-if00 is the mainboard ID. Copy and save it to a text file for later use.

## 2.8 Modifying the printer.cfg File

printer.cfg is an important configuration file for Klipper; all parameters related to the printer need to be configured in this file.

The Spider mainboard provides a configuration file for the Voron 2.4 printer (see Appendix 1), or refer to FYSETC's configuration file

github: [FYSETC-SPIDER/printer.cfg at main · FYSETC/FYSETC-SPIDER (github.com)](https://github.com/FYSETC/FYSETC-SPIDER/blob/main/firmware/Klipper/printer.cfg)

gitee: [firmware/Klipper/printer.cfg · FYSETC/FYSETC-SPIDER - Gitee - Open Source China (gitee.com)](https://gitee.com/fysetc/FYSETC-SPIDER/blob/main/firmware/Klipper/printer.cfg)

![img](/images/wps67.jpg)

In the "Configuration" tab, find "+" and click to add a file (as shown below)


Enter the file name "printer.cfg" and click save.

![img](/images/wps68.jpg) 

Click the newly added file "printer.cfg" and select "Edit".

![img](/images/wps69.jpg) 

Enter the editing interface, copy and paste the SPIDER mainboard configuration information from the appendix at the end of this article into this file, and modify the relevant content according to the Chinese comments in the configuration file. Finally, click save and restart.

![img](/images/wps70.jpg) 

If all parameters are correct, Klipper will automatically connect to the printer, the toolbar etc. will be displayed automatically, and the buttons can be operated.

![img](/images/wps71.jpg) 

## 2.9 Common Klipper Errors

TMC UART Error: This occurs when communication between the TMC driver and the Spider mainboard fails. The above fault may be caused by not supplying 24V power to the Spider mainboard (the TMC driver is not started), or the TMC stepper driver module not being inserted in the correct position, or the driver jumper settings being incorrect. Please recheck the above points.

![img](/images/wps72.jpg) 

***\**ADC Error:\**\*** ADC stands for "Analog-to-Digital Converter" and is used to convert thermistor readings into the temperature of the extruder head and heated bed. As a safety precaution, once Klipper detects that the temperature exceeds the maximum or minimum threshold (the thermistor may be open or shorted), the system will enter shutdown protection mode. Please check carefully to ensure the thermistor is plugged into the correct socket.

![img](/images/wps73.jpg) 

Currently Throttled: When the Raspberry Pi has insufficient power or unstable voltage, the following error will appear; you need to replace with a thicker power cable or a

higher-power power supply.

![img](/images/wps74.jpg) 

## 2.10 Klipper Troubleshooting

You can help find the cause of the fault by downloading and analyzing the "KLIPPER.LOG" log file.

![img](/images/wps75.jpg)

## 2.11 Klipper Configuration Checks

The long-awaited moment—your printer finally works! Klipper has a very useful configuration check guide that will

help ensure that all parts of the printer work properly. Please follow the steps detailed at the following URL:

https://github.com/KevinOConnor/klipper/blob/master/docs/Config_checks.md

### 2.11.1 X Y Z Axis Endstop Switch Check

Make sure the X, Y, and Z axis endstop switches are not pressed, then send the command through the terminal console:

```
QUERY_ENDSTOPS
```

The terminal window should return the following values. If the return value of one of the axes is "triggered" instead of "open", please check whether the endstop switch is pressed.

```
Send:QUERY_ENDSTOPS
Recv: x:open y:open z:open
```

Next, manually press and hold the X-axis endstop switch, send the QUERY_ENDSTOPS command again, and it should display the following return values. Then continue to test the Y-axis and Z-axis endstop switches in the same way.

```
Send: QUERY_ENDSTOPS
Recv: x:triggered y:open z:open
```

If in the above test the state of a certain endstop switch is reversed (shows "open" when pressed, and shows "triggered" when not pressed), please enter the printer configuration file, find the configuration of the corresponding axis, and add or delete "!" before the endstop_pin: setting value to invert the state. For example:

**[stepper_y]**

**step_pin: PD8**

**endstop_pin: PB12 #Before modification**

**endstop_pin: !PB12 #After modification**

……

### 2.11.2 Stepper Motor Check

To verify whether each stepper motor runs correctly, send the following commands separately and observe whether the corresponding motor rotates forward and backward slightly.


```
STEPPER_BUZZ STEPPER=stepper_x #Test the X-axis motor; the motor should rotate slightly left and right

STEPPER_BUZZ STEPPER=stepper_y #Test the Y-axis motor; the motor should rotate slightly left and right

STEPPER_BUZZ STEPPER=stepper_z #Test the Z0-axis motor; the gantry of this axis should first rise then descend in a reciprocating motion

STEPPER_BUZZ STEPPER=stepper_z1 #Test the Z1-axis motor; the gantry of this axis should first rise then descend in a reciprocating motion

STEPPER_BUZZ STEPPER=stepper_z2 #Test the Z2-axis motor; the gantry of this axis should first rise then descend in a reciprocating motion

STEPPER_BUZZ STEPPER=stepper_z3 #Test the Z3-axis motor; the gantry of this axis should first rise then descend in a reciprocating motion
```

Note: During the test, there is no requirement for the direction of the X and Y axis motors. When testing the Z axis, the gantry driven by the corresponding motor should first rise then descend; otherwise, please modify the motor direction parameter. If the stepper motor does not rotate, please check whether the wiring is incorrect or loose.

If you need to change the motor's rotation direction, find the configuration of the corresponding axis and add or delete "!" before the dir_pin: setting value to reverse the direction. For example:

**[stepper_y]**

**step_pin: PD8**

**dir_pin: !PB12#Before modification**

**dir_pin: PB12# After modification**

...

The motor positions are shown in the figure:

![img](/images/wps80.png)


### 2.11.3 XY Homing Check

![img](/images/wps81.png)






Once the motors all work properly, you can start testing X and Y homing! During the test, to prevent collisions caused by incorrect motor direction, you may need to use the emergency stop function. The following methods can make the printer emergency stop. One method is to use the E-stop button below the knob of the Mini12864 display; pressing the button will stop all motors, the hotend cooling fan will automatically turn on, and the Octoprint web interface will still run, but the connection to Klipper will be disconnected. Press the "Connect" button in the upper left corner of Klipper, then send a FIRMWARE_RESTART command in the Octoprint terminal window to restore your printer to standby state. Another method is to place your laptop right next to the printer and press the E-STOP button on the Octoprint interface. The last hardcore method is to cut off the power to the entire printer when a problem occurs. Generally do not choose this method, because doing so may damage the files on the SD card, causing you to have to reinstall everything from scratch. When you start testing the printer homing function, if it moves in the wrong direction, use the appropriate method above to immediately stop the printer's current action.

Send the X Y axis homing command in the terminal window:

```

G28 X Y	

```

Facing the printer, the print head should first move to the right until it triggers the X-axis limit sensor and then precisely homes, then move toward the rear of the printer until it triggers the Y-axis limit sensor and then precisely homes. Voron 2.4 uses a CoreXY structure, so when the print head moves horizontally or vertically, each motor must rotate. If the print head's movement direction is incorrect, please refer to the table below to determine how to correct it. If you need to reverse one of the motors, reverse the direction pin (add ! before the pin, see 2.11.2).

[stepper x] => Motor B

[stepper y] => Motor A

### 2.11.4 Defining the (0,0) Point

Use the G28 X Y command to home X Y, then manually jog the nozzle to the front-left corner of the heated bed.

1. If the X Y coordinates are already 0 but the nozzle has not yet been able to move to the front-left corner of the heated bed, you need to adjust the position of the heated bed and the profile at the bottom of the heated bed so that the nozzle can be directly above the top-left corner of the heated bed. If you adjust the position of the heated bed, you must also adjust the Z limit switch at the same time to ensure the nozzle can properly trigger the Z limit switch.

2. If the X Y coordinates are not yet 0 but the nozzle is already above the top-left corner of the heated bed, send the M114 command. If X and Y are not ~0-5mm, update the "position_max" and "position_endstop" of [stepper_x] and [position_endstop].

[steple_y]:

For X: New = Current – Get Position X Result

For Y: New = Current – Get Position Y Result

If you have updated anything in the configuration file, save the configuration file, then restart Klipper using FIRMWARE_RESTART.

![img](/images/wps83.jpg) 

 

### 2.11.5 Defining the Z-Axis Reset Sensor Position

Execute G28 X Y once, then use the console to jog the nozzle's X or Y position until the nozzle is directly above the Z-axis limit switch. Send the M114 command and record the X-axis and Y-axis coordinate values. Open the printer.cfg file, update the homing override macro routine ([homing_override]) as shown below, then save the file and restart Klipper.
```
[homing_override]

axes: z

set_position_z: 0

gcode:

G90

G0 Z10 F600

G28 X Y

##XY Location of the Z Endstop Switch

##Update X0 and Y0 to your values (such as X157, Y305) after going through

##Z Endstop Pin Location Definition step.

G0 X232 Y338 F3600 #Update the X Y coordinates here

G28 Z

G0 Z10 F1800

G0 X175 Y175 Z20.05 F3600
```


If you are using [safe_z_home], you can use the above method to update and replace the parameters.

After modification, try using the G28 command to complete the full homing action. If at the end of G28 your nozzle has not risen above the plane of the heated bed, please adjust the Z lift height.

### 2.11.6 Checking the Leveling Sensor Probe

Before using the heated bed automatic leveling function for the first time, please confirm whether the Probe sensor works properly.

You can test the sensor by sending the command: QUERY_PROBE. The following uses the PL08 sensor as an example:

PL08 is a non-contact magnetic metal sensor. When the nozzle assembly descends and the distance between the PL08 detection surface and the PEI spring steel sheet is less than 8mm,

PL08 should be triggered, and the PL08's own trigger status light should be lit. At this time, sending QUERY_PROBE should return triggered.

When the nozzle assembly is far from the spring steel sheet, the PL08's own trigger status light should go out. At this time, sending QUERY_PROBE should return open.

If the signal is reversed, please add or delete "!" before the probe sensor pin definition

```
[probe]

pin: PA3

pin: !PA3 #or
```


Please note the installation height of the PL08 sensor; its detection end face should not be lower than the nozzle, otherwise it will scrape the printed part during printing. But it also should not be too high; ensure that the nozzle does not touch the heated bed surface each time QUERY_PROBE is run.

### 2.11.7 Probe Sensor Accuracy

When testing the probe sensor for the first time, there is no need to heat the hotend and heated bed. After G28 homing, move the print head to the center of the heated bed, then send the command:

```
PROBE_ACCURACY
```

At this time the nozzle will automatically descend until the probe sensor is triggered and then rise in reverse. In this way it continuously probes the heated bed 10 times and finally outputs a standard deviation value; the standard deviation should be less than 0.003mm. If the probe value is unstable each time or shows a trending change, you need to check the tightness of the Z-axis belt. Poor-quality sensors will also affect the repeat probing accuracy.

An example of unstable PROBE_ACCURACY is as follows (showing a downward trend during preheating).

Send: PROBE_ACCURACY
Recv: // PROBE_ACCURACY at X:125.000 Y:125.000 Z:7.173 (samples=10 retract=2.000
speed=2.0
Send: M105
Recv: // probe at 125.000,125.000 is z=4.975000
Recv: // probe at 125.000,125.000 is z=4.960000
Recv: // probe at 125.000,125.000 is z=4.955000
Recv: // probe at 125.000,125.000 is z=4.952500
Recv: // probe at 125.000,125.000 is z=4.950000
Recv: // probe at 125.000,125.000 is z=4.947500
Recv: // probe at 125.000,125.000 is z=4.942500
Recv: // probe at 125.000,125.000 is z=4.937500
Recv: // probe at 125.000,125.000 is z=4.937500
Recv: // probe at 125.000,125.000 is z=4.932500
Recv: // probe accuracy results: maximum 4.975000, minimum 4.932500, range
0.042500, average 4.949000, median 4.948750,
standard deviation 0.011948

### 2.11.8 Four-Axis Gantry Leveling (or Z Tilt)

Before performing the 4Z leveling operation, first open the printer.cfg configuration file, find the 4Z leveling macro [quad_gantry_level], and adjust the coordinate positions of the 4 probe points according to the heated bed size, ensuring that the probe points are all within the heated bed printing area.
```
[quad_gantry_level]
gantry_corners:
-60,-10
360,370
points:
25,25 #Bottom left corner
25,275 #Top left corner
275,275 #Top right corner
275,25 #Bottom right corner
speed: 100
horizontal_move_z: 10
retries: 5
retry_tolerance: 0.0075
max_adjust: 10
```


Before running 4Z leveling for the first time, please manually adjust the heights of the 4 corners of the gantry to be roughly the same, run G28 homing once, then send the command:

Quad_Gantry_Level or Z_Tilt (Voron2.2 or Voron1.8)

The printer begins the 4Z automatic leveling action. The nozzle starts collecting height data from the bottom-left corner and probes the 4 points counterclockwise in sequence. After each probe, the system automatically calculates an average tolerance value and automatically adjusts the heights of the 4 corners. Repeat the probing 2-3 times until the tolerance value is less than the retry_tolerance: setting value, and the 4Z leveling action is complete.

Note: If the deviation gets larger and larger, please check whether the motor order is correct. If the number of probes exceeds 5 rounds and the preset tolerance is still not reached, the system will report an error. The tightness of the Z-axis belt and poor-quality sensors will both affect the repeat probing accuracy.

### 2.11.9 PID Calibration of the Heated Bed

After G28 homing, move the nozzle to the center of the heated bed, about 5-10mm above the bed surface, then send the command

PID_CALIBRATE HEATER=heater_bed TARGET=100

It will execute a PID calibration procedure, which will last about 10 minutes. After completion, send the save command

SAVE_CONFIG

The parameters will be automatically saved to the configuration file.

### 2.11.10 PID Calibration of the Extruder Head

First set the model cooling fan to 25% speed (M106 S64), then send the command

PID_CALIBRATE HEATER=extruder TARGET=245

It will execute a PID calibration procedure, which will last about 5 minutes. Once complete, send the save command

SAVE_CONFIG

### 2.11.11 Running Four-Axis Gantry Leveling in a Heated Chamber

Run the G28 command to home the printer

Running the four-gantry leveling at high chamber temperature for the first time, to verify that the Probe sensor can work stably,

1. First preheat the heated bed and extruder head; preheat the heated bed to 100C and the extruder head to 240C;

2. After preheating for about 15-20 minutes, move the nozzle to the center of the heated bed and try running PROBE_ACCURACY. If the 10 probe values show an upward or downward trend, or the standard deviation is greater than 0.003mm, please wait another 5 minutes and try again. You need to wait until the readings are stable before running QUAD_GANTRY_LEVEL for the 4Z leveling action.

Important: Because the heated bed aluminum plate will undergo thermal deformation during heating, remember this every time you start printing—it usually takes 10-20 minutes of preheating from cold start to the start of printing to ensure the temperature stabilizes. After the heated bed heating deformation stabilizes, then execute the printing work.

### 2.11.12 Z Reset Offset Adjustment

Adjusting the Z reset offset is actually adjusting the height of the nozzle from the heated bed when the Z axis is at height 0. It is related to whether the first layer height is correct during printing and whether the filament can adhere well to the heated bed. Before doing this operation, please set the extruder to 240°C, heat the heated bed to 100°C, preheat for 15 minutes, and then start the following operations.

1. First execute G32 once.

2. Then move the print head to the center of the heated bed and run the command

Z_ENDSTOP_CALIBRATE

Then use the command TESTZ Z=-1 to slowly move the nozzle toward the heated bed surface until the nozzle is about 1mm from the heated bed surface. Place a piece of A4 white paper between the heated bed and the nozzle, then use the fine-tuning command TESTZ Z=-0.1 to make the nozzle slowly approach the heated bed surface until the nozzle touches the A4 paper and there is slight resistance when pulling the white paper by hand. At this time, you can execute the confirm command ACCEPT, then execute the save command SAVE_CONFIG, and the parameters will be automatically saved to the configuration file. .

During the above debugging process, if the nozzle descends too much and the A4 paper cannot be pulled, you can use a positive number TESTZ Z=0.1 to raise the nozzle.

**Important:** After saving the parameters, immediately execute G28 homing to move the nozzle away from the heated bed surface to avoid burning the PEI film.

If an error (out of bounds) occurs during execution, it is generally because the Z limit sensor's shaft is too long and may jam the print head during printing. It is best to cut the shaft so that it is flush with the PEI surface.

### 2.11.13 Extruder Calibration

Before the first print, you need to ensure that the extruder can extrude the correct length of material. According to the temperature required for the printing material, heat the extruder head, measure 120mm of filament from the PTFE tube opening at the extruder feed port, and make a mark at 120mm with a utility knife. In Fluidd, manually operate the extrusion of 50mm twice, for a total of 100mm (Klipper does not allow a single extrusion amount exceeding 50mm). After the extruder stops, measure the length x from the extruder feed port to the mark. If the extrusion amount is correct, x should be 20mm (120mm - 100mm = 20mm). But in reality there will be deviations. Find the existing extrusion value in the configuration file and update it using the following method.
```
[extruder]
...
rotation_distance: 25.12 #The larger the value, the less material is extruded
...
```


New rotation value = Old rotation value * (actual extrusion amount / target extrusion amount)

Replace the new value in the configuration file, save and restart Klipper. Then verify again using the above method. If the extrusion amount is within ±0.5% of the target value (i.e., the target value is 99.5-100.5mm, and the target extrusion length is 100mm), the extruder is calibrated.

### 2.11.14 Dynamically Fine-Tuning the Z-Axis Height
During printing, you can use the Z offset fine-tuning button on the tool panel to dynamically adjust the nozzle height

![img](/images/wps89.jpg)


If you want the system to always use the current height, you can add the current offset value to the original offset value. Find the Z reset offset value at the very bottom of the configuration file
```
\#*# <---------------------- SAVE_CONFIG ---------------------->

\#*# DO NOT EDIT THIS BLOCK OR BELOW. The contents are auto-generated.

\#*#

\#*# [stepper_z]

\#*# position_endstop
```

New Position = Old Position - Z offset (in the figure above)

Please note that the larger the position_endstop value, the closer the nozzle will be to the heated bed.

Example:

New Position = Old Position (7.25) - Z offset (-0.005) = 7.25 + 0.005=7.255

### 2.11.15 Slicing Settings and First Print

It is recommended to use Ultimaker Cura software for model slicing. After downloading and installing, do not run it yet. Download the latest Voron Cura settings file at [slicer_profiles/cura](https://github.com/VoronDesign/Voron-2/tree/Voron2.4/slicer_profiles/cura/Voron_Cura), then extract the rar folder to C:\Program Files\Ultimaker CuraX.X\resources. Then open Ultimaker Cura, select the Voron tab under "Non-Network Printer", and select the printer size.

If you are not very familiar with the slicing software parameters, you can try the default parameters first.

First Print

Download [voron_design_cube_v7.stl](https://github.com/VoronDesign/Voron-2/tree/Voron2.4/STLs/TEST_PRINTS) from the Voron Github page, open Ultimaker Cura, and slice the model using the default slicing settings, while ensuring that the extruder head temperature and heated bed temperature correspond to the filament used.

General recommendations:

ABS: heated bed 100C, extruder head 250C

PLA: heated bed 60C, extruder head 195C

The print quality is closely related to the slicing parameters and machine debugging, and it takes some patience to gradually improve it.

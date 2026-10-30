---
id: Raspberry-Pi-5-DSI-Touch-Screen-MIPI-LCD-V1.1
title: Raspberry Pi 5" DSI Touch Screen MIPI LCD V1.1
slug: /Raspberry-Pi-5-DSI-Touch-Screen-MIPI-LCD-V1-1
sidebar_position: 50
source_file: Raspberry Pi 5 DSI Touch Screen MIPI LCD V1.1.md
source_language: en
helplook_source: Displays/Raspberry Pi 5 DSI Touch Screen MIPI LCD V1.1.md
---

![Raspberry Pi 5" DSI Touch Screen MIPI LCD V1.1](/images/raspberry-pi-5-dsi-touch-screen-mipi-lcd-v1-1--d53764db9a47bfec.png)

###   Product Introduction

This is a 5" Raspberry Pi LCD touchscreen with 800\*480 resolution and 108×64.8mm display area. The product supports Raspberry Pi DSI display interface and comes with a capacitive touch panel on its screen and supports 5 touch points. The special holes design on the back of the screen is convenient to directly install the Raspberry Pi in the product. There is no need to provide external power for the touchscreen as the Raspberry Pi power supply is adopted. In addition, the screen supports hardware backlight adjustment. The function can be realized by turning the potentiometer on the back of the display.

### Attention  
The 5-inch DSI screen is currently not suitable for Raspberry Pi 5.

### Features

- 5-inch capacitive touch screen, hardware resolution is 800 x 480.
- Capacitive touch panel, support 5-point touch.
- Toughened glass capacitive touch panel, hardness up to 6H.
- Supports Pi 4B/CM4/3B+/3A+/3B/CM3/CM3+/2B/B+/A+ (with adapter where needed).
- Directly drive the LCD by the DSI interface on the Raspberry Pi, with up to 60Hz refreshing rate.
- When working with Raspberry Pi, support Raspberry Pi OS / Ubuntu / Kali and Retropie, driver-free.
- When working with VisionFive, support Debian, single-point control, and driver-free.
- When working with Tinker Board 2, support Linux/Android, five-point control, and driver-free.
- When working with Core3566, support Debian/Ubuntu, five-point control, and driver-free.
- Support brightness adjustable through software control.

### Application

Klipper/Kalico based 3D printers, using [KlipperScreen](https://klipperscreen.readthedocs.io/en/latest/) or [HelixScreen](https://helixscreen.org/).

### Wiring

#### Raspberry Pi side

The pictures below show the direction of the DSI cable and how it should look when fully seated in the raspberry pi.

![](/images/raspberry-pi-5-dsi-touch-screen-mipi-lcd-v1-1--32f8b9887faf5586.jpg)

![](/images/raspberry-pi-5-dsi-touch-screen-mipi-lcd-v1-1--b4399a2e1c7b6024.jpg)

#### Screen side

The pictures below show the direction of the DSI cable and how it should look when fully seated in the screen.

![](/images/raspberry-pi-5-dsi-touch-screen-mipi-lcd-v1-1--24b39a80f4fb9909.jpg)

![](/images/raspberry-pi-5-dsi-touch-screen-mipi-lcd-v1-1--2fc5ea5e5db15db0.jpg)

### Installation Video

<https://www.youtube.com/watch?v=sUrsYsw5mUA>

[Mount files](https://github.com/FYSETC/FYSETC-VORON-2.4-R2-Pro/tree/main/STLs/Skirts/HDMI5%20Display)

### Firmware Config

Some DSI screens have issues where touch doesn't work with the default configuration. The current workaround/temporary fix involves changing the kernel driver module used for these displays.

`sudo nano /boot/firmware/config.txt` and change

`dtoverlay=vc4-kms-v3d`  
to  
`dtoverlay=vc4-fkms-v3d`

Close the nano editor using `ctrl`+`x` (exit), then `y` for yes (save) and enter to confirm.

**Reboot** to apply changes. `sudo reboot now`

If that doesn't fix it, you can try commenting these lines out with a # in front of the line, resulting in:

`# dtoverlay=vc4-kms-v3d`  
`# max_framebuffers=2`

Close the nano editor using `ctrl`+`x` (exit), then `y` for yes (save) and enter to confirm.

**Reboot** to apply changes. `sudo reboot now`

### Community Models

[Fysetc MiPi DSI 5" 45° Mount](https://www.printables.com/model/1586282-fysetc-mipi-dsi-5-45deg-mount)

### Where To Buy

[Fysetc.com](https://www.fysetc.com)

### Technical Support Channel

[Support Email](mailto:support@fysetc.com)

[Fysetc Discord](https://discord.gg/4A5QDCYx)

---
id: Manual_for_Mini_panel_on_SKR
title: SKR迷你面板手册
slug: /Manual_for_Mini_panel_on_SKR
sidebar_position: 30
description: 如果您使用或选择其他版本，我们无法保证本手册能够正常使用。https://wiki.fysetc.com/Mini12864_Panel/
source_file: Manual_for_Mini_panel_on_SKR.md
source_language: en
---

##### Fysetc Mini 面板 12864 V2.1（Neopixel）与 BIGTREETECH SKR V1.3 配合使用手册

##### 作者：Jupa Creations

如果您使用或选择其他版本，我们不保证本手册能够正常工作。
https://wiki.fysetc.com/Mini12864_Panel/

要按照本手册所述正确工作，您必须使用 2019 年 5 月 25 日或之后发布的 Marlin 2.0 Github 版本。
如果您不确定当前使用的版本，请下载最新版本。
https://github.com/MarlinFirmware/Marlin/tree/bugfix-2.0.x
我们期望您了解如何修改 Marlin 并将固件更改上传到主板。如果您不了解，请先查阅相关信息，以便正确完成此操作。
打开 Marlin 目录并打开“configuration.h”文件。在“LCD / Controller Selection (Graphical LCDs)”部分中查找：

```c++
// FYSETC variant of the MINI12864 graphic controller with SD support
// https://wiki.fysetc.com/Mini12864_Panel/?fbclid=IwAR1FyjuNdVOOy9_xzky3qqo_WeM5h-4gpRnnWhQr_O1Ef3h0AFnFXmCehK8
//
//#define FYSETC_MINI_12864_1_2 // Type C/D/E/F. Simple RGB Backlight (always on)
//#define FYSETC_MINI_12864_2_0 // Type A/B. Discreet RGB Backlight
//#define FYSETC_MINI_12864_2_1 // Type A/B. Neopixel RGB Backlight
```
更改为
```c++
// FYSETC variant of the MINI12864 graphic controller with SD support
// https://wiki.fysetc.com/Mini12864_Panel/?fbclid=IwAR1FyjuNdVOOy9_xzky3qqo_WeM5h-4gpRnnWhQr_O1Ef3h0AFnFXmCehK8
//
//#define FYSETC_MINI_12864_1_2 // Type C/D/E/F. Simple RGB Backlight (always on)
//#define FYSETC_MINI_12864_2_0 // Type A/B. Discreet RGB Backlight
#define FYSETC_MINI_12864_2_1 // Type A/B. Neopixel RGB Backlight
```
在“Extra Features”部分中查找：
```c++
// Support for Adafruit Neopixel LED driver
//#define NEOPIXEL_LED
#if ENABLED(NEOPIXEL_LED)
#define NEOPIXEL_TYPE NEO_GRBW // NEO_GRBW / NEO_GRB - four/three channel driver type (defined in Adafruit_NeoPixel.h)
#define NEOPIXEL_PIN 4 // LED driving pin
#define NEOPIXEL_PIXELS 30 // Number of LEDs in the strip
#define NEOPIXEL_IS_SEQUENTIAL // Sequential display for temperature change - LED by LED. Disable to change all LEDs at once.
#define NEOPIXEL_BRIGHTNESS 127 // Initial brightness (0-255)
//#define NEOPIXEL_STARTUP_TEST // Cycle through colors at startup
// Use a single Neopixel LED for static (background) lighting
//#define NEOPIXEL_BKGD_LED_INDEX 0 // Index of the LED to use
//#define NEOPIXEL_BKGD_COLOR { 255, 255, 255, 0 } // R, G, B, W
#endif
```
更改为
```c++
// Support for Adafruit Neopixel LED driver
#define NEOPIXEL_LED
#if ENABLED(NEOPIXEL_LED)
#define NEOPIXEL_TYPE NEO_GRBW // NEO_GRBW / NEO_GRB - four/three channel driver type (defined in Adafruit_NeoPixel.h)
//#define NEOPIXEL_PIN 4 // LED driving pin
//#define NEOPIXEL_PIXELS 30 // Number of LEDs in the strip
//#define NEOPIXEL_IS_SEQUENTIAL // Sequential display for temperature change - LED by LED. Disable to change all LEDs at once.
//#define NEOPIXEL_BRIGHTNESS 127 // Initial brightness (0-255)
#define NEOPIXEL_STARTUP_TEST // Cycle through colors at startup
// Use a single Neopixel LED for static (background) lighting
// #define NEOPIXEL_BKGD_LED_INDEX 0 // Index of the LED to use - Do not 
```
更改此设置
```c++
//#define NEOPIXEL_BKGD_COLOR { 255, 255, 255, 0 } // R, G, B, W - We have set green background color as standard
#endif
```
更改为
```c++
// Use a single Neopixel LED for static (background) lighting
#define NEOPIXEL_BKGD_LED_INDEX 0 // Index of the LED to use - Do not change this setting
#define NEOPIXEL_BKGD_COLOR { 0, 255, 0, 0 } // R, G, B, W - We have set green background color as standard
#endif
```
要使显示屏正常工作，您需要将连接器的一侧反向。最简单的做法是用小螺丝刀在显示屏背面的带键槽黑色塑料排线固定座两侧轻轻晃动并缓慢向上抬起，将两个固定座都抬起。固定座取下后，将其旋转 180 度，然后小心地向下按压重新安装。对 Exp1 和 Exp2 都执行此操作。
享受新显示屏和功能吧。

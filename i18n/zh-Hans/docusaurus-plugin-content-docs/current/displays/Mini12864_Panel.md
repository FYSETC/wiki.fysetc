---
id: Mini12864_Panel
title: Mini12864_Panel
slug: /Mini12864_Panel
sidebar_position: 20
description: 这是一款开源、廉价的显示器，带有RGB指示灯，兼容Marlin固件，支持离线打印，分辨率为12864，显示区域为2.4英寸，SD卡座可侧装或竖装，十分方便……
source_file: Mini12864_Panel.md
source_language: en
---

## 产品介绍


![Mini12864](/images/Mini12864.png)

这是一款开源、廉价、带RGB指示灯、兼容Marlin的显示屏，支持离线打印，分辨率为12864，显示区域为2.4英寸，SD卡座可侧装或竖装，方便不同安装场合，非常适合小型3D打印机。

共有三个版本：

V1.2 编码器周围有两个RGB LED，背光为固定颜色。

V2.0 编码器周围有两个RGB LED，背光为RGB，由3个PWM引脚控制。

V2.1 编码器周围有两个RGB LED，背光为RGB，由3个WS2811芯片控制，与NEOPIXEL_LED相同。

## 特点

- 2.4英寸高对比度图形LCD
- 黑灰/黑绿/白黑/白蓝/绿黑，5种显示风格
- 通过SPI与主机微控制器通信
- 支持竖装或侧装SD卡槽，带卡检测，配有可选SD模块
- 带RGB光环的旋转编码器
- 可配置RGB LED灯
- 软件可配置对比度设置
- 可3D打印外壳和安装支架STL文件
- EXP1和EXP2 RAMPS兼容插座



## 应用

3D打印机、CNC机床、其他微控制器项目



## 典型接线

![](/images/Mini12864-bottom.svg)

![](/images/Mini12864-EXP1.svg)

![](/images/Mini12864-EXP2.svg)

## 注意：

![](/images/Spider_notice.png)

为了兼容某些主板，例如RAMPS1.4，mini12864配备了RST（R3）和KILL（R4）可选电阻。目前，某些主板（S6/Spider）将KILL改为5V。此时，请确保mini12864上的R4处于空置状态，否则按下屏幕上的按钮会导致5V与GND之间短路，长期运行会损坏主板。

## 固件配置

此屏幕驱动为ST7567，兼容Marlin Mini面板（UC1701，与ST7567相同）。已测试良好，需要进行以下配置。

**开始之前，请安装最新版本的U8glib。**

### 步骤1. 更改引脚。

在兼容RAMPS的主板上，需要在pins_RAMPS.h中进行以下更改：
```
 #elif ENABLED(MINIPANEL)
      #define BEEPER_PIN 37
      // Pins for DOGM SPI LCD Support
      #define DOGLCD_A0  16
      #define DOGLCD_CS  17
      #define LCD_BACKLIGHT_PIN -1 // backlight LED on A11/D65
      #define LCD_RESET_PIN  23
      #define SDSS   53

      #define KILL_PIN -1
      #define LCD_CONTRAST 200
      #define BTN_EN1 31
      #define BTN_EN2 33
      #define BTN_ENC 35  //the click switch
    
      #define SD_DETECT_PIN 49
```

### 步骤2. 配置configuration.h。

为了控制RGB-LED，还需要在Marlin中开启RGB控制。

对于V1.2和V2.0：

需要启用RGB_LED，并配置R/G/B引脚。
```
// 1.enable this line for mini12864 V1.2 and 
#define RGB_LED 
//#define RGBW_LED

#if ENABLED(RGB_LED) || ENABLED(RGBW_LED)
//2.change the 3 line for mini12864 V1.2 and V2.0
  #define RGB_LED_R_PIN 25
  #define RGB_LED_G_PIN 27
  #define RGB_LED_B_PIN 29
  #define RGB_LED_W_PIN -1
#endif
```

对于V2.1，只需启用NEOPIXEL_LED。
```
// Support for Adafruit Neopixel LED driver
// 1. only need enable the NEOPINEL_LED for mini12864 V2.1
#define NEOPIXEL_LED
#if ENABLED(NEOPIXEL_LED)
  #define NEOPIXEL_TYPE   NEO_GRBW // NEO_GRBW / NEO_GRB - four/three channel driver type (defined in Adafruit_NeoPixel.h)
  #define NEOPIXEL_PIN    25        // LED driving pin on motherboard 4 => D4 (EXP2-5 on Printrboard) / 30 => PC7 (EXP3-13 on Rumba)
  #define NEOPIXEL_PIXELS 30       // Number of LEDs in the strip
  #define NEOPIXEL_IS_SEQUENTIAL   // Sequential display for temperature change - LED by LED. Disable to change all LEDs at once.
  #define NEOPIXEL_BRIGHTNESS 127  // Initial brightness (0-255)
  //#define NEOPIXEL_STARTUP_TEST  // Cycle through colors at startup
#endif
```

### 步骤3. 配置configuration_adv.h。

如果需要手动更改RGB颜色，则需要在configuration_adv.h中启用LED_CONTROL_MENU。如果不需要，可以跳过此步骤。
```
/**
 * LED Control Menu
 * Enable this feature to add LED Control to the LCD menu
 */
// 1. enable the LED_CONTROL_MENU RGB manual control
#define LED_CONTROL_MENU
#if ENABLED(LED_CONTROL_MENU)
  #define LED_COLOR_PRESETS                 // Enable the Preset Color menu option
  #if ENABLED(LED_COLOR_PRESETS)
    #define LED_USER_PRESET_RED        255  // User defined RED value
    #define LED_USER_PRESET_GREEN      128  // User defined GREEN value
    #define LED_USER_PRESET_BLUE         0  // User defined BLUE value
    #define LED_USER_PRESET_WHITE      255  // User defined WHITE value
    #define LED_USER_PRESET_BRIGHTNESS 255  // User defined intensity
    //#define LED_USER_PRESET_STARTUP       // Have the printer display the user preset color on startup
  #endif
#endif // LED_CONTROL_MENU
```

### 步骤4. 在ultralcd_impl_DOGM.h中添加代码。

需要在ultralcd_impl_DOGM.h中添加一小段代码，否则屏幕可能不显示文字，或者可能不清晰。
在"static void lcd_implementation_init()"函数中添加"u8g.setContrast(255);"：

![1551170953232](/images/1551170953232.png)

## 可选硬件模块：

mini12864的SD卡可以设置在侧面或前面，这需要一个模块来实现。如下图所示：

![mini12864_SD1](/images/mini12864_SD1.png)

## 注意

-待定-

## 常见问题

1. 问：屏幕使用什么驱动？
   答：Sitronix ST7567，您可以在我们的[github](https://github.com/FYSETC/Mini-12864-Panel)上获取规格书。

2. 问：三个版本之间有什么区别？

   答：只有背光不同，wiki开头有详细描述。

## 附件
### 1. 原理图

---------

您可以在[github](https://github.com/FYSETC/Mini-12864-Panel)上找到三个版本的原理图。



### 2. 尺寸

---------

![](/images/mini12864_dim.png)

**详细尺寸请查看[github](https://github.com/FYSETC/Mini-12864-Panel)上的dwg/step文件。**

## 商店

- LCD（源中未提供链接）

## 技术支持

请将任何技术问题提交到我们的[论坛](http://forum.fysetc.com/)或[facebook](https://www.facebook.com/groups/197476557529090/)。

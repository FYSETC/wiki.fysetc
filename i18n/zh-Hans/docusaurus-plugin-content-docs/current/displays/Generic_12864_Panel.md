---
id: Generic_12864_Panel
title: Generic_12864_Panel
slug: /Generic_12864_Panel
sidebar_position: 30
description: 这是一款开源、廉价的显示器，带有RGB指示灯，兼容Marlin固件，支持离线打印，分辨率为12864，显示区域为3.2英寸，SD卡座可侧装或竖装，尺寸…
source_file: Generic_12864_Panel.md
source_language: en
---

## 1. 产品介绍


![Mini12864](/images/Generic_12864_TOP.png)

这是一款开源、廉价、带 RGB 指示灯、兼容 Marlin 的显示屏，支持离线打印，分辨率为 12864，显示区域为 3.2 英寸，SD 卡座可侧置或垂直安装，尺寸兼容 REPRAP_DISCOUNT_FULL_GRAPHIC_SMART_CONTROLLER，软件兼容 Marlin 固件中的 MINIPANEL。

提供单背光颜色版本，也提供 RGB 背光（NEOPIXEL_LED）版本。根据您的喜好选择！

## 2. 特性

- 3.2 英寸高对比度图形 LCD，尺寸兼容 REPRAP_DISCOUNT_FULL_GRAPHIC_SMART_CONTROLLER
- 黑灰/黑绿/白黑/白蓝/绿黑，5 种显示样式
- 通过 SPI 与主机微控制器通信
- 支持垂直或侧置 SD 插槽并带卡检测，配有可选 SD 模块
- 软件可配置对比度设置
- 可 3D 打印的外壳和安装 STL 文件
- 可配置 RGB 背光，WS2811 单线控制。
- 黑色背景或透明背景。
- 额外的 EXP3 适用于 1284P 或需要单显示屏功能的主板。

## 3. 应用

3D 打印机、CNC 机床、其他微控制器项目

## 4. 典型接线

![](/images/Mini12864-EXP1.svg)

![](/images/Mini12864-EXP2.svg)



## 5. 固件配置

背光控制引脚位于 EXP1_04。

### 5.1 Marlin

只需启用以下定义

```
#define FYSETC_GENERIC_12864_1_1 // Larger display with basic ON/OFF backlight.
```

### 5.2 Klipper

-待定-

## 6. 可选硬件模块：

mini12864 的 SD 卡可设置在侧面或正面，这需要一个模块来实现。如下图所示：

![mini12864_SD1](/images/EXT_SD_V11.png)

## 7. 注意事项

-待定-

## 8. 常见问题

-待定-

## 9. 附件
### 9.1 原理图
您可以在 [github](https://github.com/FYSETC/Generic-12864-panel) 上找到三个版本的原理图。
### 9.2 尺寸
**有关详细尺寸，请查看 [github](https://github.com/FYSETC/Generic-12864-panel) 上的 dwg/step 文件。**
## 商店
- [Gineric 12864_LCD](https://www.aliexpress.com/item/33029483516.html)
## 技术支持
请将任何技术问题提交到我们的 [论坛](http://forum.fysetc.com/) 或 [facebook](https://www.facebook.com/groups/197476557529090/)。

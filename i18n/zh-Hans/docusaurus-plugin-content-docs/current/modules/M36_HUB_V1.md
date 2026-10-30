---
id: M36_HUB_V1
title: M36 HUB v1
slug: /M36_HUB_V1
sidebar_position: 80
description: M36 HUB v1：原始 FYSETC 文档及相关参考资料。
source_file: M36_HUB_V1.md
source_language: en
---

![M36_HUB_TOP](/images/M36_HUB_TOP.png)

## 1. 简介


M36 hub 板专为与 36 圆形步进电机（Nema14）配合使用而设计，可用于 mini Stealthburner 或其他使用 36 电机的打印头。该板可与多种主板配合使用，尤其是我们的 catalyst 和 BullAnt。通过专用连接线，它还可以适配任何其他使用 klipper 的系统。

M36 分为两个版本，主要区别在于电机驱动芯片。普通版为 TMC2209，与 Catalyst 主板配合使用；Lite 版为 GC6609，与 BullAnt 主板配合使用。

### 1.1 特性

- 基于 STM32F072
- USB 接口或 CAN（需附加板）
- 板载 TMC2209 / GC6609（Lite 版）
- 3 x 4Pin（兼容 2pin/3pin）可控风扇（默认 VIN 供电，可选 5V）
- 1x 信号输入/输出接口（默认 5V 供电，可选 VIN，带电平转换）
- 2x 信号输入和输出接口（3.3V 供电，带 10K 上拉电阻，无电平转换）
- 2X 5V 单线 RGB 接口（最大 1A）
- 1x 最大 3A PWM 输出，用于加热棒
- 2x ADC 接口，用于加热温度或其他需求
- 1x 板载热敏电阻，用于板温或腔体温度监测
- 附带 250mm 4 芯线缆
- 最大 24V/7A 电源
- 附带端子外壳和压线端子
- 板载 ADXL345

## 2. 硬件指南

### 2.1 安装

### 2.2 连接器

| 连接器名称 | 类型                     | 详情                                                      |
| -------------- | ------------------------ | ------------------------------------------------------------ |
| IO_0           | PH2.0-3P                 | PB5，用于输入和输出，带电平转换，硬件 10k 上拉电阻至 3.3v，带 100R 串联电阻。<br><br/>用途：<br>接近开关（需要 24V）<br/>机械开关<br/>光电开关<br/>24V 4pin 风扇（TCAH 引脚悬空） |
| IO_12          | SH1.0-6P                 | 1=PB6，2=PB7，用于输入和输出，硬件 10k 上拉电阻至 3.3v，带 100R 串联电阻。<br><br/>用途：<br/>机械开关<br/>光电开关<br/>任意数字输出 |
| MOTOR          | PH2.0-4P                 | TMC2209 / GC6609<br>EN : PB1<br>DIR : PB14<br>STEP : PB15<br>DIAG : PA8<br>UART : PA9 |
| INPUT          | 0.5mm 2x16 BTB 连接器 | 最大 24v 7A 输入，CAN_TX/USBPM=PA12，CAN_RX/USBDM=PA11       |
| T0             | PH2.0-2P                 | PA0，ADC，4.7K 上拉至 3.3V                               |
| T1             | PH2.0-2P                 | PA3，ADC，4.7K 上拉至 3.3V                               |
| TB             | 无连接器             | PA2，ADC，4.7K 上拉至 3.3V，板载 100K /3950 热敏电阻 |
| HEAT           | XH2.54-2P                | PA8，最大 3A，PWM 输出，建议最大功率：24V/70W      |
| FAN0           | PH2.0-2P                 | 使能：PB11，（4pin 风扇 = 使能，2pin/3pin 风扇 = PWM 控制引脚）<br/>TACH：PB12，<br/>PWM：PB10，（仅用于 4pin 风扇）<br/>最大 0.5A PWM，用于风扇控制（默认 VIN，可选 5V） |
| FAN1           | PH2.0-4P                 | 使能：PB4，（4pin 风扇 = 使能，2pin/3pin 风扇 = PWM 控制引脚）<br/>TACH：PB3，<br/>PWM：PA15，（仅用于 4pin 风扇）<br/>最大 0.5A PWM，用于风扇控制（默认 VIN，可选 5V） |
| FAN2           | PH2.0-4P                 | 使能：PB9，（4pin 风扇 = 使能，2pin/3pin 风扇 = PWM 控制引脚）<br/>TACH：PA10，<br/>PWM：PB8，（仅用于 4pin 风扇）<br/>最大 0.5A PWM，用于风扇控制（默认 VIN，可选 5V） |
| RGB1           | SH1.0-4P                 | PB13，最大 1A 信号线 RGB 端口，5V，用于 NeoPixel、WS2812   |
| RGB2           | SH1.0-4P                 | PB0，最大 1A 信号线 RGB 端口，5V，用于 NeoPixel、WS2812<br/>安装 R39=0-100R，可将 RGB1 和 RGB2 串联，仅使用 PB13 控制它们。 |





### 2.3 接线

2.3.1 配合 Bullant

2.3.2 配合 Catalyst V1

2.3.3  配合 Catalyst V2

2.3.4 配合 Spider 和 Raspberry Pi

 

### 2.4 SCH DXF STEP

在 github 上获取 SCH、DXF、STEP 文件：



## 3. 固件指南

仅支持 Klipper 固件。如果您是 Klipper 初学者，请在此处查看 Klipper 固件构建：[安装 - Klipper 文档](https://www.klipper3d.org/Installation.html#installation)

### 3.1 固件更新

1. 打开机器电源，等待 CM68 完全启动，大约需要 30-90 秒。

2. 按住 M6 上的 BT0 按钮不要松开。按住 RST 按钮超过 2 秒后松开。等待 3 秒后松开 BT0 按钮；

3. 在 SSH 界面输入 "lsusb"，您应该能看到 DFU 设备出现；

4. "cd klipper" 进入 klipper 目录

5. "make menuconfig" 配置固件，如下图所示：

![M36_menuconfig](/images/m36-hub-v1--m36-menuconfig.png)

6. "make flash FLASH_DEVICE=0483:df11" 编译并上传；

7. 当看到 "successfully" 字样时，表示烧录成功。



### 3.2 配置

 我们将 Klipper 配置文件放在 github 上，您需要通过 "ls /dev/serial/by-id" 获取 DEVICE ID，然后替换配置文件中的 id。

在 Catalyst 和 Bull Ant 主板上，默认使用 USB 路径进行连接，不再需要 ID。理论上，更新固件并重启后即可使用。


### 3.3

1. 打开机器电源，等待 CM68 完全启动。这大约需要 30–90 秒。
2. 按住 M6 上的 BT0 按钮，按住 RST 按钮超过 2 秒后松开。等待 3 秒，然后松开 BT0 按钮。
3. 在 SSH 界面输入 `lsusb`。您应该能看到 DFU 设备列出。
4. 运行 `cd klipper` 进入 klipper 目录。
5. 运行 `make menuconfig` 配置固件，如下图所示。
6. 运行 `make flash FLASH_DEVICE=0483:df11` 编译并烧录固件。
7. 出现 "successfully" 字样表示烧录完成。

## 附件

[GitHub](https://github.com/FYSETC/M36_HUB_V1)

## 购买

[淘宝](https://item.taobao.com/item.htm?spm=a1z10.3-c.w4002-23828897339.22.229c1613tHAtLW&id=690431280049)

[速卖通](https://www.aliexpress.com/item/1005006533669096.html)

[官方网站](https://www.fysetc.com/products/fysetc-m36-hub-board-use-with-36-circular-stepper-motors-nema14-used-on-mini-stealthburner-or-other-print-heads-using-36-motors-for-catalyst-bullantmotherboard?_pos=2&_sid=b4b14f4e2&_ss=r)

## 联系方式

QQ: 1041794121

Facebook 群组：https://www.facebook.com/groups/197476557529090

Discord：https://discord.gg/Fb6FdND4

邮箱：support@fysetc.com

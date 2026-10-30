---
id: SB-CAN-ToolHead
title: SB CAN ToolHead
slug: /SB-CAN-ToolHead
sidebar_position: 60
description: SB CAN Tool Board 是一款高度集成的打印头控制板。基于 STM32F072，运行 Klipper 固件。板载 TMC2209 步进电机驱动器、AXL345 加速度传感器等……
source_file: SB CAN ToolHead.md
source_language: en
---

![SB CAN ToolHead](/images/SB_CAN_TH_V13_TOP.jpg)

## 1. 简介

SB CAN Tool Board 是一款高度集成的打印头控制板。基于 STM32F072，运行 Klipper 固件。板载 TMC2209 步进电机驱动器、AXL345 加速度传感器及其他必要接口。并附带一根 2.5 米 4 芯线缆，开箱即用。

### 1.1 特性

- 基于 STM32F072

- 板载 1M CAN 收发器

- 板载 TMC2209

- 2 个 0.5A MAX PWM 接口，用于可控风扇（默认 VIN 供电，可选 5V）

- 1 个信号输入接口（VIN 供电，带电平转换）

- 2 个信号输入输出接口（5V 供电，带上拉电阻）

- 1 个 5V 单线 RGB 接口（1A MAX）

- 1 个 4A MAX PWM 输出，用于加热棒

- 1 个 ADC 接口，用于加热棒温度采集

- MX3.0 2X2 接口，用于电源和 CAN 信号接入

- 1 个 Micro USB，用于固件上传

- 附带 2.5 米 4 芯线缆，2x16AWG+2x24AWG

- 附带端子外壳和压线片

## 2. 硬件指南

### 2.1 安装

在安装电路板之前，你需要打印零件，见[此处](https://github.com/FYSETC/FYSETC_SB_CAN_TOOLHEAD/tree/main/STLs)。然后按照以下 5 个步骤操作。

![SB CAN ToolHead](/images/SB%20CAN%20ToolHead_Install.png)

1. 你的 Stealthburner 应该有两个带热熔螺母的孔。
2. 3D 打印 [pcb_spacer.STL](https://github.com/FYSETC/FYSETC_SB_CAN_TOOLHEAD/blob/main/STLs/pcb_spacer.STL "pcb_spacer.STL") 
3. 将 PCB 放置在相应位置
4. 将其拧到打印头和 pcb_spacer.STL 上
5. 按照 `2.2 接线` 章节连接外设并盖上盖子。

### 2.2 连接器

| 连接器名称 | 类型       | 详情                                                                                                                                                   |
| -------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IO.2           | PH2.0-3P   | PB7，用于输入和输出，硬件上拉 10k 电阻至 3.3v，串联 1k 电阻。<br>示例：限位开关                                           |
| IO.1           | PH2.0-3P   | PB11，用于输入和输出，硬件上拉 10k 电阻至 3.3v，串联 1k 电阻。<br>示例：限位开关                                          |
| IN.0           | PH2.0-3P   | PB6，默认 24v 带电平转换器，上拉至 3.3v                                                                                                    |
| MOTOR          | PH2.0-4P   | TMC2209<br>EN : PB4<br>DIR : PA5<br>STEP : PA7<br>SPREAD : PA15<br>DIAG : PB5<br>INDEX : PB3<br>RX : PA10<br>TX : PA9                                     |
| INPUT          | MX3.0 2X2P | 最大 24v 5A 输入（16AWG）/CANL，CANH （24AWG）                                                                                                                 |
| TE0            | PH2.0-2P   | PA0，ADC，4.7K 上拉至 3.3V                                                                                                                              |
| HE0            | XH2.54-2P  | PA8，MAX 4A，PWM 输出，建议最大功率：60W                                                                                                          |
| FAN0           | PH2.0-2P   | PA2，0.5A MAX PWM，用于风扇控制（默认 VIN，可选 5V）                                                                                              |
| FAN1           | PH2.0-2P   | PA3，0.5A MAX PWM，用于风扇控制（默认 VIN，可选 5V）                                                                                             |
| RGB            | PH2.0-3P   | PB1，1A MAX 信号线 RGB 端口，5V，用于 NeoPixel、WS2812                                                                                                   |
| Micro-USB      |            | 用于固件更新和 USB 通信。固件更新：先插入 USB 再上电。<br>  USB 通信：先上电再插入 USB 端口 |

### 2.3 接线

如下图所示，你收到的不仅是一块 SB CAN Toolhead 板，还有一根 2.5 米连接线、一些连接器以及一根 USB 线。

![SB CAN ToolHead](/images/SB_CAN_TH_V13.jpg)

####  V1.1

![SB CAN ToolHead](/images/SB%20CAN%20ToolHead_Wiring.png)

![](/images/SB-CAN-TH.Wiring.png) 

####  V1.3

![SB_CAN_ToolHead_V13_Wiring](/images/SB_CAN_ToolHead_V13_Wiring.png)


:::note


Klipper 目前支持主板的 USB 转 CAN 桥接模式。你可以将主板用作树莓派上的 CAN 适配器，不再需要 UCAN。

:::


### 2.4 SCH DXF STEP

在 github 上获取 SCH、DXF、STEP 文件：

[GitHub - FYSETC/FYSETC_SB_CAN_TOOLHEAD: StealthBurner toolhead CAN bus module for VORON](https://github.com/FYSETC/FYSETC_SB_CAN_TOOLHEAD)

## 3. 固件指南

仅支持 Klipper 固件。如果你是 Klipper 初学者，请在此处查看 Klipper 固件构建：[Installation - Klipper documentation](https://www.klipper3d.org/Installation.html#installation)

### 3.1 menuconfig

![](/images/SB_CAN_ToolHEAD_menuconfig.png)

### 3.2 固件上传


:::danger


请勿热插拔 24V，因为有一定概率损坏板上的 5A 保险丝。你可以先插入 SB CAN ToolHead 的 24V 插座，然后通过电源开关控制 24V 电源的通断！
对于 V1.3 版本，只需插入 USB 线并按下复位按钮即可。无需重新给 24V 上电！

:::


#### 对于 V1.1 

板上有 Micro-USB 端口用于固件上传。请按照以下顺序操作。

1. 使用 USB 线将 SB-CAN-TH 的 Micro-USB 连接到树莓派的 USB-A 端口

2. 将 SB-CAN-TH 板的 24v 插座插入机器电源

3. 给你的树莓派（或其他 SBC）上电并等待其启动完成。

4. 为 SB-CAN-TH 板的 24v 电源上电 

5. 在树莓派中执行 `lsusb` 命令，检查是否显示 DFU 端口，如果没有，请返回步骤 1

6. 执行命令 `dfu-util -R -a 0 -s 0x08000000:leave -D out/klipper.bin`

7. 拔下 Micro-USB 线和 SB-CAN-TH 插座 5 秒，然后再次插入 SB-CAN-TH 插座。

8. 完成

#### 对于 V1.3

板上有 Micro-USB 端口用于固件上传，以及一个用于 MCU 复位的复位按钮，请按照以下顺序操作。

1. 使用 USB 线将 SB-CAN-TH 的 Micro-USB 连接到树莓派的 USB-A 端口
2. 将 SB-CAN-TH 板的 24v 插座插入机器电源
3. 给你的树莓派（或其他 SBC）和电源上电，等待树莓派启动完成。
4. 按住复位按钮 2 秒，然后松开
5. 在树莓派中执行 `lsusb` 命令，检查是否显示 DFU 端口，如果没有，请返回步骤 1
6. 执行命令 `dfu-util -R -a 0 -s 0x08000000:leave -D out/klipper.bin`
7. 拔下 Micro-USB 线和 SB-CAN-TH 插座 5 秒，然后再次插入 SB-CAN-TH 插座。
8. 完成

### 3.3 配置

在[此处](https://github.com/FYSETC/FYSETC_SB_CAN_TOOLHEAD/blob/main/sb_can_th.cfg)获取 Klipper 配置文件，你需要按照 [CANBUS - Klipper documentation](https://www.klipper3d.org/CANBUS.html) 获取 CAN ID： 

## 4. 日志和已知问题

### 4.1 v1.1

注意：v1.1 有以下丝印错误，红色字母是正确的丝印。

![image-20221117091211285](/images/image-20221117091211285.png)

### 4.2  v1.3 的新特性

1.  更改了连接器和连接线，可承载最大 15A 电流（板载保险丝限制为 8A）；
2.  增加了复位按钮；
3.  改为 6 层 2OZ PCB 板以增强散热；
4.  增加了 120R 终端电阻，可通过 JP3 断开，默认连接；
5.  更改了加热棒连接器以承载更大电流，最高可达 7A；


## 购买

[淘宝](https://item.taobao.com/item.htm?spm=a1z10.3-c.w4002-23828897339.22.229c1613tHAtLW&id=690431280049)

[速卖通](https://www.aliexpress.com/item/1005004880078163.html)

[官方网站](https://www.fysetc.com/products/fysetc-sb-can-tool-board-based-on-stm32f072-support-klipper-with-tmc2209-axl345-acceleration-sensor-for-3d-printer-parts?variant=42187842519215)

## 联系方式

QQ：1041794121

Facebook：https://www.facebook.com/groups/197476557529090

Discord：https://discord.gg/Fb6FdND4

E-Mail：support@fysetc.com

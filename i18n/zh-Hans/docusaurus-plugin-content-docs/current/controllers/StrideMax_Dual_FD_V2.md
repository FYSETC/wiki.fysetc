---
id: StrideMax_Dual_FD_V2
title: STRIDEMAX_DUAL_FD_V2
slug: /StrideMax_Dual_FD_V2
sidebar_position: 130
description: StrideMax Dual FD 是一款基于 RP2040 的控制板，配备双 TMC5160 驱动器，可运行 RRF 固件或 Klipper 固件。每组 5160 驱动器配有 8 个高功率 MOSFET，并由散热…
source_file: StrideMax_Dual_FD_V2.md
source_language: en
---

![image-20231222150832160](/images/StrideMax_on_DIN.png)



# 简介

StrideMax Dual FD 是一款基于 RP2040 的控制板，配备双 TMC5160 驱动器，可运行 RRF 固件或 Klipper 固件。每组 5160 驱动器配备 8 个大功率 MOSFET，并覆盖有散热片。它还提供两个风扇位置用于扩展，使每通道驱动电流可达 10A，可轻松驱动 86mm 步进电机。两个 TMC5160 拥有独立的 12V 供电，可大幅降低高压工作条件下的功耗和发热。StrideMax 支持 USB/CAN/CANFD 多种通信接口，可灵活配置并与 RRF 和 Klipper 固件配合使用。非常适合高速 3D 打印和高扭矩 CNC 驱动需求。



# 特性

- 双 TMC5160 高达 10A
- 树莓派 RP2040 MCU，支持 Klipper 和 **RRF 固件**
- 超小尺寸：80x90
- 19-60V 宽电压支持
- 双汽车保险丝
- CAN / **CANFD** 和 USB 接口
- 支持 DIN 导轨安装外壳
- 板载散热片
- 每组 MOSFET 阵列板载额外温度传感器
- 2 x **2-4Pin 可控风扇**
- 3 x 温度传感器
- 2 x I/O
- 1 x Neopixel RGB 支持

# 应用

- 高速 3D 打印机

- VzBoT 打印机项目 AWD

# 规格

| 规格                  | 驱动两相步进电机                             |
| ---------------------- | ------------------------------------------------------------ |
| 输入电压          | 19-60VDC（峰值）                                             |
| 输入电流（保险丝）   | 15A 最大（受连接器限制），5A 最大                   |
| 最大电流            | 6.6A 峰值（默认），15A 峰值（通过更换连接器和采样电阻） |
| 最大 STEP 频率     | 9MHz                                                         |
| 待机电流衰减 | 50%                                                          |
| 连接器             | 5.08mm 4P 插座（15A 最大）+ KF2510 插座（3A 最大）            |
| 接口              | TMC 5160 工作在 SPI 模式，StrideMax 工作在 USB/CAN/CANFD  |
| 环境温度    | 0-40°C (32-104°F)                                            |
| 环境湿度           | 90% 最大，非冷凝                                      |
| LED                   | 1 个状态 LED，5 个电源 LED                                   |
| 保护            | 过压保护、欠压保护、过温保护、过流保护 |
| 微步             | 硬件 8~64 微步可调，软件 8~256 微步 |
| Trinamic 技术          | MicroPlyer™ 最高分辨率每整步 256 微步<br/>StealthChop2™ 静音运行和平滑运动<br/>SpreadCycle™ 高动态电机控制斩波器<br/>DcStep™ 负载相关速度控制<br/>StallGuard2™ 高精度无传感器电机负载检测<br/>CoolStep™ 电流控制节能高达 75%<br/> |

# 安装

## 电源

为使驱动器正常工作，需要以下前提条件：

- 建议使用 19-55V 稳压电源，具体根据电机确定。

- 合适的控制信号源，如控制板、PLC 等；

- 匹配的步进电机。


:::warning


驱动器的极限电压为 60V，这并不意味着 60V 电源可以直接用于工作，因为开机或电机工作时电压可能瞬间升高，从而损坏驱动器

:::



:::note


- 如果希望同时保证高效率和低噪音，驱动器电源电压应至少为电机额定相电压的 5 倍（即电机额定相电压
× 相电阻）。
- 如果需要电机具有更好的高速性能，需要提高驱动电源电压。
- 如果使用稳压电源，电源电压不得超过 50V。
- 如果使用非稳压电源，所需电压不应超过 34V。因为非稳压电源的额定电流为满载电流；当负载很轻时，例如电机不旋转时，实际电压可高达电源额定电压的 1.4 倍。

:::


## 连接电机

**直接连接：** 将 B1/B2 连接到电机的一相，将 A1/A2 连接到电机的另一相；


:::note


**并联接法：** 一般用于要求转速快、扭矩要求不高的场合；

**串联接法：** 一般用于扭矩大、转速要求不高的场合。但串联接法使用过程中通过的电流较大，因此发热量会比一般并联电机更大。（通常步进电机发热温度达到 90 度属于正常现象）

:::


## 引脚和跳线配置

![img](/images/image-20231222183712370.png)

# 固件配置
我们制作了 klipper 配置示例，可在以下地址找到。RRF 固件和配置也一并提供以供参考。
## Klipper

![Klipper 配置](/images/stridemax-dual-fd-v2--klipper.png)

https://github.com/FYSETC/Stridemax_Dual_FD/tree/main/klipper

##  ReprapFirmware

StrideMax 的 RRF 固件由 teamgloomy（jay_s_uk 和 Andy）开发和维护，我们衷心感谢他们的辛勤工作和奉献。

关于 RRF 固件使用，请参考

https://teamgloomy.github.io/stridemax_v2_general.html

RRF 固件下载，请见此处：

https://github.com/gloomyandy/RepRapFirmware/releases

# 源文件

SCH&PCB：https://github.com/FYSETC/Stridemax_Dual_FD/tree/main/SCH%26PCB

STEP 文件：https://github.com/FYSETC/Stridemax_Dual_FD/blob/main/3D%262D/StrideMax%20Dual%20FD%20V2.0.step

# 购买渠道

淘宝（源中未提供链接）

[速卖通](https://www.aliexpress.com/item/3256806165718828.html)

官方网站（源中未提供链接）

# 联系我们

QQ 群：1041794121

Facebook 群组：https://www.facebook.com/groups/197476557529090

Discord：https://discord.gg/Fb6FdND4

邮箱：support@fysetc.com

---
id: BIG-DIPPER
title: BIG-DIPPER
slug: /BIG-DIPPER
sidebar_position: 120
description: BIG-DIPPER 是 Duet3 mini5+ 和 Mini 2+ 的组合。它基于 ATSAME54P20A，引脚分配与 mini5+ 完全相同，因此可以直接使用 mini5+ 固件。
source_file: BIG-DIPPER.md
source_language: en
---

## 简介

![BIG-DIPPER-TOP](/images/BIG-DIPPER-TOP.jpg)

BIG-DIPPER 是 Duet3 mini5+ 与 Mini 2+ 的结合体。它基于 [ATSAME54P20A](https://www.microchip.com/wwwproducts/en/ATSAME54P20A)，引脚分配与 mini5+ 完全相同，因此可以直接使用 mini5+ 的固件。

与 mini5+ 相比，电源和 IO 保护在一定程度上进行了升级，使其更加安全。并且您可以通过更换模块在 WIFI 版本和以太网版本之间切换。WIFI 版本模块支持外置天线。

得益于 RRF 固件良好的生态以及板载 7 轴（7xTMC2209），该板可以轻松配置用于各种 3D 打印机机型，例如 VORON 系列、多 Z 轴机型、双 X 机型等。

- 兼容的 RepRapFirmware 版本：RRF 3.2 及更高版本

有关固件更新说明，请参阅 [安装和更新固件](https://docs.duet3d.com/User_manual/RepRapFirmware/Updating_firmware)。
如果从 SBC 运行，请参阅 [Duet 3 的 SBC 设置](https://docs.duet3d.com/User_manual/Machine_configuration/SBC_setup)。

警告

- **在 Big Dipper 通电时，切勿连接或断开任何东西！** 例外：您可以在通电状态下连接或断开 USB 线缆，但请参阅有关使用 USB 连接的重要说明。

- **务必将电源的正极和负极引线正确连接到 VIN 接线端子！**

- **请勿超过 25V VIN 输入电压！**

- **当步进电机连接到 Big Dipper 时，请勿用手移动任何会使电机快速旋转的部件！** 例如，如果您需要用手移动打印头，或用手移动 delta 打印机的滑车，请缓慢进行。同样，如果您需要用手旋转挤出机齿轮，请缓慢进行。步进驱动器的快速旋转会产生足够的电压，以不受控制的方式为其供电，并可能产生超过其额定电压的电压。

- **请勿将 SD 延长线插入内置 SD 卡插槽！** 这些线缆经常损坏 SD 卡插槽内的触点。即使没有损坏，它们在 Duet 使用的高 SD 卡传输速度下也无法良好工作。

- **安装 Big Dipper 时，如果使用金属螺丝，请确保它们不会接触到 Big Dipper 上的任何电子元件或焊盘！** 请在螺丝头下方使用随 Big Dipper 提供的尼龙垫圈。

- **如果您使用万用表测量板上的电压，尤其是风扇连接器上的电压，请务必非常小心！** 探针可能会滑动并相互短路或与其他元件短路。如果您将风扇连接器的两个引脚短接，您**将会**损坏您的 Big Dipper。

- **不要仅仅依赖 Big Dipper 电子设备和固件来防止 3D 打印机温度过高！** 尽管 Duet 固件具有先进的保护功能，但电子设备和固件可能会以意想不到的方式失效。

- **如果您使用 USB 连接到 Duet，请注意减轻接地环路的影响！** 
  
  ### 包装内容

![BIG-DIPPER-INCLUDE](/images/BIG-DIPPER-INCLUDE.jpg)

1 x Big Dipper（WiFi 或以太网）

7 x 散热片

1 x 单板计算机 (SBC) 排线

1 x 带延长线的外置天线（仅 WiFi 版本）

### 独立模式与 SBC 模式

Big-Dipper 基本上与 Duet3 Mini 5+ 相同。它可以直接连接到网络，也可以连接到单板计算机 (SBC)，例如树莓派。

所有标准打印机功能、不同的运动学、网络 UI (DuetWebControl) 等在独立模式下均可工作。

SBC 模式允许部分功能由 SBC 处理。例如，HDMI 或 Pi 触摸屏可用作 UI，Pi 可作为网络服务器，Pi 上的 Duet Software Framework 插件允许添加自定义功能，以实现更高级的控制和监控。

## 特性

1. 紧凑尺寸：148.5 x 87mm

2. 基于 SAME54P20（ARM Cortex M4 @120Mhz），完全兼容 Duet3 Mini5+

3. 板载 7 个 TMC2209 步进电机驱动器

4. 输入和输出 IO 全面 TVS 保护

5. 最大输入 28V，12V@2A DC-DC（12V 风扇电源），5V@8A DC-DC（为树莓派和系统供电），两个 3.3V@0.6A LDO（分别为 MCU 和 3.3V 外设供电）

6. 两个汽车保险丝，分别用于热床输入和主电源输入

7. 使用 XH2.54 连接器，每个接口功能与 mini5+ 完全相同

8. 7x PWM 功率 MOSFET 输出（1 个用于热床，2 个用于热端，4 个用于风扇）

9. 兼容 RepRap Discount Smart Controller 的插座，EXP1 和 EXP2。支持 2004、12864 等单色显示屏。

10. UART1-树莓派排针（包括 5V@5A 电源）

11. 板载 TF 卡槽

12. Type-C USB 插座

13. 3 个热敏电阻/PT1000 输入，并通过可选子板支持 2 个 PT100 或热电偶输入。

14. 提供 Wifi 和以太网两个版本

15. CAN 总线，支持下一代 Duet3D 扩展板、智能工具和自定义附加组件。

16. 通过 Web 界面设置打印机并更新固件。

17. 支持所有常见的 3D 打印机几何结构

18. 支持多种 Z 探针，包括 DC42 的红外 Z 探针和用于 delta 打印机的 Duet3D Smart Effector。

### 硬件规格

| 硬件规格       |                                                                                                                                                                                                                                             |                                                               |
|:---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
|                              | **Big Dipper WiFi**                                                                                                                                                                                                                         | **Big Dipper 以太网**                                       |
| **处理器**                | [ATSAME54P20A](https://www.microchip.com/wwwproducts/en/ATSAME54P20A)                                                                                                                                                                       |                                                               |
| **处理器特性**       | 120MHz ARM Cortex M4F，1Mb 闪存，256Kb RAM，硬件浮点（单精度），DMA，4Kb 缓存                                                                                                                                     |                                                               |
| **网络/通信**         | 2.4GHz WiFi；USB 端口；串口；CAN-FD 总线                                                                                                                                                                                              | 10BaseT/100BaseTX 以太网；USB 端口；串口；CAN-FD 总线 |
| **板载步进驱动器** | 7 x [TMC2209](https://www.trinamic.com/products/integrated-circuits/details/tmc2209-la/)                                                                                                                                                    |                                                               |
| **步进驱动器特性**  | 峰值电流高达 2.0A，任意设置到 x256 的微步插值，堵转检测，stealthChop2                                                                                                                                    |                                                               |
| **大电流输出**     | 1 x 15A，2 x 各 5A                                                                                                                                                                                                                        |                                                               |
| **热敏电阻/PT1000 输入** | 3 x 输入，针对 100K 热敏电阻和 PT1000 传感器优化                                                                                                                                                                               |                                                               |
| **中等电流输出**   | 4 x PWM 控制输出，其中 2 个支持转速计输入。电压可在 2 个组中选择 VIN 和 12V                                                                                                                               |                                                               |
| **输入/输出**           | 5 x 板载 I/O 连接器，加上 2 x 仅输入连接器，用于限位开关、耗材监测器、Z 探针、舵机或 PanelDue 连接。输入可耐受 30V。还有一个 5V 信号电平输出，用于舵机、激光控制或 VFD。 |                                                               |
| **电源监控**         | VIN 电压监控允许在断电时保存状态。                                                                                                                                                                              |                                                               |
| **SD 卡接口**        | 板载高速 SD 卡插槽。                                                                                                                                                                                                         |                                                               |

| 扩展                                                                  |                                                                                                             |
|:-------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **支持连接的树莓派或其他单板计算机 (SBC)** | 是                                                                                                         |
| **外部步进驱动器支持**                                        | 通过 CAN-FD 总线进行多重扩展。                                                                      |
|                                               |                                                                             |
| **PT100 和热电偶子板支持**                           | 板上支持 1 x 子板（2 通道）。更多通过 CAN-FD 连接的扩展板。               |
| **LCD 支持**                                                            | PanelDue 彩色触摸屏，使用 ST7567 控制器的 mini 12864 单色图形显示屏（3.3V 信号电平） |
| **LED 灯带支持**                                                      | RGB Neopixel（最多 60 个 LED，需要外部 5V 电源）                                                     |
| **其他扩展**                                                        | 通过 I/O 端口和 CAN-FD 总线                                                                                |

## 物理特性

### 尺寸

![image-20220902134845584](/images/image-20220902134845584.png)

### 安装

Big Dipper 的外形与 Duet 2 WiFi/以太网相同，安装方式也大致相同，不过与 Duet 2 WiFi/以太网相比，驱动器连接器位于相反的一侧。

### 散热

在许多应用中，被动散热就足够了，特别是如果板子垂直安装在通风良好的位置。如果需要主动散热，建议使用风扇沿步进驱动器方向吹过板子背面。

步进驱动器的散热片连接到 PCB，大部分热量通过 PCB 散发，因此步进驱动器芯片上的散热片基本上无效。

### MCU 温度

不幸的是，Big Dipper 中使用的 SAME54P20A 芯片没有可用的温度传感器。理论上它确实有一个片上温度传感器，但该芯片的勘误文档说明它无法工作。不过，它已在 RRF 3.3 中作为实验启用，并且在测试的样品上似乎确实能提供有用的读数。

### 步进驱动器温度

因此，您将无法监控 MCU 温度以控制风扇。驱动器传感器确实可用于风扇控制，但只返回警告和过温标志，

### 3D 模型

板的 STEP 文件可在 [Github 此处](https://github.com/Duet3D/Duet3-Mini5plus/tree/main/v1.01) 获取。

## 物理连接

### 接线图

![Big-Dipper Wiring](/images/big-dipper--wiring-diagram.png)


### 连接说明

| Big Dipper 连接器                  |                                                  |                                                                                                                                                                                                                                                                                                                                               |
|:-------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1 x 10 位螺丝端子**            | 电源输入：GND、VIN                               | 两个引脚用于主 VIN 和 GND                                                                                                                                                                                                                                                                                                                 |
|             | OUT_0：V_OUT_0_OUT、OUT_0_NEG OUT_0_IN：V_OUT_0_IN、OUT_0_NEG_IN                   | 两个引脚用于 OUT_0 的正极和负极端子（BED OUT）。OUT_0 用于驱动热床加热器或其他大电流阻性负载。如果您将感性负载连接到此输出，则必须使用额定值合适的续流二极管。OUT_0 的接地侧由 MOSFET 开关控制，正极侧由 15A 保险丝保护。OUT_0 电压输入（BED IN）正极侧由 20A 保险丝保护  |
|         | OUT_1、OUT_2                                     | 用于挤出机加热器或类似的中/大电流阻性负载。这些输出内置续流二极管。建议最大电流各 6A。                                                                                                                                                                              |
| **2 x 4 针 JST XH 连接器**            | OUT_3、OUT_4                                     | 用于 PWM 可控风扇或其他中/低电流负载。这些输出内置续流二极管。该连接器适合标准 PC 型 4 针 PWM 风扇。或者，可以将 2 针风扇连接在 V_OULC1+ 引脚（正极）和 OUT_n_NEG 引脚（负极）之间。                                                              |
|                                        |                                                  | **注意：** OUT_3 和 OUT_4 通过续流二极管保护到 V_FUSED。如果从高于 V_FUSED 的电压驱动这些输出，则无法提供保护                                                                                                                                                                           |
| **1 x 6 针跳线**                   | OUT_3&4 选择电压                                 | 上述连接器的正电源由此跳线选择。跳线在 "24v" 位置将从熔断的 VIN 电源为其供电（每个最大 2A）。跳线在 "12v" 位置将从板载 12V 稳压器为其供电（受整体 12V 电源电流限制 *见下方注释 1*）。跳线在 "5v" 位置将从板载 5V 稳压器为其供电                |
| **2 x 2 针 JST XH 连接器**            | OUT_5、OUT_6                                     | 这些用于 PWM 可控风扇或其他中/低电流负载。这些输出内置续流二极管。**注意** out_6 PWM 引脚与 LASER/VFD 共用                                                                                                                                                                 |
|                                        |                                                  | **注意：** OUT_5 和 OUT_6 通过续流二极管保护到 V_FUSED。如果从高于 V_FUSED 的电压驱动这些输出，则无法提供保护                                                                                                                                                                           |
| **1 x 6 针跳线**                   | OUT_5&6 选择电压                                 | 上述连接器的正电源由此跳线选择。跳线在 "24v" 位置将从熔断的 VIN 电源为其供电（每个最大 2A）。跳线在 "12v" 位置将从板载 12V 稳压器为其供电（受整体 12V 电源电流限制 *见下方注释 1*）。跳线在 "5v" 位置将从板载 5V 稳压器为其供电                |
| **7 x 4 针 JST XH 连接器**            | DRIVER_0、DRIVER_1、DRIVER_2、DRIVER_3、DRIVER_4、DRIVER_5、DRIVER_6 | 步进电机连接，请参阅下方 "连接步进电机" 部分。                                                                                                                                                                                                                                                                     |
|             |                                  |                                                              |
| **1 x 2x5 IDC 连接器**              | PanelDue_SD                                      | 连接 [PanelDue](https://docs.duet3d.com/Duet3D_hardware/Accessories/PanelDue) UART 和用于外部 SD 卡的共享 SPI 总线。由 5V 电源供电（*见注释 2*）。**注意** 与 IO_0 排针上的 io0.in 和 io0.out 引脚共用。                                                                                                   |
| **1 x 3 针 JST XH 连接器**            | LASER/VFD                                        | 与 out6 共用的 5V 缓冲输出，以及 5V 和接地电源（*见下方注释 2*）。提供 5V PWM 信号以驱动舵机，以及用于 VFD 或激光器的 PWM->模拟控制。**注意** out6 PWM 引脚与 OUT_6 共用                                                                                                            |
|**1 x 2x4 针插座排**       | 24V                                              | 常开 24V 电源 4 x 24V 和 4 x GND（*见下方注释 1*）                                                                                                                                                                                                                                                                                                     |
| **网络**                            | **以太网**                                     | 1 x RJ45 100BaseT 端口。*非 MDIX* 连接到以太网交换机、集线器或启用 MDIX 的笔记本电脑端口。如果连接到未启用 MDIX 的端口，请使用交叉线缆。以太网端口上的橙色 LED 表示以太网已启用，绿色 LED 表示网络活动                                                                               |
|                                        | **Wifi**                                         | 用于外置天线的 U.FL/IPEX 按压式连接器。*注意此连接器很脆弱，插拔时请小心*。"LED ESP"：绿色 LED 表示 Wifi 连接状态                                                                                                                                                            |
| **复位**                              |                                                  | 按一次复位板子。按两次使板子进入 UF2 引导加载程序上传模式。请参阅 [用户手册：更新固件 - 通过 USB 更新 Big Dipper](https://docs.duet3d.com/User_manual/RepRapFirmware/Updating_firmware#duet-3-mini-5-wifiethernet)                                                                                      |
|   **USB-C**      |USB    |用于更新固件或串行通信                                                                                                                                                                                                                                                                                   |
| **1 x 2 针 JST XH 连接器**            | CAN                                              | 用于 Duet 3 CAN-FD 扩展板的 CAN-FD 总线连接。                                                                                                                                                                                                                                                                                     |
| **5 x 5 针 JST XH 连接器**            | IO_0、IO_1、IO_2、IO_3、IO_4                     | 这些用于限位开关、Z 探针、耗材监测器和其他低压 I/O 功能。每个连接器提供 3.3V 和 5V 电源。输入通过 10K 串联电阻可耐受高达 30V（但请参阅下方关于旁路的选项）。输出为 3.3V 信号电平，带 470R 串联电阻。IO_1、2、3 支持 PWM。    |
|**1 x 1x6 针插座排**  |SWD                                    | 用于 SWD 编程设备（如 Atmel-ICE）的连接                                                                                                                                                                                 |
| **2 x 3 针 JST XH 连接器**            | IO_5、IO_6                                       | 仅输入 IO 连接，通过 10K 串联电阻可耐受高达 30V。非常适合简单的限位开关。                                                                                                                                                                                                                        |
| **3 x 2 针 JST XH 连接器**            | TEMP_0、TEMP_1、TEMP_2                           | 用于热敏电阻或 PT1000 传感器的连接。                                                                                                                                                                                                                                                                                                 |
| **1 x 2x13 IDC 连接器**             | SBC                                              | 连接到单板计算机 (SBC)，例如树莓派。                                                                                                                                                                                                                                                                          |
| **1 x 2x5 针插座排**              | TEMPDB                                           | 用于连接 [PT100](https://docs.duet3d.com/Duet3D_hardware/Accessories/PT100_Temperature_Daughterboard) 或 [热电偶](https://docs.duet3d.com/Duet3D_hardware/Accessories/Thermocouple_Daughterboard) 接口板。**注意** 板子不能堆叠，因此一次仅支持 1 块板。                                    |
| **1 x 3 针跳线**                   | 5V_SELECT                                        | 可选外部 5V 输入的来源，请参阅下方注释 2                                                                                                                                                                                                                                                                                        |
| **1 x 2 针跳线**                   | Int_5V_Disable                                   | 在此处连接跳线以禁用内部 5V 稳压器，请参阅下方注释 2                                                                                                                                                                                                                                                           |
| **2 x 2x5 IDC**                       | 12864_EXP1、12864_EXP2                           | 用于连接使用 ST7567 控制器的 12864 显示屏的排针，请参阅下方 "连接 12864 显示屏"。                                                                                                                                                                                                                                     |
| **1 x 3 针 JST XH 连接器**             | NP_LED                                           | 用于连接和供电 NeoPixel LED 灯带（不支持 DotStar LED 灯带）。将 DO 引脚连接到 Neopixel DI。必须向 "EXT 5V" 排针提供外部 5V 以为 NeoPixel 阵列供电，它们不能由板载稳压器供电。                                                                              |
| **1 x 3 针 JST XH 连接器**             | EXT 5V                                           | 外部 5V 电源输入，请参阅下方注释 2。有一个缓冲的 5V "pson" 引脚，可用于切换外部电源，注意它与 io4.out 共用                                                                                                                                                                              |

**注释**

1. 12V 总负载不应超过 800mA
2. 5V 可由多个输入（USB、外部 5V 输入、SBC）以及内部 5V 稳压器供电。当由内部 5V 稳压器供电时，5V 总负载不应超过 800mA。更多信息请参阅下方 "电源分配，5V" 部分

### LED 指示

![image-20221020094336139](/images/image-20221020094336139.png)

提供 LED 以指示以下内容：

| 标签       | 颜色 | 功能                                                     |
| :---------- | :---- | :----------------------------------------------------------- |
| **ACT**     | 红色   | 指示 CAN-FD 总线上的活动                         |
| **STATUS**  | 红色   | 见下方描述                                        |
| **V_FUSED** | 红色   | 指示存在熔断的 VIN 电源                           |
| **12V+**    | 红色   | 指示板载 12V 稳压器工作         |
| **5V+**     | 红色   | 指示存在 5V 电源                        |
| **3.3V+**   | 红色   | 指示板载 3.3V 稳压器工作                  |
| **ESP**     | 红色   | 仅 WiFi 版本。指示 WiFi 活动；闪烁表示搜索/连接中，常亮表示已连接。 |
| **OUT_0**   | 红色   | 位于 OUT 0 连接器旁边，开启时指示               |
| **OUT_1**   | 红色   | 位于 OUT 1 连接器旁边，开启时指示               |
| **OUT_2**   | 红色   | 位于 OUT 2 连接器旁边，开启时指示               |

TYPE-C USB 旁边的红色 LED 是 "STATUS"。它指示板子的状态，如下所示。

| LED                                                             | 含义                                     |
|:--------------------------------------------------------------- |:------------------------------------------- |
| 稳定闪烁，约半秒灭半秒亮 | 正常运行，RepRapFirmware 正在运行 |
| 闪烁三次，然后熄灭一段时间                      | 固件 CRC 校验失败                   |
| 从亮到暗渐变然后再次变亮                   | USB 引导加载程序已激活                    |

### 引脚名称

有关引脚名称的更多信息，请参阅 [引脚名称](https://docs.duet3d.com/User_manual/RepRapFirmware/Migration_RRF2_to_RRF3#pin-names)。

RepRapFirmware 3 使用引脚名称（而非引脚编号）来与 PCB 上的各个引脚通信，用于用户可访问的引脚。在 RRF 3 中，默认情况下启动时未定义任何用户可访问的引脚。可以为多个 gcode 命令定义引脚，例如 M574、M558、M950。

Duet 3 系列使用引脚名称格式 "expansion-board-address.pin-name" 来标识扩展板上的引脚，其中 *expansion-board-address* 是板子的数字 CAN 地址。不以一系列十进制数字后跟句点开头的引脚名称，或以 "0." 开头的引脚名称，指的是 Big Dipper 上的引脚。

| 引脚位置           | RRF3 引脚名称    | 备注                                                                                                           |
|:---------------------- |:---------------- |:--------------------------------------------------------------------------------------------------------------- |
| **加热器输出**     |                  |                                                                                                                 |
| OUT_0 (BED OUT)                 | out0             | 大电流输出，热床加热器                                                                                 |
| OUT_1 (E0 OUT)                 | out1             | 中等电流输出，热端                                                                                |
| OUT_2 (E1 OUT)                 | out2             | 中等电流输出，热端                                                                                |
| **输出（4 针）**    |                  |                                                                                                                 |
| OUT_3                  | out3             | 带转速计的 4 线风扇                                                                                          |
| out3.tach              |                  |                                                                                                                 |
| OUT_4                  | out4             | 带转速计的 4 线风扇                                                                                          |
| out4.tach              |                  |                                                                                                                 |
| **输出（2 针）**    |                  |                                                                                                                 |
| OUT_5                  | out5             |                                                                                                                 |
| OUT_6                  | out6, laser, vfd | 引脚与 OUT 6 和 LASER/VFD 连接器共用                                                                  |
| **温度输入** |                  |                                                                                                                 |
| TEMP_0                 | temp0            |                                                                                                                 |
| TEMP_1                 | temp1            |                                                                                                                 |
| TEMP_2                 | temp2            |                                                                                                                 |
| **输入/输出**      |                  |                                                                                                                 |
| IO_0                   | io0.in           | PanelDue、限位开关、Z 探针、耗材监测器等。与 PanelDue_SD 连接器共用 io0.out 和 io0.in 引脚。 |
|                        | io0.out          | PanelDue、限位开关、Z 探针、耗材监测器等。与 PanelDue_SD 连接器共用 io0.out 和 io0.in 引脚。 |
| IO_1                   | io1.in           | 限位开关、Z 探针、耗材监测器等                                                                       |
|                        | io1.out          | 限位开关、Z 探针、耗材监测器等                                                                       |
| IO_2                   | io2.in           | 限位开关、Z 探针、耗材监测器等                                                                       |
|                        | io2.out          | 限位开关、Z 探针、耗材监测器等                                                                       |
| IO_3                   | io3.in           | 限位开关、Z 探针、耗材监测器等                                                                       |
|                        | io3.out          | 限位开关、Z 探针、耗材监测器等                                                                       |
| IO_4                   | io4.in           | 限位开关、Z 探针、耗材监测器等                                                                       |
|                        | io4.out, pson    | 限位开关、Z 探针、耗材监测器等                                                                       |
| IO_5                   | io5.in           | 仅输入                                                                                                      |
| IO_6                   | io6.in           | 仅输入                                                                                                      |
| **SPI CS**             |                  |                                                                                                                 |
| TEMPDB                 | spi.cs0          | 热电偶或 PT100 子板                                                                             |
|                        | spi.cs1          |                                                                                                                 |
|                        | spi.cs2          |                                                                                                                 |
|                        | spi.cs3          |                                                                                                                 |
| **其他**      |                  |                                                                                                                 |
| LASER/VFD              | laser, vfd, out6 | 引脚与 OUT 6 和 LASER/VFD 连接器共用                                                                  |
| EXT 5V                 | pson, io4.out    | 用于控制外部 PSU 或 SSR，与 io4.out 共用                                                     |
| LED                 | led    | RGB Neopixel                                                     |

### 输入/输出

#### OUT 排针

OUT_0 到 OUT_6 均支持 PWM。OUT_6 与 LASER/VFD 共用。有关电压选择和电流限制的说明，请参阅上表。

#### IO 排针

板上有 7 个 IO 排针。IO_0 到 IO_4 具有输入、输出、3.3V、5V 和 Gnd 引脚。IO_5 和 IO_6 具有输入、3.3V 和 Gnd。这支持多种限位开关、探针、耗材监测器和未来的低带宽设备。RepRapFirmware 3 可以配置为根据需要将这些端口映射到适当的功能。

![duet_3_mb6hc_input_output.jpg](/images/duet_3_mb6hc_input_output.jpg)

除下表注明的例外情况外，IO_x_IN 引脚始终可用于提供数字输入（例如用于限位开关输入或耗材监测器），IO_x_OUT 引脚始终可用于提供数字输出。

IO 输出引脚可用作输入，但仅耐受 3.3V。IO 输入引脚可用作输出，但串联有 10K 保护电阻，因此需要旁路这些电阻才能将其用作输出。仅在板版本 v1.01 及更高版本上，跳线允许用 470R 电阻旁路 IO2.in 和 IO3.in 上的 10K 电阻。这是将 IO2 或 IO3 用于 I2C 所必需的。

各个 IO_x 连接器具有以下功能：

| IO # | UART？ | 模拟输入？ | PWM 输出？ | 备注                                                                                                                             |
|:---- |:----- |:---------- |:-------- |:--------------------------------------------------------------------------------------------------------------------------------- |
| 0    | 是   | 否         | 否       | AUX0 端口，可用于连接 PanelDue。使用 M575 P1 配置。与 PanelDue_SD 连接器共用 io0.out 和 io0.in 引脚。 |
| 1    | 是   | 否         | 是      | AUX1 端口。使用 M575 P2 配置。                                                                                               |
| 2    | 是   | 否         | 是      | 标准固件不支持此 UART                                                                                  |
| 3    | 否    | 是        | 是      | 与具有 Neopixel 背光的 12864 显示屏的背光控制共用                                                        |
| 4    | 否    | 否         | 否       | IO4_OUT 与 PSON 输出共用                                                                                                |
| 5    | 否    | 否         | 不适用      | 3 针连接器，仅输入                                                                                                       |
| 6    | 否    | 否         | 不适用      | 3 针连接器，仅输入                                                                                                       |

### 电源分配

#### VIN（来自 PSU 的输入电压）

在 GND 和 VIN 端子之间提供 12V-24V 输入电源（绝对最小/最大 11-25V）。

VIN 通过两个保险丝分配：

V_FUSED：20A：除 OUT0（通常用于加热床）外的所有板载电源需求

OUT0_FUSE：15A：直接到 V_OUT0 端子

VFUSED 在板上的分配如下：

- 12V 稳压器
- 5V 稳压器
- 步进驱动器（包括外部驱动器排针）
- OUT 1 和 OUT 2 排针
- V_OUTLC1 和 V_OUTLC2 选择跳线

#### 12V

**12V_EXT**：1500mA 限制，提供给：

- V_OUTLC1/2 用于 OUT_3 到 OUT_6。
- 12V 排针（可用于为从相邻 5V PWM 排针控制的 VFD 提供 12V）

#### 5V

**5V**：分为 5V_EXT、5V_INT。这些点也可由 VBUS（即 USB）和 5V_SELECT 跳线提供，该跳线在 5V_EXT_INPUT 和 5V_SBC 之间选择。（更多详细信息请参阅下方 5V 电源选项）。

- 5V_EXT 供给
  
  - IO 排针
  - 12864 显示屏和 PanelDue
  - LASER/VFD 排针

- 5V_INT 供给

- 内部和外部 3.3V 稳压器
  
  - 外部驱动器排针

- 内部 5V 逻辑

5V 输入可来自以下来源之一：

- **板载 5V 稳压器：** 一旦满足 3.3V 和其他板载需求，大约剩余 700mA 可用于 5V_EXT 电源轨。
- **USB：** 可同时提供 5V_INT 和 5V_EXT。限制基于 USB 规范。
- **5V_EXT_INPUT**：将 5V_SELECT 跳线设置到此位置时，5V 从 EXT_5V 排针传递到 5V_EXT 和 5V_INT。使用 EXT_5V 时，在 Int_5V_Disable 上添加跳线，以禁用板载 5V 稳压器。EXT_5V 排针还有一个用于控制外部电源的引脚（注意信号与 io4.out 共用）。这允许板子由 5V 供电，并根据需要打开和关闭 VIN 的外部电源。
- **5V_SBC：** 在某些有限的情况下，可能希望从连接到 SBC 排针的 SBC 的 5V 输出为板子供电。请注意，Duet+ 外设的总功率必须计入 SBC 电源预算。另请注意，不支持从 duet 为 SBC 供电。

#### 3.3V

**3.3V**：用于板载逻辑、温度子板和外部驱动器的内部 3.3V 电源

- 3.3V_EXT
  - IO 排针
  - 外部 SD 卡

### 连接显示屏

#### 连接 12864 显示屏

信号电平大多为 3.3V。这意味着使用由 5V 供电的 ST7920 显示屏的 LCD 模块（例如 RepRapDiscount 显示屏）将**无法**可靠工作。请改用带有 ST7567 控制器的显示屏。我们测试的显示屏是 Fysetc Mini 12864 显示屏 2.1 版。您可以使用通常随此显示屏提供的直通排线将其直接连接到 EXP1 和 EXP2 连接器。在 config.g 中使用以下命令启用显示屏：

```none
M918 P2                     ; enable ST7567-based 12864 display
M150 X2 R255 U255 B255 S3   ; set all 3 LEDs to white
```

复制

您可以调整 M150 命令以更改背光颜色。请注意，在更改背光颜色时会短暂禁用中断，打印将在此期间暂停；因此，您不应在打印期间更改背光颜色。

#### 连接 PanelDue

可以使用 4 线电缆将 [PanelDue](https://docs.duet3d.com/Duet3D_hardware/Accessories/PanelDue) 连接到 IO_0。请参阅 [连接 PanelDue](https://docs.duet3d.com/User_manual/Connecting_hardware/Display_PanelDue#option-1-4-way-cable)

或者，可以使用插入标有 PanelDue_SD 的插座的排线连接，这样可以访问 PanelDue SD 卡插槽。但是，有一些注意事项：

- PanelDue 连接器共用 io0.out 和 io0.in 引脚，因此不能同时使用 IO_0。
- Duet 3 板支持卡检测信号。较新版本的 PanelDue 5i 和 7i（5i 的 v1.01 及更高版本和 7i 的 v2.01 及更高版本）提供此信号，但旧版本需要修改。请参阅 [连接 PanelDue](https://docs.duet3d.com/User_manual/Connecting_hardware/Display_PanelDue#card-detect-signal)

### 连接树莓派

Big Dipper 无法为 Pi 供电。您必须单独为 Pi 供电。树莓派对输入电压敏感，许多智能手机充电器或其他 USB 电源无法提供足够的电压。因此，我们强烈建议您使用官方树莓派 PSU，或其他专为树莓派供电设计的 PSU。如果 Pi 上的红色 LED 未持续亮起，则电源不足。

在其他方面，Big Dipper 的 SBC 连接和配置与 Duet 3 Mini 和 Duet 3 Mainboard 6HC 相同。请参阅 [Duet 3 的 SBC 设置](https://docs.duet3d.com/User_manual/Machine_configuration/SBC_setup)。

当使用连接的树莓派或其他 SBC 时，Big Dipper 上的 WiFi 或以太网接口将被禁用。

### 连接步进电机

请参阅 [连接步进电机](https://docs.duet3d.com/User_manual/Connecting_hardware/Motors_connecting)。

### 连接风扇

请参阅 [连接和配置风扇](https://docs.duet3d.com/User_manual/Connecting_hardware/Fans_connecting)。


## 附件

- [原理图文件](https://github.com/FYSETC/FYSETC-BIG_DIPPER/blob/main/Hardware/BIG-DIPPER%20V1.1%20SCH.pdf)
- [引脚定义文件](https://github.com/FYSETC/FYSETC-BIG_DIPPER/raw/main/images/Big-Dipper%20Wiring%20Fixed.png)

有关包括配置信息在内的更多文档，请查看 https://github.com/FYSETC/FYSETC-BIG_DIPPER

##  支持

[Fysetc Discord 服务器](https://discord.gg/CtENXn9N)

##  商店

[Fysetc 官方商店](https://www.fysetc.com/)

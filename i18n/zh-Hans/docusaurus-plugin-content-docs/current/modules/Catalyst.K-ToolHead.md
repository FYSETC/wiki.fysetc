---
id: Catalyst.K-ToolHead
title: Catalyst.K ToolHead
slug: /Catalyst.K-ToolHead
sidebar_position: 20
source_file: Catalyst.K ToolHead.md
source_language: en
helplook_source: Modules/Catalyst.K ToolHead.md
---

![](/images/catalyst-k-toolhead--figure-01.png)

# 简介

Catalyst.K ToolHead 是一款紧凑型 Klipper 工具板，尺寸仅为 47 mm × 44 mm，设计用于安装在打印头或挤出机附近。它由 STM32G431CBT6 32 位 MCU 驱动，支持多种通信模式，包括 USB 和 CAN / RS-232，可通过板载物理按钮进行切换。
该板集成了 TMC2209 步进电机驱动器、ADXL345 三轴加速度计、多个风扇和温度输入，以及 BL-Touch 和热端加热器控制。这大大简化了工具头布线，减轻了运动部件上的线束重量，并提高了打印机的整体可靠性和可维护性。

# 特性
- 紧凑型工具板设计：47 mm × 44 mm，直接安装在打印头或挤出机附近，大大简化布线。
- STM32G431 MCU：32 位高性能控制器，针对 Klipper 多 MCU 配置进行了优化。
- 多种通信模式：支持 USB、CAN 和 RS-232，可通过板载按钮切换。
- 板载 USB 集线器：提供 3× USB 端口和 1× CAN 端口，便于主机和扩展连接。
- 集成 TMC2209：板载 24V 供电的 TMC2209 步进驱动器，实现安静、精确的挤出机控制。
- 内置 ADXL345：板载三轴加速度计，用于 Klipper 输入整形和共振测试。
- 稳定的电源输出：24V 输入（最大 28V），板载 5V@3A 和 3.3V@0.8A 电源轨。
- 丰富的 IO 和风扇接口：4 个电平转换 IO 引脚，4 个风扇输出（2×2 线，可选 5V/24V，1×3 线，1×4 线）。
- 完整的传感和执行器接口：3 个温度输入，1 个 BL-Touch 连接器，1 个热端加热器输出，最高 2.5A。
- 易于调试：板载 BOOT0 和 RESET 按钮，便于快速烧录和调试。


# 应用
- 用作 Klipper 工具头板，用于挤出机/打印头控制，在工具头上提供本地电机驱动、温度控制、风扇控制和加速度测量，大大简化打印机的布线。
- 适用于需要集成 TMC2209、ADXL345、BL-Touch 和多个风扇/温度接口的中高端 FDM 3D 打印机，既可用于升级现有机器，也可用于新打印机设计。
- 适用于多工具头、多喷嘴或远程挤出配置，作为分布式工具板节点，通过 CAN 或 USB /RS-232 连接到 Klipper 主机系统，构建灵活的多 MCU 运动控制架构。

# 硬件规格
| 项目 | 规格 |
| - | - | 
| 产品名称 | Catalyst.K ToolHead | 
| 板尺寸 | 47 mm × 44 mm | 
| MCU | STM32G431CBT6，32 位 ARM Cortex-M4 | 
| 通信模式 | USB、CAN、RS-232（可通过板载按钮选择） | 
| 输入电压 | 24 V DC（最大 28 V） | 
| 板载电源轨 | 5 V @ 3 A，3.3 V @ 0.8 A | 
| 步进驱动器 | 板载 TMC2209，24 V 供电 | 
| 加速度计 | 板载 ADXL345 三轴加速度计 |
| 电平转换 IO | 4× IO，带电压转换器（可通过焊盘选择） | 
| 风扇输出 | 4 个数字风扇输出：2×2 线（5V/24V 跳线可选），1×3 线，1× 4 线 |
| 温度输入 | 3× 温度传感器输入 | 
| 探针接口 | 1× BL-Touch 连接器 |
| 加热器输出 | 1× 热端加热器输出，最高 2.5 A |
| 板载按钮 | BOOT0 按钮，RESET 按钮 |


# 物理连接

## 引脚定义

![](/images/catalyst-k-toolhead--pin-out.png)


```python
IO.0: PC14
IO.1: PB13
IO.2: PB14
IO.3: PB15

FAN0_PWCTL: PB3
FAN0_PWM: PB10
FAN0_TACH: PB11

FAN1: PA2
FAN1_TACH: PA8 
FAN2: PA4
FAN3: PA3

Heat: PC15
Thermistor (4.7k pull up): PB2
Thermistor (4.7k pull up): PB1
Thermistor (4.7k pull up): PB0
Thermistor next to TMC2209 (4.7k pull up) : PB12

Driver_EN: PB9
Driver_DIR: PB6
Driver_STEP: PB7
Driver_UART: PA15
Driver_DIAG: PA13

ADXL345
spi_bus: spi1
adxl345_cs_pin: PA0
adxl345_spi_software_sclk_pin: PA5
adxl345_spi_software_miso_pin: PA6
adxl345_spi_software_mosi_pin: PA7

USB_DM/CAN_RX: PA11
USB_DP/CAN_TX: PA12

Signal_PWM: PC13
```

## 连接说明：


![](/images/catalyst-k-toolhead--description-of-connections.png)



| 连接器             | 引脚                                 | 默认功能                                                                                                    | 备用      |
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------- |
| 电源输入| RS-232 (PA9,PA10)<br>CANBUS (PA11,PA12) | 电源和通信输入，RS-232 和 CANBUS 为可选，可通过板载物理按钮切换。                     |      I/O        |
| Fan0      | FAN0_PWR: PB3<br>FAN0_PWM:PB10<br>FAN0_TACH: PB11         | Mosfet 输出，用于 4 针风扇，电压 = 24V |                |
| Fan1      | FAN1: PA2 <br>FAN1_TACH: PA8      | Mosfet 输出，用于 3 针风扇，默认电压 = 24V  |
| Fan2      | PA4        | Mosfet 输出，用于 2 针风扇，默认电压 = 取决于电压选择器。<br>**(排针电压选择器)** |                |
| Fan3      | PA3        | Mosfet 输出，用于 2 针风扇，默认电压 = 取决于电压选择器。<br>**(排针电压选择器)** |                |
| IO.0      | PC14  | 数字输入，用于限位开关、微动开关或霍尔 <br> **(焊盘电压选择器)**                             | 数字输出 |
| IO.1      | PB13  | 数字输入，用于限位开关、微动开关或霍尔 <br> **(焊盘电压选择器)**                     | 数字输出 |
| IO.2      | PB14  | 数字输入，用于限位开关、微动开关或霍尔 <br> **(焊盘电压选择器)**                     | 数字输出 |
| IO.3      | PB15  | 数字输入，用于限位开关、微动开关或霍尔 <br> **(焊盘电压选择器)**                     | 数字输出 |
| TOUCH     | PWM:PC13 <br>Z-MIN:PB15   | 5V 数字输出，数字输入，用于 Z 探针、接近开关或 Klicky 等。 <br> **(焊盘电压选择器)**          | 数字输入  |
| T0        | PB2   | ADC 输入，4.7K 上拉，温度测量   | 模拟信号输入 |
| T1        | PB1   | ADC 输入，4.7K 上拉，温度测量   | 模拟信号输入 |
| T2        | PB0   | ADC 输入，4.7K 上拉，温度测量   | 模拟信号输入 |
| HEAT      | PC15  | Mosfet 输出，加热棒控制，最大 2.5A   |                |
| MOTOR     |       | 用于两相步进电机，24V                |                |
| USB1, USB3|       | 连接到 CH334P HUB 芯片，最多 4 个 USB2.0 设备 (USB/USB1/MCU/USB3)|                |


## RS-232 / CAN / USB 选择

CANBUS/RS-232 通信可通过 XH2.54-2*2 连接器实现，而 USB 通信需要连接到 PH2.0-4P 连接器。请参考以下方法进行实现。
1. 要启用 RS-232 通信，连接 J1（XH2.54-2*2 连接器）并将 SW3-Pin2 设置为 OFF。

   ![](/images/catalyst-k-toolhead--rs232-selection.png)

2. 要启用 CANBUS 通信，连接 J1（XH2.54-2*2 连接器），将 SW3-Pin2 设置为 ON，同时将 SW3-Pin1 设置为 OFF。

  ![](/images/catalyst-k-toolhead--can-communication-mode.png)

   
3. 要启用 USB 通信，连接到 J4（XH2.54-2*2 连接器）并将 SW3-Pin1 设置为 ON。

  ![](/images/catalyst-k-toolhead--usb-selection.png)
  

:::warning 警告

注意：参考连接部分，RS-232、USB 和 CANBUS 可以同时连接。不同的通信方式可以通过 DIP 开关切换。


:::

## 排针跳线：

Fan2、Fan3 可以通过跳线帽选择电源电压。
如图所示，左侧两个引脚连接在一起为 24V，右侧两个引脚连接在一起为 5V。

![](/images/catalyst-k-toolhead--header-jumpers.png)




:::note 注意

请注意，如果这些接口用作输出，输出的高电平电压与跳线选择的电压一致。请确保您的外设能够承受该范围。一般来说，3D 打印机配件中只有 SSR 能够承受 9-36V 控制电压。

:::


## 通信

只需使用电源线和数据线（USB 转 Type-C）分别将我们的主板（CATALYST.K）连接到树莓派的排针电源端口和 USB 端口，如下图所示。树莓派不需要额外的电源，因为我们的主板提供 5V@6A 电源输出——足以确保树莓派正常运行。

### 通过 USB / CAN / RS-232

![](/images/catalyst-k-toolhead--mainboard-connection.png)

CATALYST.K_Kit 是一个完整的套件，包括主板（CATALYST.K）和工具板（Catalyst.K ToolHead）。它们之间支持三种通信方式：USB、RS-232 和 CANBUS。连接这三根数据线后，设置 DIP 开关。详情请参考 Catalyst.K ToolHead 页面上的 RS-232 / CAN / USB 选择部分。

-------


# 固件指南

## 固件配置和编译

### 无 Bootloader 的 Klipper

使用 SSH 工具登录树莓派后，执行以下命令打开固件配置工具。

```shell
cd ~/klipper
make menuconfig
```


Catalyst.K ToolHead 默认使用无 bootloader 模式，配置如下：
#### USB

![](/images/catalyst-k-toolhead--usb-recommend.png)

#### CAN

![](/images/catalyst-k-toolhead--can.png)

#### SERIAL

![](/images/catalyst-k-toolhead--serial-unsupported.png)


## 固件上传

![](/images/catalyst-k-toolhead--dfu-mode-01.png)


在执行以下命令之前，您需要进入 DFU 模式才能编译和烧录固件。如上图所示，

- 按住 BOOT0，
- 按下 RESET 按钮一秒钟，
- 释放 RESET，
- 等待 3 秒，
- 释放 BOOT0。

使用命令 'lsusb' 检查是否检测到 DFU 设备。如果出现，继续上传固件。如果没有，重复前面的步骤。

![](/images/catalyst-k--dfu-mode-01.png)

:::note 注意

设备只能在使用 USB 通信时进入 DFU 模式。

:::


设备进入 DFU 模式后，执行以下命令编译并烧录程序。
```shell
make flash FLASH_DEVICE=0483:df11
```

使用 Katapult 上传时，请参考：

https://github.com/Arksine/katapult?tab=readme-ov-file#uploading-klipper

# 附件和其他文档
2D、3D、SCH 和配置模板文件，请访问我们的 github：
https://github.com/FYSETC/Catalyst.K_Kit

# 购买渠道
www.fysetc.com

# 技术支持渠道
support@fysetc.com
https://discord.gg/yYVx98gCDW

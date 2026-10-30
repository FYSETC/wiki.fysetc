---
id: SB_Combo_V2
title: SB Combo V2
slug: /SB_Combo_V2
sidebar_position: 30
description: SB CAN V2 是一款全新设计的 SB 工具板，运行 Klipper 固件。它基于 STM32F072，提供 CANBUS 和 USB 两种通信模式。板载 USBHUB 最多提供三个 USB 接口，…
source_file: SB_Combo_V2.md
source_language: en
---

# SB Combo V2


:::danger


- 请勿将 SB1.3 线缆直接与 V2 配合使用，它们的正负极位置是相反的。
- 将 SB1.3 线缆直接与 V2 配合使用将 100% 损坏 V2 板。
- 我们强烈建议更换为新线缆。
- 如果您不想更换线缆，请将原 1.3 线缆的黑色线连接到 + 极，红色线连接到 - 极。
- V2 的 CANH 和 CANL 也与 1.3 的相反。

:::


![产品主图](/images/SB_Combo_V2_top.png)

# 简介

SB CAN V2 是一款全新设计的运行 Klipper 固件的 SB 工具板。基于 STM32F072，提供 CANBUS 和 USB 两种通信模式。板载 USBHUB 最多提供三个 USB 接口，可用于连接扫描调平传感器（Scanner Leveling Sensor，如 IDM 或 Cartographer）和 AI 摄像头等。它还可以与可选板垂直连接，方便使用。

# 特点

- STM32F072 MCU，支持 Klipper 固件
- **6 层 PCB 设计，全部采用固态电容和钽电容**
- 板载 2 个 M3 3.5mm 隔离柱，无需打印件，易于安装
- 板载 CAN/USB 切换开关
- 板载 RESET 和 BOOT0 按钮，便于固件更新
- 风扇控制/加热均使用独立大功率 MOS，更安全、发热更低
- **板载 5V@3A DC-DC，5V 峰值负载可达 15W**
- XT30 接口，随板附带定制连接线缆
- **板载 USB2.0 HUB，3 个 USB2.0 接口（其中一个位于辅助板上）**
- **支持 CAN / USB2.0 连接**
- 支持辅助板连接，用于前盖快速安装和拆卸
- 辅助板连接用于前盖的快速安装和拆卸。您可以通过辅助板添加 1 个 USB、2 个 3 线风扇、1 个 RGB
- 板载 TMC2209
- 3 个风扇，3 个带电平转换的 IO，1 个 RGB，1 个加热，1 个热敏电阻，1 个状态 LED
- 板载 ADXL345 加速度计
- 板载 USB-C 用于固件更新

# 应用

Voron StealthBurner 打印头

# 硬件规格

| 功能                | SB Combo V2                                                | SB TH CAN V1.3     |
| ----------------------- | ---------------------------------------------------------- | ------------------ |
| 微控制器         | STM32F072CBT6                                              | STM32F072CBT6      |
| 加速度计           | ADXL345                                                    | ADXL345            |
| USB 端口                | 2 + 1（用于 STM32F072）+ 1（在辅助板上），由 CH334P 供电 | -                  |
| 风扇                     | 3+2（在辅助板上）                                         | 2                  |
| 加热输出          | 1                                                          | 1                  |
| 温度测量 | 1（PH2.0 连接器）+ 1（板载热敏电阻）              | 1（PH2.0 连接器） |
| 电压监测      | 5V, 24V                                                    | -                  |
| 电机驱动             | TMC2209                                                    | TMC2209            |
| 信号输入和输出 | 3                                                          | 3                  |
| RGB 灯带控制 | 1 + 1（在辅助板上）                                       | 1                  |
| 辅助板支持       | 是                                                        | 否                 |
| 板载安装螺母    | 是                                                        | 否                 |

# 工作限制

| **步进驱动器**           | 峰值电流最高 2.0A                     |
| ----------------------------- | ------------------------------------------- |
| **MOSFET 输出**           | HE0 最高 5A，每个风扇最高 2.5A          |
| **输入电源电压**       | VIN 11V 至 24V，最高 10A                |
| **输入/输出**            | 信号最大 20ma，RGB 总计最大 2.5A |
| **5V 和 3.3V 电流限制** | 5V@3A，3.3V@0.8A                           |

# 物理连接

## 引脚定义

### 在 SB_Combo 板上

![img](/images/SB_Combo_V2_PIN.png)

IO.0 和 IO.1 位于同一连接器中，可用作 XY 限位开关，IO.2 可用作探针。此外，IO.0、IO.1 和 IO.2 具有电平转换（带上拉电阻）和电压选择器（5V 或 24V），可兼容多种传感器。三个 IO 和 RGB 可用作输入或输出，可根据您的需求进行配置。

```
IO.0: PA2
IO.1: PA3
IO.2: PA0
RGB: PB11

FAN0: PB6
FAN1: PB5
FAN2: PA4

Heat: PC15
Thermistor: PA6

Driver_EN: PA15
Driver_DIR: PA8
Driver_STEP: PB3
Driver_UART: PA10
Driver_TX: PA9
Driver_DIAG: PB4

spi_bus: spi2
adxl345_cs_pin: PB12
adxl345_spi_software_sclk_pin: PB13
adxl345_spi_software_mosi_pin: PB15
adxl345_spi_software_miso_pin: PB14

CAN_RX: PB8
CAN_TX: PB9

5V_Monitor: PA1
24V_MOnitor: PA5
TMC_Thermistor: PB1
```

### 在 AUX 板上

![SB_Combo_V2_AUX_PIN](/images/SB_Combo_V2_AUX_PIN.png)

```
ext_IO.6: PA7
ext_fan0: PB0
ext_IO.5: PB10
ext_fan1: PB7
RGB: PC14
```

## 连接说明：

![SB_Combo_V2_connector_bottom](/images/SB_Combo_V2_connector_bottom.png)

![SB_Combo_V2_connector_top](/images/SB_Combo_V2_connector_top.png)

| 连接器               | 引脚                               | 默认功能                                                                           | 备选      |
| ----------------------- | --------------------------------- | ------------------------------------------------------------------------------------------ | -------------- |
| P1, 输入               | USB (PA11,PA12)`CANBUS (PB8,PB9)` | 电源和通信输入，USB 2.0 和 CANBUS 可选，由 K2 拨码开关选择。 |                |
| Fan0                    | PB6                               | MOSFET 输出，打印风扇，默认电压 = VIN。                                       |                |
| Fan1                    | PB5                               | MOSFET 输出，热端风扇，默认电压 = VIN。                                          |                |
| Fan2                    | PA4                               | MOSFET 输出，SB Combo 冷却风扇，默认电压 = VIN。                                |                |
| IO.0+1                  | PA2, PA3                          | 数字输入，用于 X Y 限位开关，微动开关或霍尔                                       | 数字输出 |
| IO.2                    | PA0                               | 数字输入，用于 Z 探针，接近开关或 Klicky 等。                               | 数字输出 |
| IO.3, RGB               | PB11                              | 数字输出，用于 WS2812/SK6812 RGB                                                      | 数字输入  |
| J2, USB1                |                                   | USB2.0                                                                                     |                |
| J1, USB2                |                                   | USB2.0 或 CANBUS 2.0，USB 2.0 和 CANBUS 可选，由 K4 拨码开关选择。          |                |
| TE0                     | PA6                               | ADC 输入，4.7K 上拉，头部温度测量                                          |                |
| HE0                     | PC15                              | MOSFET 输出，加热棒控制，最大 5A                                                 |                |
| P2, AUX 板接口 |                                   | 用于连接 AUX 板                                                                   | 其他用途 |
| MOTOR                   |                                   | 用于两相步进电机，                                                               |                |
| USB1, USB-C 连接器   |                                   | 连接到 CH334PHUB 芯片，最多 4 个 USB2.0 设备（MCU/USB1/USB2/USB3）               |                |


## 2 x 2 线风扇

如果您使用的是 A4T 等具有 2 个模型冷却风扇的工具头，您可以使用 [[multi_pin]](https://www.klipper3d.org/Config_Reference.html?h=multi#multi_pin) 一起控制它们。

例如，如果您的风扇连接到 Fan1 和 Fan2，配置如下所示。

```ini
[multi_pin cooling] # 2x fan part cooling
pins: H36_combo:PB2, H36_combo:PB0

[fan] # Part cooling fan
pin: multi_pin: cooling
max_power: 1.0
kick_start_time: 0.5
cycle_time: 0.002
hardware_pwm: false
shutdown_speed: 0
```

## LED 指示：

![img](/images/SB_Combo_V2_LED.png)

| LED 名称 | 指示                                                                                                                                                                                                                                                                             | 备注 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| 3V3      | 亮起：电源正常。`熄灭：电源故障。3.3V 是通过 DC-DC 将 24V 转换为 5V，再通过 LDO 转换为 3.3V 获得的，因此 24V/5V/3.3V 可能存在短路/开路。`                                                                     |        |
| HUB      | 亮起：USB 至少有一个连接。``熄灭：USB 无连接。                                                                                                                                                               |        |
| STATUS   | 使用 katakulpt 时 `- 闪烁：进入下载模式；`- 熄灭/常亮：不在下载模式，状态通常由配置决定；``- LED 由 PC13 控制，高电平点亮。如需自定义使用，请参考 julianschill/klipper-led_effect |        |
| HEAT     | 根据加热 PWM 亮起或闪烁                                                                                                                                                                                                                                    |        |

## CAN / USB 切换

![img](/images/SB_Combo_V2_switcher.png)

- 如图所示，绿色标记的拨动开关负责输入 CAN/USB 切换，位于 XT30 连接器上；橙色标记的拨动
- 开关负责标记为 USB2（MX1.25-4P）的连接器处的 CAN/USB 切换。

## 跳线：![image-20240902163114843](/images/SB_Combo_V2_jumpers.png)

IO.0+1 和 IO.2 可通过跳线帽选择电源电压。
如图所示，左侧两个引脚连接在一起为 5V，右侧两个引脚连接在一起为 24V。


:::note

请注意，如果这些接口用作输出，输出的高电平电压与跳线选择的电压一致。请确保您的外设能够承受该范围。一般来说，3D 打印机配件中只有 SSR 能够承受 9-36V 控制电压。

:::


## 通信

### 连接到 Pi

SB combo V2 可通过 USB 或 CANBUS 连接到 Pi。通过 K2 选择，参考 CAN / USB 切换器。

#### 通过 CAN

由于 Raspberry Pi 没有 CANBUS 接口，通常只有在通过扩展芯片扩展 CANBUS 接口后才能连接。常用的之一

- MCP2518 SPI 转 CAN 模块（CanHat）
- USB 转 CAN 模块（例如：UCAN）
- Klipper USB 转 CAN 桥接模式
- 具有原生 CAN 接口的 Linux 主机（例如：CM68）

![](/images/sb-combo-v2--via-can.jpg)

#### 通过 USB

![](/images/sb-combo-v2--via-usb.jpg)

## 连接

风扇

温度传感器

热敏电阻

PT1000

### 电机

### 限位开关

### 其他

RGB

接近开关

Klicky

TAP

# 固件指南

### 固件配置和编译

### Katapult Bootloader

感谢伟大的 Katapult 项目，使 Klipper 固件更新变得更加容易。如果您愿意花一些时间阅读 Katapult 的文档，那么我推荐您使用它，否则就使用无 bootloader 模式！
有关 katapult 的更多信息，请参考 https://github.com/Arksine/katapult
以下是简单指南，但请仔细检查配置选项！

> cd katapult
> make menuconfig
> make flash FLASH_DEVICE=0483:df11

#### USB 模式的 katapult 配置

![SB_Combo_V2_katakulpt_menuconfig_8k_CAN](/images/SB_Combo_V2_katakulpt_menuconfig_8k_CAN.png)

#### CANBUS 模式的 katapult 配置

![SB_Combo_V2_katakulpt_menuconfig_8k_USB](/images/SB_Combo_V2_katakulpt_menuconfig_8k_USB.png)

### Klipper 固件配置

#### 使用 Katapult Bootloader

##### USB 通信模式

![SB_Combo_V2_menuconfig_8k_USB](/images/SB_Combo_V2_menuconfig_8k_USB.png)

##### CANBUS 通信模式

![SB_Combo_V2_menuconfig_8k_CAN](/images/SB_Combo_V2_menuconfig_8k_CAN.png)

#### 使用无 Bootloader

##### USB 通信模式

![SB_Combo_V2_menuconfig_nobootloader_USB](/images/SB_Combo_V2_menuconfig_nobootloader_USB.png)

##### CANBUS 通信模式

![SB_Combo_V2_menuconfig_nobootloader_CAN](/images/SB_Combo_V2_menuconfig_nobootloader_CAN.png)

## 固件上传

### 无 Bootloader 模式或上传 Katapult Bootloader

命令：

```shell
cd ~/klipper
make flash FLASH_DEVICE=0483:df11
```

### 使用 Katapult Bootloader 上传 Klipper

1. 确保 klipper 服务已停止。

2. 构建支持 CAN 的 Klipper，并且 bootloader 偏移量与 Katapult 中的“application offset”匹配。

3. 进入 bootloader。如果 Katapult 检测到 flash 的应用程序区域为空，它会自动进入 bootloader。当从当前已刷写的 Klipper 版本升级时，flashtool.py 脚本将命令 USB 和 CANBus 设备进入 bootloader。请注意，“USB 转 CAN 桥接设备”和“UART”设备无法自动检测。如果设备不在 bootloader 模式，需要先使用 -r 选项手动请求 bootloader，然后在不带 -r 的情况下重新运行脚本以执行上传。运行非 Klipper 软件的设备需要使用自己的方法请求 bootloader。

4. 运行刷写脚本：对于 CAN 设备：

> cd ~/katapult/scripts
> python3 flashtool.py -i can0 -f ~/klipper/out/klipper.bin -u &lt;uuid&gt;

替换为您 CAN 设备的相应 uuid。如果设备之前未刷写过 Klipper，可以向 bootloader 查询 UUID：

> flashtool.py -i can0 -q


:::info 示例

1. 确保 katapult bootloader 已烧录
2. 双击 RESET 按钮进入 bootloader，标志是 STATUS LED 会闪烁
3. 使用命令（参考 https://www.klipper3d.org/CANBUS.html）
> ~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
查找 can uuid
4. 使用 uuid 更新固件
> python3 flashtool.py -i can0 -f ~/klipper/out/klipper.bin -u 02479ee3301f

:::



:::note 注意

只应在网络上只有一个 can 节点时执行查询。尝试查询多个节点可能导致传输错误，从而迫使节点进入“bus off”状态。当节点进入“bus off”时，它会变得无响应。必须重置节点才能恢复。

:::


对于 USB/UART 设备：刷写前，请确保已安装 pyserial。安装所需的命令取决于 Linux 发行版。基于 Debian 和 Ubuntu 的发行版可以运行以下命令：

> sudo apt update
> sudo apt install python3-serial

> python3 flashtool.py -d &lt;serial device&gt; -b &lt;baud_rate&gt;

将 &lt;serial_device&gt; 替换为您要刷写的 USB/UART 设备的路径。&lt;baud_rate&gt; 仅对 UART 设备需要，如果省略则默认为 250000 波特。


:::info 示例

1. 确保 katapult bootloader 已烧录
2. 双击 RESET 按钮进入 bootloader，标志是 STATUS LED 会闪烁
3. 使用命令 
> ls /dev/serial/by-id
查找 can mcu id
4. 使用该 id 更新固件
> python3 flashtool.py -d /dev/serial/by-id/the_id_you_get

:::


# 附件

- [原理图文件](https://github.com/FYSETC/SB_Combo_V2/tree/main/SCH)

有关更多文档（包括配置信息），请查看 https://github.com/FYSETC/SB_Combo_V2/tree/main

# 支持

[Fysetc Discord 服务器](https://discord.gg/CtENXn9N)

# 商店

[Fysetc 官方商店](https://www.fysetc.com/)
[AliExpress](https://www.aliexpress.com/store/3480083?)

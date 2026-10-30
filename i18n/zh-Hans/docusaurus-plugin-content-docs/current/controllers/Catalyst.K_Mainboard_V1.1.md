---
id: Catalyst.K_Mainboard_V1.1
title: Catalyst.K_Mainboard_V1.1
slug: /Catalyst-K-Mainboard-V1-1
sidebar_position: 150
source_file: Catalyst.K_Mainboard_V1.1.md
source_language: en
helplook_source: Controllers/Catalyst.K_Mainboard_V1.1.md
---

![](/images/catalyst-k-mainboard-v1-1--3beeef61bdcf5b12.png)

---
# 简介
这款高性能 3D 打印机主板基于 STM32H723 32 位 MCU 构建，外形尺寸为 138 mm × 98 mm。它专为 Klipper 等现代开源固件设计，可通过 USB 连接 Raspberry Pi 3B+/4B/5B 等外部 SBC，构成强大的“MCU + SBC”架构，从而实现高速打印、多轴运动控制和高级功能扩展。

# 特性
- 基于 STM32H723 的高性能 MCU，可满足高速插补和同步多轴运动控制等高要求的 3D 打印工作负载。
- 通过 USB 连接 Raspberry Pi 3B+/4B/5B 或任何兼容 Klipper 的主机，原生支持 Klipper 风格的配置。
- 五个 STEPSTICK 插槽，支持 TMC5160 和 TMC2209 等灵活的驱动选择，以平衡扭矩、平滑度和静音运行。
- 可选 24V/48V 步进电机供电，并支持每个电机单独选择电压，适用于混合电压运动系统。
- DC 24V 输入，带 24V/10 A 热床输出、AC 热床控制信号输出，以及高达 5A 的热端加热输出，适用于高功率应用。
- 板载稳压电源轨：12V/3A、5V/3A、5V/6A（用于 Raspberry Pi 供电）和 3.3V/800 mA，可从单板为风扇、传感器和 SBC 供电。
- 丰富的连接性，包括 3× USB、2× RS‑232、1× RS‑485 和 1× 高速 CAN 接口，用于高级扩展和分布式运动系统。
- 九个通用 IO 和五个风扇输出，其中四个可选电压（5V/12V/24V），另有一个 RGB 接口用于状态指示和灯光效果。

-------

# 应用
- 非常适合作为中高端 FDM 3D 打印机的主控制器，尤其是基于 Klipper 的高速和多轴系统。
- 适合将现有打印机从传统 8 位或低性能主板升级到 STM32H7 + Klipper 平台，以获得更高速度和更大灵活性。
- 可用于其他需要最多五个步进轴、24 V / 48 V 混合供电和丰富通信接口的运动控制设备，例如小型 CNC 机床、自动化设备和实验室设备。


-----

# 硬件规格
| 项目 | 规格 |
| - | - |
| 主板名称 | CATALYST.K |
| 主板尺寸 | 138 mm × 98 mm | 
| 微控制器 | STM32H723VGT6 |
| 固件架构 | 通过 USB 连接外部 Klipper 主机（Raspberry Pi 3B+/4B/5B 等） |
| 步进驱动插槽 | STEPSTICK 插槽 ×5，兼容 TMC5160 / TMC2209 / 其他 STEPSTICK 驱动 |
| 电机供电电压 | 24V/48V 可选，支持每个电机单独选择电压 |
| 主板输入 | DC 24 V |
| HOTBED 输出 | DC24V/10 A，带 AC 热床控制信号输出 |
| HEAT 输出 | 最高 5 A |
| USB 端口 | 3 + 1（用于 MCU），由 CH338F 供电 |
| CANBUS | 1（用于 MCU） | col |
| 串行接口 | RS‑232 ×2；RS‑485 ×1 | 
| 风扇 | 5（4x2Pin，1x3Pin） | col |
| 温度测量 | 2 | content |
| RGB 灯带控制 | 1 | col |
| 信号输入输出 | 4 | 


# 工作限制

:::warning Waining

以下数值是在 25°C 室温下测试的。请不要长时间保持最高峰值运行！
在较高温度环境中，请做好主板的散热工作。

:::

| 项目 | 工作限制（推荐） | 
| - | - |
| 步进驱动 | 单个步进电机的峰值电流可达 2A。 | 
| Mosfets 输出	| HOTBED 最高 10A，HEAT 最高 5A，每个风扇最高 0.5A |
|输入电源电压|VIN 为 24V，最高 15A|
| 输入/输出 | 信号最大 20mA，RGB 电源总最大 1.5A | 
| 5V 和 3.3V 电流限制 | 5V@6A 最大，5V@3A 最大，3.3V@0.8A 最大 | content |



# 物理连接

## 引脚定义

![](/images/catalyst-k-mainboard-v1-1--d3f7dad33f1c3444.png)


```python
RGB0: PD3
LED: PD12

COOLFAN: PB10
COOLFAN_TACH: PC2
FAN: PA3
FAN1: PA1
FAN2: PB2

Heat: PA2
Bed: PA0
Thermistor (4.7k pull up): PC0
Thermistor (4.7k pull up): PC1

DriverX_EN: PE9
DriverX_DIR: PE10
DriverX_STEP: PE11
DriverX_UART/SPI_CS: PE7
DriverX_DIAG: PE0

DriverY_EN: PD9
DriverY_DIR: PB12
DriverY_STEP: PD8
DriverY_UART/SPI_CS: PE15
DriverY_DIAG: PB13

DriverZ_EN: PD15
DriverZ_DIR: PD13
DriverZ_STEP: PD14
DriverZ_UART/SPI_CS: PD10
DriverZ_DIAG: PE1

DriverE0_EN: PD4
DriverE0_DIR: PD6
DriverE0_STEP: PD5
DriverE0_UART/SPI_CS: PD7
DriverE0_DIAG: PC4

DriverE1_EN: PE5
DriverE1_DIR: PC13
DriverE1_STEP: PE6
DriverE1_UART/SPI_CS: PC14
DriverE1_DIAG: PA15

MOTOR_SPI
spi_software_mosi_pin: PE14
spi_software_miso_pin: PE13
spi_software_sclk_pin: PE12

AC_BED: PB0
Filament: PE8

CAN_RX: PD0
CAN_TX: PD1

USB_DM: PA11
USB_DP: PA12

```

## 连接说明



| 连接器             | 引脚                                 | 默认功能                                                                                                    | 备用      |
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------- |
| HOTBED           | PA0 | Mosfet 输出，热床输出控制，最大 10A                    |                |
| AC-BED  | PB0 | Mosfet 输出，AC 热床 PWM 信号控制|                |
| RGB     | PD3 |5V 数字输出，用于 5V WS2812/SK6812 RGB/舵机|数字输出|
| HEAT                | PA2      | Mosfet 输出，加热棒控制，最大 5A |             
| FAN                 | PA3        | Mosfet 输出，用于 2 针风扇  |                |
| ADC-TB   | PC0      | ADC 输入，4.7K 上拉，HOTBED 温度测量 |模拟信号输入      |
| ADC-HEAT | PC1      | ADC 输入，4.7K 上拉，HEAT 温度测量| 模拟信号输入 |
| COOL-FAN | COOL-FAN: PB10 <br>COOL-FAN_TACH: PC2  | Mosfet 输出，用于 3 针风扇 <br> **（排针电压选择）**    | 数字输出 |
| FAN1     | PA1      | Mosfet 输出，用于 2 针风扇  <br> **（排针电压选择）**          | 数字输出|
| FAN2 | PB2          | Mosfet 输出，用于 2 针风扇  <br> **（排针电压选择）**   | 数字输出  |
| LED  |   PD12       | Mosfet 输出，用于 2 针 LED  <br> **（排针电压选择）**                                                                                               | 数字输出  |
| STOP-X   | PE0      | 数字输入，用于限位开关、微动开关或霍尔<br> **（焊盘电压选择）**|  I/O     || STOP-X | PE0      | 数字输入，用于限位开关、微动开关或霍尔**（焊盘电压选择）** | I/O     |
| STOP-Y   | PB13     | 数字输入，用于限位开关、微动开关或霍尔<br> **（焊盘电压选择）**|  I/O     |
| STOP-Z   | PE1      | 数字输入，用于限位开关、微动开关或霍尔<br> **（焊盘电压选择）**|  I/O     |
| MOTOR E1 |          | 用于两相步进电机，24V/48V <br> **（排针电压选择）**|          |
| MOTOR E0 |          | 用于两相步进电机，24V/48V <br> **（排针电压选择）**|          |
| MOTOR X |          | 用于两相步进电机，24V/48V <br> **（排针电压选择）**|          |
| MOTOR Y |          | 用于两相步进电机，24V/48V <br> **（排针电压选择）**|          |
| MOTOR Z |          | 用于两相步进电机，24V/48V <br> **（排针电压选择）**|          |
| RS-232   |          | XH2.54-4 连接到 CH347T，并从 CH347T 连接到 CH338F HUB 芯片。 |   
| RS-232   |SYNC:PE4  | PH2.0-5 连接到 CH347T，并从 CH347T 连接到 CH338F HUB 芯片。 |              
| RS-485   |          | PH2.0-5 连接到 CH340E，并从 CH347T 连接到 CH338F HUB 芯片。 |       
| CAN|CAN_H/TX:PD1<BR>CAN_L/RX:PD0 | CAN BUS |
| USB1 | - | 连接到 CH347T PHUB 芯片 |
| USB2 | - | 连接到 CH347T PHUB 芯片 |
| USB3 | - | 连接到 CH347T PHUB 芯片 |
| USB-C| - | 连接到 Raspberry Pi 并连接到集线器以进行固件上传 |
| FILAMENT | PE8| 数字输入，用于限位开关、微动开关或霍尔<br> **（焊盘电压选择）**|  I/O     |

## LED 指示

![](/images/catalyst-k-mainboard-v1-1--14db0bcef1099092.png)


处于 DFU 模式时，或为 USB/串口模式刷写固件后，绿色 LED 点亮；为 CAN 模式刷写固件后，红色 LED 点亮。

## 排针跳线

如图所示，要使用 48V 步进电机，请将 48V 电源连接到主板右侧的 KF-129 端子。默认情况下，系统使用单电源（DC24V）运行。电机电压选择跳线连接到 24V。

![](/images/catalyst-k-mainboard-v1-1--96dd48e5f0ef340f.png)


:::note 注意

请注意，如果这些接口用作输出，输出的高电平电压与跳线选择的电压一致。请确保您的外设能够承受该范围。一般来说，3D 打印机配件中只有 SSR 能够承受 9-36V 控制电压。

:::


## 连接

只需分别使用电源线和数据线（USB 转 Type-C）将我们的主板（CATALYST.K）连接到 Raspberry Pi 的排针电源端口和 USB 端口，如下图所示。Raspberry Pi 无需额外电源，因为我们的主板提供 5V@6A 电源输出——足以确保 Raspberry Pi 正常运行。

### USB 通信模式
1. 将 Raspberry Pi 上的 USB 连接器连接到主板（CATALYST.K）上的连接器
2. 将主板（CATALYST.K）上的 RS-232 连接器连接到工具板（Catalyst.K ToolHead）上的电源连接器
3. 将主板（CATALYST.K）上的 USB 连接器连接到工具板（Catalyst.K ToolHead）上的连接器。
4. 使用 5 针线缆连接主板和调平板。
5. Raspberry Pi 电源和显示屏接线请参考 https://github.com/FYSETC/Catalyst.K_Kit/tree/main/V1.1。

![](/images/catalyst-k-mainboard-v1-1--58583579afcb3ae7.png)


### SERIAL 通信模式（推荐）
1. 将 Raspberry Pi 上的 USB 连接器连接到主板（CATALYST.K）上的连接器
2. 将主板（CATALYST.K）上的 RS-232 连接器连接到工具板（Catalyst.K ToolHead）上的电源连接器
3. 使用 5 针线缆连接主板和调平板。
4. Raspberry Pi 电源和显示屏接线请参考 https://github.com/FYSETC/Catalyst.K_Kit/tree/main/V1.1。

![](/images/catalyst-k-mainboard-v1-1--22f3d548d0183cbd.png)


### CAN 通信模式
1. 将 Raspberry Pi 上的 USB 连接器连接到主板（CATALYST.K）上的连接器
2. 将主板（CATALYST.K）上的 RS-232 连接器连接到工具板（Catalyst.K ToolHead）上的电源连接器
3. 将 Catalyst.K ToolHead 连接到 Cartographer。
4. Raspberry Pi 电源和显示屏接线请参考 https://github.com/FYSETC/Catalyst.K_Kit/tree/main/V1.1。

![](/images/catalyst-k-mainboard-v1-1--4289c06141669bbf.png)


## 外设连接
要将 K1 Max 外设连接到 CATALYST.K，请参考下图。

![](/images/catalyst-k--peripheral-connection.png)

外设端子定义请参考[连接说明](#description-of-connections)。

----

# 固件指南

## 固件配置
### 无 Bootloader 的 Klipper（推荐）


:::warning 警告

- 上位机（如 Raspberry Pi）必须连接到 Wi-Fi 或以太网。使用 Angry IP Scanner 等局域网扫描工具获取上位机的 IP 地址后，即可使用 SSH 工具登录上位机。

:::


使用 MobaXterm 或 PuTTY 等工具通过 SSH 登录上位机，并执行以下命令打开固件配置工具。

```shell
cd ~/klipper
make menuconfig
```

推荐模式为 USB 模式，配置如下。

#### USB 和串口（推荐）

![](/images/catalyst-k-mainboard-v1-1--f9885f268acc8c51.png)

#### USB 转 CAN

![](/images/catalyst-k-mainboard-v1-1--ab68fd73b488bab9.png)

#### CAN

![](/images/catalyst-k-mainboard-v1-1--800987a88e53cd51.png)

直接使用 CAN 通信时，需要 UCAN 模块将 Raspberry Pi 连接到主板和工具头；但是，不建议采用此方式。

完成参考图中所示的配置，然后保存配置并退出配置工具。


:::note 注意

如果使用 Katapult，请参考：
https://github.com/Arksine/katapult?tab=readme-ov-file#uploading-klipper

:::


## 固件上传
### DFU 模式

![](/images/catalyst-k-mainboard-v1-1--a9b8cd512d18e522.png)


您需要进入 DFU 模式才能编译并烧录固件。如上图所示，

- 按住 BOOT0，
- 按下 RESET 按钮一秒钟，
- 松开 RESET，
- 等待 3 秒，
- 松开 BOOT0。

使用命令 'lsusb' 检查是否检测到 DFU 设备。如果出现，则继续上传固件。如果没有，请重复前面的步骤。

![](/images/catalyst-k--dfu-mode-01.png)

### 固件烧录
设备进入 DFU 模式后，执行以下命令编译并烧录程序。
```shell
make flash FLASH_DEVICE=0483:df11
```
烧录过程完成后，将显示“File downloaded successfully”。

## ID 查找

:::warning 警告

- 如果 Mainsail 或 KlipperScreen 指示无法连接到 MCU，您必须在尝试重新连接之前修改 MCU ID。

:::


- 打开浏览器，在地址栏中输入上位机的 IP 地址，例如，我的上位机 IP 是 192.168.0.179，只需输入并按 Enter。

![](/images/catalyst-k--id-search-02.png)


- 打开上位机的 Web 界面，在左侧边栏的配置选项中找到“Machine”。单击打开 printer.cfg 文件。

![](/images/catalyst-k--id-search-03.png)

- 单击右上角的 DEVICES 按钮。

![](/images/catalyst-k--id-search-04.png)

- 选择通信方式后，单击刷新。

![](/images/catalyst-k--id-search-01.png)

- 复制 ID 并将其粘贴到 printer.cfg 的 [mcu] 部分。

![](/images/catalyst-k--id-search-06.png)

- 单击右上角的保存并重启按钮。

![](/images/catalyst-k--id-search-05.png)


# 附件和其他文档
2D、3D、SCH 和配置模板文件，请访问我们的 github：
https://github.com/FYSETC/Catalyst.K_Kit

# 购买渠道
www.fysetc.com

# 技术支持渠道
support@fysetc.com
https://discord.gg/yYVx98gCDW

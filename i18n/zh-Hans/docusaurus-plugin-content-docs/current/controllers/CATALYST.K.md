---
id: CATALYST.K
title: CATALYST.K
slug: /CATALYST.K
sidebar_position: 10
source_file: CATALYST.K.md
source_language: en
helplook_source: Controllers/CATALYST.K.md
---

![](/images/catalyst-k--figure-01.png)

---
# 简介
这款高性能 3D 打印机主板基于 STM32H723 32 位 MCU 构建，外形尺寸为 138 mm × 98 mm。它专为 Klipper 等现代开源固件设计，可通过 USB 连接 Raspberry Pi 3B+/4B/5B 等外部 SBC，构成强大的“MCU + SBC”架构，从而实现高速打印、多轴运动控制和高级功能扩展。

# 特性
- 基于 STM32H723 的高性能 MCU，可满足高速插补和同步多轴运动控制等严苛的 3D 打印工作负载。
- 通过 USB 连接 Raspberry Pi 3B+/4B/5B 或任何兼容 Klipper 的主机，原生支持 Klipper 风格的配置。
- 五个 STEPSTICK 插槽，支持 TMC5160 和 TMC2209 等灵活的驱动选择，以平衡扭矩、平滑度和静音运行。
- 可选 24V/48V 步进电机供电，并支持每个电机单独选择电压，适用于混合电压运动系统。
- DC 24V 输入，具备 24V/10 A 热床输出、AC 热床控制信号输出，以及最高 5A 的热端加热器输出，适用于高功率应用。
- 板载稳压电源轨：12V/3A、5V/3A、5V/6A（用于为 Raspberry Pi 供电）和 3.3V/800 mA，可从单块主板为风扇、传感器和 SBC 供电。
- 丰富的连接能力，包括 3× USB、2× RS‑232、1× RS‑485 和 1× 高速 CAN 接口，用于高级扩展和分布式运动系统。
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
| CANBUS | 1 + 1（用于 MCU） | col |
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
| Mosfets 输出	| HOTBED 最高 10A Max，HEAT 最高 5A Max，每个风扇最高 0.5A |
|输入电源电压|VIN 24V 最高 15A Max|
| 输入/输出 | 信号最大 20mA，RGB 电源总计最大 1.5A | 
| 5V 和 3.3V 电流限制 | 5V@6A Max，5V@3A Max，3.3V@0.8A Max | content |



# 物理连接

## 引脚定义

![PINOUT](/images/catalyst-k--aff06274762df7b3.png)



```python
RGB0: PD3
LED: PA15

COOLFAN: PA0
COOLFAN_TACH: PC2
FAN: PB3
FAN1: PA3
FAN2: PB2

Heat: PC8
Bed: PB4
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
DriverE1_DIAG: PD12

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

![](/images/catalyst-k--description-of-connections.png)




| 连接器             | 引脚                                 | 默认功能                                                                                                    | 备用      |
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------- |
| HOTBED           | PB4 | Mosfet 输出，热床输出控制，10A Max                    |                |
| AC-BED  | PB0 | Mosfet 输出，AC 热床 PWM 信号控制|                |
| RGB     | PD3 |5V 数字输出，用于 5V WS2812/SK6812 RGB/舵机|数字输出|
| HEAT                | PC8      | Mosfet 输出，加热棒控制，5A Max |             
| FAN                 | PB3        | Mosfet 输出，用于 2 针风扇  |                |
| ADC-TB   | PC0      | ADC 输入，4.7K 上拉，HOTBED 温度测量 |模拟信号输入      |
| ADC-HEAT | PC1      | ADC 输入，4.7K 上拉，HEAT 温度测量| 模拟信号输入 |
| COOL-FAN | COOL-FAN: PA0 <br>COOL-FAN_TACH: PC2  | Mosfet 输出，用于 3 针风扇 <br> **（排针电压选择）**    | 数字输出 |
| FAN1     | PA3      | Mosfet 输出，用于 2 针风扇  <br> **（排针电压选择）**          | 数字输出|
| FAN2 | PB2          | Mosfet 输出，用于 2 针风扇  <br> **（排针电压选择）**   | 数字输出  |
| LED  |   PA15       | Mosfet 输出，用于 2 针 LED  <br> **（排针电压选择）**                                                                                               | 数字输出  |
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
| USB-C| - | 连接到 Raspberry Pi，并连接到 hub 以进行固件上传 |
| FILAMENT | PE8| 数字输入，用于限位开关、微动开关或霍尔<br> **（焊盘电压选择）**|  I/O     |



## 排针跳线

如图所示，要使用 48V 步进电机，请将 48V 电源连接到主板右侧的 KF-129 端子。默认情况下，系统使用单电源（DC24V）运行。电机电压选择跳线连接到 24V。

![](/images/catalyst-k--header-jumpers.png)



:::note 注意

请注意，如果这些接口用作输出，输出的高电平电压与跳线选择的电压一致。请确保您的外设能够承受该范围。一般来说，3D 打印机配件中只有 SSR 能够承受 9-36V 控制电压。

:::


## 连接

只需使用电源线和数据线（USB 转 Type-C）分别将我们的主板（CATALYST.K）连接到 Raspberry Pi 的排针电源端口和 USB 端口，如下图所示。Raspberry Pi 无需额外电源，因为我们的主板提供 5V@6A 电源输出——足以确保 Raspberry Pi 正常运行。


:::note CATALYST.K_Kit

- CATALYST.K_Kit 是一个套件，包含主控制板（CATALYST.K）和工具板（Catalyst.K ToolHead）。
- **USB 模式**是推荐的工作模式。
- 在 USB/CAN 模式下运行时，CATALYST.K 通过 USB 连接到 Raspberry Pi。

:::


### USB 通信模式（推荐）
1. 将主板（CATALYST.K）上的 RS-232 连接器（XH2.54-4）连接到工具板（Catalyst.K ToolHead）上的电源连接器（J1）
2. 将主板（CATALYST.K）上的 USB 连接器（USB4）连接到工具板（Catalyst.K ToolHead）上的连接器（J4）。
3. 将工具板（Catalyst.K ToolHead）上的 J23 连接到 Cartographer。
4. 将 Catalyst.K ToolHead 上 DIP 开关（WS3）的 PIN 1 设为 ON，PIN 2 设为 ON。至此完成硬件连接。

![](/images/catalyst-k--usb-communication-mode-recommended.png)


:::note 注意

- 有关 Catalyst.K ToolHead 的更多信息，请参阅：https://wiki.fysetc.com/docs/Yo6J22mg?preview=1
- 显示屏是 K1 Max 机器上预装的原始显示屏。
- RS232 通信线和电源线捆绑在一起。要提供电源，必须连接它们。USB 和 CAN 可以分别连接。
- 有关 Cartographer 的详细信息，请参阅 https://docs.cartographer3d.com/

:::


### CAN 通信模式
1. 将主板（CATALYST.K）上的 RS-232 连接器（XH2.54-4）连接到工具板（Catalyst.K ToolHead）上的电源端子（J1），并从线束中剥出白色和绿色数据线，分别连接到主板（CATALYST.K）上 CAN（XH2.54-3）连接器的 PIN 1 和 PIN 2。
2. 将 Catalyst.K ToolHead 上的 J21 连接到 Cartographer。
3. 将 Catalyst.K ToolHead 上 DIP 开关（WS3）的 PIN 1 设为 OFF，PIN 2 设为 ON。至此完成硬件连接。

![](/images/catalyst-k--can-communication-mode.png)


## 外设连接
要将 K1 Max 外设连接到 CATALYST.K，请参阅下图。

![](/images/catalyst-k--peripheral-connection.png)

外设端子定义请参阅[连接说明](#description-of-connections)。

----

# 固件指南

## 固件配置


:::danger 警告

请使用以下设置来为 Catalyst K 主板创建固件。!PB4 这一行很重要，可防止热床在启动时加热。收到主板后，请务必在安装时执行此操作。

但是请注意，进入 DFU 模式会重新启用热床。
**因此，在刷写固件过程中，务必不要连接任何加热器**


:::


### 无引导加载程序的 Klipper（推荐）


:::warning 警告

- 主机（如 Raspberry Pi）必须连接到 Wi-Fi 或以太网。使用 Angry IP Scanner 等局域网扫描工具获取主机 IP 地址后，即可使用 SSH 工具登录主机。

:::


使用 MobaXterm 或 PuTTY 等工具通过 SSH 登录主机，并执行以下命令打开固件配置工具。

```shell
cd ~/klipper
make menuconfig
```


推荐模式为 USB 模式，配置如下。

#### USB（推荐）

![](/images/catalyst-k--usb-recommended.png)



:::warning Waining

- 如果 Catalyst.K ToolHead 使用 SERIAL 通信模式，则 CATALYST.K 需要配置为 USB 通信模式。
- Catalyst.K 无法在串行模式下运行。

:::


#### CAN

![](/images/catalyst-k--can.png)

完成参考图中所示的配置，然后保存配置并退出配置工具。


:::note 注意

如果使用 Katapult，请参阅：
https://github.com/Arksine/katapult?tab=readme-ov-file#uploading-klipper

:::


## 固件上传

:::warning Waining

- 刷写固件前，请使用 USB 线连接 Raspberry Pi 和 CATALYST.K，参阅连接图[<u>*USB 通信模式（推荐）*</u>](#usb-communication-mode-recommended)。
- 刷写固件前，必须完成固件配置，参阅[<u>*固件配置*</u>](#firmware-configuration)
- 如果固件配置为 CAN 模式，请在固件刷写过程完成后重新验证接线连接，参阅连接图[<u>*CAN 通信模式*</u>](#can-communication-mode)。

:::


### DFU 模式

![](/images/catalyst-k--dfu-mode-02.png)

您需要进入 DFU 模式才能编译和烧录固件。如上图所示，

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

- 只有在固件刷写过程完成后才能识别 ID。如果尚未完成，请参阅[<u>*固件上传*</u>](#firmware-upload)部分。
- 如果 Mainsail 或 KlipperScreen 指示无法连接到 MCU，则必须先修改 MCU ID，然后再尝试重新连接。

:::


- 打开浏览器，在地址栏中输入主机的 IP 地址，例如，我的主机 IP 是 192.168.0.179，只需输入并按 Enter。

![](/images/catalyst-k--id-search-02.png)


- 打开主机的 Web 界面，在左侧边栏的配置选项中找到“Machine”。单击打开 printer.cfg 文件。

![](/images/catalyst-k--id-search-03.png)

- 单击右上角的 DEVICES 按钮。

![](/images/catalyst-k--id-search-04.png)

:::note 注意

如果找不到 DEVICES，则需要重新安装 Mainsail。

:::


- 选择通信方式后，单击刷新。

![](/images/catalyst-k--id-search-01.png)

- 复制 ID 并将其粘贴到 printer.cfg 的 [mcu] 部分。

![](/images/catalyst-k--id-search-06.png)

- 单击右上角的保存并重启按钮。

![](/images/catalyst-k--id-search-05.png)


# 附件及其他文档
2D、3D、SCH 和配置模板文件，请访问我们的 github：
https://github.com/FYSETC/Catalyst.K_Kit

# 购买渠道
www.fysetc.com

# 技术支持渠道
support@fysetc.com
https://discord.gg/yYVx98gCDW

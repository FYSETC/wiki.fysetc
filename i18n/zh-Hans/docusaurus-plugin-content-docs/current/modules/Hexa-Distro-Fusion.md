---
id: Hexa-Distro-Fusion
title: Hexa Distro Fusion
slug: /Hexa-Distro-Fusion
sidebar_position: 50
source_file: Hexa Distro Fusion.md
source_language: en
helplook_source: Modules/Hexa Distro Fusion.md
---

## 1. 简介


HEXA DISTRO FUSION 是一个专为 3D 打印机工具更换器（Toolchanger）设计的综合性集线器。它提供 6 通道 CANBUS 扩展、6 通道 USB 2.0 扩展以及六通道 7.5A 直流电源分配。配备多个可灵活配置的 IO 端口，支持 RGB 灯、风扇、接近开关和霍尔传感器等多种外设，为 Toolchanger 模式提供最大便利。

![](/images/hexa-distro-fusion--figure-01.png)

## 2. 特性


![](/images/hexa-distro-fusion--figure-02.png)

- 6 x USB2.0，基于 USB2517
- 6 x CAN 2.0 接口，基于 STM32F072CB
- 6 x 24V 7.5A 最大电源分配，支持 2 种控制方式
- 4 x ADC 输入，用于热敏电阻等 ADC 传感器
- 8 x 通用 IO
- 6 x 24V 最大 I/O，带电源控制，用于 RGB/风扇/接近开关等
- 板载 24V 转 5V@3A DC-DC 电路，USB 工作状态 LED 指示灯
- 板载 RESET 和 BOOT0 按钮，便于固件更新

## 3. 应用


- 多头 3D 打印机
- 树莓派扩展板
- 计算机 USB HUB/CANBUS 适配器

## 4. 硬件规格


### 4.1 规格

| 项目 | 数值 / 内容 | 备注 |
|---|---|---|
| 微控制器 | STM32F072CBT6 |  |
| USB HUB 芯片 | USB2517 |  |
| USB 端口 | 7 | 1 个用于 STM32F072，6 个位于 type-A 连接器 |
| 风扇 | 6 | 与 IO1-IO6 共用，支持 2 / 3 针风扇 |
| 温度测量 | 4 |  |
| 信号输入输出 | 6+8 | 与 IO1-IO6 共用，GND 控制需开启 |
| RGB 灯带控制 | 6 | 与 IO1-IO6 共用，GND 控制需开启 |

#### 工作限制

| **电源 1-6** | 每路最大 7.5A，总计 25A |
|---|---|
| **输入电源电压** | 11V 至 24V，VIN 最高 25A |
| **IO1-IO6 作为输出** | 最大 0.5A |
| **板载 5V DC-DC** | **最大 3A**  如果使用外部 5V 电源，由于跳线帽支持的最大电流为 **3A**，需要使用烙铁焊接底部以获得更大的电流。由于内部走线宽度，建议使用不超过 **5A** 的电流。如果使用更大的电流 **（不超过 8A）**，请为板子加装风扇散热，**否则会带来安全隐患。** |
| **3.3V** | 最大 0.8A |
| **USB 5V** | 每路最大 2A，总计 3A。 |

#### 板框与安装孔位置

![](/images/hexa-distro-fusion--board-outline-and-mount-hole-location.png)

### 4.2 LED 说明

#### 4.2.1 USB LED 指示

请参阅 [USB2517 数据手册](https://ww1.microchip.com/downloads/aemDocuments/documents/UNG/ProductDocuments/DataSheets/USB2517-USB2517i-Data-Sheet-00001598C.pdf)  *"6.1.1 USB MODE 14-WIRE"*

**红色：** USB 下行端口 5V 电源指示灯

- 当集线器通电时，此灯会亮起。
- 如果插入时闪烁几次然后熄灭，则表示设备存在故障。例如短路，或 GND/5V 接反。

**黄色/琥珀色：** 故障指示灯

- 如果设备所需电流超过端口的最大容量，此 LED 会亮起。例如，下行设备发生短路，或需要超过 2A 的电流（包括峰值）。

**绿色：** USB 下行端口数据指示灯

- 当设备插入、被识别并由集线器注册时，此灯会亮起。
- 如果插入后无响应，则 USB 下行设备存在错误，例如程序不正确或 DP/DM 连接接反。


## 5. 连接指南


### 5.1 引脚定义

![](/images/hexa-distro-fusion--pin-out.png)

|  | 信号 | GND 控制，用于风扇 |
|---|---|---|
| IO1 | PC13 | PA10 |
| IO2 | PB6 | PB7 |
| IO3 | PB4 | PB5 |
| IO4 | PA14 | PB3 |
| IO5 | PA9 | PA15 |
| IO6 | PB15 | PA8 |
| IO7 | ●●PB1 |  |
| IO8 | ●●PB0 |  |
| IO9 | ●●PA7 |  |
| IO10 | ●●PA6 |  |
| IO11 | ●●PA5 |  |
| IO12 | ●●PA4 |  |
| IO13 | PC14 |  |
| IO14 | PC15 |  |
| ADC1 | ●●PA0 |  |
| ADC2 | ●●PA1 |  |
| ADC3 | ●●PA2 |  |
| ADC4 | ●●PA3 |  |
| 电源控制 1 | PB14 |  |
| 电源控制 2 | PB13 |  |
| 电源控制 3 | PB12 |  |
| 电源控制 4 | PB2 |  |
| 电源控制 5 | PB10 |  |
| 电源控制 6 | PB11 |  |

### 5.2 连接示例

![](/images/hexa-distro-fusion--connection-example.jpg)

![](/images/hexa-distro-fusion--connection-example.png)

### 5.3 CAN 终端电阻

板子默认带有 120 欧姆终端电阻。如果要从电路中移除它，需要切断 JP1 处的走线。

![](/images/hexa-distro-fusion--can-termination-02.png)

![](/images/hexa-distro-fusion--can-termination-01.png)

感谢 Esoterical 提供以上图片。

### 5.4 5V 电源选择

Hexa 在 USB C 端口附近有一个 3 针排针，用于选择板子的 5V 电源，可选 USB 5V 或 DC 5V（板载 DC-DC）。USB 5V 应用于刷写固件，DC 5V 用于正常运行。

底部丝印显示了引脚标签，通过 2.54mm 跳线帽将顶部或底部引脚与中间引脚连接来进行选择。示例如下。

![](/images/hexa-distro-fusion--5v-power-select.jpg)

#### 5.4.1 USB 5V

![](/images/hexa-distro-fusion--usb-5v.jpg)

#### 5.4.2 DC 5V

![](/images/hexa-distro-fusion--dc-5v.jpg)

## 6. 固件指南


Hexa 使用 STM32F072 作为 MCU，其烧录过程与大多数 STM32 控制板相同。不同之处在于它**工作在 USB 转 CAN 桥接模式**。

### 6.1 固件配置与编译

由于 Hexa Distro Fusion 工作在"USB 转 CAN 桥接"模式，且 STM32F072 支持通过 USB DFU 模式直接烧录，并带有板载 BOOT0 按钮和 RST 按钮，非常方便。因此无需使用 Bootloader。

如果仍想使用 Katapult（Canboot），可参考 6.1.2。

#### 6.1.2 Katapult Bootloader

感谢优秀的 👍Katapult 项目，使 Klipper 固件更新变得更加容易。  
有关 katapult 的更多信息，请参阅 <https://github.com/Arksine/katapult>  
以下为简要指南，但请仔细检查配置选项！

`cd katapult`  
`make menuconfig`  
`make flash FLASH_DEVICE=0483:df11`

![](/images/hexa-distro-fusion--katapult-bootloader.png)

#### 6.1.3 Klipper 固件配置

- 使用 katapult bootloader

![](/images/hexa-distro-fusion--klipper-firmware-config-02.png)

q

- 不使用 bootloader

![](/images/hexa-distro-fusion--klipper-firmware-config-01.png)

### 6.2 固件上传

#### 6.2.1 无 Bootloader 模式或上传 Katapult Bootloader

命令：

`cd ~/klipper`  
`make flash FLASH_DEVICE=0483:df11`

#### 6.2.2 使用 Katapult Bootloader 上传 Klipper

1. 确保 klipper 服务已停止。`sudo service klipper stop`
2. 以 USB 转 CAN 桥接模式构建 Klipper，并使用与 Katapult 中"application offset"匹配的 bootloader 偏移量。
3. 进入 bootloader。如果 Katapult 检测到 flash 的应用区域为空，会自动进入 bootloader。但请注意"USB 转 CAN 桥接设备"和"UART"设备无法自动检测。如果设备未处于 bootloader 模式，需要先手动： 
    - 双击 RESET 按钮
4. 刷写前，确保已安装 pyserial。安装所需命令取决于 Linux 发行版。基于 Debian 和 Ubuntu 的发行版可运行以下命令： `sudo apt update`  
    `sudo apt install python3-serial`
5. 将 &lt;serial\_device&gt; 替换为要刷写的 USB/UART 设备路径。&lt;baud\_rate&gt; 仅对 UART 设备需要，省略时默认为 250000 波特率。  
    `python3 flashtool.py -d <serial device> -b <baud_rate>`

> 示例  
> 1\. 确保 katapult bootloader 已烧录  
> 2\. 双击 RESET 按钮进入 bootloader  
> 3\. 使用命令 `ls /dev/serial/by-id` 查找 CAN MCU ID（"usb-katapult\_…"）  
> 4\. 使用该 ID 更新固件  
> `python3 flashtool.py -d /dev/serial/by-id/the_id_you_get`

## 7. 附件及其他资源

示例 Klipper 配置、CAD 和原理图可在我们的 GitHub 上获取 - [Hexa Distro Fusion 仓库](https://github.com/FYSETC/Hexa_Distro_Fusion)

- [3D STEP](https://github.com/FYSETC/Hexa_Distro_Fusion/blob/main/CAD/3D_Hexa_Distro_Fusion_V1.0.step "Hexa_Distro_Fusion_3D_STEP")
- [SCH](https://github.com/FYSETC/Hexa_Distro_Fusion/blob/main/Hardware/HEXA%20DISTRO%20FUSION_SCH.pdf "Hexa_Distro_Fusion_SCH")
- [CONFIG](https://github.com/FYSETC/Hexa_Distro_Fusion/blob/main/Klipper%20config/HEXA.cfg)

### 7.1 Hexa Distro 安装件

- [Fysetc Hexa Distro Fusion DIN 导轨安装件](https://www.printables.com/model/1766900-fysetc-hexa-distro-fusion-din-mount)

## 8. 购买渠道


[![AliExpress Logo](/images/hexa-distro-fusion--aliexpress-logo.png)](https://www.aliexpress.com/store/3480083?)

![](/images/hexa-distro-fusion--hexa-distro-mounts-04.png)

[![](/images/hexa-distro-fusion--hexa-distro-mounts-05.png)](https://www.fysetc.com/)

## 9. 我们的渠道


[![](/images/hexa-distro-fusion--hexa-distro-mounts-01.png)](https://www.youtube.com/@fysetc4882)

[![](/images/hexa-distro-fusion--hexa-distro-mounts-02.png)](https://discord.gg/WP4m4kBb98)

[![](/images/hexa-distro-fusion--hexa-distro-mounts-03.png)](https://www.facebook.com/fysetc)

电子邮件：support@fysetc.com

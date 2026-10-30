---
id: H36_Combo
title: H36 Combo
slug: /H36_Combo
sidebar_position: 40
description: H36 Combo V1 是一款全新设计的高温工具板，运行 Klipper 固件。基于 STMG0B1T3，最高工作温度可达 125 摄氏度（仅限 CAN）。它还……
source_file: H36_Combo.md
source_language: en
---

![img](/images/H36_combo_V1_top.png)


:::warning 注意


- 由于没有125摄氏度的USB-HUB芯片，125摄氏度的工作环境仅限于CANBUS模式；
- Klipper目前不支持125摄氏度的加速度计，因此125摄氏度的工作环境不包括加速度计。H36的默认版本是ADXL345，其最高工作温度为85摄氏度。可选配105摄氏度的ADXL345-EP版本，但价格更高。

:::



:::danger 丝印错误

抱歉，V1.2和V1.3存在相同的丝印错误：
XT30连接器背面的L/DM和H/DP标记是反的，顶层是正确的。
为避免混淆，请参考以下说明：

![](/images/h36-combo--figure-02.png)

HE0顶层丝印上的+和-是错误的，它们是互换的。底层丝印是正确的。请参见下图和引脚定义进行更正。

![](/images/h36-combo--figure-03.png)

:::





# 简介

H36 Combo V1是一款全新设计的**高温**工具板，运行Klipper固件。基于STMG0B1T3，最高工作温度可达**125摄氏度（仅CAN）**。它还提供两种通信方式：CANBUS和USB。板载USBHUB最多有两个USB接口（或一个CAN和一个USB），可用于连接IDM Scanner调平传感器摄像头等。

# 版本说明

V1.1

1.增加驱动NTC

2.增加3.3V/5V监测

3.增加24V监测

\-------------------------------------

V1.2

1.改为XT30

2.增加预留保护

3.修复CAN/USB指示

\-------------------------------------

V1.3（当前可用）

:::note 注意

V1.3仅进行硬件更改，不影响任何软件配置。

:::


1.为FAN_TACH增加电平转换

2.修复丝印标记

3.增加从USB-C到STM32的跳线电阻

4.可选ADXL345-EP

5.将LDO芯片更换为TLV75733

6.全新量产线缆（模具成型）


# 特性

- STM32G0B1T3 MCU，**最高可达125摄氏度，**支持Klipper固件
- 6层PCB设计，全部使用固态电容和钽电容，散热更好
- 板载IO控制的CAN/USB切换
- 板载RESET和BOOT0按钮，便于固件更新
- 风扇控制/加热均使用独立大功率MOS，更安全、发热更低
- 板载5V@3A DC-DC，5V峰值负载可达15W
- XT30接口，随板附带定制线缆
- 板载USB2.0 HUB，3个USB2.0接口（其中一个连接到MCU）
- 支持CAN / USB2.0连接
- 板载TMC2209
- 3个3pin风扇，3个带电平转换的IO，1个RGB，1个加热，1个热敏电阻，1个状态LED
- 板载ADXL345加速度计
- 板载USB-C用于固件更新

# 应用

搭配NEMA14/36mm电机的打印头

# 硬件规格

| 功能                | H36 Combo V1                                  | SB Combo V2                                          | SB TH CAN V1.3     |
| ----------------------- | --------------------------------------------- | ---------------------------------------------------- | ------------------ |
| 微控制器         | STM32G0B1T3                                   | STM32F072CBT6                                        | STM32F072CBT6      |
| 加速度计           | ADXL345                                       | ADXL345                                              | ADXL345            |
| USB端口                | 2 + 1（用于MCU），由CH334P供电           | 2 + 1（用于MCU）+ 1（在辅助板上），由CH334P供电 | 1                  |
| CANBUS                  | 1 + 1（用于MCU）                               | 1 + 1（用于MCU）                                      | 1                  |
| 风扇                     | 4（1x2Pin，3x3Pin）                            | 3+2（在辅助板上）                                   | 2                  |
| 加热输出          | 1                                             | 1                                                    | 1                  |
| 温度测量 | 1（PH2.0连接器）+ 1（板载热敏电阻） | 1（PH2.0连接器）+ 1（板载热敏电阻）        | 1（PH2.0连接器） |
| 电压监测      | 5V, 24V                                       | 5V, 24V                                              | -                  |
| 电机驱动             | TMC2209                                       | TMC2209                                              | TMC2209            |
| 信号输入输出 | 5（PH2.0）+ 7（排针）                    | 3                                                    | 3                  |
| RGB灯带控制 | 默认2，最多5                            | 1 + 1（在辅助板上）                                 | 1                  |
| 辅助板支持       | 否                                            | 是                                                  | 否                 |
| 板载安装螺母    | 否                                            | 是                                                  | 否                 |

# 工作限制


:::warning 警告

以下数值是在25°C室温下测试的。请勿长时间保持最高峰值运行！
在较高温度环境中请做好板子的散热工作。

:::


| **步进驱动器**           | 峰值电流最高2.0A                                  |
| ----------------------------- | -------------------------------------------------------- |
| **MOSFET输出**           | HE0最高5A，风扇每个最高0.5A                    |
| **输入电源电压**       | VIN 11V至24V，最高10A                         |
| **输入/输出**            | 信号最大20ma，RGB电源总最大1.5A |
| **5V和3.3V电流限制** | 5V@3A最大，3.3V@0.8A最大                                  |

# 物理连接

## 引脚定义

![](/images/h36-combo--pin-out.png)

感谢Esoterical创建此图片。

```python
IO.0: PA15
IO.1: PC7
IO.2: PA8
IO.3/RGB0: PA10
IO.4/RGB1: PB1
# IO.0 - IO.5 带电平转换（上拉），可用作5V/24V电平输入和输出！


FAN0: PA9
FAN0_TACH: PC6 # 请确保反馈电平不超过5V！
FAN1: PB15
FAN1_TACH: PB14 # 请确保反馈电平不超过5V！
FAN2: PB13
FAN3: PA5
FAN3_TACH: PB0 # 请确保反馈电平不超过5V！

Heat: PA7
Thermistor (2.2k pull up): PA6

Driver_EN: PB7
Driver_DIR: PB8
Driver_STEP: PB9
Driver_UART: PC14
Driver_DIAG: PC15

ADXL345
spi_bus: spi2
adxl345_cs_pin: PB12
adxl345_spi_software_sclk_pin: PB10
adxl345_spi_software_mosi_pin: PB11
adxl345_spi_software_miso_pin: PB2

CAN_RX: PD0
CAN_TX: PD1

5V_Monitor: PA0
24V_MOnitor: PA4
Thermistor next to TMC2209 (4.7k pull up) : PA3

CAN USB switch: PA2
# 逻辑低 = COM到A端口 CANBUS
# 逻辑高 = COM到B端口 USB

```

## 连接说明：

IO.0和IO.1位于同一连接器中，可用作XY限位开关，IO.2可用作探针。此外，IO.0 - IO.5具有电平转换（带上拉电阻），IO.01、IO.2具有电压选择器（5V或24V）排针，IO.3 IO.4具有电压选择器（5V或24V）焊盘。所有IO均可用作输入或输出，例如RGB、舵机、限位开关，并可根据您的其他需求进行配置。

![H36 connector](/images/H36_combo_V1_connector.png)

| 连接器             | 引脚                                 | 默认功能                                                                                                    | 备选      |
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------- |
| 电源输入           | USB (PA11,PA12)<br>CANBUS (PD0,PD1) | 电源和通信输入，USB 2.0和CANBUS可选，由PA2电平决定。                     |                |
| Fan0                  | FAN0: PA9<br>FAN0_TACH: PC6         | MOSFET输出，用于2/3针风扇，默认电压 = 取决于电压选择器。 <br>**（排针电压选择器）** |                |
| Fan1                  | FAN1: PB15 <br>FAN1_TACH: PB14      | MOSFET输出，用于2/3针风扇，默认电压 = 取决于电压选择器。 <br>**（排针电压选择器）** |                |
| Fan2                  | PB13                                | MOSFET输出，用于2针风扇，默认电压 = VIN。<br> **（焊盘电压选择器）**                                |                |
| Fan3                  | FAN3: PA5<br> FAN3_TACH: PB0        | MOSFET输出，用于2/3针风扇，默认电压 = VIN。<br> **（焊盘电压选择器）**                              |                |
| IO.0+1                | PA15, PC7                          | 数字输入，用于X Y限位开关，微动开关或霍尔 <br> **（排针电压选择器）**                             | 数字输出 |
| IO.2                  | PA8                                 | 数字输入，用于Z探针、接近开关或Klicky等。 <br> **（排针电压选择器）**                     | 数字输出 |
| IO.3/RGB0             | PA10                                | 5V数字输出，默认5V电源，用于5V WS2812/SK6812 RGB/舵机 <br> **（焊盘电压选择器）**          | 数字输入  |
| IO.4/RGB1             | PB1                                 | 5V数字输出，默认24V电源，用于24V WS2812/SK6812 RGB/舵机 <br> **（焊盘电压选择器）**        | 数字输入  |
| USB1                  |                                     | USB2.0                                                                                                              | J2             |
| USB2/CAN              |                                     | USB2.0或CANBUS 2.0，USB 2.0和CANBUS可选，由PA2电平决定。                               | J1             |
| TE0                   | PA6                                 | ADC输入，2.2K上拉，头部温度测量                                                                   |                |
| HE0                   | PA7                                 | MOSFET输出，加热棒控制，最大5A                                                                          |                |
| MOTOR                 |                                     | 用于两相步进电机，                                                                                        |                |
| USB1, USB-C连接器 |                                     | 连接到CH334PHUB芯片，最多4个USB2.0设备（MCU/USB1/USB2/USB3）                                        |                |


## 2 x 2线风扇

如果您使用的是A4T等带有2个模型冷却风扇的工具头，可以使用[[multi_pin]](https://www.klipper3d.org/Config_Reference.html?h=multi#multi_pin)一起控制它们。

例如，如果您的风扇连接到Fan1和Fan2，配置如下所示。

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

## LED指示：

![img](/images/H36_combo_V1_led.png)

| LED名称 | 指示                                                                                                                                                                                                                                                                                | 备注 |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 3V3      | 亮起：电源正常。<br>熄灭：电源故障。<br>3.3V是通过DC-DC将24V转换为5V，再通过LDO转换为3.3V获得的，因此24V/5V/3.3V可能存在短路/开路。                                                                  | 红色    |
| HUB      | 亮起：USB至少有一个连接。<br/>熄灭：USB无连接。                                                                                                                                                                                               | 红色    |
| STATUS   | 使用katakulpt时`- 闪烁：进入下载模式；`<br/>熄灭/常亮：不在下载模式，状态一般由配置决定；<br/>LED由PC13控制，高电平点亮。定制使用请参考julianschill/klipper-led_effect | 红色    |
| HEAT     | 根据加热PWM亮起或闪烁                                                                                                                                                                                                                                       | 红色    |
| USB      | USB通信指示，在配置菜单中使用"PA2"                                                                                                                                                                                                                                | 红色    |
| CAN      | CAN通信指示，在配置菜单中使用"!PA2"                                                                                                                                                                                                                               | 绿色  |

## USB / CAN选择

XT30和USB2/CAN均使用CAN通信

![img](/images/H36_klipper_nobootloader_CAN.png)

XT30和USB2/CAN均使用USB通信

![img](/images/H36_klipper_nobootloader_USB.png)

## 排针跳线：

IO.0+1、IO.2、Fan0、Fan1可通过跳线帽选择电源电压。
如图所示，左侧两个引脚连接在一起为24V，右侧两个引脚连接在一起为5V。

![img](/images/H36_combo_V1_jumper.png)


:::note 注意

请注意，如果这些接口用作输出，输出的高电平电压与跳线选择的电压一致。请确保您的外设能够承受该范围。一般来说，3D打印机配件中只有SSR能够承受9-36V控制电压。

:::


## 通信

### 连接到Pi

SB combo V2可通过USB或CANBUS连接到Pi。通过PA2选择，参考USB / CAN选择。

#### 通过CAN

![img](/images/H36_combo_V1_conn_CAN.png)

由于树莓派没有CANBUS接口，通常只有在通过扩展芯片扩展CANBUS接口后才能连接。常用的包括MCP2518 SPI转CAN模块（CanHat）、USB转CAN模块（例如：UCAN）、Klipper USB转CAN桥接模式，以及具有原生CAN接口的Linux主机（例如：CM68）。

#### 通过USB

使用USB连接时，您可以使用我们提供的转接板直接连接到PI的USB接口。

![img](/images/H36_combo_V1_conn_USB.png)

# 固件指南

## 固件配置和编译

### 使用Katapult引导程序

如果您需要使用引导程序，我们推荐使用katapult，以下未配置供参考：
katapult使用请参考：https://github.com/Arksine/katapult

```shell
cd ~/katapult
make menuconfig
make flash FLASH_DEVICE=0483:df11
```

![H36_katapult_8kb_USB](/images/H36_katapult_8kb_USB.png)

![H36_katapult_8kb_CAN](/images/H36_katapult_8kb_CAN.png)

```shell
cd ~/klipper
make menuconfig
make
cd ~/katapult/scripts
#when use CAN communiction
python3 flashtool.py -i can0 -f ~/klipper/out/klipper.bin -u <uuid>
#when use USB communiction
python3 flashtool.py -d <serial device> -b <baud_rate>
```

![H36_klipper_8kb_CAN](/images/H36_klipper_8kb_CAN.png)

![H36_klipper_8kb_USB](/images/H36_klipper_8kb_USB.png)

### Klipper无引导程序

H36默认使用无引导程序模式，配置如下：

![H36_klipper_nobootloader_CAN](/images/H36_klipper_nobootloader_CAN.png)

![H36_klipper_nobootloader_USB](/images/H36_klipper_nobootloader_USB.png)

## 固件上传

![](/images/H36_combo_V1_firmware.png)

在执行以下命令之前，您需要进入DFU模式才能编译和烧录固件。如上图所示，

- 按住BOOT0，
- 然后按下RESET按钮一秒钟，
- 然后释放RESET，
- 等待3秒钟，
- 然后释放BOOT0。

使用"lsusb"检查是否出现DFU设备。如果是，上传固件。如果否，重复上述步骤。

```shell
make flash FLASH_DEVICE=0483:df11
```

在katapult下上传Klipper，请参考：

https://github.com/Arksine/katapult?tab=readme-ov-file#uploading-klipper

# 附件和其他文档

2D、3D、SCH和配置模板文件，请访问我们的github：

https://github.com/FYSETC/H36_Combo

# 常见问题

## 1.为什么我无法进入DFU模式？

有两个原因：

1. boot0和reset按钮的操作可能不正确，或者按钮损坏。
   解决方案：（拔掉板子上的所有线缆）

- A. 重复上述教程。
- B. 重复上述教程，使用提供的主脐带线（CAN/USB）（代替USB C线），并将其连接到打印机PSU的24V（不可热插拔，因此需断电操作），并使用USB转接器连接到SBC的USB端口。
- C. 如果上述方法无效，请使用万用表蜂鸣档测量BOOT0和RESET按钮，确保它们在按下和释放时处于不同状态。如果它们处于相同状态，则按钮已物理损坏，请联系购买处更换。

2. STM32G0B1与其他STM32不同。其进入DFU的模式在出厂时设置为软件操作。我们需要在生产过程中更改其BOOTSEL配置位，改为通过硬件切换（即按键）进入DFU。
   如果您遇到按键操作无法进入DFU的情况，那么工厂生产时可能遗漏了此步骤。解决方案是使用STLINK/Jlink配置此BOOSEL位（如果您没有STlink/Jlink或无法解决此问题，可以联系我们的客服寻求帮助！）。
   具体操作如下：

- A. 准备一个STLINK/Jlink。以下以STLINK为例。JLINK类似；
- B. 通过H36背面的两个测试点CLK和DIO，以及板上任意GND和3.3V/5V电源连接STLINK：
  CLK <-----> SWCLK
  DIO <-----> SWDIO
  3.3V/5V <-----> 3.3V/5V
  GND <-----> GND
- C. 将STLINK连接到电脑，并按如下设置STLINK：（此处使用STM32CubeProgrammer软件，可从ST官网下载）

  ![](/images/h36-combo--1-why-i-can-t-enter-the-dfu-mode-01.png)

- D. 点击CONNECT，您将在B区域看到您的G0B1设备。如果提示任何错误，请返回检查接线顺序和电源；
- E. 点击"OB"图标 ----> User Configration，向下滚动找到"nBOOT_SEL"选项，点击右侧的方框，取消此处的选择，即确保此处没有"勾选标记"；

  ![](/images/h36-combo--1-why-i-can-t-enter-the-dfu-mode-02.png)

  ![](/images/h36-combo--1-why-i-can-t-enter-the-dfu-mode-03.png)

- F. 点击下方的"Apply"按钮应用设置；
- G. 为确保操作正确，建议在电脑端拔下STLINK的USB线，重新插入，并重复上述操作以确保"nBOOT_SEL"选项已正确更改。
  通过上述操作，G0B1可以通过按键进入DFU。

# 购买渠道

[Fysetc官方商店](https://www.fysetc.com/)
[AliExpress](https://www.aliexpress.com/store/3480083?)

# 技术支持渠道

support@fysetc.com

[Fysetc Discord服务器](https://discord.gg/CtENXn9N)

# 附件

- [原理图文件](https://github.com/FYSETC/H36_Combo/blob/main/H36%20V1.3%20SCH.pdf)

更多文档（包括配置信息），请查看https://github.com/FYSETC/H36_Combo

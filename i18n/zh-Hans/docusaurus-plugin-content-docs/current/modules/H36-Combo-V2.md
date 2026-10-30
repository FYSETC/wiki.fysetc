---
id: H36-Combo-V2
title: H36 Combo V2
slug: /H36-Combo-V2
sidebar_position: 10
source_file: H36 Combo V2.md
source_language: en
helplook_source: Modules/H36 Combo V2.md
---

![img](/images/H36_combo_V1_top.png)


:::warning 注意


- 由于没有125摄氏度的USB-HUB芯片，125摄氏度的工作环境仅限于CANBUS模式；
- Klipper目前不支持125摄氏度的加速度计，因此125摄氏度的工作环境不包括加速度计。H36的默认版本是ADXL345，其最高工作温度为85摄氏度。可选配105摄氏度的ADXL345-EP版本，但价格更贵。

:::


<!--
!!! bug 丝印错误
抱歉，V2.0上存在相同的丝印错误：
请注意！加热器连接器（HE0）上的+/-丝印标记是反的。为避免接线过程中意外损坏主板和元件，请参考以下说明：

![](/images/h36-combo-v2--figure-02.png)

!!!
-->

:::danger 丝印错误


HE0顶部丝印上的+和-是错误的，它们是颠倒的。底部丝印是正确的。请参见下方图片和引脚定义进行更正。

![](/images/h36-combo--figure-03.png)

:::


# 简介

H36 Combo V2.0是一款全新设计的**高温**工具板，运行Klipper固件。基于STM32G431CBT3，最高工作温度可达**125摄氏度（仅CAN）**。它还提供两种通信方式：CANBUS和USB。板载USBHUB最多有两个USB接口（或一个CAN和一个USB），可用于连接IDM Scanner调平传感器摄像头等。

# 版本说明

V2.0（当前可用）

1. 将MCU更换为STM32G431CBT3
2. 重新分配引脚
3. 引出SWD接口的排针
4. 当插入USB-C端口时，自动切换到USB通信。


# 特性

- **STM32G431CBT3 MCU，最高可达125摄氏度，** 支持Klipper固件
- 6层PCB设计，全部使用固态电容和钽电容，散热更好
- 板载RESET和BOOT0按钮，便于固件更新
- 风扇控制/加热均使用独立大功率MOS，更安全、发热更低
- 板载5V@3A DC-DC，5V峰值负载可达15W
- XT30接口，随板附带定制线缆
- 板载USB2.0 HUB，3个USB2.0接口（其中一个连接到MCU）
- 支持CAN/USB2.0连接
- 板载TMC2209
- 3个3pin风扇，3个带电平转换的IO，1个RGB，1个加热，1个热敏电阻，1个状态LED
- 板载ADXL345加速度计
- 板载USB-C用于固件更新

# 应用

搭配NEMA14/36mm电机的打印头

# 硬件规格

| 功能                | H36 Combo V2.0| H36 Combo V1                                  | SB Combo V2                                          | SB TH CAN V1.3     |
| ----------------------- | --------------------------------------------- | ---------------------------------------------------- | ------------------ |------------------ |
| 微控制器         | STM32G431CBT3| STM32G0B1T3                                   | STM32F072CBT6                                        | STM32F072CBT6      |
| 加速度计           | ADXL345| ADXL345                                       | ADXL345                                              | ADXL345            |
| USB端口                | 2 + 1（用于MCU），由CH334P供电 | 2 + 1（用于MCU），由CH334P供电           | 2 + 1（用于MCU）+ 1（在辅助板上），由CH334P供电 | 1                  |
| CANBUS                  | 1 + 1（用于MCU） | 1 + 1（用于MCU）                               | 1 + 1（用于MCU）                                      | 1                  |
| 风扇                     | 4（1x2Pin，3x3Pin）| 4（1x2Pin，3x3Pin）                            | 3+2（在辅助板上）                                   | 2                  |
| 加热输出          | 1| 1                                             | 1                                                    | 1                  |
| 温度测量 | 1（PH2.0连接器）+ 1（板载热敏电阻）| 1（PH2.0连接器）+ 1（板载热敏电阻） | 1（PH2.0连接器）+ 1（板载热敏电阻）        | 1（PH2.0连接器） |
| 电压监测      | 5V，24V| 5V，24V                                       | 5V，24V                                              | -                  |
| 电机驱动             | TMC2209| TMC2209                                       | TMC2209                                              | TMC2209            |
| 信号输入输出 | 5（PH2.0）+ 7（排针）| 5（PH2.0）+ 7（排针）                    | 3                                                    | 3                  |
| RGB灯带控制 | 默认2，最多5| 默认2，最多5                            | 1 + 1（在辅助板上）                                 | 1                  |
| 辅助板支持       | 否| 否                                            | 是                                                  | 否                 |
| 板载安装螺母    | 否| 否                                            | 是                                                  | 否                 |

# 工作限制


:::warning 警告

以下数值是在25°C室温下测试的。请不要长时间保持最高峰值运行！
在更高温度环境下请做好板子的散热工作。

:::


| **步进驱动器**           | 峰值电流最高2.0A                                  |
| ----------------------------- | -------------------------------------------------------- |
| **MOSFET输出**           | HE0最高5A Max，风扇每个最高0.5A                    |
| **输入电源电压**       | VIN为11V至24V，最高10A Max                         |
| **输入/输出**            | 信号最大20ma，RGB电源总最大1.5A |
| **5V和3.3V电流限制** | 5V@3A Max，3.3V@0.8A Max                                  |

# 物理连接

## 引脚定义

![](/images/h36-combo-v2--pin-out.png)


感谢Esoterical制作此图片。

```python
IO.0: PB3
IO.1: PB4
IO.2: PB5
IO.3/RGB0: PA10
IO.4/RGB1: PA9
# IO.0 - IO.4 带电平转换（上拉），可用作5V/24V电平输入和输出！

FAN0: PB12
FAN0_TACH: PB14 
FAN1: PB2
FAN1_TACH: PB1 
FAN2: PB0
FAN3: PB15
FAN3_TACH: PA8 

Heat: PB13
Thermistor (2.2k pull up): PA3

Driver_EN: PC14
Driver_DIR: PC15
Driver_STEP: PB9
Driver_UART: PB6
Driver_DIAG: PA13

ADXL345
spi_bus: spi1
adxl345_cs_pin: PA4
adxl345_spi_software_sclk_pin: PA5
adxl345_spi_software_miso_pin: PA6
adxl345_spi_software_mosi_pin: PA7

CAN_RX: PA11
CAN_TX: PA12

Thermistor next to TMC2209 (4.7k pull up) : PA0

CAN USB switch: PA2
# logic Low = COM to A PORT  CANBUS
# Logic High = COM to B PORT  USB

```


## 额外引脚功能

| 引脚编号 | 引脚名称 | 引脚类型 | I/O结构 | 复用功能 | 附加功能 |
| - | - | - | - | - | - |
| 37| PA13 |I/O |FT_f |SWDIO-JTMS,TIM16_CH1N,I2C1_SCL,IR_OUT,USART3_CTS,TIM4_CH3,SAI1_SD_B,EVENTOUT | -| 
| 38| PA14| I/O|FT_f |SWCLK-JTCK,LPTIM1_OUT,I2C1_SDA,TIM8_CH2,TIM1_BKIN,USART2_TX,SAI1_FS_B,EVENTOUT |- | 
| 39| PA15| I/O|FT_f |JTDI,TIM2_CH1, TIM8_CH1,I2C1_SCL, SPI1_NSS,SPI3_NSS/I2S3_WS,USART2_RX,UART4_RTS_DE,TIM1_BKIN, TIM2_ETR,EVENTOUT|- | 
| | PB7 | I/O|FT_f |TIM17_CH1N,TIM4_CH2,I2C1_SDA,TIM8_BKIN,USART1_RX,COMP3_OUT,TIM3_CH4,LPTIM1_IN2,UART4_CTS,EVENTOUT |- | 
|9 | PA1 |I/O |TT_a| RTC_REFIN,TIM2_CH2,USART2_RTS_DE,TIM15_CH1N,EVENTOUT| ADC12_IN2,COMP1_INP,OPAMP1_VINP,OPAMP3_VINP| 
| 22| PB10| I/O| TT_a| TIM2_CH3,USART3_TX,LPUART1_RX,TIM1_BKIN,SAI1_SCK_A,EVENTOUT|OPAMP3_VINM | 
| 25| PB11| I/O| FT_a|TIM2_CH4,USART3_RX,LPUART1_TX,EVENTOUT | ADC12_IN14 | 

**更多信息，请参考STM32G431CBT3数据手册**


:::note 如何使用硬件I2C

- 基于Klipper中的G431头文件，您应选择PA13/PA14或PA14/PA15作为硬件I2C接口来连接您的外部设备——例如I2C Eddy。
- 根据部分客户的反馈，PA14/PA15似乎更容易使用。
- 您也可以从Klipper文档中获取更多信息：
https://www.klipper3d.org/Config_Reference.html?h=i2c#common-i2c-settings

![](/images/h36-combo-v2--extra-pins-function.png)


:::


## 连接说明

IO.0和IO.1位于同一连接器中，可用作XY限位开关，IO.2可用作探针。此外，IO.0 - IO.5具有电平转换（带上拉电阻），IO.01、IO.2有电压选择器（5V或24V）排针，IO.3 IO.4有电压选择器（5V或24V）焊盘。所有IO均可用作输入或输出，例如RGB、舵机、限位开关，并可根据您的其他需求进行配置。

![](/images/h36-combo-v2--description-of-connections.png)



| 连接器             | 引脚                                 | 默认功能                                                                                                    | 备选      |
| --------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------- |
| 电源输入           | USB (PA11,PA12)<br>CANBUS (PA11,PA12) | 电源和通信输入，USB 2.0和CANBUS可选，由PA2的电平决定。                     |                |
| Fan0                  | FAN0: PB12<br>FAN0_TACH: PB14         | Mosfet输出，用于2/3针风扇，默认电压 = 取决于电压选择器。<br>**(排针电压选择器)** |                |
| Fan1                  | FAN1: PB2 <br>FAN1_TACH: PB1      | Mosfet输出，用于2/3针风扇，默认电压 = 取决于电压选择器。<br>**(排针电压选择器)** |                |
| Fan2                  | PB0                                | Mosfet输出，用于2针风扇，默认电压 = VIN。<br> **(焊盘电压选择器)**                                |                |
| Fan3                  | FAN3: PB15<br> FAN3_TACH: PA8        | Mosfet输出，用于2/3针风扇，默认电压 = VIN。<br> **(焊盘电压选择器)**                              |                |
| IO.0+1                | PB3, PB4                          | 数字输入，用于X Y限位开关，微动开关或霍尔 <br> **(排针电压选择器)**                             | 数字输出 |
| IO.2                  | PB5                                 | 数字输入，用于Z探针，接近开关或Klicky等。 <br> **(排针电压选择器)**                     | 数字输出 |
| IO.3/RGB0             | PA10                                | 5V数字输出，默认5V供电，用于5V WS2812/SK6812 RGB/舵机 <br> **(焊盘电压选择器)**          | 数字输入  |
| IO.4/RGB1             | PA9                                 | 5V数字输出，默认24V供电，用于24V WS2812/SK6812 RGB/舵机 <br> **(焊盘电压选择器)**        | 数字输入  |
| USB1                  |                                     | USB2.0                                                                                                              | J2             |
| USB2/CAN              |                                     | USB2.0或CANBUS 2.0，USB 2.0和CANBUS可选，由PA2的电平决定。                               | J1             |
| TE0                   | PA3                                 | ADC输入，2.2K上拉，打印头温度测量                                                                   |                |
| HE0                   | PB13                                 | Mosfet输出，加热棒控制，最高5A                                                                          |                |
| MOTOR                 |                                     | 用于两相步进电机，                                                                                        |                |
| USB1, USB-C连接器 |                                     | 连接到CH334PHUB芯片，最多4个USB2.0设备（MCU/USB1/USB2/USB3）                                        |                |
## 连接风扇

## 2个2线风扇

如果您使用的是A4T等带有2个模型冷却风扇的工具头，您可以使用[[multi_pin]](https://www.klipper3d.org/Config_Reference.html?h=multi#multi_pin)一起控制它们。

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

## 3线风扇

3线风扇可按照上述引脚定义进行连接。

## 4线风扇


:::info 信息

此信息基于Creality K1 4020鼓风机，感谢用户EAZY在此设置上的工作。

:::


4线风扇需要使用2个连接器来实现PWM线控制和TACH线监测。

### H36 Combo V2连接

**Fan0：**
24V > V
GND > PB12
TACH > PB14

**IO.3：**
PWM > PA10

![](/images/h36-combo-v2--wire-fans.png)


### Creality 4020鼓风机引脚定义

红色 > 24V
黑色 > GND
绿色 > PWM
黄色 > TACH

![](/images/h36-combo-v2--creality-4020-blower-fan-pin-out.jpg)

### 配置


```language
[output_pin fan0_power] #keeps 24V on for part cooling fan as GND(PB12) is a mosfet
pin: H36_combo:PB12
value: 1
shutdown_value: 0

[fan] # Part cooling fan PWM
pin: H36_combo:PA10
max_power: 1.0
shutdown_speed: 0.0
cycle_time: 0.00004   # 25kHz for 4-wire PWM fan
hardware_pwm: false
kick_start_time: 0.5
tachometer_pin: ^H36_combo:PB14
```


## USB / CAN选择

XT30和USB2/CAN均使用CAN通信时，请参考以下说明通过CAN连接H36。

XT30和USB2/CAN均使用USB通信时，请参考以下说明通过USB连接H36。

## 排针跳线

IO.0+1、IO.2、Fan0、Fan1可通过跳线帽选择电源电压。
如图所示，左侧两个引脚连接在一起为24V，右侧两个引脚连接在一起为5V。

![](/images/h36-combo-v2--header-jumpers.png)



:::note 注意

请注意，如果这些接口用作输出，输出的高电平电压与跳线选择的电压一致。请确保您的外设能够承受该范围。一般来说，3D打印机配件中只有SSR能够承受9-36V控制电压。

:::


# LED指示灯

![img](/images/H36_combo_V1_led.png)

| LED名称 | 指示                                                                                                                                                                                                                                                                                | 备注 |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 3V3      | 亮起：电源正常。<br>熄灭：电源故障。<br>3.3V是通过DC-DC将24V转换为5V，再通过LDO转换为3.3V获得的，因此24V/5V/3.3V可能存在短路/开路。                                                                  | 红色    |
| HUB      | 亮起：USB至少有一个连接。<br/>熄灭：USB无连接。                                                                                                                                                                                               | 红色    |
| STATUS   | 使用katakulpt时`- 闪烁：进入下载模式；`<br/>熄灭/常亮：不在下载模式，状态一般由配置决定；<br/>该LED由PC13控制，高电平点亮。定制使用请参考<br/>julianschill/klipper-led_effect | 红色    |
| HEAT     | 根据加热PWM亮起或闪烁                                                                                                                                                                                                                                       | 红色    |
| USB      | USB通信指示，在配置菜单中使用"PA2"                                                                                                                                                                                                                                | 红色    |
| CAN      | CAN通信指示，在配置菜单中使用"!PA2"                                                                                                                                                                                                                               | 绿色  |

# 通信

## 连接到Pi

H36 combo V2可通过USB或CANBUS连接到Pi。通过PA2选择，请参考USB / CAN选择。

### 通过CAN

![img](/images/H36_combo_V1_conn_CAN.png)

由于树莓派没有CANBUS接口，通常只有在通过扩展芯片扩展CANBUS接口后才能连接。常用的包括MCP2518 SPI转CAN模块（CanHat）、USB转CAN模块（例如：UCAN）、Klipper USB转CAN桥接模式，以及具有原生CAN接口的Linux主机（例如：CM68）。

### 通过USB

使用USB连接时，您可以使用我们提供的转接板直接连接到PI的USB接口。

![img](/images/H36_combo_V1_conn_USB.png)

# 固件指南

## 固件配置和编译

### 使用Katapult Bootloader

如果您需要使用bootloader，我们推荐使用katapult。以下未配置仅供参考：
katapult使用请参考：https://github.com/Arksine/katapult

``` shell
cd ~/katapult
make menuconfig
make flash FLASH_DEVICE=0483:df11
```
**USB**

![](/images/h36-combo-v2--with-katapult-bootloader-03.png)

**CAN**

![](/images/h36-combo-v2--with-katapult-bootloader-04.png)

```shell
cd ~/klipper
make menuconfig
make
cd ~/katapult/scripts
#when using CAN communication
python3 flashtool.py -i can0 -f ~/klipper/out/klipper.bin -u <uuid>
#when using USB communication
python3 flashtool.py -d <serial device> -b <baud_rate> -f ~/klipper/out/klipper.bin
```
**USB**

![](/images/h36-combo-v2--with-katapult-bootloader-01.png)

**CAN**

![](/images/h36-combo-v2--with-katapult-bootloader-02.png)

### Klipper无Bootloader

H36默认使用无bootloader模式，配置如下：
**USB**

![](/images/h36-combo-v2--klipper-with-no-bootloader-01.png)

**CAN**

![](/images/h36-combo-v2--klipper-with-no-bootloader-02.png)


## 固件上传

![](/images/H36_combo_V1_firmware.png)

在执行以下命令之前，您需要进入DFU模式才能编译和烧录固件。如上图所示，

- 按住BOOT0，
- 然后按RESET按钮一秒钟，
- 然后松开RESET，
- 等待3秒，
- 然后松开BOOT0。

使用" lsusb"检查是否出现DFU设备。如果是，上传固件。如果否，重复上述步骤。

```shell
make flash FLASH_DEVICE=0483:df11
```

在katapult下上传Klipper，请参考：

https://github.com/Arksine/katapult?tab=readme-ov-file#uploading-klipper

# 附件和其他文档

2D、3D、SCH和配置模板文件，请访问我们的github：

https://github.com/FYSETC/H36_Combo_V2



# 购买渠道

www.fysetc.com

# 技术支持渠道

support@fysetc.com

[Discord服务器](https://discord.gg/RXuwedUkB9)

---
id: FYSETC-SPIDER-KING
title: FYSETC SPIDER KING
slug: /FYSETC-SPIDER-KING
sidebar_position: 50
description: 10轴工业级3D打印机主板
source_file: FYSETC-SPIDER-KING.md
source_language: en
---

# FYSETC-SPIDER-KING

## 1. 产品介绍

10 轴工业级 3D 打印机主板

![](/images/SpiderKing.jpg)

### 1.1 优势

1. 可更换控制核心：
   它具有可更换的控制核心（称为“King”核心）。您可以在 4xRP2040(King-R) / STM32F446(King-446) / STM32F407(King-407) / STM32H7XX(King-H7xx) 之间自由选择，甚至可以制作自己的控制核心（我们将开源接口）。

2. 智能识别步进驱动类型：
   借助额外的 MCU，Spider-King 可以识别驱动类型并自动切换 SPI/UART 通道。
   此功能可节省您查找如何设置跳线文档的时间，让您远离枯燥的跳线设置。不再有步进驱动设置的问题。（如果您想使用此功能，您需要我们的新型步进驱动。）

3. 多固件支持：
   它支持多种固件。您可以根据自己的偏好和需求选择使用 Klipper / Marlin 2.0 / Reprap Firmware / GRBL 和其他固件。

4. 工业级标准设计，5000V 全 IO 隔离：
   它提供更安全的硬件基础：配备板载大功率隔离电源，控制核心与所有高压外设隔离，包括步进电机驱动、MOSFET 输出、高压输入信号、CAN 总线等。

5. 支持 10 路步进电机驱动：
   板载 10 路步进电机驱动插座，6x 最大 3A（最大 35V），4x 最大 6A（最大 55V）。任何插座都支持 SPI / UART / 独立模式。它具有全新的 6A 驱动设计。无需外部驱动即可驱动 57 甚至 86 步进电机；

6. 支持多种通信接口：
   它支持板载 5000V 隔离 CAN 接口，支持无线 WI-FI 接口，支持 ESP32 高速通信模块，支持多种连接树莓派的方式，包括 UART、SPI 和 USB。

7. 发热元件集中散热：
   我们将 5V 电源、步进驱动等大多数发热元件集中在板子中间区域，该区域可覆盖 12CM 风扇进行散热。您无需绞尽脑汁设计风道，即可获得更好、更稳定的输出性能。

8. 兼容 RRF 固件标准插座设计：
   插座布局按照 Duet 接线和布局设置，使用 RRF 更加方便。此外，我们还增加了两个带反馈信号的 DUET 型风扇端口。

9. 全固态电容：电源部分：
   它可以提供更稳定的电源和更高的效率。

10. 紧凑设计：
    它具有 177mm*108mm 的非常小的尺寸，实现多个 MOSFET 输出，并支持多达 10 个步进驱动。

## 2. 硬件指南

### 2.1 引脚定义

<table>
   <tr><td>功能</td><td>Spider 引脚</td><td>STM32 引脚</td><td>引脚编号</td><td>备注</td></tr>
   <tr><td rowspan="4">X-MOTOR(1)</td><td>X-Step</td><td>PG7</td><td>92</td><td></td></tr>
   <tr><td>X-DIR</td><td>PG6</td><td>91</td><td></td></tr>
   <tr><td>X-EN</td><td>PE11</td><td>64</td><td></td></tr>
   <tr><td>X-CS/PDN</td><td>PD2</td><td>116</td><td></td></tr>
   <tr><td rowspan="4">X2-MOTOR(2)</td><td>X2-Step</td><td>PD11</td><td>80</td><td></td></tr>
   <tr><td>X2-DIR</td><td>PD10</td><td>79</td><td></td></tr>
   <tr><td>X2-EN</td><td>PG10</td><td>125</td><td></td></tr>
   <tr><td>X2-CS/PDN</td><td>PE15</td><td>68</td><td></td></tr>
   <tr><td rowspan="4">Y-MOTOR(3)</td><td>Y-Step</td><td>PG14</td><td>129</td><td></td></tr>
   <tr><td>Y-DIR</td><td>PG12</td><td>127</td><td></td></tr>
   <tr><td>Y-EN</td><td>PG15</td><td>132</td><td></td></tr>
   <tr><td>Y-CS/PDN</td><td>PD8</td><td>77</td><td></td></tr>
   <tr><td rowspan="4">Z-MOTOR(4)</td><td>Z-Step</td><td>PD4</td><td>118</td><td></td></tr>
   <tr><td>Z-DIR</td><td>PD6</td><td>122</td><td></td></tr>
   <tr><td>Z-EN</td><td>PD5</td><td>119</td><td></td></tr>
   <tr><td>Z-CS/PDN</td><td>PD7</td><td>123</td><td></td></tr>
   <tr><td rowspan="4">Z2-MOTOR(5)</td><td>Z2-Step</td><td>PE5</td><td>4</td><td></td></tr>
   <tr><td>Z2-DIR</td><td>PC13</td><td>7</td><td></td></tr>
   <tr><td>Z2-EN</td><td>PE6</td><td>5</td><td></td></tr>
   <tr><td>Z2-CS/PDN</td><td>PC14</td><td>8</td><td></td></tr>
   <tr><td rowspan="4">E0-MOTOR(6)</td><td>E0-Step</td><td>PE3</td><td>2</td><td></td></tr>
   <tr><td>E0-DIR</td><td>PE4</td><td>3</td><td></td></tr>
   <tr><td>E0-EN</td><td>PE2</td><td>1</td><td></td></tr>
   <tr><td>E0-CS/PDN</td><td>PC15</td><td>9</td><td></td></tr>
   <tr><td rowspan="4">E1-MOTOR(7)</td><td>E1-Step</td><td>PG13</td><td>128</td><td></td></tr>
   <tr><td>E1-DIR</td><td>PG8</td><td>93</td><td></td></tr>
   <tr><td>E1-EN</td><td>PG9</td><td>124</td><td></td></tr>
   <tr><td>E1-CS/PDN</td><td>PG3</td><td>88</td><td></td></tr>
   <tr><td rowspan="4">E2-MOTOR(8)</td><td>E2-Step</td><td>PE1</td><td>142</td><td></td></tr>
   <tr><td>E2-DIR</td><td>PE0</td><td>141</td><td></td></tr>
   <tr><td>E2-EN</td><td>PB2</td><td>48</td><td></td></tr>
   <tr><td>E2-CS/PDN</td><td>PD9</td><td>78</td><td></td></tr>
   <tr><td rowspan="4">E3-MOTOR(9)</td><td>E3-Step</td><td>PF4</td><td>14</td><td></td></tr>
   <tr><td>E3-DIR</td><td>PF3</td><td>13</td><td></td></tr>
   <tr><td>E3-EN</td><td>PF2</td><td>12</td><td></td></tr>
   <tr><td>E3-CS/PDN</td><td>PF5</td><td>15</td><td></td></tr>
   <tr><td rowspan="4">E4-MOTOR(10)</td><td>E4-Step</td><td>PF15</td><td>55</td><td></td></tr>
   <tr><td>E4-DIR</td><td>PG0</td><td>56</td><td></td></tr>
   <tr><td>E4-EN</td><td>PG5</td><td>90</td><td></td></tr>
   <tr><td>E4-CS/PDN</td><td>PG11</td><td>126</td><td></td></tr>
   <tr><td rowspan="3">TMC 驱动 SPI (SOFT)</td><td>MOSI</td><td>PE14</td><td>67</td><td></td></tr>
   <tr><td>MISO</td><td>PE13</td><td>66</td><td></td></tr>
   <tr><td>SCK</td><td>PE12</td><td>65</td><td></td></tr>
   <tr><td rowspan="7">限位开关</td><td>X-MIN</td><td>PC5</td><td>45</td><td></td></tr>
   <tr><td>X-MAX</td><td>PB5</td><td>135</td><td></td></tr>
   <tr><td>Y-MIN</td><td>PC4</td><td>44</td><td></td></tr>
   <tr><td>Y-MAX</td><td>PF13</td><td>53</td><td></td></tr>
   <tr><td>Z-MIN</td><td>PB6</td><td>136</td><td></td></tr>
   <tr><td>Z-MAX</td><td>PF14</td><td>54</td><td></td></tr>
   <tr><td>Probe</td><td>PA0</td><td>34</td><td></td></tr>
<tr><td rowspan="7">DIAG</td><td>DIAG-1</td><td>PF6</td><td>18</td><td></td></tr>
   <tr><td>DIAG-2</td><td>PF7</td><td>19</td><td></td></tr>
   <tr><td>DIAG-3</td><td>PF8</td><td>20</td><td></td></tr>
   <tr><td>DIAG-4</td><td>PF11</td><td>49</td><td></td></tr>
   <tr><td>DIAG-5</td><td>PF12</td><td>50</td><td></td></tr>
   <tr><td>DIAG-6</td><td>PA14/SWCLK</td><td>109</td><td></td></tr>
   <tr><td>DIAG-7</td><td>PA13/SWDIO</td><td>105</td><td></td></tr>
<tr><td rowspan="9">风扇/RGB<tr><td rowspan="2">FAN0</td><td>PWM-(PE8)</td><td>59</td></tr></td></tr>
   <tr><td>TACHO-(PB1)</td><td>47</td><td></td></tr>
   <tr><td rowspan="2">FAN1</td><td>PWM-(PE9)</td><td>60</td></tr></td></tr>
   <tr><td>TACHO-(PB7)</td><td>137</td><td></td></tr>
   <tr><td>FAN2</td><td>PD15</td><td>86</td><td></td></tr>
   <tr><td>FAN3</td><td>PD12</td><td>81</td><td></td></tr>
   <tr><td>FAN4</td><td>PD14</td><td>85</td><td></td></tr>
   <tr><td>5V-LED(WS2812)</td><td>PD3</td><td>117</td><td>与调试 LED 共用</td></tr>
   <tr><td rowspan="6">加热</td><td>E0-Heater</td><td>PB4</td><td>134</td><td></td></tr>
   <tr><td>E1-Heater</td><td>PB0</td><td>46</td><td></td></tr>
   <tr><td>E2-Heater</td><td>PD13</td><td>82</td><td></td></tr>
   <tr><td>E3-Heater</td><td>PC8</td><td>98</td><td></td></tr>
   <tr><td>E4-Heater</td><td>PA15</td><td>110</td><td></td></tr>
   <tr><td>Heated-Bed</td><td>PE10</td><td>63</td><td></td></tr>
   <tr><td rowspan="6">温度</td><td>TE0（THERM0）</td><td>PC1</td><td>27</td><td>使用 4.7kOhm 0.1% 温度传感器上拉电阻，可直接连接 PT1000。对于 PT100，必须使用放大板。</td></tr>
   <tr><td>TE1（THERM1）</td><td>PF9</td><td>21</td><td>与 TE0 相同。</td></tr>
   <tr><td>TE2（THERM2）</td><td>PC3</td><td>29</td><td>与 TE0 相同。</td></tr>
   <tr><td>TE3（THERM3）</td><td>PC2</td><td>28</td><td>与 TE0 相同。</td></tr>
   <tr><td>TE4（THERM4）</td><td>PC0</td><td>26</td><td>与 TE0 相同。</td></tr>
   <tr><td>TB（THERM5）</td><td>PF10</td><td>22</td><td>与 TE0 相同。</td></tr>
   <tr><td rowspan="2">CAN</td><td>TX</td><td>PB9/SDA1/CAN_TX</td><td>140</td><td></td></tr>
   <tr><td>RX</td><td>PB8/SCL1/CAN_RX</td><td>139</td><td></td></tr>
   <tr><td rowspan="8">EXP1</td><td>LCD_D7</td><td>PE7</td><td>58</td><td></td></tr>
   <tr><td>LCD_D6</td><td>PG4</td><td>81</td><td></td></tr>
   <tr><td>LCD_D5</td><td>PC11/MISO3/RX3/4</td><td>112</td><td></td></tr>
   <tr><td>LCD_D4</td><td>PC10/SCK3/TX3/4</td><td>111</td><td></td></tr>
   <tr><td>LCD_EN</td><td>PC12/MOSI3/TX5/SDA2</td><td>113</td><td></td></tr>
   <tr><td>LCD_RS</td><td>PD0/CAN-RX1</td><td>114</td><td></td></tr>
   <tr><td>ENC_C</td><td>PA8/SCL3</td><td>100</td><td></td></tr>
   <tr><td>BEEP</td><td>PC9/SDA3</td><td>99</td><td></td></tr>
   <tr><td rowspan="8">EXP2</td><td>RESET</td><td>NRST</td><td>25</td><td></td></tr>
   <tr><td>ENC_A</td><td>PC6/TX6</td><td>96</td><td></td></tr>
   <tr><td>ENC_B</td><td>PC7/RX6</td><td>97</td><td></td></tr>
   <tr><td>SD-DET</td><td>PB10/SCL2</td><td>69</td><td></td></tr>
   <tr><td>SD-MISO</td><td>PA6/MISO1</td><td>42</td><td></td></tr>
   <tr><td>SD-MOSI</td><td>PA7/MOSI1</td><td>43</td><td></td></tr>
   <tr><td>SCK</td><td>PA5/SCK1</td><td>41</td><td></td></tr>
   <tr><td>CS</td><td>PA4/CS1</td><td>40</td><td></td></tr>
   <tr><td rowspan="7">EXP3</td><td>SD-DET</td><td>PB10/SCL2</td><td>69</td><td></td></tr>
   <tr><td>SD-MISO</td><td>PA6/MISO1</td><td>42</td><td></td></tr>
   <tr><td>SD-MOSI</td><td>PA7/MOSI1</td><td>43</td><td></td></tr>
   <tr><td>SCK</td><td>PA5/SCK1</td><td>41</td><td></td></tr>
   <tr><td>CS</td><td>PA4/CS1</td><td>40</td><td></td></tr>
   <tr><td>TX</td><td>PA2/TX2</td><td>36</td><td></td></tr>
   <tr><td>RX</td><td>PA3/RX2</td><td>37</td><td></td></tr>
   <tr><td rowspan="2">EEPROM(4K) I2C 引脚</td><td>SCL</td><td>PF1/SCL2</td><td>11</td><td>连接到 24LC32(4K EEPROM)</td></tr>
   <tr><td>SDA</td><td>PF0/SDA2</td><td>10</td><td>连接到 24LC32(4K EEPROM)</td></tr>
   <tr><td rowspan="7">树莓派</td><td>TX</td><td>PA10/RX1</td><td>102</td><td></td></tr>
   <tr><td>RX</td><td>PA9/TX1</td><td>101</td><td></td></tr>
   <tr><td>MOSI</td><td>PB15</td><td>76</td><td></td></tr>
   <tr><td>MISO</td><td>PB14</td><td>75</td><td></td></tr>
   <tr><td>SCK</td><td>PB13</td><td>74</td><td></td></tr>
   <tr><td>CS</td><td>PB12</td><td>73</td><td></td></tr>
   <tr><td>DATA_RDY</td><td>PB11</td><td>70</td><td></td></tr>
   <tr><td rowspan="2">SWD 调试</td><td>SWDIO</td><td>PA13</td><td>105</td><td>目前仅用于调试，可用于其他用途。</td></tr>
   <tr><td>SWCLK</td><td>PA14</td><td>109</td><td>目前仅用于调试，可用于其他用途。</td></tr>
</table>

### 2.2 引脚图

![](/images/SpiderKing_V1.0_Pinout.jpg)

如果图片不够清晰，请查看我们 [github](https://github.com/FYSETC/FYSETC-SPIDER-KING/blob/main/Spider_King_V1.0_Pinout.pdf) 或 [国内](http://git.ecoaas.com/FYSETC/FYSETC-SPIDER-KING/blob/main/Spider_King_V1.0_Pinout.pdf) 上的 .pdf 和 .svg 文件。

### 2.3 限位开关电压选择

![](/images/EndstopVol.jpg)

### 2.4 步进驱动指南

![](/images/StepperDriver-SPI-UART.jpg)

在我们的 [GitHub](https://github.com/FYSETC/FYSETC-SPIDER-KING/blob/main/images/StepperDriver-SPI-UART.jpg) 或 [国内](http://git.ecoaas.com/FYSETC/FYSETC-SPIDER-KING/blob/main/images/StepperDriver-SPI-UART.jpg) 上查看清晰图片。

#### 2.4.1 Big5160 安装

![](/images/SpiderKing_Big5160.jpg)

## 3. 操作系统指南

### 3.1 SAMFi-OS

在 [github](https://github.com/FYSETC/FYSETC-SAMFi-OS) 或 [国内](http://git.ecoaas.com/FYSETC/FYSETC-SAMFi-OS) 上查看详情。

### 3.2 MainsailOS

在[此处](https://docs.mainsail.xyz/setup/mainsail-os)查看详情。

### 3.3 Fluidd

在[此处](https://docs.fluidd.xyz/)查看详情。

### 3.4 OctoPi

在[此处](https://octoprint.org/download/)查看详情。

## 4. 固件指南

Spider-King 支持 Marlin 固件、Klipper 固件和 RRF 固件。选择您需要的一种。

### 4.1 Marlin

#### 4.1.1 下载 Vscode + platformio

要编译固件，您需要安装 Visual Studio Code 和 platformio 插件。更多 Marlin 固件详情，请访问 Marlin 固件官方网站[此处](https://marlinfw.org/)。

#### 4.1.2 下载固件

Marlin 固件位于 git 仓库 [GitHub](https://github.com/FYSETC/FYSETC-SPIDER-KING/tree/main/firmware/Marlin) 或 [国内](http://git.ecoaas.com/FYSETC/FYSETC-SPIDER-KING/tree/main/firmware/Marlin) 的 `firmware/Marlin` 文件夹中，您也可以从最新的 [Marlin bugfix-2.1.x 分支](https://github.com/MarlinFirmware/Marlin/tree/bugfix-2.1.x) 获取固件。

步骤 1：您需要在 `configuration.h` 文件中启用以下定义。

```
#define MOTHERBOARD BOARD_FYSETC_SPIDER_KING407
#define SERIAL_PORT -1
```

步骤 2：然后我们需要修改 `platformio.ini` 文件

`default_envs = FYSETC_SPIDER_KING407`

#### 4.1.3 编译固件

打开 Vscode 并打开 platformio 主页，点击“Open Project”按钮，然后指向您放置固件的文件夹。

如果一切顺利，在底部您可以看到几个按钮

对勾按钮用于编译，点击它进行编译。您可以在 `.pio\build\FYSETC_SPIDER_KING407 folder.` 找到构建的 `firmware.bin`

#### 4.1.4 上传固件

遵循[此处](#44-firmware-upload)的固件更新指南。

### 4.2 Klipper

我们将 Klipper 相关文件（如 `printer.cfg`）放在 github 仓库的 `firmware/Klipper` 文件夹中。

如果您想使用 Klipper。您需要先遵循 Klipper [安装指南](https://www.klipper3d.org/Installation.html) 安装 [Klipper](https://github.com/KevinOConnor/klipper)。当我们尝试编译它时，我们需要调用 `make menuconfig` 来选择编译选项，请按照以下描述为 Spider King 选择选项。

#### 4.2.1 menuconfig

请为 Spider King 选择这些选项，某些选项您需要根据您的板子和接线来决定选择哪个。

- ##### 启用 `extra low-level configuration options`

- ##### 微控制器架构

选择 `STMicroelectronics STM32`

- ##### 处理器型号

选择 `STM32F407`

- ##### 时钟参考

选择 `8 MHz crystal`

- ##### Bootloader 偏移

选择 `32kiB bootloader`。

*注意：如果您的 bootloader 崩溃了，您需要遵循 `5.Bootloader Guide` 章节来烧录 spider king bootloader。*

- ##### 通信接口

您在这里有两个选择，如果您使用 USB 线连接树莓派和 Spider King，您需要遵循下面的 `1. USB (on PA11/PA12)`。如果您使用串口连接树莓派和 Spider King，则勾选 `2. Serial (on USART1 PA10/PA9)`。

- ###### 1. USB (on PA11/PA12)

如果您想用 USB 线将 Spider King 连接到树莓派。您需要选择 `USB (on PA11/PA12)`

并且在 `printer.cfg` 文件中，您需要如下设置 `serial`。我们为 VORON 2 机器提供了一个示例 cfg 文件 `printer.cfg`，在[此处](https://github.com/FYSETC/FYSETC-SPIDER-KING/tree/main/firmware/Klipper)或[国内](http://git.ecoaas.com/FYSETC/FYSETC-SPIDER-KING/blob/main/firmware/Klipper/printer.cfg)。

```
Obtain definition by "ls -l /dev/serial/by-id/" then unplug to verify
##--------------------------------------------------------------------
serial: /dev/serial/by-id/usb-Klipper_stm32f446xx_230032000851363131363530-if00
```

- ###### 2. Serial (on USART1 PA10/PA9)

如果您想将 Spider King UART1(RX1:PA10, TX1:PA9) 端口连接到 RPI uart0(TX:GPIO14,RX:GPIO15) 端口，您需要选择 `Serial (on USART1 PA10/PA9)`

在 `printer.cfg` 文件中，您需要取消注释以下行，正如我们的示例 `printer.cfg` 文件（[github](https://github.com/FYSETC/FYSETC-SPIDER-KING/tree/main/firmware/Klipper) [国内](http://git.ecoaas.com/FYSETC/FYSETC-SPIDER-KING/blob/main/firmware/Klipper/printer.cfg)）所做的那样，如果您的 cfg 文件没有这一行，请添加它。

```
serial: /dev/ttyAMA0
```

除了这个 make 选项，您还需要遵循 `Connect RPI uart.md` 文件中的说明，您可以在 [github](https://github.com/FYSETC/FYSETC-SPIDER/blob/main/firmware/Klipper/Connect%20RPI%20uart.md) [国内](http://git.ecoaas.com/FYSETC/FYSETC-SPIDER-KING/blob/main/firmware/Klipper/Connect%20RPI%20uart.md) 找到该文件。

#### 4.2.2 编译固件

```
make
```

#### 4.2.3 上传固件

遵循[此处](#44-firmware-upload)的固件更新指南。

### 4.3 RRF

Spider King 从 3.4.2rc2 版本起由 teamgloomy 的 RRF 固件原生支持 [Releases · gloomyandy/RepRapFirmware · GitHub](https://github.com/gloomyandy/RepRapFirmware/releases)。在[此处](https://teamgloomy.github.io/fysetc_spider_king_407_general.html)查看文档。

### 4.4 固件上传

我们提供了几种上传固件的方法，包括 SDCARD、dfu-util、DFU 和 platformio。

#### 4.4.1 上传固件(SDCARD)

使用 SD 卡上传固件是我们更新固件的默认方式，因为 Spider King 已经带有出厂 bootloader。

步骤：

1. 将您编译的固件文件 `firmware.bin`（如果您使用 klipper 固件，需要将 `klipper.bin` 重命名为 `firmware.bin`）复制到 SD 卡

2. 将其插入板子右侧的 SD 卡槽

3. 然后给板子上电。

4. 您可能需要等待约 30 秒完成上传。

**注意：如果您曾经将固件上传到 Spider King 闪存地址 `0x08000000`，那么出厂 bootloader 将消失，您需要自己上传 bootloader，请遵循 `5.Bootloader Guide` 章节上传 bootloader。**

#### 4.4.2 上传固件(dfu-util)

此方法适用于 linux，这意味着应该可以在树莓派上运行。

##### 步骤 1. 首先进入 DFU 模式

1. 首先给板子断电

2. 确保 5V 和 U5V-EN 上没有跳线（在 KING 核心板上）

3. 将跳线放在 BT0 到 3V3 引脚上（在 KING 核心板上）

4. 将 USB 线连接到 KING 核心板和您的电脑（如果您使用树莓派上传固件，将 USB 线连接到您的树莓派）

5. 使用 24v 电源给板子上电
   
   现在板子处于 DFU 模式。如果不是，请点击复位按钮。您也可以使用 USB 5v 给板子上电，但您需要在 KING 核心板上设置 5V 和 U5V-EN 的跳线，查看 KING 核心板上的丝印标签，并记得在上传完成后移除它。
   
   ***完成固件上传后请记住移除 BT0 跳线，否则它将再次进入 DFU 模式。***

##### 步骤 2. 安装 dfu-util

确保已安装 dfu-util，执行 `dfu-util --version` 命令进行检查。

示例输出：

```
dfu-util 0.9

Copyright 2005-2009 Weston Schmidt, Harald Welte and OpenMoko Inc.
Copyright 2010-2016 Tormod Volden and Stefan Schmidt
This program is Free Software and has ABSOLUTELY NO WARRANTY
Please report bugs to http://sourceforge.net/p/dfu-util/tickets/
```

如果没有，您应该先安装它，使用您发行版的包管理器获取最新版本，例如

```
sudo apt-get install dfu-util
```

##### 步骤 3. 使用命令上传固件

然后使用下面的命令上传固件。您应该将下面的 `firmware.bin` 替换为您构建的固件 bin（或 hex）文件位置，如 `out/klipper.bin`。

```
dfu-util -R -a 0 -s 0x08008000:leave -D firmware.bin
```

#### 4.4.3 上传固件(DFU)

此方法仅适用于 WINDOWS 操作系统。

##### 步骤 1. 下载 stm32cubeprogrammer

您可以从 ST 网站 [STM32CubeProg](https://www.st.com/zh/development-tools/stm32cubeprog.html) 下载它。然后安装并打开 STM32CubeProgrammer 软件。

![](/images/S6_1574332767079.png)

##### 步骤 2. 进入 DFU 模式

- 首先给板子断电

- 确保 5V 和 U5V-EN 上没有跳线（在 KING 核心板上）

- 将跳线放在 BT0 到 3V3 引脚上（在 KING 核心板上）

- 将 USB 线连接到 KING 核心板和您的电脑（如果您使用树莓派上传固件，将 USB 线连接到您的树莓派）

- 使用 24v 电源给板子上电
  
  现在板子处于 DFU 模式。如果不是，请点击复位按钮。您也可以使用 USB 5v 给板子上电，但您需要在 KING 核心板上设置 5V 和 U5V-EN 的跳线，查看 KING 核心板上的丝印标签，并记得在上传完成后移除它。
  
  ***完成固件上传后请记住移除 BT0 跳线，否则它将再次进入 DFU 模式。***

##### 步骤 3. 上传固件

现在您可以使用 stm32cubeprogrammer 通过以下操作连接并烧录 Spider 板。

按照屏幕截图中红色数字所示操作。

1. 点击按钮查找 DFU 端口。
2. 连接 DFU
3. 选择“firmware.bin”文件。（或 .hex 文件）。
4. 填写“起始地址” `0x08008000`。
5. 开始编程

#### 4.4.4 上传固件(platformio)

如果您使用 platformio 自己编译 Marlin，您可以遵循以下说明上传固件。

##### 步骤 1. 首先进入 DFU 模式

- 首先给板子断电

- 确保 5V 和 U5V-EN 上没有跳线（在 KING 核心板上）

- 将跳线放在 BT0 到 3V3 引脚上（在 KING 核心板上）

- 将 USB 线连接到 KING 核心板和您的电脑（如果您使用树莓派上传固件，将 USB 线连接到您的树莓派）

- 使用 24v 电源给板子上电
  
  现在板子处于 DFU 模式。如果不是，请点击复位按钮。您也可以使用 USB 5v 给板子上电，但您需要在 KING 核心板上设置 5V 和 U5V-EN 的跳线，查看 KING 核心板上的丝印标签，并记得在上传完成后移除它。
  
  ***完成固件上传后请记住移除 BT0 跳线，否则它将再次进入 DFU 模式。***

##### 步骤 2. 点击上传按钮上传固件

## 5. STL 文件

我们上传了一些用于某些 3D 打印机的 STL 文件，例如 Voron：[支架](https://github.com/FYSETC/FYSETC-SPIDER-KING/tree/main/STLs)。

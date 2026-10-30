---
id: FYSETC_S6
title: FYSETC_S6
slug: /FYSETC_S6
sidebar_position: 100
description: S6基于STM32F446 32位MCU，与F6一样，具有六个驱动插座，并支持全系列TMC驱动器。我们已充分扩展了MCU的资源，以便您能够最大限度地发挥其…
source_file: FYSETC_S6.md
source_language: en
---

![IMG_0389](/images/S6_IMG_0389.jpg)

S6 基于 STM32F446 32 位 MCU，与 F6 一样，具有六个驱动插座，并支持全系列 TMC 驱动。我们充分扩展了 MCU 的资源，以便您最大限度地发挥其性能。我们考虑了 3D 打印机的可能使用场景，并设计了一系列扩展应用，例如防反接电路、12V 电源、热电偶支持、24V 传感器支持等。

## 1. 特性

- 紧凑尺寸：117mm x 87mm，与 F6 相同

- 基于 STM32F446 180Mhz，所有 IO 均可承受 5V 电压

- 支持 6 个 TMC 步进驱动，无需连接 Uart/SPI 线

- 改进的 TMC 跳线设置，更简单易懂

- 主电源反接保护电路，更安全

- 最大 28V 输入，12V@5A，5V@2A DC-DC 电路，3.3V@0.6A LDO

- 两个汽车保险丝，分别用于热床输入和主电源输入

- 限位开关插座可选 24V/5V/3.3V，为更多其他设备做好准备，例如电感式传感器、BL-Touch

- 可选 XH 连接器和 MX 连接器

- 10 个支持 PWM 的功率 MOSFET 输出（1 个用于热床，3 个用于热端，3 个用于风扇，3 个用于 RGB LED 灯带）

- 3 针温度接口，可使用热敏电阻或热电偶（需要 AD597 模块）

- 3 路 PWM 风扇，2 路 RGB LED，可选 12V 和 24V

- 便捷的 DISPLAY + SD-CARD 连接器：
  
  - 板上兼容 RepRapDiscount SmartController 的排针
  - 用于串行触摸显示屏的 10P FPC
  - 用于 SD 卡模块的 2X4 排针输出
  - EXP1 和 EXP2 具有更多复用功能，例如 USART、I2C、CAN

- 支持 SD 卡和 USB 上传

## 2. 应用


- 3D 打印机

- CNC 设备

- 其他类似机器

## 3. 硬件

### 3.1 资源

![1574476641063](/images/S6_1574476641063.png)

![1574476619462](/images/S6_1574476619462.png)

| 板卡名称           | S6                                            | F6                                            |
| -------------------- | --------------------------------------------- | --------------------------------------------- |
| 许可证              | GPL V2.0                                      | GPL V2.0                                      |
| 最新版本       | V1.2                                          | V1.4                                          |
| 挤出机            | 最多 3 个                                         | 最多 3 个                                         |
| 固定风扇           | 最多 5 个                                         | 最多 5 个                                         |
| 可控风扇      | 最多 3 个                                         | 最多 3 个                                         |
| 加热器              | 最多 3 个                                         | 最多 3 个                                         |
| 限位开关             | 最多 6 个                                         | 最多 6 个                                         |
| 温度传感器            | 最多 4 个                                         | 最多 4 个                                         |
| SPI                  | 最多 2 个                                         | 1                                             |
| I2C                  | 最多 3 个                                         | 1                                             |
| ISP                  | --                                            | 1                                             |
| 串口芯片     | --                                            | CH340                                         |
| CPU                  | STM32F446VET6                                 | Atmega2560                                    |
| CPU 速度 ( MHz )    | 180Mhz                                        | 16 Mhz                                        |
| 步进驱动       | 最多 6 个                                         | 最多 6 个                                         |
| 步进驱动类型 | 所有兼容 StepStick 的模块              | 所有兼容 StepStick 的模块              |
| 输入                | 主电源：12-24V 最大 15A；热床输入：12-24V 最大 20A | 主电源：12-24V 最大 10A；热床输入：12-24V 最大 15A |
| 输出               | 热床输出：最大 20A；加热器输出：最大 5A            | 热床输出：最大 15A；加热器输出：最大 5A            |

### 3.2 跳线


**与 F6 V1.4 一样，两个 Z 电机插座已从并联改为串联。如果您只使用其中一个插座，另一个必须连接跳线帽，否则一个 Z 轴电机将无法工作。**

![1574491030269](/images/S6_1574491030269.png)

#### 3.2.1 步进驱动

为了支持尽可能多的不同驱动，S6 设置了许多跳线位置。不同的驱动模块需要不同的跳线。如原理图所示，驱动部分有 2 组跳线：JP1 和 JP6。

![1574475839586](/images/S6_1574475839586.png)

为了让您更好地了解如何为不同驱动使用跳线，我进一步说明了驱动插座。驱动引脚的基本定义相同，区别在于 JP6-1、JP6-2、JP6-3 和 JP6-4 这四个位置。您可以从原理图中看到它们的作用。

![1574476699891](/images/S6_1574476699891.png)

##### A4988 跳线配置

![1574477723736](/images/S6_1574477723736.png)

- 对于 A4988、类似 A4988、TMC2100 和 TMC 独立模式，您需要跳线 JP6 (1234-5678) 来配置微步以及一些 TMC 特性。
- 当您连接跳线帽时，该引脚为高电平。当您不连接时，则为模块自身的电平状态。这与 F6 不同，F6 可以是高电平或低电平。
- 详情请参考相应的驱动说明。

##### UART 模式配置

![1574477819491](/images/S6_1574477819491.png)

- 对于 TMC2208/2225/2209。您只需一个跳线闭合 JP1，即可启用 UART 模式。
- 您可以通过 UART 配置 TMC 芯片的所有功能，因此可以将其他所有跳线留空。
- 即使是 2209，我们也为每个驱动提供 2 线 UART 接口，因此无需通过 MS1/MS2 配置地址。

###### TMC2209 接线

![](/images/TMC2209.jpg)

##### SPI 模式配置

![1574477946366](/images/S6_1574477946366.png)

- 对于 TMC2130/5160/5161。您需要 4 个跳线闭合 JP6，即可启用 SPI 模式。

#### 3.2.2 12V/24V 跳线

![1574476322618](/images/S6_1574476322618.png)

- S6 板载 12V，风扇和 RGB 跳线可参考此图以及板底部的丝印。
- 输入电源电压应超过 15V，否则 12V DCDC 电路的输出电压将低于 12V
- 切勿让 12V 电流超过 5A，否则会烧毁 12V DCDC 电路。
- 如果您使用 18V 以上的输入，您将获得令人满意的 12V 输出，否则输出可能低于 12V。

#### 3.2.3 DIAG 跳线

![1574476382401](/images/S6_1574476382401.png)

- 如果您使用支持无传感器归位的 TMC 驱动（2130/2209/5160/5161），您可以连接这些跳线，以便 MCU 通过相应的限位开关引脚获取 DIAG 信号，从而实现无传感器归位。
- 连接跳线后，请记住在固件中定义 DIAG 引脚并启用该功能。

#### 3.2.4 底部跳线

![1574476497110](/images/S6_1574476497110.png)

- X+ / Y+ / Z+，您可以选择 5V 或 3.3V。对于 X+ 和 Y+，默认是 3.3V。对于 Z+，默认是 5V，您可以在此连接 BLtouch。

- X- / Y- / Z-，您可以选择 24V 或 3.3V，默认是 3.3V。如果您想使用一些电感式或电容式传感器，可以切换到 24V。
  
  ![1574476533464](/images/S6_1574476533464.png)

- I2C 引脚，您可以选择 5V 或 3.3V，默认是 3.3V。

- 对于 TE0-TE2，如果您想通过 AD597 使用热电偶测温，可以切断跳线。

#### 3.2.5 5V 跳线

S6 **V2.0** 版本增加了 5V 选择跳线。您可以选择来自 USB 或 DC 电路的 5V。

已知问题：选择 5V USB 跳线、施加 24V、断开 USB 线时，加热器 FET 会导通。因此我们建议您选择来自 DC5V 的 5V。

![S6跳线-5V](/images/S6%E8%B7%B3%E7%BA%BF-5V.png)

#### 3.2.6 Boot0 跳线

在 S6 V2.0 中，BOOT0 按钮被跳线取代。

![S6V2.0BOOT0](/images/S6V2.0BOOT0.png)

### 3.3 引脚定义

我们已在板背面标记了所有引脚，如有需要，您可以翻转板子确认或查看原理图。

得益于 STM32 的强大性能，每个引脚都具有多种功能，我将尽可能为您标明以供参考。如需更多信息，请参阅 STM32F446 数据手册，我已将其放在我们的 [S6 GitHub](https://github.com/FYSETC/FYSETC-S6/blob/master/datasheet/stm32f446ve.pdf) 上

#### 3.3.1 EXP1&EXP2

![1574483263718](/images/S6_1574483263718.png)

#### 3.3.2 限位开关和 UART1 引脚

限位开关旁边的 UART 插座可用于连接串行设备，例如 wifi 模块，或通过串口更新固件。

![1574482734041](/images/S6_1574482734041.png)

#### 3.3.3 BL-touch 接线示例

![img](/images/S6_1574489576766.png)

#### 3.3.4 将 RGB 端口复用于风扇

![](/images/RGB_FAN.png)

#### 3.3.5 4028/4056/4 针（PWM+测速）风扇

1. 按功能区分 4 根线，您应该有如下线：+12v、Gnd、PWM、Tacho
   为此请查阅风扇的数据手册。通常，Delta 风扇为蓝色线，Sanyo 风扇为棕色线
2. 将 +12v 和 GND 线连接到 fysetc s6 上的 12v 端口。
   请注意，s6 v2 的 12v 端口无法提供大于 2A 的电流。
3. 将 PWM 线连接到引脚 PA0（请查看板背面确认引脚名称，我们使用的是 XMax 限位开关的信号引脚）
4. 将测速线连接到 YMAX 限位开关的信号引脚（PA1）
5. 按如下方式修改 printer.cfg 来配置 Klipper

###### Klipper 配置

```
[fan]
pin: !PA0
cycle_time: 0.00004 # or 0.01
tachometer_pin: PA1
tachometer_poll_interval: 0.0005 # will support up to a 30.000 RPM fan with 2 pulses per rotation.
```

## 4. 固件

### 4.1 Marlin

#### 下载 Vscode + platformio

要编译固件，您需要安装 Visual Studio Code 和 platformio 插件。

#### 下载固件

##### S6 v1.2

固件位于本仓库的 `firmware` 文件夹中，如果您想了解我们做了哪些更改，我们建议使用 git 获取代码。

如果您想使用 Marlin 的最新功能，我们建议使用最新的 [Marlin bugfix-2.0.x 分支](https://github.com/MarlinFirmware/Marlin/tree/bugfix-2.0.x)，下载后，您需要在 ```configuration.h``` 文件中启用以下定义

```#define MOTHERBOARD BOARD_FYSETC_S6```

然后更改 ```platformio.ini``` 文件中的 ```default_envs``` 变体

```defaultenvs = FYSETCS6```（适用于旧 bootloader，启动地址为 `0x10000`，见下文）

```defaultenvs = FYSETCS68000```（适用于新 bootloader，启动地址为 `0x8000`，见下文）

**注意：自 2021/06/23 起，bootloader 启动地址已更改为 `0x8000`，您可以[在此](https://github.com/FYSETC/FYSETC-S6/tree/main/bootloader)查看 bootloader 详情，并可在[此处](https://github.com/MarlinFirmware/Marlin/pull/22207)查看 Marlin PR。**

##### S6 v2.0

固件位于本仓库的 `firmware` 文件夹中，您也可以从最新的 [Marlin bugfix-2.0.x 分支](https://github.com/MarlinFirmware/Marlin/tree/bugfix-2.0.x)获取固件。您需要在 ```configuration.h``` 文件中启用以下定义

```#define MOTHERBOARD BOARD_FYSETC_S6_V2_0```

然后更改 ```platformio.ini``` 文件中的 ```default_envs``` 变体

```defaultenvs = FYSETCS6```（适用于旧 bootloader，启动地址为 `0x10000`，见下文）

```defaultenvs = FYSETCS68000```（适用于新 bootloader，启动地址为 `0x8000`，见下文）

**注意：自 2021/06/23 起，bootloader 启动地址已更改为 `0x8000`，您可以[在此](https://github.com/FYSETC/FYSETC-S6/tree/main/bootloader)查看 bootloader 详情，并可在[此处](https://github.com/MarlinFirmware/Marlin/pull/22207)查看 Marlin PR。**

#### 编译固件

打开 Vscode 并打开 platformio 主页，点击“Open Project”按钮，然后指向您放置固件的文件夹。

![1561099422559](/images/AIO_f1.png)

如果一切顺利，您可以在底部看到几个按钮

![1561099546202](/images/AIO_f2.png)

对勾标记用于编译，点击它进行编译。

如果生成 hex 文件失败，您可能需要使用管理员账户打开 vscode。

### 4.2 上传固件

#### 4.2.1 上传固件（SD 卡）

我们提供了多种上传固件的方式。使用 SD 卡上传是我们更新固件的默认方式，因为板子出厂时已内置 sdcard bootloader。如果您选择使用 sdcard 上传固件，首先需要将 sdcard 模块连接到 S6 的 EXP2 端口。基本上，您可以使用任何包含 sdcard 模块的 LCD 屏幕。但如果您无法使其工作，请检查您的 sdcard 模块的 SPI CS 引脚是否连接到 S6 板上的 PA4 引脚。

然后，将编译好的固件文件 ```firmware.bin``` 复制到 SD 卡，插入 SD 卡模块，然后给板子上电。您可能需要等待约 30 秒以完成上传。

注意：bootloader 位于名为 `bootloader` 的文件夹中，请遵循 [bootloader 文件夹](https://github.com/FYSETC/FYSETC-S6/tree/main/bootloader)中的 README。

#### 4.2.2 上传固件（DFU）

另一种上传固件的方式是使用 DFU。

##### 1. 下载 stm32cubeprogrammer

您可以从 ST 网站下载。

https://www.st.com/zh/development-tools/stm32cubeprog.html

打开 STM32CubeProgrammer 软件。

![1574332767079](/images/S6_1574332767079.png)

##### 2. 进入 DFU 模式

S6 v1.2

首先关闭板子电源，然后按下 Boot0 按钮并保持，然后将 USB 连接到板子和您的计算机，它将进入 DFU 模式。现在您可以松开 Boot0 按钮。

S6 v2.0

首先关闭板子电源，然后将 Boot0 跳线到 3.3V，然后将 USB 连接到板子和您的计算机，它将进入 DFU 模式。现在您可以松开 Boot0 按钮。

***请记住在上传完成后移除跳线，否则它将再次进入 DFU 模式。***

##### 3. 上传固件

现在您可以通过以下操作使用 stm32cubeprogrammer 连接并烧录 S6 板。

![1574386395071](/images/S6_1574386395071.png)

按照截图中红色数字所示操作。

1. 点击按钮刷新 DFU 端口。

2. 连接 DFU

3. 选择“firmware.bin”文件。

4. 在“Start address”中填入 `0x8008000`（如果您的 platformio env 是 `default_envs = FYSETC_S6`，则需要设置为 `0x8010000`，在 klipper 中如果您的启动地址是 `32k`，则设置为 `0x8008000`，如果是 64k，则设置为 `0x8010000`）

5. 开始编程

**我们将继续更新，敬请期待！**

## 5. 技术支持

您可以在我们的 github https://github.com/FYSETC/FYSETC-S6/issues 提交问题
或将任何技术问题提交到我们的[论坛](http://forum.fysetc.com/)

## 6. 相关文章

[English](https://3dwork.io/en/fysetc-s6-complete-guide/)

[Español](https://3dwork.io/fysetc-s6-guia-completa/)

---
id: Cheetah_Board
title: CHEETAH
slug: /Cheetah_Board
sidebar_position: 60
description: 专为单头3D打印机设计，预留了众多接口以支持更多功能。例如交流电检测、耗材检测、使用BL-touch或其他传感器进行调平。
source_file: Cheetah_Board.md
source_language: en
---

## 产品介绍

![](/images/Cheetah_V1.2b_real.png)

专为单头 3D 打印机设计，预留了许多接口以实现更多功能。例如交流电检测、耗材检测、使用 BL-touch 或其他传感器进行调平。

## 特点

- 紧凑尺寸：101.5mm x 72mm，兼容 Creality ender 3 主板尺寸

- 完全集成的多合一解决方案：
  - STM32F103 MCU（运行 Marlin 2.0）
  - CH340 用于高速 USB 串口连接
  - (V1.1) 4X TMC2209 步进驱动器，支持无传感器归零
  - (V1.2) 4X TMC2208 步进驱动器，不支持无传感器归零

- 通用电源：
  - 可用于 7V-35V 的电机 / 热床
  - (V1.2) 24V 转 12V/2A DC-DC 用于风扇
  - 集成高精度电源稳压器（DC/DC）：5V 最大 1A 和 3.3V 最大 600mA LDO

- 板载 TF 卡座
- EXP1 用于 12864 显示面板（Creality 12864 面板或 FYSETC Generic12864）
- 板载 RGB 控制（V1.2 没有 RGB 控制）
- RGB 控制和风扇控制 12V/24V 可选（需要 24V 转 12V 模块）
- PCB：
  - 高质量、耐高温 FR4-TG130 PCB
  - 沉金工艺

## 应用

- 3D 打印机
- CNC 设备
- 其他类似机器

## 硬件资源

| 板卡名称           | Cheetah                                              |
| -------------------- | ------------------------------------------------ |
| 许可证              | GPL V2.0                                       |
| 最新版本       | V1.0                                           |
| 挤出机            | 1                                                |
| 固定风扇           | 最多 2 个                                            |
| 可控风扇      | 最多 1 个                                            |
| 加热器              | 最多 1 个                                            |
| 限位开关             | 最多 3 个                                            |
| 温度传感器            | 最多 2 个                                            |
| I2C                  | 1                                                |
| SWD                  | 1                                                |
| 串口芯片     | CH340                                            |
| CPU                  | STM32F103                                     |
| CPU 速度（MHz）    | 72 Mhz                                        |
| 步进驱动器       | 4X TMC2209（V1.2 = 2208） |
| 步进驱动器类型              | 板载               |
| 输入| 7-35 V 最大 20A；|
| 输出| BED OUT：最大 10A；Heater Out：最大 5A            |

## 连接器和跳线定义（V1.1）

![Cheetah_connectors](/images/Cheetah_connector.png)

![Cheetah_jumpers](/images/Cheetah_jumpers.png)

## 连接器和跳线定义（V1.2）







## 固件


FYSETC CHEETAH 固件已为 ENDER3 机器预配置，如果您想更改固件或自行编译代码，请按照以下步骤操作。

#### 下载 Vscode + platformio

要编译固件，您需要安装 Visual Studio Code 和 platformio 插件。

#### 下载固件

您可以从以下地址下载固件

Cheetah V11：https://github.com/FYSETC/Marlin-2.0.x-FYSETC/tree/CHEETAH/V11

Cheetah V12：https://github.com/FYSETC/Marlin-2.0.x-FYSETC/tree/CHEETAH/V12

如果您想知道我们做了哪些更改，我们建议使用 git 获取代码。

#### 编译固件

打开 Vscode 并打开 platformio 主页，点击“Open Project”按钮，然后指向您放置固件的文件夹。

![1561099422559](/images/AIO_f1.png)

如果一切顺利，在底部您可以看到几个按钮

![1561099546202](/images/AIO_f2.png)

只需点击对勾即可编译。

如果生成 hex 文件失败，您可能需要使用管理员账户打开 vscode。

#### 上传固件（windows、linux、Mac）

我们提供了几种上传固件的方法。您可以直接点击上传按钮上传固件，或参考以下两种方法。

#### 上传固件（windows）

编译完成后，您应该在文件夹 FIRMWARE_LOCATE\Marlin\Marlin\\.pio\build\STM32F103RC_fysetc\ 中看到固件文件“firmware.hex”

从我们的 github 下载烧录软件 https://github.com/FYSETC/STM32Flasher

使用电源为板子供电，并用 USB 线将板子连接到您的 PC（此步骤应在您打开软件之前完成）

双击“FlyMcu.exe”软件打开它。

![1561100540118](/images/Flymcu%E7%95%8C%E9%9D%A2.png)



选择 `Reset@RTS High(>+3v),ISP @DTR High`

点击“Port”选择您 USB 的端口

选择 FIRMWARE_LOCATE\Marlin\Marlin\\.pio\build\STM32F103RC_fysetc\\firmware.hex。

最后，点击“Start ISP(p)”上传固件。

#### 上传固件（linux）

##### 加载 usb 驱动

删除旧版本驱动 /lib/modules/$(uname -r)/kernel/drivers/usb/serial/ch341.ko

```
rm /lib/modules/$(uname -r)/kernel/drivers/usb/serial/ch341.ko
```

从我们的 github 下载 CH34x 驱动（linux 版本）

https://github.com/FYSETC/CH340-Driver

按照 readme.txt 进行编译和加载驱动。

如果您希望每次 PC 开机时自动加载驱动。您可以将 ch34x.ko 文件复制到

目录 /lib/modules/$(uname -r)/kernel/drivers/usb/serial/，并执行

```
depmod 
```

##### 安装 stm32flash 工具

首先获取代码

```
git clone https://git.code.sf.net/p/stm32flash/code stm32flash-code
```

然后按照 INSTALL 文件安装软件

##### 上传固件

用 USB 线将主板与您的 PC 连接。并执行

```
dmesg
```

您将得到类似的消息

![1562654867797](/images/AIO_f4.png)

ttyUSB0 是与主板通信的端口。

然后转到 firmware.hex 文件所在目录，执行以下命令上传固件

```
 stm32flash -w firmware.hex -v -i rts,-dtr /dev/ttyUSB0
```



## 版本：

V1.1：

1. 初始版本

V1.2a：

1. 将 2209 改为 2208 并支持 2208 UART 模式
2. 为热端添加一个可控风扇
3. 以及一个用于风扇和 MOSFET 的 24 转 12V/2A 电路
4. 添加 MOSFET 驱动芯片
5. 移除 RGB 电路和 I2C 引脚
6. 将 4P 排针（1.1 为 USB 引脚）改为 UART1
7. 修复 USB 电压回流到 PSU 的问题

V1.2b：

1. 修复一些丝印标记
2. 更新 MOSFET 驱动电路

## 常见问题：

#### 1.为什么 USB 使用 USB-TO-UART 芯片？

我们只是想给您一种方便的方式来更新固件，而不必考虑使用哪个引导加载程序以及如何跳线 BOOT0&BOOT1。
此外，如果您的板子已经安装在机器中，跳线设置对您来说更加不方便。
因此，通过添加一个可以解决问题的芯片，何乐而不为呢？

#### 2.为什么 USB 电源会回流到 PSU？

在设计时，我们认为插入 USB 只是为了更新固件，其他时候您会使用 SD 卡进行打印。即使您使用 USB 打印，也应该是短时间调试。
甚至，我们发现大多数 2560 板子都这样做，也没有出问题。这应该是一种经过时间考验的方式。
直到 TH3D 在全世界推广这个问题，我认为这会给很多人造成困惑，所以无论是否会造成问题，我都会解决这个问题，并且已经在 1.2a 版本上解决了。

#### 3.编码器方向错误？

首先，这不是硬件问题，我们可以通过软件调整，而且非常容易。
其次，这个方向没有固定的标准，不同的人可能不喜欢相同的方向。
最后，我们已经改成了最喜欢的方式，如果您想反转，也可以自行设置固件。
***注意：实际上，我们的价格只是一个硬件平台的价格，我们从未计算软件的价值，我们认为作为 marlin 的贡献者和用户之一，我们应该遵循开源精神，让更多人更容易获得开源的便利。而不是用开源资源来销售它。***

#### 4.屏幕显示乱码？

首先，我们应该知道低压信号很容易受到干扰，因此我们应尽量避免屏幕线与高压大电流线靠得太近。
此外，我们的人手上通常带有静电，直接接触一些电子元件，也可能影响正常的信号传输。
因此，如果只是偶然现象，重新上电后就会消失，那么不用担心。
如果一直存在，请联系我们，我们将根据具体情况进行处理！

#### 5.Y 电机变得非常热

实际上有一个不合适的固件配置。
您需要将

```
 #define CHOPPER_TIMING CHOPPER_DEFAULT_12V
```

改为

```
 #define CHOPPER_TIMING CHOPPER_DEFAULT_24V
```
#### 6.无法将配置保存到 eeprom
这是一个固件问题，目前已修复，您可以通过升级固件来修复。
对于新固件，默认配置不再适用于 cheetah 板，因为我们有其他板要发布以及构建固件的需要，您需要在 platformio.ini 文件中将 default_envs 改为 fysetc_STM32F1，并用 FYSETC 示例配置替换 configuration.h 和 configuration_adv.h 文件。



**我们将继续更新，敬请期待！***



## 技术支持

请将任何技术问题提交到我们的[论坛](http://forum.fysetc.com/)


```

```

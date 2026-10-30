---
id: AIO_II
title: AIO II
slug: /AIO_II
sidebar_position: 140
source_file: AIO_II.md
source_language: en
---

## 产品介绍


![Cheetah_top](/images/AIO_II_TOP.png)

这是一款一体式（因此我们称之为 AIO）解决方案，配备 32 位 MCU 和 256 微步进电机驱动，适用于 3DP/CNC 或类似机器。它拥有组装 3DP 所需的一切，包括显示屏和 SD 卡座。

## 特性


- 紧凑尺寸：105mm x 50mm
- 完全集成的一体式解决方案：
  - **STM32F103 MCU（运行 Marlin 2.0）**
  - CH340 用于高速 USB 串口连接和固件上传
  - **4X ST820 步进驱动器，256 微步**
- 通用电源：
  - 可用于 7V-35V 的电机/热床
  - 集成高精度电源稳压器（DC/DC）：5V 1A 最大和 3.3V 600mA 最大 LDO
- **板载 SD 卡插槽**
- **板载 RGB mini12864 LCD**
- 板载 RGB 控制
- **支持通过 USB 或 SD 上传固件**
- PCB：
  - 高质量、高温 FR4-TG130 PCB
  - 沉金工艺

## 应用


- 3D 打印机
- CNC 机床
- 其他类似机器

## 硬件资源


| 板卡名称           | AIO II                                |
| -------------------- | ------------------------------------- |
| 许可证              | GPL V2.0                              |
| 最新版本       | V1.0                                  |
| 挤出机            | 1                                     |
| 固定风扇           | 最大 1                                 |
| 可控风扇      | 最大 1                                 |
| 加热器              | 最大 2                                 |
| 限位开关             | 最大 3，3Pin XH 接头                 |
| 温度传感器            | 最大 2                                 |
| I2C                  | 1                                     |
| SWD                  | 1                                     |
| 串口芯片     | CH340                                 |
| CPU                  | STM32F103                             |
| CPU 速度 ( MHz )    | 72 Mhz                                |
| 步进驱动器       | 4X ST820                              |
| 步进驱动器类型 | 模块化，可更换。                 |
| 输入                | 7-35 V 15A 最大；                      |
| 输出               | BED OUT：10A 最大；Heater Out：5A 最大 |

## 引脚定义


##### 连接器定义：

![AIO_3.2_pinout](/images/AIO_3.2_pinout.PNG)

##### 微步设置：

![AIO_3.2_820_steps](/images/AIO_3.2_820_steps.png)

## 固件指南

#### 下载 Vscode + platformio

要编译固件，你需要安装 Visual Studio Code 和 platformio 插件。

#### 下载固件

你可以从 https://github.com/FYSETC/Marlin-2.0.x-FYSETC 下载固件，如果你想了解我们做了哪些更改，我们建议使用 git 获取代码。

你下载的固件默认适用于 Cheetah 板，你需要将 config/Fysetc/AIO_II 中的 configuration.h 和 configuration_adv.h 复制到 marlin 文件夹中。

最新的配置位于单独的仓库 [此处](https://github.com/MarlinFirmware/Configurations/tree/bugfix-2.0.x)，你可以下载并在 config/Fysetc/AIO_II 文件夹中找到配置

#### 编译固件

打开 Vscode 并打开 platformio 主页，点击“打开项目”按钮，然后指向你放置固件的文件夹。

![1561099422559](/images/AIO_f1.png)

如果一切顺利，在底部你可以看到几个按钮

![1561099546202](/images/AIO_f2.png)

对勾标记用于编译。

打开 platformio.ini 文件并更改 default_envs 选项如下。

default_envs = fysetc_STM32F1

然后根据你的板卡，用位于 FIRMWARE_LOCATE\Marlin\Marlin\config\examples\FYSETC 中的文件替换默认的 configuration.h 和 configuration_adv.h。

然后点击对勾标记进行编译。

如果你无法生成 hex 文件，你可能需要使用管理员账户打开 vscode。

更多详细信息，你可以参考 http://marlinfw.org/docs/basics/install_platformio.html

#### 上传固件（windows、linux、Mac）

我们提供了几种上传固件的方法。你可以直接点击上传按钮上传固件，或参考下面的两种方法。

#### 上传固件（windows）

编译后，你应该在文件夹 FIRMWARE_LOCATE\Marlin\Marlin\\.pioenvs\fysetc_STM32F1\ 中看到固件文件“firmware.hex”

从我们的 github https://github.com/FYSETC/STM32Flasher 下载烧录软件

使用 USB 线连接板卡和你的电脑（此步骤应在打开软件之前完成）

双击“FlyMcu.exe”软件打开它。

![1561100540118](/images/AIO_f3.png)



1. 选择“***Reset@DTR low(<-3v),ISP @RTS High***”
2. 点击“Port”选择你的 USB 端口
3. 选择 ***FIRMWARE_LOCATE\Marlin\Marlin\\.pioenvs\fysetc_STM32F1\firmware.hex*** 如截图所示。
4. 最后，点击“Start ISP(p)”上传固件。

#### 上传固件（linux）

##### 加载 USB 驱动

删除旧版本驱动 /lib/modules/$(uname -r)/kernel/drivers/usb/serial/ch341.ko

```
rm /lib/modules/$(uname -r)/kernel/drivers/usb/serial/ch341.ko
```

从我们的 github 下载 CH34x 驱动（linux 版本）

https://github.com/FYSETC/CH340-Driver

按照 readme.txt 进行编译和加载驱动。

如果你希望每次电脑启动时自动加载驱动。你可以将 ch34x.ko 文件复制到

目录 /lib/modules/$(uname -r)/kernel/drivers/usb/serial/ ，并执行

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

使用 USB 线连接主板和你的电脑。并执行

```
dmesg
```

你将得到类似的消息

![1562654867797](/images/AIO_f4.png)

ttyUSB0 是与主板通信的端口。

然后进入 firmware.hex 文件所在目录，执行以下命令上传固件

```
 stm32flash -w firmware.hex -v -i rts,-dtr /dev/ttyUSB0
```

## 附件


- [原理图文件](https://github.com/FYSETC-AIO_II/)
- [PCB 文件](https://github.com/FYSETC/FYSETC-AIO_II/)
- [2D 和 3D 图纸](https://github.com/FYSETC/FYSETC-AIO_II/)

## 购买渠道


- [FYSETC AIO II V3.1](https://www.aliexpress.com/item/32888370577.html)

## 技术支持


由于某些原因，我们不得不通过 VPN 访问 Facebook……因此我们的工程师无法及时在 Facebook 上回复你的问题，如果可能的话，请在论坛中提问。
**请将任何技术问题提交到我们的[论坛](http://forum.fysetc.com/)** 。

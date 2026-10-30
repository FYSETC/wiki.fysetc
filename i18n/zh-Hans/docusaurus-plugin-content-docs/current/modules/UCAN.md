---
id: UCAN
title: UCAN
slug: /UCAN
sidebar_position: 70
description: UCAN 是一款开源的 USB 转 CAN 接口板，基于 STM32F072 芯片和 candleLight 开源固件。它支持 Linux、Windows 和 Mac。当然，你也可以开发自己的……
source_file: UCAN.md
source_language: en
---

![image-20230526150542989](/images/UCAN-TOP.png)

# 1. 简介

UCAN 是一款开源的 USB 转 CAN 接口板，基于 STM32F072 芯片和 candleLight 开源固件。它支持 Linux、Windows 和 Mac。当然，由于它完全开源，你也可以开发自己的固件在其上使用。



# 2. 特性

- 支持 CAN2.0A 和 B，波特率高达 1M

- 兼容 candleLight V1 硬件

- 配合 candleLight 固件原生支持 socketcan

- 3 针螺钉端子：CANH、CANL、GND

- 用于进入 bootloader 进行固件升级的排针和 SWD 接口

- 收发器之前的 CAN 接口排针

- 用于启用/禁用终端电阻的排针，默认使用板载终端电阻（2 x 59R）

  

# 3. 硬件

UCAN 基于 STM32F072CBT6，因此 PA11/PA12 连接到 USB-C，PA8/PA9 连接到 CAN 接口。更多信息请参阅电路图。

## 3.1 关于终端电阻

目前有两种端接电阻的方式。默认端接由两个 59R 电阻（R1/R2）组成，如下图红色位置所示。备用位置由一个 120R 电阻和一个两针跳线组成，如洋红色所示。两者没有性能差异，但默认使用 2 个 59R 电阻。更多信息请查看[原理图](https://github.com/FYSETC/UCAN/blob/main/Hardware/UCAN%20V1.0%20SCH.pdf)。


![image-20230526154004328](/images/UCAN-Terminating.png)

# 4. 固件

UCAN 出厂时已烧录固件，因此在大多数情况下无需再次烧录。如果通过 USB 插入后电脑上出现 CAN 设备，则说明其工作正常。

如果你想再次烧录固件，请按照以下步骤操作：

1. 准备镊子或导线，以及一根可通信的 USB-C 数据线。
2. 打开 https://canable.io/updater/canable1.html
3. 用镊子或导线短接 BOOT0 和 3.3V，直到插入 USB 线且板子通电。此时板子将进入 DFU 模式，网页将能够检测到设备。

   ![image-20230526170710854](/images/UCAN-enter-boot-mode.png)

4. 点击“Connect and Upload”按钮烧录固件

# 5. 相关文档：

所有文件（包括原理图和 3D Step 文件）都在 github 上：

https://github.com/FYSETC/UCAN/tree/main

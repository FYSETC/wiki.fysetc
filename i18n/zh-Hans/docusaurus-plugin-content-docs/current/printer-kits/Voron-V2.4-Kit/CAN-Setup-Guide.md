---
id: CAN-Setup-Guide
title: SB CAN 设置指南
slug: /CAN-Setup-Guide
sidebar_position: 80
description: The latest release of the Fysetc Voron 2.4 Pro Kit comes with the Spider V3 and a SB CAN Toolhead Board. This guide will walk you through the setup process of the CAN network. The Spider has a built…
source_file: CAN Setup Guide
source_language: en
displayed_sidebar: wikiSidebar
---

## 1. 入门指南

Fysetc Voron 2.4 Pro Kit 的最新版本配备了 Spider V3 和 SB CAN 工具头板。本指南将引导您完成 CAN 网络的设置过程。Spider 内置了 CAN 收发器，因此我们无需额外的 CAN 适配器即可对其进行刷写。请务必先完整阅读所有内容，然后按顺序执行以下步骤。

### 1.1 创建 can0 文件
can0 文件用于配置 CAN 网络的运行速度。请按照以下步骤创建此文件。

1. 打开 SSH 终端，运行 `sudo nano /etc/network/interfaces.d/can0`
2. 在空白编辑器中，复制并粘贴以下内容：
```
allow-hotplug can0
iface can0 can static
  bitrate 1000000
  up ip link set can0 txqueuelen 1024
```
3. 按 Control+X 保存文件，如有提示请确认。
4. 运行 `sudo reboot` 并等待树莓派重启以应用更改。现在我们已经有了 can0 文件，下一步是刷写 Spider 板。

## 2. Spider V3 刷写

### 2.1 将 Spider 置于 DFU 模式
为了刷写 Spider 板上的 STMF446 芯片，我们需要将其置于 DFU 模式。DFU 模式将允许板子接受我们刷写的新固件。

#### 按钮方法
1. 确保板子已通电，按住板子侧面的 BTO 按钮
2. 在按住 BTO 按钮的同时，快速按下紧挨着 BTO 按钮的 RST（复位）按钮 5 次。
3. 您应该看到 Spider 上的所有指示灯亮起。这意味着板子现在处于 DFU 模式
4. 在 SSH 终端中运行 `lsusb` 验证操作是否成功。您应该看到以下内容：

![](/images/Spider_lsusb%20.png)

如果您没有看到上述预期结果，继续操作没有意义。如果板子未处于 DFU 模式，固件刷写将无法进行。如果您未成功，请重复该过程或尝试下一种方法。

#### 跳线帽方法
1. 完全关闭板子电源
2. 在蓝色引脚上的 3.3 和 BT0 之间安装一个跳线

![](/images/Spider_DFU_jumper.png)

3. 重新给板子上电，您应该看到所有指示灯亮起。
4. 在 SSH 终端中运行 `lsusb` 验证操作是否成功。您应该看到以下内容：

![](/images/Spider_lsusb%20.png)

如果您没有看到上述预期结果，继续操作没有意义。如果板子未处于 DFU 模式，固件刷写将无法进行。如果您未成功，请重复该过程或在 Discord 上发送消息寻求帮助。

### 2.2 为 Spider 制作固件镜像
现在 Spider 已处于 DFU 模式，我们可以为其刷写固件了。

1. 在 SSH 终端中，运行 `cd klipper` 进入 Klipper 目录。
2. 运行 `make menuconfig` 打开 Klipper 固件配置界面
3. 将设置更改为与图片中**完全**一致。使用方向键和回车键导航并选择正确的选项。**请仔细核对**您选择的选项是否与此图片一致。如果您没有选择正确的选项，将无法正常工作。

![](/images/Spider_menuconfig.png)

4. 按 `q` 退出，然后在提示保存时按 `y`。您现在应该回到了正常的 SSH 终端。
5. 运行 `make flash FLASH_DEVICE=0483:df11` 来构建固件镜像并将其刷写到 Spider。如果您的板子不在 DFU 模式，这将无法工作。
6. 只要显示“File downloaded successfully”，刷写过程就成功了。如果出现“Invalid DFU suffix signature”错误，不必担心。

![](/images/Successful_flash.png)

这是一个成功刷写的示例。请注意“File downloaded successfully”

#### 验证已刷写的固件
1. 如果您使用跳线进入 DFU 模式，请关闭板子电源并移除跳线。然后重新给板子上电以进行后续步骤。Spider 板应不再处于 DFU 模式。
2. 在 SSH 终端中运行 `lsusb`。
3. 确保您看到“OpenMoko”或“Geschwister Schneider bus device
`Bus 001 Device 006: ID 1d50:606f OpenMoko, Inc.` 或 `Bus 001 Device 006: ID 1d50:606f OpenMoko, Inc. Geschwister Schneider CAN adapter`

### 2.3 获取 Spider 的 UUID
Klipper 需要 CANBUS UUID 进行配置，而不是传统的串口。请按照以下步骤获取它。

1. 在 SSH 中，运行 `~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0`
2. 您应该看到类似以下内容：

![](/images/Spider_UUID.png)

每个 Spider 的 UUID 都不同。将**您的**唯一 UUID 复制并粘贴到记事本中，并标注为 Spider 的 UUID。稍后我们还会获取另一个，因此标注为 Spider 的 UUID 很重要。

现在我们已经成功刷写了 Spider，接下来需要对 CAN 工具头板执行相同的操作。

## 3. CAN 工具头板刷写

1. 在机器断电的情况下，将提供的 CAN 线缆从 Spider 连接到 CAN 工具头板。将 24V 铲形连接器连接到电源，将 JST 连接到 Spider 的 CAN 端口。将另一端插入 CAN 工具头板。
2. 打开打印机电源，然后在打印机开启的状态下，将附带的 USB 线缆从树莓派连接到 CAN 工具头板。

### 3.1 将 CAN 工具头板置于 DFU 模式
就像我们将 Spider 置于 DFU 模式进行刷写一样，我们也需要将 CAN 工具头板置于 DFU 模式。DFU 模式将允许板子接受我们刷写的固件。

3. 快速按下板子上的 RST 按钮 3 次。

![](/images/Toolhead_RST_button.png)

4. 在 SSH 终端中运行 `lsusb` 验证操作是否成功。您应该看到以下内容：

![](/images/Spider_lsusb%20.png)

如果您没有看到上述预期结果，继续操作没有意义。如果板子未处于 DFU 模式，固件刷写将无法进行。如果您未成功，请重复该过程或在 Discord 上留言寻求进一步帮助。

### 3.2 为 CAN 工具头板制作固件镜像
现在 CAN 工具头板已处于 DFU 模式，我们可以为其刷写固件了。

1. 在 SSH 终端中，运行 `cd klipper` 进入 Klipper 目录。
2. 运行 `make clean` 清除我们之前为 Spider 使用的旧编译文件
2. 运行 `make menuconfig` 打开 Klipper 固件配置界面
3. 将设置更改为与下方图片中**完全**一致。**请仔细核对**您选择的选项是否与此图片一致。如果您没有选择正确的选项，将无法正常工作。

![](/images/Toolhead_menuconfig.png)

4. 按 `q` 退出，然后在提示保存时按 `y`。您现在应该回到了正常的 SSH 终端。
5. 运行 `make flash FLASH_DEVICE=0483:df11` 来构建固件镜像并将其刷写到 CAN 工具头板。如果您的板子不在 DFU 模式，这将无法工作。
6. 只要显示“File downloaded successfully”，刷写过程就成功了。如果出现“Invalid DFU suffix signature”错误，不必担心。

![](/images/Successful_flash.png)

这是一个成功刷写的示例。请注意“File downloaded successfully”

7. 拔下 USB 线缆，按复位按钮 3 次使板子退出 DFU 模式。

### 3.3 获取 CAN 工具头板的 UUID
现在两块板子都已刷写了正确的固件，我们应该拥有了 Klipper 所需的两个 UUID。

1. 在 SSH 中，运行 `~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0`
2. 您应该看到 2 个 UUID，类似以下内容：

![](/images/Toolhead_UUID.png)

其中一个 UUID 应该是 Spider 的，您之前应该已经记录过了。另一个是 CAN 工具头板的 UUID。请记录并标注它，因为我们需要知道哪个是哪个。

## 4. Klipper printer.cfg 配置

配置文件已在 Fysetc Github 上提供。在您的 printer.cfg 中，您需要在正确的位置添加 UUID。如果您不确定如何操作，请在 Discord 上寻求更多帮助，因为这因您使用的配置而异。


## 联系方式

QQ：1041794121

Facebook：https://www.facebook.com/groups/197476557529090

Discord：https://discord.gg/Fb6FdND4

E-mail：support@fysetc.com

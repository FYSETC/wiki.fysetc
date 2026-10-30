---
id: FYS_Touch_Panel
title: FYS_Touch_Panel
slug: /FYS_Touch_Panel
sidebar_position: 40
description: 目前此固件仅适用于F6/S6板，请使用以下板级固件：
source_file: FYS_Touch_Panel.md
source_language: en
---

# 非常重要

目前此固件仅适用于 F6/S6 主板，请使用以下主板固件：

F6 : https://github.com/FYSETC/Marlin-2.0.x-FYSETC/tree/F6/2.0.x

S6 : https://github.com/FYSETC/Marlin-2.0.x-FYSETC/tree/S6/MASTER

您可以使用以下软件基于我们的 UI 设计您自己的 UI。

UI 设计软件 : https://github.com/FYSETC/FYSTLCD-DGUS

# 在 F6 上逐步设置触摸屏

## 1.接线图

以下是触摸屏布局。

![1547106602098](/images/DGUS-1547106602098.png)

- ### F6 - 屏幕

![1547105450498](/images/DGUS-1547105450498.png)

如您所见，这是一个串口屏，硬件通过串口 2 连接到 F6。
在 F6 上，有两个接口可以连接到触摸屏。默认情况下，使用 FPC 连接器。

注意：如果您想通过 J1 连接 F6，请注意串口的 TX 和 RX 需要交叉。

![1547107811426](/images/DGUS-1547107811426.png)

- ### S6 - 屏幕

  对于 S6 v1.2，您需要使用普通线连接屏幕，如下图所示。

  ![S6-dwin](/images/DGUS-S6-dwin.png)

- ### SD 模块

屏幕没有用于打印的 SD 卡插槽，因此我们免费提供了一个 SD 卡模块。

![SD-connection](/images/DGUS-SD-connection.png)

## 2.Marlin 固件设置 

为了使用此串口屏，您需要配置 marlin。

### F6:

F6 : https://github.com/FYSETC/Marlin-2.0.x-FYSETC/tree/F6/2.0.x

根据主板版本，您需要更改 MOTHERBOARD 定义：

#define MOTHERBOARD BOARD_FYSETC_F6_13

#define MOTHERBOARD BOARD_FYSETC_F6_14

启用屏幕 UI 类型：（这意味着删除以下行前面的“//”）

#define DGUS_LCD_UI_FYSETC 

使用 arduino 为 F6 编译 Marlin，请遵循我们的 wiki https://wiki.fysetc.com/F6_V1.3/

### S6:

S6 : https://github.com/FYSETC/Marlin-2.0.x-FYSETC/tree/S6/MASTER

启用屏幕 UI 类型：（这意味着删除以下行前面的“//”）

#define DGUS_LCD_UI_FYSETC 

对于 S6，您需要使用 vscode + platformio 编译固件，请遵循 S6 wiki https://wiki.fysetc.com/FYSETC_S6/

## 3.上传屏幕固件到屏幕

步骤 1：格式化 TF 卡并复制文件
以管理员身份运行 Windows 命令系统，然后输入：

format g:/fs:fat32/a:4096/q

注意：
g 是您的 TF 卡的驱动器号，卡的大小必须为 1-16G。

步骤 2：将固件刷写到 TF 卡
将 TF 卡插入卡槽（屏幕背面），然后给屏幕通电。
等待蓝屏出现，屏幕第一行显示“SD Card Process... END !”，可能需要 1-2 分钟。
关闭电源并重新给屏幕通电，等待启动屏幕，可能需要 1-5 秒。

Youtube 视频：
https://www.youtube.com/watch?v=Ez6qQsYpgLg&feature=youtu.be

## 4.购买渠道

速卖通：
https://www.aliexpress.com/item/FYSETC-F6-V1-3-ALL-in-one-Mainboard-4-3-Touch-Screen-6pcs-TMC2100-TMC2208-TMC2130/32961471929.html

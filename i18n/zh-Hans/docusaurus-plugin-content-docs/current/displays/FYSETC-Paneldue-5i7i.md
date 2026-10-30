---
id: FYSETC-Paneldue-5i7i
title: FYSETC Paneldue 5i/7i
slug: /FYSETC-Paneldue-5i7i
sidebar_position: 60
source_file: FYSETC Paneldue 5i7i.md
source_language: en
helplook_source: Displays/FYSETC Paneldue 5i7i.md
---

### ![](/images/fysetc-paneldue-5i7i--afcfa44c9916a738.png)

### 产品介绍

PanelDue 5i/7i 是用于 Duet 及其他支持它的 3D 打印电子设备的彩色触摸屏控制器。此集成版本是由领先制造商定制的高品质 5/7 英寸 TFT LCD 面板。

### 特点

- 5/7 英寸 LCD 上分辨率为 800×480 像素。
- 由主机 3D 打印机控制器提供 5V 电源。
- 2 线异步串行接口，3.3V 信号电平（5V 容限输入）。
- 板载 micro SD 卡插槽以及 PanelDue 串行和电源连接均可通过 10 芯排线使用。随附一根 300mm 长的排线（建议的最大长度）。
- 用于将 PanelDue 连接到控制板的 4 线电缆，用于串行和电源连接。还随附一根 300mm 长的电缆（建议的最大长度）。

### 应用

基于 RepRap 固件的 3D 打印机或其他 CNC 机器。

### 接线

#### 4 线电缆

Fysetc PanelDue 可以使用如下图所示的 4 芯电缆连接到连接器 IO\_0。随 Fysetc PanelDue 提供的 4 线电缆一端为 4 路 JST XH，另一端为 4 个独立的杜邦连接器。

4 线电缆不允许访问 PanelDue 上的 SD 卡插槽。

#### 排线

将 10 芯排线连接在 Fysetc PanelDue 上的插座与所用主板上的兼容插座之间，例如 [Fysetc Big Dipper](/docs/BIG-DIPPER/)。使用此连接类型时，它支持使用 SD 卡槽。

该连接器是标准的 10 针 2 排 2.54mm 间距盒式连接器，可接受用于 1.27mm 排线的 IDC 连接器。

![](/images/fysetc-paneldue-5i7i--dab1d930aa47362f.png)

### 屏幕支架

可以在 [Printables](https://www.printables.com/search/models?q=tag%3Apaneldue) 上找到许多屏幕支架。

### 固件

有关安装和更新显示器固件的详细信息，请参阅 Duet 文档，[安装和更新 PanelDue 固件](https://docs.duet3d.com/User_manual/RepRapFirmware/Updating_PanelDue)。

### 配置

在 config.g 中使用以下 gcode

固件版本 3.6.X 及以下

`M575 P1 S1 B57600                        ; Setup Paneldue`

固件版本 3.7.X 及以上

`M575 P2 S1 B57600                        ; Setup Paneldue`

### 文档

[GitHub 仓库](https://github.com/FYSETC/FYSETC-Paneldue-5i-7i)

### 购买渠道

[Fysetc 官方速卖通店铺](https://www.aliexpress.com/item/33005303596.html)

### 技术支持渠道

[支持邮箱](mailto:support@fysetc.com)

[Fysetc Discord](https://discord.gg/4A5QDCYx)

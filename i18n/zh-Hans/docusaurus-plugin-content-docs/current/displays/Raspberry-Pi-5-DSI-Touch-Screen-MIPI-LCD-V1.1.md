---
id: Raspberry-Pi-5-DSI-Touch-Screen-MIPI-LCD-V1.1
title: Raspberry Pi 5" DSI Touch Screen MIPI LCD V1.1
slug: /Raspberry-Pi-5-DSI-Touch-Screen-MIPI-LCD-V1-1
sidebar_position: 50
source_file: Raspberry Pi 5 DSI Touch Screen MIPI LCD V1.1.md
source_language: en
helplook_source: Displays/Raspberry Pi 5 DSI Touch Screen MIPI LCD V1.1.md
---

![Raspberry Pi 5" DSI 触摸屏 MIPI LCD V1.1](/images/raspberry-pi-5-dsi-touch-screen-mipi-lcd-v1-1--d53764db9a47bfec.png)

###   产品介绍

这是一款 5 英寸 Raspberry Pi LCD 触摸屏，分辨率为 800\*480，显示区域为 108×64.8mm。该产品支持 Raspberry Pi DSI 显示接口，屏幕上配有电容式触摸面板，支持 5 点触控。屏幕背面的特殊孔位设计便于将 Raspberry Pi 直接安装到产品中。触摸屏无需外部供电，采用 Raspberry Pi 的电源供电。此外，屏幕支持硬件背光调节，可通过旋转显示器背面的电位器实现该功能。

### 注意
5 英寸 DSI 屏幕目前不适用于 Raspberry Pi 5。

### 特性

- 5 英寸电容触摸屏，硬件分辨率为 800 x 480。
- 电容式触摸面板，支持 5 点触控。
- 钢化玻璃电容触摸面板，硬度高达 6H。
- 支持 Pi 4B/CM4/3B+/3A+/3B/CM3/CM3+/2B/B+/A+（需要时使用转接板）。
- 通过 Raspberry Pi 上的 DSI 接口直接驱动 LCD，刷新率最高可达 60Hz。
- 与 Raspberry Pi 配合使用时，支持 Raspberry Pi OS / Ubuntu / Kali 和 Retropie，免驱动。
- 与 VisionFive 配合使用时，支持 Debian，单点控制，免驱动。
- 与 Tinker Board 2 配合使用时，支持 Linux/Android，五点控制，免驱动。
- 与 Core3566 配合使用时，支持 Debian/Ubuntu，五点控制，免驱动。
- 支持通过软件控制调节亮度。

### 应用

基于 Klipper/Kalico 的 3D 打印机，使用 [KlipperScreen](https://klipperscreen.readthedocs.io/en/latest/) 或 [HelixScreen](https://helixscreen.org/)。

### 接线

#### Raspberry Pi 端

下图展示了 DSI 排线的方向，以及在 Raspberry Pi 上完全插入后的样子。

![](/images/raspberry-pi-5-dsi-touch-screen-mipi-lcd-v1-1--32f8b9887faf5586.jpg)

![](/images/raspberry-pi-5-dsi-touch-screen-mipi-lcd-v1-1--b4399a2e1c7b6024.jpg)

#### 屏幕端

下图展示了 DSI 排线的方向，以及在屏幕上完全插入后的样子。

![](/images/raspberry-pi-5-dsi-touch-screen-mipi-lcd-v1-1--24b39a80f4fb9909.jpg)

![](/images/raspberry-pi-5-dsi-touch-screen-mipi-lcd-v1-1--2fc5ea5e5db15db0.jpg)

### 安装视频

<https://www.youtube.com/watch?v=sUrsYsw5mUA>

[安装文件](https://github.com/FYSETC/FYSETC-VORON-2.4-R2-Pro/tree/main/STLs/Skirts/HDMI5%20Display)

### 固件配置

部分 DSI 屏幕存在默认配置下触摸无法工作的问题。目前的解决方法/临时修复方案是更改这些显示器所使用的内核驱动模块。

`sudo nano /boot/firmware/config.txt` 并将

`dtoverlay=vc4-kms-v3d`  
改为  
`dtoverlay=vc4-fkms-v3d`

使用 `ctrl`+`x`（退出）关闭 nano 编辑器，然后按 `y` 表示是（保存），再按回车确认。

**重启**以应用更改。`sudo reboot now`

如果这样仍无法解决问题，可以尝试在这些行前面加上 # 将其注释掉，结果如下：

`# dtoverlay=vc4-kms-v3d`  
`# max_framebuffers=2`

使用 `ctrl`+`x`（退出）关闭 nano 编辑器，然后按 `y` 表示是（保存），再按回车确认。

**重启**以应用更改。`sudo reboot now`

### 社区模型

[Fysetc MiPi DSI 5" 45° 支架](https://www.printables.com/model/1586282-fysetc-mipi-dsi-5-45deg-mount)

### 购买渠道

[Fysetc.com](https://www.fysetc.com)

### 技术支持渠道

[支持邮箱](mailto:support@fysetc.com)

[Fysetc Discord](https://discord.gg/4A5QDCYx)

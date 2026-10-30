---
id: How-to-update-the-CM68-img
title: 如何更新 CM68 镜像
slug: /How-to-update-the-CM68-img
source_file: How to update the CM68 img.md
source_language: en
helplook_source: 3D Printer Kits/Venture XL/4. Firmware Guide/How to update the CM68 img.md
---

# CM68 操作系统更新

:::danger 注意

- 本套件的控制板已在出厂时安装 Klipper 操作系统和 MCU Klipper 固件。
- 并且已完成预配置。
- 只要接线正确，通电后即可使用。
- 除非您确定要重新安装固件，否则请勿执行以下步骤。

:::


![](/images/venture-xl-firmware-guide-how-to-update-the-cm68-img--cm68-os-update.png)


## 说明
[K7-Panel](https://github.com/FYSETC/K7_Panel) 使用基于 RK3568 的 CM68 核心作为 Klipper 的主机。其系统基于 Debian 10 编译，并已预装 Klipper 所需的环境和插件。我们已在出厂时在 printer.cfg 中填写了正确的 UUID。接线完成后，打印机即可直接启动。

通常情况下，预装的系统可以直接使用，无需重新刷写，除非您遇到无法解决的程序问题。

K7-Panel 上 CM68 的操作系统：
1. 首批产品的系统镜像文件，[点击此处下载](https://mega.nz/file/PMJizIgK#7H0VyEDbbWig4OJ9R3rLJAmEWsnXZq1oj6ff8MEBF9E)
2. 内测版改进了系统稳定性，并解决了部分用户总是报告“丢失 MCU 通信”错误的问题，[点击此处下载](https://mega.nz/file/7EQBmTbC#8dMvA3tBQlL-STsbJUx9M65Ul4mT9pBMqagDUTtd8o0)

## 更新步骤（仅支持 Windows 系统）：

1. 为节省空间，我们对部分镜像文件进行了压缩。请使用 winrar 解压，而不要使用 Windows 自带的解压功能。确保解压后的文件后缀为 *.img
2. 安装 [RK3568 的驱动文件](https://mega.nz/file/HZpFnBhQ#j9bl40Yfw7FOL7ieaw1hkWEuzcwztau424Sj9JLIrl8)
1. 启动 Ventrue XL。然后将 USB3.0 A-A 线插入 K7-Panel 上的 **USB-OTG** 接口。
2. 打开“RKDevTool_Release”，
4. 点击“升级固件”选项卡，点击“固件”按钮选择固件，这通常需要一些时间响应，在此期间界面无法操作。

   ![image](/images/venture-xl-firmware-guide-how-to-update-the-cm68-img--update-steps-only-support-windows-system-03.png)

   选择固件后，将显示如下

   ![image](/images/venture-xl-firmware-guide-how-to-update-the-cm68-img--update-steps-only-support-windows-system-02.png)

6. 按住恢复按钮（需要 3-10 秒），在按住恢复按钮的同时点击重置按钮（无需按住重置按钮），当 RKDevTool 发现设备后，松开恢复按钮。

   ![image](/images/venture-xl-firmware-guide-how-to-update-the-cm68-img--update-steps-only-support-windows-system-01.png)

7. 点击“升级”按钮进行升级  
8. 等待升级完成（需要超过 10 分钟）。切记在此过程中不要切断电源或拔下数据线，否则升级将失败，甚至可能损坏 CM68。

   ![image](/images/venture-xl-firmware-guide-how-to-update-the-cm68-img--update-steps-only-support-windows-system-04.png)

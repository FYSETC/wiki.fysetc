---
id: Software-issues
title: 软件问题
slug: /Software-issues
source_file: Software  issues.md
source_language: en
helplook_source: 3D Printer Kits/Venture XL/5. FAQ/Software  issues.md
---

## 1. 显示屏上显示消息：“MCU unable to connect”。如何修复此错误？

如果 MCU 无法连接，您可以先尝试 **Firmware_restart**。

如果问题仍然存在，您需要检查硬件连接、固件和配置。

- 确保所有线缆牢固连接且位置正确；

- 使用“lsusb”命令查看 USB 设备列表。正确的设备如下图所示红框中所示。如果您的设备不同，请截图发送给我，以便我帮您确定问题所在；

![](/images/venture-xl-faq-software-issues--i-have-a-message-on-the-display-mcu-unable-to-connect-h-01.png)

- 如果与上图一致，您需要再次确认 canbus_uuid 是否配置正确（我们在出厂时已配置 uuid，但仍值得检查此选项以避免疏忽）。此处的 CAN 接口由 Spider_Pro 的 USB 转 CAN 桥接模式提供，应为 CAN2。使用 `ifconfig` 或 `ip addr` 确认 CAN2 是否出现。

![](/images/venture-xl-faq-software-issues--i-have-a-message-on-the-display-mcu-unable-to-connect-h-02.png)

![](/images/venture-xl-faq-software-issues--i-have-a-message-on-the-display-mcu-unable-to-connect-h-03.png)

- 确认 CAN2 出现后，使用以下命令查询 uuid：
`~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can2`
如果设备不正常或 uuid 已在 printer.cfg 中，将提示如下：
Total 0 uuids found
但如果出现一个或多个 uuid，则是因为它们未在 printer.cfg 中正确配置，您可以手动粘贴。
但是，您无法通过 uuid 确定它属于哪个 MCU。您可以任意填写，然后根据错误信息再次调整。

## 2. 显示屏上显示消息：“Option calibration method in section scanner is deprecated”。如何修复此错误？

您应该更新了系统的 cartographer 部分。新的 cartographer 不再需要 calibration method 项。您可以将整行注释掉，即在该行前添加 #，或直接删除该行。

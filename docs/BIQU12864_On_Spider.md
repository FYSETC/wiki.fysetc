---
id: BIQU12864_On_Spider
title: 在 Spider 上使用 BIQU Mini12864
description: 在 Spider 上使用 BIQU Mini12864 的使用教程文档，便于查阅相关原始说明。
slug: /BIQU12864_On_Spider
source_file: BIQU12864_On_Spider.md
source_language: en
---

# How to use BIQU‘s mini12864 on Spider

BIQU's 12864 screen has a capacitor and a 10K pull-down resistor on the reset pin, which will cause the RST pin of the Spider board (with a 100K pull-up and a 0.1uF capacitor to ground) to always be at a low level. This will prevent the system from starting up. The connector's direction is also rotated opposite to ours, so it needs to be rotated 180 degrees the other way. After rotating the connector as pictured, remove R1 and C6 from the screen, at which point the screen should now work.

![BIQU12864](/images/BIQU12864.png)

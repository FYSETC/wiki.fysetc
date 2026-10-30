---
id: BIQU12864_On_Spider
title: Spider 上的 BIQU12864
slug: /BIQU12864_On_Spider
sidebar_position: 60
description: BIQU 的 12864 屏幕在复位引脚上有一个电容和一个 10K 下拉电阻，这会导致 Spider 主板的 RST 引脚（带有 100K 上拉电阻和一个接地的 0.1uF 电容）始终处于…
source_file: BIQU12864_On_Spider.md
source_language: en
---

# 如何在 Spider 上使用 BIQU 的 mini12864

BIQU 的 12864 屏幕在复位引脚上有一个电容和一个 10K 下拉电阻，这会导致 Spider 主板的 RST 引脚（带有 100K 上拉电阻和一个 0.1uF 接地电容）始终处于低电平。这将阻止系统启动。连接器的方向也与我们的相反，因此需要向另一方向旋转 180 度。如图所示旋转连接器后，从屏幕上移除 R1 和 C6，此时屏幕应该可以正常工作。

![BIQU12864](/images/BIQU12864.png)

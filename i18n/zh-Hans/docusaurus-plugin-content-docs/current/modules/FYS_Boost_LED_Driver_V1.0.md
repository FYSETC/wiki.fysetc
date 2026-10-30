---
id: FYS_Boost_LED_Driver_V1.0
title: LED Driver V1.0
slug: /FYS_Boost_LED_Driver_V1.0
sidebar_position: 100
description: FYS Boost LED驱动器是一款经济实惠且易于使用的驱动器，最大输出为60V/5A（需要您更换Rs电阻）。默认情况下，可提供900mA ± 5%的电流输出，适用于30W…
source_file: FYS_Boost_LED_Driver_V1.0.md
source_language: en
---

## 产品介绍


![30w-LED-driver](/images/30w-LED-driver.jpg)

FYS 升压 LED 驱动器是一款经济且易于使用的驱动器，最大输出为 60V/5A（需要您更换 Rs 电阻）。默认情况下，可为 30W LED（10 并 3 串）模块提供 900mA ± 5% 的电流输出。

## 特点


- 宽 5V 至 32V 输入电压范围
- 最大升压输出高达 60V
- 0.22V FB 可调 LED 驱动电流
- 最大 5A 开关电流能力
- 效率高达 93%
- 出色的线性调整率和负载调整率
- 热关断功能
- 内置限流功能

## 应用


- LED 照明
- 升压恒流驱动器
- TFT LED 背光

## 典型应用电路


![LED DRIVER 接线图](/images/LED-DRIVER%E6%8E%A5%E7%BA%BF%E5%9B%BE.png)

## 注意事项


- 使用过程中板子会发热（900 mA 时约 60 °C），这是正常现象，无需担心；
- 请勿将板子输入和输出的正负极连接，否则会损坏板子；
- 如果需要更大的电流，请按照 FAQ 部分操作。更大的电流会导致板子发热，需要良好的散热条件，例如粘贴散热片并添加风扇。
- 驱动器功率大于 LED 所需功率，LED 会闪亮；
- 驱动器功率小于 LED 所需功率，LED 会闪暗或不闪；
- <font color="red">对于因私自改装板子而造成的任何损坏或损失，本公司概不负责。</font>

## 常见问题



:::tip[如何手动更改为更大的电流输出？]

如果您想更改为其他电流输出：
1. 您需要具备焊接工具和相应的焊接技能；
2. 您需要 1 或 2 个 1206 电阻，电阻值可根据 Iout = 0.22/Rs 计算；
3. 您只需移除板子上标有 Rs 的两个电阻，并替换为您所需电流输出对应的电阻。

:::


## 附件


###  原理图

![LED-driver-schematic](/images/LED-driver-schematic.png)

### 尺寸

![LED-driver-dimensions](/images/LED-driver-dimensions.png)

## 商店

- [FYS Boost LED Driver V1.0](https://www.aliexpress.com/store/product/DLP-Boost-LED-drive-board-60V-5A-30W-Constant-Current-Driver-for-LED-Lighting-TFT-Backlighting/3480083_32905681524.html)

## 技术支持

请将任何技术问题提交到我们的[论坛](http://forum.fysetc.com/)

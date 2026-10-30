---
id: NanoDLP_Shield_V1.1
title: NanoDLP Shield V1.1
slug: /NanoDLP_Shield_V1.1
sidebar_position: 90
description: 该扩展板专为Raspberry Pi 3B设计，用于运行NanoDLP的SLA/DLP 3D打印机。该板包含一个9-28V转5V电路，最大提供3A电流，以及其他…
source_file: NanoDLP_Shield_V1.1.md
source_language: en
---

## 产品介绍


![NanoDLP_Shield](/images/NanoDLP-Shield.jpg)

该扩展板专为用于 SLA/DLP 3D 打印机运行 NanoDLP 的 Raspberry Pi 3B 设计。该板包含一个 9-28V 转 5V 电路，可提供最大 3A 电流以及 NanoDLP 所需的其他接口。请参阅以下说明。

## 特点


- 9V-28V 转 5V@3A 降压转换器
- DRV8825 步进驱动器
- 12V 风扇（为 Pi 散热）
- 2 个限位开关
- 用于外部 LED 驱动器的受控 MOS
- 用于 LCD1602 的 I2C 连接器
- 用于触摸屏的 Uart 连接器
- 快门支持
- 用于外部板的 5V OUT 连接器

## 应用


- 用于 Raspberry Pi 上的 NanoDLP 软件

## 规格


  板卡名称	    |  NanoDLP Shield 
  :--------------------:         | ---------------------
  许可证	                |   CPL V2
  最新版本           |   V1.1
  固定端口                  |	1X  12V（与输入相同）和 5V
  受控端口         |	1X 12V（与输入相同）
  限位开关                    |	Z-min /Z-max
  I2C                               |   1X PinHeader-4P
  串口                  |   1X XH2.54-4P
  步进驱动器           |   1X DRV8825@最大 2.5A/最大 32 微步
  输入	                         |   9V-28V
  输出                        |   5V@最大 3A，9-28V@最大 3A

## 接口资源


### 接口布局

![NanoDLP_Shield_PIN](/images/NanoDLP-Shield-PIN.png)

### 微步

短接 = 1，断开 = 0。

MS2|MS1|MS0|微步
:---:  |:---:  |:---:  |:---:
0| 0| 0|整步（2 相励磁），电流为 71%
0| 0| 1|1/2 步（1-2 相励磁）
0| 1| 0|1/4 步（W1-2 相励磁）
0| 1| 1|8 微步/步
1| 0| 0|16 微步/步
1| 0| 1|32 微步/步
1| 1| 0|32 微步/步
1| 1|1 |32 微步/步

## 引脚定义


![NanoDLP_Shield_PIN局部](/images/NanoDLP-Shield-PIN%E5%B1%80%E9%83%A8.png)

## 原理图


![NanoDLP_Shield原理图](/images/NanoDLP-Shield%E5%8E%9F%E7%90%86%E5%9B%BE.jpg)

## 接线图

![NanoDLP-Shield-V1.1接线图](/images/NanoDLP-Shield-V1.1%E6%8E%A5%E7%BA%BF%E5%9B%BE.png)


:::info

1. 9-28V 电源输入，如果你需要连接风扇为 UVLED 散热，也可以在此处连接。
2. 对于 UVLED 输入，你可以通过控制输出来开启/关闭 UVLED。
3. HDMI 转 MIPI 板或其他需要 5V 电源的设备。
4. 通过 I2C 端口，你可以连接 I2C 1602LCD。
5. 该板支持两个限位开关，顶部和底部，你也可以使用三针光电开关。

:::


## 商店

- [NanoDLP Shield V1.1](https://www.aliexpress.com/store/product/NanoDLP-Shield-V1-1-Expansion-Board-With-DRV8825-Controled-MOS-For-Raspberry-Pi-3B-And-NanoDLP/3480083_32885581951.html)


## 技术支持

请将任何技术问题提交到我们的[论坛](http://forum.fysetc.com/)

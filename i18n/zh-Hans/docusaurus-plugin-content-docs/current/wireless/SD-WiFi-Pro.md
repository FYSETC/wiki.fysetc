---
id: SD-WiFi-Pro
title: SD WiFi Pro
slug: /SD-WiFi-Pro
sidebar_position: 10
source_file: SD WiFi Pro.md
source_language: en
helplook_source: Wireless/SD WiFi Pro.md
---

# SD WIFI PRO



![image-20230327135120562](/images/SD_WIFI_PRO_main.png)

## 1. 简介

这是一款全新的 SD WIFI，我们称之为 SD WIFI PRO，简称 SWP。它基于 ESP32-PICO 器件和 SD 7.0 尺寸标准。
默认情况下，我们提供一套开源且可用的 webserver 固件，具有完整的文件上传和下载功能，基本可以满足局域网内远程管理文件的需求。
除了必要的 SD 传输引脚外，SWP 还引出了冗余引脚。除了用于固件更新外，还可以通过串口/I2C 用于其他设备控制，从而实现远程上传文件、发送控制命令等诸多操作。
它也可以用于 3D 打印之外的场景，例如市场上的 Flash Air（TOSHIBA）、ez Share（Ez Share）等产品，用于文件共享，例如无需数据线即可快速将相机中的照片传输到手机。
它不仅是一款完全开源的产品，也是一款无线 SD 产品开发套件，根据你的想象力提供更多可能性。

## 2. 特性

- 基于 ESP32 PICO D4，具有 4MB Flash
- 2.4G Wifi 和蓝牙
- SD 7.0 尺寸标准，兼容 SDIO/SPI 金手指，并额外提供串口和 I2C 接口
- 内置 8GB 高速存储器
- 附带 SD 读卡器和 Flash 上传器开发板
- 完全开源的硬件和软件

## 3. 应用

3D 打印机，以及其他需要无线访问 SD 卡的设备。


## 4. 硬件指南

### 4.1 引脚功能

![image-20230328082527339](/images/SD_WIFI_PRO_pin.png)

| 引脚  |       名称        | 输入     | 输出 | 功能                                                     |
| ---- | :---------------: | --------- | ------ | ------------------------------------------------------------ |
| 1    |      SDIO_D3      |           |        | 内置 Flash 引脚，SPI: CS                                  |
| 2    |     SDIO_CMD      |           |        | 内置 Flash 引脚，SPI:MOSI                                 |
| 3    |        GND        |           |        | 接地                                                       |
| 4    |        3V3        |           |        | SWP 的 3.3V 电源电压（3.0-3.6V @300mA+）        |
| 5    |     SDIO_CLK      |           |        | 内置 Flash 引脚，SPI: CLK                                 |
| 6    |        GND        |           |        | 接地                                                       |
| 7    |      SDIO_D0      |           |        | 内置 Flash 引脚，SPI: MISO                                |
| 8    |      SDIO_D1      |           |        | 内置 Flash 引脚，SPI: NC                                  |
| 9    |      SDIO_D2      |           |        | 内置 Flash 引脚，SPI:NC                                   |
| 10   |      GPIO_32      | OK        | OK     | ADC1_CH4,<br/>TOUCH9, <br/>RTC_GPIO9                         |
| 11   |      GPIO_26      | Ok        | OK     | GPIO26, DAC_2, ADC2_CH9, RTC_GPIO7, EMAC_RXD1                |
| 12   |      GPIO_2       | OK        | OK     | 必须保持悬空或为低电平才能进入烧录模式<br/>ADC2_CH2,<br/>TOUCH2,<br/>RTC_GPIO12,<br/>HSPIWP, HS2_DATA0,<br/>SD_DATA0 |
| 13   |      GPIO_0       | 上拉 | OK     | 启动时输出 PWM 信号，必须为低电平才能进入烧录模式<br>ADC2_CH1,<br/>TOUCH1,<br/>RTC_GPIO11,<br/>CLK_OUT1,<br/>EMAC_TX_CLK |
| 14   |      ESP_EN       |           |        | 使能（EN）是 3.3V 稳压器的使能引脚。它被上拉，因此连接到地可禁用 3.3V 稳压器。这意味着你可以将此引脚连接到按钮来重启你的 ESP32，例如。 |
| 15   |   GPIO_3 / RX0    | OK        | RX 引脚 | 启动时为高电平                                                 |
| 16   |   GPIO_01 / TX0   | TX 引脚    | OK     | 启动时调试输出                                         |
| 17   | GPIO_22 / I2C_SCL | OK        | OK     | GPIO22, VSPIWP, U0RTS, EMAC_TXD1                             |
| 18   | GPIO_21 / I2C_SDA | OK        | OK     | GPIO21, VSPIHD, EMAC_TX_EN                                   |
| 19   |      GPIO_19      | OK        | OK     | GPIO19, VSPIQ, U0CTS, EMAC_TXD0                              |

### 4.2 上传器和读卡器板（SWP 开发板）说明

![image-20230328092433777](/images/SD_WIFI_PRO_Dev_board_main.png)



#### 4.2.1 功能描述

![image-20230328092415667](/images/SD_WIFI_PRO_Dev_board_main_ins.png)

1. SD7.0 21Pin 插座

2. SWP 的所有引脚引出

3. 读卡器芯片（USB2.0）和 USB 切换芯片

4. USB Type-C 连接器

5. 固件自动下载和串口调试电路（CH340）

6. 模式/功能选择拨码开关，定义如下：

| 开关引脚                                                   | 状态 | 模式/功能                                                |
| ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| 1 <br>内置 *Flash 接口切换芯片* 的控制引脚，它连接到 ESP32 的 GPIO_26，上拉电阻。默认情况下，Flash 接口连接到 SD 外壳的金手指。 | ON     | 内置 8GB Flash 连接到 ESP32。                    |
| 1                                                            | OFF    | 内置 8GB Flash 连接到 SD 外壳的金手指。 |
| 2<br>USB 切换芯片的控制引脚，下拉电阻，USB 默认连接到读卡器芯片。 | ON     | USB 连接到 CH340 用于固件下载和调试     |
| 2                                                            | OFF    | USB 连接到读卡器以读取内置 8GB flash。   |

#### 4.2.2 将开发板用作 SD 插座

对于没有 SD 卡插座的主板，SWP 可能不方便连接。此时，你可以将开发板用作插座，只需将其连接到主板的原始 SPI 接口即可。
对于一些只有 TF 卡座且没有预留 SPI 接口的板子，会比较麻烦，但市面上有很多便宜的 TF 转 SD 卡转接板可供出售。

## 5. 固件指南

源代码位于 [SdWiFiBrowser](https://github.com/FYSETC/SdWiFiBrowser)，当前版本为 swd 0.x 版本，关于版本的更多描述见 [README.md](https://github.com/FYSETC/SdWiFiBrowser/blob/main/README.md)

新版本即将推出。

## 6. 零件清单

- SD WIFI PRO x1
- 上传器和读卡器板 x1

## 7. 文档

[ESP32 PICO 系列数据手册](https://www.espressif.com/sites/default/files/documentation/esp32-pico_series_datasheet_en.pdf) <br/>
[ESP32 PICO 系列数据手册中文版](https://www.espressif.com/sites/default/files/documentation/esp32-pico_series_datasheet_cn.pdf) <br/>
[上传器和读卡器板原理图](https://github.com/FYSETC/SD-WIFI-PRO/blob/main/SD-WIFI-PRO%20Uploader.pdf) <br/>
[SD WIFI PRO 原理图](https://github.com/FYSETC/SD-WIFI-PRO/blob/main/SD-WIFI-PRO%20V1.0.pdf) <br/>
[固件](https://github.com/FYSETC/SdWiFiBrowser)

## 8. 购买渠道

<a href="https://www.aliexpress.us/item/3256805122957973.html"><img src="/images/Aliexpress.png" alt="aliexpress" height="80" style="max-width:100%;" /></a>


## 9. 技术支持

请将任何技术问题提交到我们的[论坛](http://forum.fysetc.com/)，github，facebook，Discord。

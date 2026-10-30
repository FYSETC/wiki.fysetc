---
id: FC-Product-Manual
title: PSF 反馈传感器
slug: /FC-Product-Manual
sidebar_position: 170
source_file: PSF Feedback Sensor.md
source_language: en
helplook_source: Upgrade Kits/PSF Feedback Sensor.md
---

# PSF 反馈传感器

## 产品介绍
在长时间连续同步打印且未进行工具更换的情况下，挤出机与齿轮步进电机之间的对齐状态会逐渐发生偏移。这种不匹配会不断累积，并可能因丢步或挤出速率不理想而导致打印瑕疵。比例同步反馈传感器通过使用线性霍尔效应传感器（或类似器件）来解决这一问题，向 Happy-Hare 提供实时的模拟位置遥测数据，使其能够持续调整并微调后续齿轮步进电机的旋转距离（RD）。

<img src="/images/psf-feedback-sensor--df6ecb8a9651fa25.png"
     width="800" />

     
本产品是基于 [**Stumpy_PSF_Sensor**](https://github.com/ningpj/Stumpy_PSF_Sensor/tree/main) 设计改进的版本

官方链接：https://github.com/ningpj/Stumpy_PSF_Sensor/tree/main

## 兼容打印机

"Stumpy" PSF 需要与 Happy-Hare Flowguard 集成支持的比例反馈传感器（Proportional Feedback Sensors）配合使用（3.4.2 或更高版本）。有关比例传感器的设置、配置和使用说明，请参阅 https://github.com/moggieuk/Happy-Hare/wiki/Synchronized-Gear-Extruder2。


:::warning

 设备无关等。

:::

  
## 物料清单（BOM）

| 项目 | 规格 | 数量 |
| - | - | - |
|3D 打印组装套件 |3D 打印组装套件 | 1|
|PSF 电路板 | |1 |
| 弹簧| 0.4 mm × 6 mm × 25 mm|1 |
| 磁铁|D4 mm × 15 mm | 1|
|线缆 | |1 |
| ECAS04| | 2|
| 自攻螺丝| M2×6 mm SHCS|2 |
|PTFE | | 1|
| 工具| 1.5mm| 1|
|连接器外壳 |当连接线缆不兼容时使用 |1 |
|PSF 传感器套件用户手册 | |1 |


## 组装步骤

1. 组装 3D 打印部件‑ECAS04

![](/images/psf-feedback-sensor--b53c6633c779b87e.png)

2. 将 3D 打印组件与 PCB 组装

![](/images/psf-feedback-sensor--74ee72523a9d29eb.png)

3. 如图所示，将 3D 打印部件组装到 ECAS04 上

![](/images/psf-feedback-sensor--9004933c78aeab4d.png)

4. 组装磁铁。其安装方向不重要，参数可通过软件进行调节

![](/images/psf-feedback-sensor--97011986c13315f2.png)

5. 如图所示组装 3D 打印部件。

![](/images/psf-feedback-sensor--4ef93c7bb7a0dc24.png)

6. 安装弹簧和 PTFE 管。将 PTFE 管穿过弹簧并连接到 ECAS04。

![](/images/psf-feedback-sensor--f6bb0c739af8ca27.png)

7. 装上盖板，然后拧紧 M2×6 螺丝。

![](/images/psf-feedback-sensor--1d7db30fd9dd3133.png)

8. 安装前，请确认滑块在其整个行程范围内移动顺畅。

9. 接线。

    9.1. 带有白色 "PSF" 标记的连接线缆连接到 PSF 反馈传感器。

   ![](/images/psf-feedback-sensor--ba792b999e36019a.png)

    9.2. 另一端连接到您的 FDM 3D 打印机主板。黄色线为信号线；红色线为电源线（3.3 V 或 5 V 均可）；黑色线为接地线。

   ![](/images/psf-feedback-sensor--6728ea159c9f85bf.png)


## 使用步骤
### Happy Hare 安装
通过 SSH 登录树莓派后，使用以下命令安装 Happy Hare。

```cmd
cd ~
git clone https://github.com/moggieuk/Happy-Hare.git
cd ~/Happy-Hare
./install.sh -i
```

更多信息请参阅 https://github.com/moggieuk/Happy-Hare/wiki/Installation


### Happy-Hare 配置
修改 MMU_PARAMETERS.CFG 文件中的缓冲区范围。
```config
sync_feedback_buffer_range: 14.5 	# Travel in "buffer" between compression/tension or one sensor and end (see above)
sync_feedback_buffer_maxrange: 14.5 	# Absolute maximum end-to-end travel (mm) provided by buffer (see above)
```
确保包含以下参数
```config
sync_to_extruder: 1
sync_feedback_enabled: 1
```

在 MMU_HARDWARE.CFG 中，将 sync_feedback_analog_pin: mmu:&lt;ADC GPIO&gt; 设置为连接 "Stumpy" PSF 传感器的 MCU 上支持模拟输入的 GPIO 端口。如果您的 [mmu_sensor] 部分下未定义 sync_feedback_* 参数，请手动插入以下配置块，将 compression、tension 和 neutral_point 分别设置为 1、0 和 0.5。
```config
sync_feedback_analog_pin: mmu:<Your analog-capable GPIO> # The ADC pin where the proportional filament pressure sensor is installed
sync_feedback_analog_max_compression: 0.9964             # Raw sensor reading at max filament compression (buffer squeezed)
sync_feedback_analog_max_tension: 0.0046                 # Raw sensor reading at max filament tension (buffer expanded)
sync_feedback_analog_neutral_point: 0.5005               # Sensor neutral point (tunable to apply positive tension on the filament to unburden the Bowden and extruder)
```
对于 Happy Hare，推荐使用 CHAMELEON_X5 控制板；更多详情请参阅 https://github.com/FYSETC/CHAMELEON_X5。

### 校准
Happy-Hare 提供校准命令 MMU_CALIBRATE_PSENSOR，可自动校准三个 ADC 的值。运行此命令前，需要将耗材加载到工具头中。

```cmd
$ MMU_CALIBRATE_PSENSOR
...
// Calibration Results:
// As wired the recommended setting (in mmu_hardware.cfg) is:
// [mmu_sensors]
// sync_feedback_analog_max_compression: 0.0023
// sync_feedback_analog_max_tension:     0.9979
// sync_feedback_analog_neutral_point:   0.5001
// After updating, restart klipper
...
```

Happy-Hare 提供命令 MMU_QUERY_PSENSOR，用于获取当前原始 ADC 值。可用于判断接线是否正确。
```cmd
$ MMU_QUERY_PSENSOR
echo: PSENSOR Enabled: True  Value: -1.0  Raw Value: 0.997
```

## 组装视频

您可以观看 [组装视频](https://www.youtube.com/watch?v=cagph1cLVpE)。

<iframe width="900" height="500" src="https://www.youtube.com/embed/cagph1cLVpE" title="How to Assemble the PSF Sensor Kit" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

视频教程链接：https://www.youtube.com/watch?v=cagph1cLVpE

您也可以扫描二维码查看。

![](/images/psf-feedback-sensor--c2d4645a4511e377.png)


## 注意事项

请注意传感器的端子接线定义；不要将控制板上的 VCC 和 GND 连接接反。


## 常见问题

1. 问：如何验证传感器接线是否正确？
   答：使用 MMU_QUERY_PSENSOR 获取当前原始 ADC 值。

## 附件


## 商店

-  [Aliexpress](https://www.aliexpress.com/item/1005013028850698.html)。
  

## 技术支持

Discord 服务器：https://discord.gg/RXuwedUkB9

Facebook 群组：https://www.facebook.com/groups/197476557529090/

技术支持邮箱： support@fysetc.com

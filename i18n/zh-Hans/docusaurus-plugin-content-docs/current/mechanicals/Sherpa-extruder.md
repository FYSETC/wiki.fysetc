---
id: Sherpa-extruder
title: Sherpa-extruder
slug: /Sherpa-extruder
sidebar_position: 10
description: FYSETC 制造的 Sherpa 系列挤出机，由 Annex Engineering 设计
source_file: Sherpa-extruder.md
source_language: en
---

# FYSETC-Annex-Engineering-Sherpa

由 Annex Engineering 设计的 Sherpa 系列挤出机的 FYSETC 制造信息

## Sherpa mini

### 1. 项目来源

你可以在[这里](https://github.com/Annex-Engineering/Sherpa_Mini-Extruder)找到原始项目。

### 2. 应用

如果你能为你的打印机设计挤出机支架，它可以应用于几乎任何 FDM/FFF 3D 打印机。你可以在下面的机器上找到已知的应用。

CR-10, CR10S, CR-10 4S, CR-10 5S, CR-10 MINI, CR-20, ENDER-2,ENDER-3, ENDER-3 PRO, ENDER-3 V2，VORON，Gasherbrum K3

### 3. 通用规格

除以下规格外，每个版本的更多规格请查看 `4. 版本` 部分。

| 参数              | 规格    |
| ----------------------- | ----------------- |
| 外壳颜色           | 黑色             |
| 外壳成型工艺 | SLS               |
| 外壳材料        | PA                |
| 重量                  | 约 136g        |
| 电机线缆             | PTFE，1.2m 长度 |

### 4. 版本

查看我们下面的制造版本。

#### Rev 1.0

...

#### Rev 1.1

步进电机：10 齿步进电机，[G36HSY4407-6D-1200A](https://github.com/FYSETC/FYSETC-MOTORS/tree/main/G36HSY4407-6D-1200A)

减速比：5:1

与 Rev 1.0 相比的优势：

1. 专用大扭矩 36 步进电机

2. PTFE 电机线缆

#### Rev 1.5

步进电机：8 齿步进电机，[G36HSY4405-6D-1200A](https://github.com/FYSETC/FYSETC-MOTORS/tree/main/G36HSY4405-6D-1200A)

减速比：6.25:1

与 Rev 1.1 相比的优势：

1. 8t 电机，扭矩增加 25%

2. 全新 CNC 镂空 POM [50t 齿轮](https://github.com/Annex-Engineering/Sherpa_Mini-Extruder/blob/master/STLs/FDM_STLs/optional_parts/printable_sherpa_mini_gear_50t_sl_x1_rev1.stl)，强度更高，更精确

3. 隔离齿轮定位，无缝安装，更精确，请查看下面的蓝色部分。
   
   ![](/images/isolation.png)

### 5. 改装

我们针对不同的机器应用场景制作了一些改装。

[Sherpa Mini Extruder master holder for CR10 Ender3 by FYSETC_Ltd - Thingiverse](https://www.thingiverse.com/thing:4807684)

### 6. 注意事项

你需要更改你的 E 步进电机 AXIS_STEPS_PER_UNIT 参数。以 Ender3 为例，使用我们的 Sherpa mini rev1.5 时，你需要将 AXIS_STEPS_PER_UNIT 设置为 870。如何更改？

Marlin - Ender3

方法 1：在固件上更改参数

```
#define DEFAULT_AXIS_STEPS_PER_UNIT   { 80, 80, 400, 870 }
```

方法 2：发送 Gcode 进行更改

```
M92 E870
M500
```

对于某些打印机，你可能需要调整步进电机 E 电流以防止步进电机过热。以 Ender3 为例，我们建议将其设置为 0.35A。

### 7. 购买渠道

## 技术支持

请将任何技术问题提交到我们的[论坛](http://forum.fysetc.com/)，[github](https://github.com/FYSETC/FYSETC-Annex-Engineering-Sherpa/issues)，[facebook](https://www.facebook.com/groups/197476557529090)，discord

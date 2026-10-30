---
id: How_to_Configure_TMC2130_on_FYSETC-F6-Board
title: 如何在FYSETC-F6板上配置TMC2208
slug: /How_to_Configure_TMC2130_on_FYSETC-F6-Board
sidebar_position: 50
description: 如果您想将2130用作步进电机驱动器，请按照configuration_adv.h中所示启用它
source_file: How_to_Configure_TMC2130_on_FYSETC-F6-Board.md
source_language: en
---

# 配置 TMC2130

## 步骤1


如果您想使用 2130 作为步进驱动器，请在 configuration_adv.h 中按如下所示启用它

![con-2130-1](/images/con-2130-1.png)

## 步骤2


然后选择您使用 TMC2130 步进电机的轴

例如，如果您只在 x 轴上使用 TMC2130，则启用

```cpp
#define X_IS_TMC2130
```

如果您有 y 轴，则

```cpp
#define X_IS_TMC2130
#define Y_IS_TMC2130
```

以此类推。

![con-2130-2](/images/con-2130-2.png)

## 步骤3

如果您想监控 TMC2130，请取消注释 MONITOR_DRIVER_STATUS 定义

![con-2130-3](/images/con-2130-3.png)

## 技术支持

请将任何技术问题提交到我们的[论坛](http://forum.fysetc.com/)

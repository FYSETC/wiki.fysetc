---
id: PT100_STICK
title: PT100 Stick
slug: /PT100_STICK
sidebar_position: 10
description: FYSETC-PT100Stick 是一款 Pololu 外形尺寸的 MAX31865 转接板，适用于 FYSETC S6/Spider 及类似的 32 位 3D 打印机控制板。它基于 VORON PT100Stick。
source_file: PT100_STICK.md
source_language: en
---

# FYSETC-PT100Stick

FYSETC-PT100Stick 是一款采用 Pololu 外形尺寸的 MAX31865 转接板，适用于 FYSETC S6/Spider 及类似的 32 位 3D 打印机控制板。它基于 VORON [PT100Stick](https://github.com/VoronDesign/Voron-Hardware/tree/master/PT100Stick)。

<img src="/images/PT100_STICK%20V1.0.png" alt="PT100_STICK V1.0" style="zoom:50%;" />

## 1. 如何使用

### 1.1 设置跳线

![1574477946366](/images/jumpers.png)

然后将其插入插座。

![](/images/insertion.jpg)

### 1.2 固件设置

#### 1.2.1 Klipper 固件

1. SSH 登录到你的 `RaspberryPi`，使用 `nano` 编辑你的 `printer.cfg` 文件。

2. 删除 [extruder] 下所有旧的熱敏电阻配置。（sensor_type、sensor_pin 等）

3. 在 [extruder] 下添加以下行：

   ```
   sensor_type: MAX31865
   sensor_pin: PD11 # 我插入 Spider E4-MOT 插座，`cs` 引脚即为传感器引脚
   spi_speed: 4000000
   spi_software_sclk_pin: PE12
   spi_software_mosi_pin: PE14
   spi_software_miso_pin: PE13
   rtd_nominal_r: 100
   rtd_reference_r: 430
   rtd_num_of_wires: 2 # 根据你的 PT100 传感器的线数进行修改，如 `3` 或 `4`。
   ```

4. 如果你在欧盟或任何 50 Hz 国家，请添加此行：`rtd_use_50Hz_filter: True`

5. 按 CTRL+X、Y、[ENTER] 保存更改。在 Octoprint 控制台发送 FIRMWARE_RESTART 并测试！应该可以正常工作。

6. 运行 PID 调谐。PT100 的读数将与你之前的熱敏电阻不同。为了获得最佳的热精度，请按以下步骤进行 PID 调谐：

   ```
   1. 将热床加热至 100C。
   2. 将热端移动到中心，并位于热床上方 5-10 mm 处
   3. 将风扇设置为 25%："M106 S64"
   4. 运行："PID_CALIBRATE HEATER=extruder TARGET=245"
   5. 这将运行几分钟。完成后，使用："SAVE_CONFIG" 保存
   ```

#### 1.2.2 Marlin 固件

##### 步骤 1：修改引脚文件

在 `pins_FYSETC_SPIDER.h` 的 `#endif` 行之前添加以下行。

```
#define Thermo_SCK_PIN           PE12//SCK
#define Thermo_do_PIN            PE13//MISO
#define Thermo_CS1_PIN           PD11//CS1 E4_CS_PIN
#define Thermo_CS2_PIN           -1//CS2
#define MAX31865_MOSI_PIN        PE14

#define MAX6675_SS_PIN           Thermo_CS1_PIN
#define MAX6675_SS2_PIN          Thermo_CS2_PIN
#define MAX6675_SCK_PIN          Thermo_SCK_PIN
#define MAX6675_DO_PIN           Thermo_do_PIN  
```

如果你将 `PT100Stick` 插入其他步进驱动器插座，你需要将 `Thermo_CS1_PIN` 修改为相应的 `cs`。

| CS        | 引脚  |
| --------- | ---- |
| X-CS/PDN  | PE7  |
| Y-CS/PDN  | PE15 |
| Z-CS/PDN  | PD10 |
| E0-CS/PDN | PD7  |
| E1-CS/PDN | PC14 |
| E2-CS/PDN | PC15 |
| E3-CS/PDN | PA15 |
| E4-CS/PDN | PD11 |

##### 步骤 2：修改 `configuration.h` 文件

```
#define TEMP_SENSOR_0 -5
```

```
#define MAX31865_SENSOR_OHMS_0      100   // (Ω) 通常为 100 或 1000（PT100 或 PT1000）
#define MAX31865_CALIBRATION_OHMS_0 430   // (Ω) 通常为 430（用于 AdaFruit PT100）；4300（用于 AdaFruit PT1000）
```

## 2. 故障排除

- ADC_OUT_OF_RANGE
  - 如果你从未获得读数；请检查你的接线。
  - 如果一段时间后出现此错误；首先尝试添加一个电容（下文有说明），如果无效，请尝试使用屏蔽线或 3 线传感器。
- 欠压与过压
  - 可能是接线问题，检查接线，如有可能更换为更粗的线。
  - 可能是软件 SPI 问题，尝试使用 Pi MCU（下文有说明）进行故障排除。
  - 可能是电气噪声问题，尝试添加一个电容（下文有说明）。
  - 如果都无效，请尝试使用屏蔽线或 3 线传感器。
- RTD_INPUT_DISCONNECTED
  - 接线问题，检查你的线缆。

## 3. 相关文档

https://docs.vorondesign.com/community/electronics/xbst_/PT100.html

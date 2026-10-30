---
id: How_to_Configure_TMC2208_on_FYSETC-F6-Board
title: 如何在FYSETC-F6板上配置TMC2208
slug: /How_to_Configure_TMC2208_on_FYSETC-F6-Board
sidebar_position: 40
description: 对于FYSETC F6主板，我们上传了一个仅适用于F6主板的TMC2208步进电机库，您可以在这里找到：https://github.com/FYSETC/TMC2208Stepper。下载该库并复制TMC2208 Stepper文件夹…
source_file: How_to_Configure_TMC2208_on_FYSETC-F6-Board.md
source_language: en
---

# 配置 TMC2208

## 步骤1：下载 TMC2208 步进电机库


对于 FYSETC F6 主板，我们上传了一个仅适用于 F6 主板的 TMC2208 步进电机库，您可以在这里找到：https://github.com/FYSETC/TMC2208Stepper。下载该库并将 TMC2208 Stepper 文件夹复制到您的 Arduino 软件库目录中（通常是：C:\Program Files (x86)\arduino-1.8.5\libraries）。

## 步骤2：修改 Marlin 固件 TMC2208 部分代码


打开 stepper_indirection.cpp 文件，按如下所示进行修改。

```c++
//#define _TMC2208_DEFINE_SOFTWARE(ST) SoftwareSerial stepper##ST##_serial = SoftwareSerial(ST##_SERIAL_RX_PIN, ST##_SERIAL_TX_PIN); \
//TMC2208Stepper stepper##ST(&stepper##ST##_serial, ST##_SERIAL_RX_PIN > -1)

#define _TMC2208_DEFINE_SOFTWARE(ST) SoftwareSerial stepper##ST##_serial = SoftwareSerial(ST##_SERIAL_RX_PIN, ST##_SERIAL_TX_PIN); \
TMC2208Stepper stepper##ST(&stepper##ST##_serial, false)
```

只需注释掉旧的宏定义，并将其更改为新增的宏定义。

然后在 tmc2208_init 函数中添加以下两行，

```c++
st.beginSerial(115200);   // Start software serial
st.push();             	  // Reset registers ，default: Use PDN/UART pin for communication
```

该函数变为：

```c++
// Use internal reference voltage for current calculations. This is the default.
  // Following values from Trinamic's spreadsheet with values for a NEMA17 (42BYGHW609)
  void tmc2208_init(TMC2208Stepper &st, const uint16_t microsteps, const uint32_t thrs, const float spmm) {
    st.beginSerial(115200); // Start software serial
  	st.push();             	// Reset registers ，default: Use PDN/UART pin for communication
  	
    st.pdn_disable(true); // Use UART
    st.mstep_reg_select(true); // Select microsteps with UART
    st.I_scale_analog(false);
    st.rms_current(st.getCurrent(), HOLD_MULTIPLIER, R_SENSE);
    st.microsteps(microsteps);
    st.blank_time(24);
    st.toff(5);
    st.intpol(INTERPOLATE);
    st.TPOWERDOWN(128); // ~2s until driver lowers to hold current
    st.hysterisis_start(3);
    st.hysterisis_end(2);
    #if ENABLED(STEALTHCHOP)
      st.pwm_lim(12);
      st.pwm_reg(8);
      st.pwm_autograd(1);
      st.pwm_autoscale(1);
      st.pwm_freq(1);
      st.pwm_grad(14);
      st.pwm_ofs(36);
      st.en_spreadCycle(false);
      #if ENABLED(HYBRID_THRESHOLD)
        st.TPWMTHRS(12650000UL*microsteps/(256*thrs*spmm));
      #else
        UNUSED(thrs);
        UNUSED(spmm);
      #endif
    #else
      st.en_spreadCycle(true);
    #endif
    st.GSTAT(0b111); // Clear
    delay(200);
  }
```

 

## 步骤3：修改 Configuration_adv.h 文件中的配置


取消注释 TMC2208 配置，并选择您的 3D 打印机所拥有的轴，例如我们的测试机器，我们将这样操作：

```c++
/**
 * Enable this for SilentStepStick Trinamic TMC2208 UART-configurable stepper drivers.
 * Connect #_SERIAL_TX_PIN to the driver side PDN_UART pin.
 * To use the reading capabilities, also connect #_SERIAL_RX_PIN
 * to #_SERIAL_TX_PIN with a 1K resistor.
 * The drivers can also be used with hardware serial.
 *
 * You'll also need the TMC2208Stepper Arduino library
 * (https://github.com/teemuatlut/TMC2208Stepper).
 */
#define HAVE_TMC2208

#if ENABLED(HAVE_TMC2130) || ENABLED(HAVE_TMC2208)

  // CHOOSE YOUR MOTORS HERE, THIS IS MANDATORY
  //#define X_IS_TMC2130
  //#define X2_IS_TMC2130
  //#define Y_IS_TMC2130
  //#define Y2_IS_TMC2130
  //#define Z_IS_TMC2130
  //#define Z2_IS_TMC2130
  //#define E0_IS_TMC2130
  //#define E1_IS_TMC2130
  //#define E2_IS_TMC2130
  //#define E3_IS_TMC2130
  //#define E4_IS_TMC2130

  #define X_IS_TMC2208
  //#define X2_IS_TMC2208
  #define Y_IS_TMC2208
  //#define Y2_IS_TMC2208
  #define Z_IS_TMC2208
  //#define Z2_IS_TMC2208
  #define E0_IS_TMC2208
  //#define E1_IS_TMC2208
  //#define E2_IS_TMC2208
  //#define E3_IS_TMC2208
  //#define E4_IS_TMC2208
```

因为我们的测试机器有 X、Y、Z 和 E0 轴。

## 技术支持

请将任何技术问题提交到我们的[论坛](http://forum.fysetc.com/)

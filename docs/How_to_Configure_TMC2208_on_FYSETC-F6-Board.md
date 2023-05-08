# Configure TMC2208

## Step1:Download TMC2208 Stepper Library
---

For FYSETC F6 boards , we upload a F6-board-only TMC2208 stepper library , you can find it here : https://github.com/FYSETC/TMC2208Stepper. Download the library and  copy the TMC2208 Stepper folder to your Arduino software library to the Arduino library directory (mostly:C:\Program Files (x86)\arduino-1.8.5\libraries ).

## Step2:Modify Marlin Firmware TMC2208 Part Code
---

Open stepper_indirection.cpp file , modify it as below shows.

```c++
//#define _TMC2208_DEFINE_SOFTWARE(ST) SoftwareSerial stepper##ST##_serial = SoftwareSerial(ST##_SERIAL_RX_PIN, ST##_SERIAL_TX_PIN); \
//TMC2208Stepper stepper##ST(&stepper##ST##_serial, ST##_SERIAL_RX_PIN > -1)

#define _TMC2208_DEFINE_SOFTWARE(ST) SoftwareSerial stepper##ST##_serial = SoftwareSerial(ST##_SERIAL_RX_PIN, ST##_SERIAL_TX_PIN); \
TMC2208Stepper stepper##ST(&stepper##ST##_serial, false)
```

Just comment the old defines and change it to the added defines.

And then add below two lines to tmc2208_init function,

```c++
st.beginSerial(115200);   // Start software serial
st.push();             	  // Reset registers ，default: Use PDN/UART pin for communication
```

and the function become:

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

 

## Step3:Change the Configuration in Configuration_adv.h File
---

Uncomment the TMC2208 configuration and choose the axis that your 3d printer have, like our test machine we will do like this:

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

As our test machine have X, Y, Z and E0 axis.

## Tech Support

---
Please submit any technical issue into our [forum](http://forum.fysetc.com/) 

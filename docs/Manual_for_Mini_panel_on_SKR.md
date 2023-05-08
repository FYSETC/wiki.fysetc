##### Manual for Fysetc Mini panel 12864 V2.1 (Neopixel) in combination with BIGTREETECH SKR V1.3 

##### by Jupa Creations

If you use or select an other version we do not guarantee this manual to work.
https://wiki.fysetc.com/Mini12864_Panel/

For correct working as described in this manual you have to use the Marlin 2.0 Github version from 25-5-2019 or later.
Download the latest version if your not certain about your version currently used.
https://github.com/MarlinFirmware/Marlin/tree/bugfix-2.0.x
We expect you to know how to rework Marlin and upload firmware changes to the board. If you have no knowledge first source this information to get this done in a proper way.
Open the Marlin directory and open the “configuration.h” file In the section "LCD / Controller Selection (Graphical LCDs)" look for:

```c++
// FYSETC variant of the MINI12864 graphic controller with SD support
// https://wiki.fysetc.com/Mini12864_Panel/?fbclid=IwAR1FyjuNdVOOy9_xzky3qqo_WeM5h-4gpRnnWhQr_O1Ef3h0AFnFXmCehK8
//
//#define FYSETC_MINI_12864_1_2 // Type C/D/E/F. Simple RGB Backlight (always on)
//#define FYSETC_MINI_12864_2_0 // Type A/B. Discreet RGB Backlight
//#define FYSETC_MINI_12864_2_1 // Type A/B. Neopixel RGB Backlight
```
Change to 
```c++
// FYSETC variant of the MINI12864 graphic controller with SD support
// https://wiki.fysetc.com/Mini12864_Panel/?fbclid=IwAR1FyjuNdVOOy9_xzky3qqo_WeM5h-4gpRnnWhQr_O1Ef3h0AFnFXmCehK8
//
//#define FYSETC_MINI_12864_1_2 // Type C/D/E/F. Simple RGB Backlight (always on)
//#define FYSETC_MINI_12864_2_0 // Type A/B. Discreet RGB Backlight
#define FYSETC_MINI_12864_2_1 // Type A/B. Neopixel RGB Backlight
```
In the section "Extra Features" look for:
```c++
// Support for Adafruit Neopixel LED driver
//#define NEOPIXEL_LED
#if ENABLED(NEOPIXEL_LED)
#define NEOPIXEL_TYPE NEO_GRBW // NEO_GRBW / NEO_GRB - four/three channel driver type (defined in Adafruit_NeoPixel.h)
#define NEOPIXEL_PIN 4 // LED driving pin
#define NEOPIXEL_PIXELS 30 // Number of LEDs in the strip
#define NEOPIXEL_IS_SEQUENTIAL // Sequential display for temperature change - LED by LED. Disable to change all LEDs at once.
#define NEOPIXEL_BRIGHTNESS 127 // Initial brightness (0-255)
//#define NEOPIXEL_STARTUP_TEST // Cycle through colors at startup
// Use a single Neopixel LED for static (background) lighting
//#define NEOPIXEL_BKGD_LED_INDEX 0 // Index of the LED to use
//#define NEOPIXEL_BKGD_COLOR { 255, 255, 255, 0 } // R, G, B, W
#endif
```
Change to
```c++
// Support for Adafruit Neopixel LED driver
#define NEOPIXEL_LED
#if ENABLED(NEOPIXEL_LED)
#define NEOPIXEL_TYPE NEO_GRBW // NEO_GRBW / NEO_GRB - four/three channel driver type (defined in Adafruit_NeoPixel.h)
//#define NEOPIXEL_PIN 4 // LED driving pin
//#define NEOPIXEL_PIXELS 30 // Number of LEDs in the strip
//#define NEOPIXEL_IS_SEQUENTIAL // Sequential display for temperature change - LED by LED. Disable to change all LEDs at once.
//#define NEOPIXEL_BRIGHTNESS 127 // Initial brightness (0-255)
#define NEOPIXEL_STARTUP_TEST // Cycle through colors at startup
// Use a single Neopixel LED for static (background) lighting
// #define NEOPIXEL_BKGD_LED_INDEX 0 // Index of the LED to use - Do not 
```
change this setting
```c++
//#define NEOPIXEL_BKGD_COLOR { 255, 255, 255, 0 } // R, G, B, W - We have set green background color as standard
#endif
```
Change to
```c++
// Use a single Neopixel LED for static (background) lighting
#define NEOPIXEL_BKGD_LED_INDEX 0 // Index of the LED to use - Do not change this setting
#define NEOPIXEL_BKGD_COLOR { 0, 255, 0, 0 } // R, G, B, W - We have set green background color as standard
#endif
```
To get the display to work you need to reverse one side of the connectors. Easiest option is to lift both black plastic ribbon cable holders with the keyed slot on the rear side of the display with a small screwdriver upwards by wiggling and lifting slowly at both sides. Once the holder is off turn it 180 degrees and relocate by carefully pressing downwards. Do this for Exp1 and Exp2.
Enjoy the new display and functions.
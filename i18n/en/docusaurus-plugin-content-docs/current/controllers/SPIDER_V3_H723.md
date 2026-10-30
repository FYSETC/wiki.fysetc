---
id: SPIDER_V3_H7
title: SPIDER_V3_H723
slug: /SPIDER_V3_H7
sidebar_position: 40
source_file: SPIDER_V3_H723.md
source_language: en
helplook_source: Controllers/SPIDER_V3_H723.md
---

## 1. Introduction

![Spider V3 H7](/images/spider-v3-h7--overview-01.png)

# Spider V3.0 H7

The Fysetc Spider V3.0 H7 is a high-end 3D printer controller board aimed primarily at custom printers such as Voron builds, CoreXY machines, and heavily modified printers running Klipper. It's essentially an upgraded version of the earlier Spider V3.0 F446, with a much faster MCU and improved high-voltage motor support.

### Features vs F446 version
- STM32H723VGT6 @ 550Mhz
- Independent Motor Power input, 60V Peak (removed one MOSFET ouptut)
- Voltage Selector on every Driver
- 120uF/63V Capacitor for Motor Driver
- DotStar RGB Support

## 2. Features

| Feature              | Spider V3.0 H7                               |
| -------------------- | -------------------------------------------- |
| MCU                  | STM32H723VGT6                                |
| CPU Speed            | 550 MHz                                      |
| Stepper Driver Slots | 8                                            |
| Firmware Support     | Klipper, Marlin, RepRap Firmware             |
| USB                  | USB-C                                        |
| CAN Bus              | Built-in transceiver                         |
| Motor Voltage        | Selectable 24V / 48V                         |
| Peak Motor Input     | Up to 60V                                    |
| RGB Support          | DotStar LEDs                                 |
| Form Factor          | Same general layout as earlier Spider boards |

### 2.1 Whats Included

![](/images/spider-v3-h7--whats-included.png)

- FYSETC Spider V3 H7 Board
- 2 x 5 Double DuPont Cable
- 30 x Jumper Caps
- USB Type C - USB A Cable

##  3. Hardware Guide

### 3.1 GPIO and Pin Assignments

![](/images/spider-v3-h7--gpio-and-pin-assignments.png)


:::info

Image created by hdragoon - https://github.com/hdragoon

:::

### 3.2 Pin Definition

#### 3.2.1 Spider v3.x H7

<table cellpadding="0" border="1" >
   <tr><td>Features</td><td>Spider Pin</td><td>STM32 Pin</td><td>Pin No.</td><td>Comment</td></tr>
   <tr><td rowspan="4">X-MOTOR(1)</td><td>X-Step</td><td>PE11</td><td>42</td><td></td></tr>
   <tr><td>X-DIR</td><td>PE10</td><td>41</td><td></td></tr>
   <tr><td>X-EN</td><td>PE9</td><td>40</td><td></td></tr>
   <tr><td>X-CS/PDN</td><td>PE7</td><td>38</td><td></td></tr>
   <tr><td rowspan="4">Y-MOTOR(2)</td><td>Y-Step</td><td>PD8</td><td>55</td><td></td></tr>
   <tr><td>Y-DIR</td><td>PB12</td><td>51</td><td></td></tr>
   <tr><td>Y-EN</td><td>PD9</td><td>56</td><td></td></tr>
   <tr><td>Y-CS/PDN</td><td>PE15</td><td>46</td><td></td></tr>
   <tr><td rowspan="4">Z-MOTOR(3)</td><td>Z-Step</td><td>PD14</td><td>61</td><td></td></tr>
   <tr><td>Z-DIR</td><td>PD13</td><td>60</td><td></td></tr>
   <tr><td>Z-EN</td><td>PD15</td><td>62</td><td></td></tr>
   <tr><td>Z-CS/PDN</td><td>PD10</td><td>57</td><td></td></tr>
   <tr><td rowspan="4">E0-MOTOR(4)</td><td>E0-Step</td><td>PD5</td><td>86</td><td></td></tr>
   <tr><td>E0-DIR</td><td>PD6</td><td>87</td><td></td></tr>
   <tr><td>E0-EN</td><td>PD4</td><td>85</td><td></td></tr>
   <tr><td>E0-CS/PDN</td><td>PD7</td><td>88</td><td></td></tr>
   <tr><td rowspan="4">E1-MOTOR(5)</td><td>E1-Step</td><td>PE6</td><td>5</td><td></td></tr>
   <tr><td>E1-DIR</td><td>PC13</td><td>7</td><td></td></tr>
   <tr><td>E1-EN</td><td>PE5</td><td>4</td><td></td></tr>
   <tr><td>E1-CS/PDN</td><td>PC14</td><td>8</td><td></td></tr>
   <tr><td rowspan="4">E2-MOTOR(6)</td><td>E2-Step</td><td>PE2</td><td>1</td><td></td></tr>
   <tr><td>E2-DIR</td><td>PE4</td><td>3</td><td></td></tr>
   <tr><td>E2-EN</td><td>PE3</td><td>2</td><td></td></tr>
   <tr><td>E2-CS/PDN</td><td>PC15</td><td>9</td><td></td></tr>
   <tr><td rowspan="4">E3-MOTOR(7)</td><td>E3-Step</td><td>PD12</td><td>39</td><td></td></tr>
   <tr><td>E3-DIR</td><td>PC4</td><td>33</td><td></td></tr>
   <tr><td>E3-EN</td><td>PE8</td><td>59</td><td></td></tr>
   <tr><td>E3-CS/PDN</td><td>PA15</td><td>77</td><td></td></tr>
   <tr><td rowspan="4">E4-MOTOR(8)</td><td>E4-Step</td><td>PE1</td><td>34</td><td></td></tr>
   <tr><td>E4-DIR</td><td>PE0</td><td>97</td><td></td></tr>
   <tr><td>E4-EN</td><td>PC5</td><td>98</td><td></td></tr>
   <tr><td>E4-CS/PDN</td><td>PD11</td><td>58</td><td></td></tr>
   <tr><td rowspan="3">TMC Driver SPI (SPI4)</td><td>MOSI</td><td>PE14</td><td>45</td><td></td></tr>
   <tr><td>MISO</td><td>PE13</td><td>44</td><td></td></tr>
   <tr><td>SCK</td><td>PE12</td><td>43</td><td></td></tr>
   <tr><td rowspan="6">End-stops</td><td>X-MIN</td><td>PB14</td><td>53</td><td>Share with X-DIAG</td></tr>
   <tr><td>X-MAX</td><td>PA1</td><td>24</td><td>Share with E0-DIAG</td></tr>
   <tr><td>Y-MIN</td><td>PB13</td><td>52</td><td>Share with Y-DIAG</td></tr>
   <tr><td>Y-MAX</td><td>PA2</td><td>25</td><td>Share with E1-DIAG</td></tr>
   <tr><td>Z-MIN</td><td>PA0</td><td>23</td><td>Share with Z-DIAG</td></tr>
   <tr><td>Z-MAX(Probe)</td><td>PA3</td><td>26</td><td>Share with E2-DIAG</td></tr>
   <tr><td rowspan="7">FAN/RGB</td><td>FAN0</td><td>PA13</td><td>72</td><td></td></tr>
   <tr><td>FAN1</td><td>PA14</td><td>76</td><td></td></tr>
   <tr><td>FAN2</td><td>PB2/BOOT1</td><td>37</td><td></td></tr>
   <tr><td>LED-R</td><td>PB6</td><td>92</td><td>Can be used for fan3</td></tr>
   <tr><td>LED-G</td><td>PB5</td><td>91</td><td>Can be used for fan4</td></tr>
   <tr><td>LED-B</td><td>PB7</td><td>93</td><td>Can be used for fan5</td></tr>
   <tr><td>5V-LED(WS2812)</td><td>PD3</td><td>84</td><td>Share with flash indicator(Bootloader)</td></tr>
   <tr><td rowspan="4">Heating</td><td>E0-Heater</td><td>PB15</td><td>54</td><td></td></tr>
   <tr><td>E1-Heater</td><td>PC8</td><td>65</td><td></td></tr>
   <tr><td>E2-Heater</td><td>PB3</td><td>89</td><td></td></tr>
   <tr><td>Heated-Bed</td><td>PB4</td><td>90</td><td></td></tr>
   <tr><td rowspan="6">Temperature</td><td>TE0（THERM0）</td><td>PC0</td><td>15</td><td>A 4.7kOhm 0.1% temperature sensor pull up resistor is used,PT1000 can be connected directly. For PT100, an amplifier board must be used.</td></tr>
   <tr><td>TE1（THERM1）</td><td>PC1</td><td>16</td><td>A 4.7kOhm 0.1% temperature sensor pull up resistor is used,PT1000 can be connected directly. For PT100, an amplifier board must be used.</td></tr>
   <tr><td>TE2（THERM2）</td><td>PC2</td><td>17</td><td>A 4.7kOhm 0.1% temperature sensor pull up resistor is used,PT1000 can be connected directly. For PT100, an amplifier board must be used.</td></tr>
   <tr><td>TE3（THERM3）</td><td>PC3</td><td>18</td><td>A 4.7kOhm 0.1% temperature sensor pull up resistor is used,PT1000 can be connected directly. For PT100, an amplifier board must be used.</td></tr>
   <tr><td>TE4（THERM4）</td><td>PB1</td><td>36</td><td>A 4.7kOhm 0.1% temperature sensor pull up resistor is used,PT1000 can be connected directly. For PT100, an amplifier board must be used.</td></tr>
   <tr><td>TB（THERM3）</td><td>PB0</td><td>35</td><td>A 4.7kOhm 0.1% temperature sensor pull up resistor is used,PT1000 can be connected directly. For PT100, an amplifier board must be used.</td></tr>
   <tr><td rowspan="8">EXP1</td><td>LCD_D7</td><td>PD1/CAN-TX1</td><td>82</td><td>Share with CAN-TX1</td></tr>
   <tr><td>LCD_D6</td><td>PD0/CAN-RX1</td><td>81</td><td>Share with CAN-RX1</td></tr>
   <tr><td>LCD_D5</td><td>PC12/MOSI3/TX5/SDA2</td><td>80</td><td></td></tr>
   <tr><td>LCD_D4</td><td>PC10/SCK3/TX3/4</td><td>78</td><td></td></tr>
   <tr><td>LCD_EN</td><td>PC11/MISO3/RX3/4</td><td>79</td><td></td></tr>
   <tr><td>LCD_RS</td><td>PD2/RX5</td><td>83</td><td></td></tr>
   <tr><td>ENC_C</td><td>PA8/SCL3</td><td>67</td><td></td></tr>
   <tr><td>BEEP</td><td>PC9/SDA3</td><td>66</td><td></td></tr>
   <tr><td rowspan="8">EXP2</td><td>RESET</td><td>NRST</td><td>14</td><td></td></tr>
   <tr><td>ENC_A</td><td>PC6/TX6</td><td>63</td><td></td></tr>
   <tr><td>ENC_B</td><td>PC7/RX6</td><td>64</td><td></td></tr>
   <tr><td>SD-DET</td><td>PB10/SCL2</td><td>47</td><td></td></tr>
   <tr><td>SD-MISO</td><td>PA6/MISO1</td><td>31</td><td></td></tr>
   <tr><td>SD-MOSI</td><td>PA7/MOSI1</td><td>32</td><td></td></tr>
   <tr><td>SCK</td><td>PA5/SCK1</td><td>30</td><td></td></tr>
   <tr><td>CS</td><td>PA4/CS1</td><td>29</td><td></td></tr>
   <tr><td rowspan="2">EEPROM(4K) I2C Pin-Out</td><td>SCL</td><td>PB8/SCL1</td><td>95</td><td>Connect to 24LC32(4K EEPROM)</td></tr>
   <tr><td>SDA</td><td>PB9/SDA1</td><td>96</td><td>Connect to 24LC32(4K EEPROM)</td></tr>
   <tr><td rowspan="2">Pi_PWR/UART</td><td>TX</td><td>PA9/TX1</td><td>68</td><td></td></tr>
   <tr><td>RX</td><td>PA10/RX1</td><td>69</td><td></td></tr>
   <tr><td rowspan="3">SWD Debug</td><td></td><td>PA13/SWDIO</td><td>72</td><td>only used for debugging now and can be used for other purposes.</td></tr>
   <tr><td></td><td>PA14/SWCLK</td><td>76</td><td>only used for debugging now and can be used for other purposes.</td></tr>
</table>

### 3.3 Wiring

#### 3.3.1 CAN

There is a permanent 120 ohm termination resistor soldered to the board, no need to add a jumper to enable it and also no ability to disable it.

The CAN port on the Spider V3.0 H7 is a 3 pin JST-XH header located here:

![](/images/spider-v3-h7--can-01.png)


## 4. Firmware Guide

#### DFU mode

To put the Spider V3.0 H7 into DFU mode, hold the BT0 button and while still holding press and release the RST button. Then count to 5 and release the BT0 button.

## 4.1 Klipper With No Bootloader

### 4.1.1 USB

![](/images/spider-v3-h7--usb.png)

### 4.1.2 CAN

![](/images/spider-v3-h7--can-02.png)

### 4.1.3 CAN Bridge

![](/images/spider-v3-h7--can-bridge.png)

## 4.2 Klipper With Katapult 

### 4.2.1 USB
#### Katapult

![](/images/spider-v3-h7--katapult.png)

#### Klipper

![](/images/spider-v3-h7--klipper-01.png)

### 4.2.3 CAN Bridge
#### Katapult

![](/images/spider-v3-h7--katapult.png)

#### Klipper

![](/images/spider-v3-h7--klipper-02.png)


## 4.3 RRF

Please refer to the docs provided by TeamGloomy for RepRap Firmware on the Spider V3.0 H7.
https://teamgloomy.github.io/fysetc_spider_h723_general_3_5.html

## 5. Where to buy

[Fysetc.com](https://www.fysetc.com/products/fysetc-spider-v3-0-h7-32-bit-motherboard?_pos=2&_sid=61a1c8d2e&_ss=r)

[AliExpress](https://www.aliexpress.com/item/1005007486598817.html)

## 6. Tech Support

You can find extra resouces in our github https://github.com/FYSETC/FYSETC-SPIDER-H7 Or submit any technical issues into our [Discord Server](https://discord.gg/CtENXn9N) 

## 7. Related Articles

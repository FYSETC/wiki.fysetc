---
id: Spider
title: SPIDER_V1-3_F446
slug: /Spider
sidebar_position: 30
description: SPIDER is a small but powerful 3D printer control board. In a limited space, it integrates 8 stepper motor drives, 5A 12V power supply, 8A 5V power supply, which provides powerful energy for fans of…
source_file: SPIDER_V1-3_F446.md
source_language: en
helplook_source: Controllers/SPIDER_V1-3_F446.md
---

## 1. 产品介绍

![](/images/Spider.png)

SPIDER 是一款小巧但功能强大的 3D 打印机控制板。在有限的空间内，它集成了 8 个步进电机驱动、5A 12V 电源、8A 5V 电源，为各种电压的风扇、各种 RGB 灯带以及树莓派提供强大的能量。
您可以通过 SPIDER 构建功能丰富的 3D 打印机。特别是对于 VORON V2.4，我们在设计初期就与 VORON 团队合作，许多特性已获得 VORON 团队的认可。如果您正在构建 VORON，这将是您的最佳选择。

### 1.1 变更日志

#### 1.1.1 Spider v1.1

- 为 BL-Touch 增加 5pin 连接器

![image-20210713103906622](/images/v1.1_change0.png)

- 交换 EXP1 和 EXP2 标记（仅标记，非插座）

![image-20210713103825940](/images/v1.1_change1.png)

- 增加 +/- 标记

![image-20210713103934110](/images/v1.1_change2.png)

- 为树莓派 USB-A 供电端口增加空间
  
  您可以焊接下面的 USB 端口，然后就可以用 USB-A 线缆为 RPI 供电。这是 USB 供电端口，没有 USB 信号。

![](/images/v1.1_change3.jpg)

#### 1.1.2 Spider v2.x

V2.0 

1. 增加 48V stepstick 支持 x3 
2. 为每个 stepstick 插座增加 TVS 和泄放电阻 
3. 将 12V/5A 改为 SY8205 
4. 将树莓派 5V 和系统 5V 改为独立的 DC-DC 电路（每路 3A） 
5. 为 stepstick 增加独立的 3.3V 
6. 将 PCB 改为 6 层 
7. 优化部分布线。 
8. 将驱动电路的串联二极管改为 15A 保险丝（1808） 

V2.1 

1. 将 48V stepstick 支持改为 2 个 
2. 将 12V/5A 改为 12V/3A 
3. 将树莓派 5V（3A 改为 5A）和系统 5V（5A 改为 3A） 
4. 增加 RESET 1x2 排针 

V2.2 

1. 增加两个热敏电阻插座，共 6 个。 
2. 将 FAN0 改为 PA13，FAN1 改为 PA14
3. 在底部增加引脚定义丝印。

V2.3

1. 将 12v-24v RGB 端口布局改为 3 个风扇端口，可以更方便地用作风扇端口，同时仍保持 RGB 输出支持
2. 优化风扇控制电路，将缓冲芯片升级为独立三极管控制，增强稳定性并大幅提升安全性能
3. 所有电机驱动模块接口通信网络增加高压缓冲和电压钳位处理，为 MCU 增加屏蔽
4. 重新布局 PCB，连接器位置变更

#### 1.1.3 Spider v3.x

V3.0

1. 为所有步进电机驱动信号增加 74HCT365 缓冲器。所有电机驱动 IO 信号电压从 3.3V 改为 5V，驱动能力增强，外部驱动器连接更简单。
2. 增加板载 CAN 收发器，使主板能够直接与 CAN 设备通信，无需扩展板。
3. 增加 3.3V 电源指示灯，不同电源用不同颜色的 LED 指示，使主板上各电源的工作状态一目了然。
4. 主板已重新布局，所有标记均放置在顶层，方便用户查看引脚标记，也便于固件配置。
5. 通过开关将 STM32 的 BOOT0 和 RESET 引脚连接到 Pi 的 IO（默认断开），为通过 Pi 直接进入编程模式提供了基础。

## 2. 特性

- 紧凑尺寸：155.3mm x 76.5mm
- **基于 STM32F446 180Mhz，所有 IO 均可承受 5V 电压**
- **支持 8 个 TMC 步进驱动**，支持 Uart&SPI
- V2.2：增加两个 60V-Max 步进驱动插槽
- 再次改进 TMC 跳线设置，更简单更方便 
- V1.0&V1.1：最大 28V 输入，12V@5A DC-DC，**5V@8A DC-DC（特别适合树莓派）**，3.3V@0.8A LDO
- V2.2：最大 28V 输入，12V@3A DC-DC，5V@5A DC-DC 用于树莓派，5V@3A DC-DC 用于 mcu 和 RGB，两个 3.3V@0.8A LDO 用于 MCU 和电机
- 两个汽车保险丝用于热床输入和主电源输入
- 限位开关插座 24V/5V/3.3V 可选，为更多其他设备做好准备，如电感传感器、BL-Touch
- XH2.54 连接器
- 10 个 PWM 功率 mosfet 输出（1 个用于热床，3 个用于热端，3 个用于风扇，3 个用于 RGB LED 灯带）
- V1.0&V1.1：3pin 温度接头，可使用热敏电阻或热电偶（需要 AD597 模块）
- V2.2：最多支持 6 个温度传感器
- **最多 8 路 PWM 风扇**（仅使用 1 个挤出机且不使用 12V/24V RGB 时），2 路 RGB led（12V 和 24V 可选），**1 路 5V-RGB led（NEO-PIXEL/WS2812）**
- 板载 RepRapDiscount SmartController 兼容排针
- **UART1-树莓派排针（包括 5V@8A 电源）**
- 2X4 排针输出用于 SD 卡模块
- **板载 micro-SD 卡**
- **Type-C 和 Type-B USB 连接器可选**
- EXP1 和 EXP2 具有更多复用功能，如 USART、I2C、CAN
- 支持 SD 卡和 USB 上传
- 使用 4.7kOhm 0.1% 温度传感器上拉电阻，可直接连接 PT1000。对于 PT100，必须使用放大板。
- V2.2：增加更多保护（每个电机驱动器 TVS、限流电阻、VMOT 保险丝）

## 3. 硬件指南

### 3.1 Spider 接线

#### 3.1.1 Spider v1.0 接线

![](/images/Spider_v1.0_wiring.jpg)

#### 3.1.2 Spider v1.1 接线

![](/images/Spider_v1.1_wiring.jpg)

#### 3.1.3 Spider v2.2 接线

![](/images/Spider_v2.2_wiring.jpg)

48v 和 24v 连接器

![](/images/24_48.jpg)

##### Spider v2.2 用于 VORON 2.4 的接线

![](/images/VORON2.4_SPIDER_V22_WIRING.jpg)

##### Spider v2.2 用于 VORON Trident 的接线

![](/images/VORON_Trident_Spider_v22_Wiring.png)

##### Spider v2.2 Afterburner 工具头接线

![](/images/Spider_V2.2_ToolHead_Wiring.png)

#### 3.1.4 Spider v2.3 接线

![](/images/Spider_V2.3_Wiring.jpg)

##### Spider v2.3 用于 VORON 2.4 的接线

![](/images/VORON2.4_SPIDER_V23_WIRING.jpg)

##### Spider v2.3 用于 VORON Trident 的接线

![](/images/VORON_TRIDENT_SPIDER_V23_WIRING.jpg)

##### Spider v2.3 Afterburner 工具头接线

![](/images/Spider_V2.3_ToolHead_Wiring.png)

#### 3.1.5 Spider v3.0 接线

##### Spider v3.0 用于 VORON 2.4 的接线

![](/images/spider--hardware-guide-01.png)

##### Spider v3.0 用于 VORON Trident 的接线

![](/images/spider--hardware-guide-02.png)

### 3.2 接线：FYSETC mini 12864 v2.1

### 注意：

<img title="" src="/images/Spider_notice.png" alt="">

 为了兼容某些主板，如 RAMPS1.4，mini12864 配备了 RST（R3）和 KILL（R4）可选电阻。目前某些主板（S6/Spider）将 KILL 改为 5V。此时，请确保 mini12864 上没有 R4（如果板上有请移除），否则按下屏幕上的按钮会导致 5V 和 GND 之间短路，长期运行会导致主板损坏。

 目前，如果 mini12864 连接到主板，某些 Spider 无法使用 USB 上传固件，如果您遇到此问题，请移除 R1 电阻。

#### 接线

![](/images/mini12864-1.jpg)

| ![](/images/mini12864-2.jpg) | ![](/images/mini12864-3.jpg) |
| --------------------------- | --------------------------- |

### 3.3 接线：TMC2209

![](/images/TMC2209.jpg)

### 3.4 接线

#### 3.4.1 树莓派

##### Spider 1.x、Spider 2.2、Spider 3.0

![](/images/spider_rpi.png)

##### Spider 2.3

![](/images/spider2.3_rpi.png)

#### 3.4.2 CAN

如果您想在 Spider 板上在 klipper 中启用 CANBUS 网络，请查看 4.2.1 章节 `通信接口` 部分。

##### Spider 2.x

![](/images/CANBUS.jpg)

##### Spider 3.0

Spider v3.0 具有内部 CAN 收发器，板上焊接有永久的 120 欧姆终端电阻，无需添加跳线即可启用，也无法禁用。

CAN 端口是位于此处的 JST-XH 接头；

![](/images/spider--can.png)


### 3.5 引脚输出

#### 3.5.1 Spider v1.x

![](/images/Spider_V1.0_Pinout.jpg)

#### 3.5.2 Spider v2.2

![](/images/Spider_V2.2_Pinout.jpg)

#### 3.5.3 Spider v2.3

![](/images/Spider_V2.3_Pinout.jpg)

#### 3.5.4 Spider v3.0

![](/images/spider--pin-out.png)



### 3.6 引脚定义

#### 3.6.1 Spider v1.x

<table cellpadding="0" border="1" >
   <tr><td>功能</td><td>Spider 引脚</td><td>STM32 引脚</td><td>引脚编号</td><td>备注</td></tr>
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
   <tr><td rowspan="3">TMC 驱动 SPI (SPI4)</td><td>MOSI</td><td>PE14</td><td>45</td><td></td></tr>
   <tr><td>MISO</td><td>PE13</td><td>44</td><td></td></tr>
   <tr><td>SCK</td><td>PE12</td><td>43</td><td></td></tr>
   <tr><td rowspan="6">限位开关</td><td>X-MIN</td><td>PB14</td><td>53</td><td>与 X-DIAG 共用</td></tr>
   <tr><td>X-MAX</td><td>PA1</td><td>24</td><td>与 E0-DIAG 共用</td></tr>
   <tr><td>Y-MIN</td><td>PB13</td><td>52</td><td>与 Y-DIAG 共用</td></tr>
   <tr><td>Y-MAX</td><td>PA2</td><td>25</td><td>与 E1-DIAG 共用</td></tr>
   <tr><td>Z-MIN</td><td>PA0</td><td>23</td><td>与 Z-DIAG 共用</td></tr>
   <tr><td>Z-MAX(探针)</td><td>PA3</td><td>26</td><td>与 E2-DIAG 共用</td></tr>
   <tr><td rowspan="7">风扇/RGB</td><td>FAN0</td><td>PB0</td><td>35</td><td></td></tr>
   <tr><td>FAN1</td><td>PB1</td><td>36</td><td></td></tr>
   <tr><td>FAN2</td><td>PB2/BOOT1</td><td>37</td><td></td></tr>
   <tr><td>LED-R</td><td>PB6</td><td>92</td><td>可用于 fan3</td></tr>
   <tr><td>LED-G</td><td>PB5</td><td>91</td><td>可用于 fan4</td></tr>
   <tr><td>LED-B</td><td>PB7</td><td>93</td><td>可用于 fan5</td></tr>
   <tr><td>5V-LED(WS2812)</td><td>PD3</td><td>84</td><td>与 flash 指示灯共用（Bootloader）</td></tr>
   <tr><td rowspan="4">加热</td><td>E0-Heater</td><td>PB15</td><td>54</td><td></td></tr>
   <tr><td>E1-Heater</td><td>PC8</td><td>65</td><td></td></tr>
   <tr><td>E2-Heater</td><td>PB3</td><td>89</td><td></td></tr>
   <tr><td>Heated-Bed</td><td>PB4</td><td>90</td><td></td></tr>
   <tr><td rowspan="4">温度</td><td>TE0（THERM0）</td><td>PC0</td><td>15</td><td>使用 4.7kOhm 0.1% 温度传感器上拉电阻，可直接连接 PT1000。对于 PT100，必须使用放大板。</td></tr>
   <tr><td>TE1（THERM1）</td><td>PC1</td><td>16</td><td>使用 4.7kOhm 0.1% 温度传感器上拉电阻，可直接连接 PT1000。对于 PT100，必须使用放大板。</td></tr>
   <tr><td>TE2（THERM2）</td><td>PC2</td><td>17</td><td>使用 4.7kOhm 0.1% 温度传感器上拉电阻，可直接连接 PT1000。对于 PT100，必须使用放大板。</td></tr>
   <tr><td>TB（THERM3）</td><td>PC3</td><td>18</td><td>使用 4.7kOhm 0.1% 温度传感器上拉电阻，可直接连接 PT1000。对于 PT100，必须使用放大板。</td></tr>
   <tr><td rowspan="8">EXP1</td><td>LCD_D7</td><td>PD1/CAN-TX1</td><td>82</td><td>与 CAN-TX1 共用</td></tr>
   <tr><td>LCD_D6</td><td>PD0/CAN-RX1</td><td>81</td><td>与 CAN-RX1 共用</td></tr>
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
   <tr><td rowspan="2">EEPROM(4K) I2C 引脚输出</td><td>SCL</td><td>PB8/SCL1</td><td>95</td><td>连接到 24LC32（4K EEPROM）</td></tr>
   <tr><td>SDA</td><td>PB9/SDA1</td><td>96</td><td>连接到 24LC32（4K EEPROM）</td></tr>
   <tr><td rowspan="2">Pi_PWR/UART</td><td>TX</td><td>PA9/TX1</td><td>68</td><td></td></tr>
   <tr><td>RX</td><td>PA10/RX1</td><td>69</td><td></td></tr>
   <tr><td rowspan="3">SWD 调试</td><td></td><td>PA13/SWDIO</td><td>72</td><td>目前仅用于调试，可用于其他用途。</td></tr>
   <tr><td></td><td>PA14/SWCLK</td><td>76</td><td>目前仅用于调试，可用于其他用途。</td></tr>
</table>

#### 3.6.2 Spider v2.x、v3.x

<table cellpadding="0" border="1" >
   <tr><td>功能</td><td>Spider 引脚</td><td>STM32 引脚</td><td>引脚编号</td><td>备注</td></tr>
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
   <tr><td rowspan="3">TMC 驱动 SPI (SPI4)</td><td>MOSI</td><td>PE14</td><td>45</td><td></td></tr>
   <tr><td>MISO</td><td>PE13</td><td>44</td><td></td></tr>
   <tr><td>SCK</td><td>PE12</td><td>43</td><td></td></tr>
   <tr><td rowspan="6">限位开关</td><td>X-MIN</td><td>PB14</td><td>53</td><td>与 X-DIAG 共用</td></tr>
   <tr><td>X-MAX</td><td>PA1</td><td>24</td><td>与 E0-DIAG 共用</td></tr>
   <tr><td>Y-MIN</td><td>PB13</td><td>52</td><td>与 Y-DIAG 共用</td></tr>
   <tr><td>Y-MAX</td><td>PA2</td><td>25</td><td>与 E1-DIAG 共用</td></tr>
   <tr><td>Z-MIN</td><td>PA0</td><td>23</td><td>与 Z-DIAG 共用</td></tr>
   <tr><td>Z-MAX(探针)</td><td>PA3</td><td>26</td><td>与 E2-DIAG 共用</td></tr>
   <tr><td rowspan="7">风扇/RGB</td><td>FAN0</td><td>PA13</td><td>72</td><td></td></tr>
   <tr><td>FAN1</td><td>PA14</td><td>76</td><td></td></tr>
   <tr><td>FAN2</td><td>PB2/BOOT1</td><td>37</td><td></td></tr>
   <tr><td>LED-R</td><td>PB6</td><td>92</td><td>可用于 fan3</td></tr>
   <tr><td>LED-G</td><td>PB5</td><td>91</td><td>可用于 fan4</td></tr>
   <tr><td>LED-B</td><td>PB7</td><td>93</td><td>可用于 fan5</td></tr>
   <tr><td>5V-LED(WS2812)</td><td>PD3</td><td>84</td><td>与 flash 指示灯共用（Bootloader）</td></tr>
   <tr><td rowspan="4">加热</td><td>E0-Heater</td><td>PB15</td><td>54</td><td></td></tr>
   <tr><td>E1-Heater</td><td>PC8</td><td>65</td><td></td></tr>
   <tr><td>E2-Heater</td><td>PB3</td><td>89</td><td></td></tr>
   <tr><td>Heated-Bed</td><td>PB4</td><td>90</td><td></td></tr>
   <tr><td rowspan="6">温度</td><td>TE0（THERM0）</td><td>PC0</td><td>15</td><td>使用 4.7kOhm 0.1% 温度传感器上拉电阻，可直接连接 PT1000。对于 PT100，必须使用放大板。</td></tr>
   <tr><td>TE1（THERM1）</td><td>PC1</td><td>16</td><td>使用 4.7kOhm 0.1% 温度传感器上拉电阻，可直接连接 PT1000。对于 PT100，必须使用放大板。</td></tr>
   <tr><td>TE2（THERM2）</td><td>PC2</td><td>17</td><td>使用 4.7kOhm 0.1% 温度传感器上拉电阻，可直接连接 PT1000。对于 PT100，必须使用放大板。</td></tr>
   <tr><td>TE3（THERM3）</td><td>PC3</td><td>18</td><td>使用 4.7kOhm 0.1% 温度传感器上拉电阻，可直接连接 PT1000。对于 PT100，必须使用放大板。</td></tr>
   <tr><td>TE4（THERM4）</td><td>PB1</td><td>36</td><td>使用 4.7kOhm 0.1% 温度传感器上拉电阻，可直接连接 PT1000。对于 PT100，必须使用放大板。</td></tr>
   <tr><td>TB（THERM3）</td><td>PB0</td><td>35</td><td>使用 4.7kOhm 0.1% 温度传感器上拉电阻，可直接连接 PT1000。对于 PT100，必须使用放大板。</td></tr>
   <tr><td rowspan="8">EXP1</td><td>LCD_D7</td><td>PD1/CAN-TX1</td><td>82</td><td>与 CAN-TX1 共用</td></tr>
   <tr><td>LCD_D6</td><td>PD0/CAN-RX1</td><td>81</td><td>与 CAN-RX1 共用</td></tr>
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
   <tr><td rowspan="2">EEPROM(4K) I2C 引脚输出</td><td>SCL</td><td>PB8/SCL1</td><td>95</td><td>连接到 24LC32（4K EEPROM）</td></tr>
   <tr><td>SDA</td><td>PB9/SDA1</td><td>96</td><td>连接到 24LC32（4K EEPROM）</td></tr>
   <tr><td rowspan="2">Pi_PWR/UART</td><td>TX</td><td>PA9/TX1</td><td>68</td><td></td></tr>
   <tr><td>RX</td><td>PA10/RX1</td><td>69</td><td></td></tr>
   <tr><td rowspan="3">SWD 调试</td><td></td><td>PA13/SWDIO</td><td>72</td><td>目前仅用于调试，可用于其他用途。</td></tr>
   <tr><td></td><td>PA14/SWCLK</td><td>76</td><td>目前仅用于调试，可用于其他用途。</td></tr>
</table>

## 4. 固件指南

Spider 支持 Marlin 固件、Klipper 固件和 RRF 固件。选择您需要的。

### 4.1 Marlin

#### 4.1.1 下载 Vscode + platformio

要编译固件，您需要安装 Visual Studio Code 和 platformio 插件。

#### 4.1.2 下载固件

Marlin 固件位于本仓库的 `firmware/Marlin` 文件夹中，您也可以从最新的 [Marlin bugfix-2.0.x 分支](https://github.com/MarlinFirmware/Marlin/tree/bugfix-2.0.x) 获取固件。您需要在 ```configuration.h``` 文件中启用以下定义  

```
#define MOTHERBOARD BOARD_FYSETC_SPIDER
#define SERIAL_PORT -1
```

然后我们需要修改 `platformio.ini` 文件

`default_envs = FYSETC_S6`（用于旧 bootloader，启动地址为 `0x10000`，见下文）

`default_envs = FYSETC_S6_8000`（用于新 bootloader，启动地址为 `0x8000`，见下文）

**注意：自 2021/06/23 起，bootloader 启动地址已更改为 `0x08008000`，您可以查看 bootloader 详情 [github](https://github.com/FYSETC/FYSETC-SPIDER/tree/main/bootloader) 或 [gitee](https://gitee.com/fysetc/FYSETC-SPIDER/tree/main/bootloader)，也可以查看 Marlin PR [此处](https://github.com/MarlinFirmware/Marlin/pull/22207)。**

#### 4.1.3 编译固件

打开 Vscode 并打开 platformio 主页，点击“Open Project”按钮，然后指向您放置固件的文件夹。

![1561099422559](/images/AIO_f1.png)

如果一切顺利，您可以在底部看到几个按钮

![1561099546202](/images/AIO_f2.png)

对勾用于编译，点击它进行编译。您可以在 `.pio\build\FYSETC_S6` 或 `.pio\build\FYSETC_S6_8000` 文件夹中找到构建的 `firmware.bin`。

#### 4.1.4 上传固件

请遵循[此处](#jump0)的固件更新指南。

### 4.2 Klipper

我们将 Klipper 相关文件（如 `printer.cfg`）放在本仓库的 `firmware/Klipper` 文件夹中。请阅读那里的 README。 

如果您想使用 Klipper。您需要先遵循 Klipper [安装指南](https://www.klipper3d.org/Installation.html) 安装 [Klipper](https://github.com/KevinOConnor/klipper)。当我们尝试编译时，需要调用 `make menuconfig` 选择编译选项，请按如下所述为 Spider 选择选项。

#### 4.2.1 menuconfig

请为 Spider 选择这些选项，某些选项需要根据您的板和接线来决定选择哪个。

- #### 启用 `extra low-level configuration options`

- #### 微控制器架构

选择 `STMicroelectronics STM32`

- #### 处理器型号

选择 `STM32F446`

- #### 时钟参考

选择 `12 MHz crystal`

- #### Bootloader 偏移

- ##### 32KiB bootloader

如果您在 Klipper `make menuconfig` 中选择 `32kiB bootloader` 偏移。那么您需要先刷入名为 `Bootloader_FYSETC_SPIDER` 的 spider 板 bootloader（如果您在 `2021/06/23` 之后获得 Spider 板，不用担心，出厂时 bootloader 已在板上，如果没有，请先刷入）。bootloader 位于本仓库名为 `bootloader` 的文件夹中，请遵循 bootloader 文件夹中的 README（[github](https://github.com/FYSETC/FYSETC-SPIDER/tree/main/bootloader) 或 [gitee](https://gitee.com/fysetc/FYSETC-SPIDER/tree/main/bootloader)）刷入 bootloader。我们为您提供了使用 `32KiB bootloader` 的预构建固件，名为 `klipper-32k-USB.bin` 和 `klipper-32k-UART.bin`，在此处找到它们 [github](https://github.com/FYSETC/FYSETC-SPIDER/tree/main/firmware/Klipper) [gitee](https://gitee.com/fysetc/FYSETC-SPIDER/tree/main/firmware/Klipper)。如果 Klipper 更新，这些预构建固件将过时，并且不会与您新下载的 Klipper 匹配，从而导致烦人的问题。我们会尽量跟上 Klipper，但我建议您自己构建固件。

![](/images/84a6622ebcdc7ecb9831de3de63359c0d14cd3f28ba3abef1cf37ae09cca1a6d.png)

- #### 通信接口
  
  您在这里有两个选择，如果您使用 USB 线连接树莓派和 Spider，您需要勾选 `1. USB (on PA11/PA12)`。如果您使用串口连接树莓派和 Spider，则勾选 `2. Serial (on USART1 PA10/PA9)`。

- ##### 1. USB (on PA11/PA12)

如果您想用 USB 线将 Spider 连接到树莓派。您需要选择 `USB (on PA11/PA12)`

![](/images/84a6622ebcdc7ecb9831de3de63359c0d14cd3f28ba3abef1cf37ae09cca1a6d.png)


并且在 `printer.cfg` 中您需要如下设置串口。我们为 VORON 2 机器提供了示例 cfg 文件 `printer.cfg` [此处](https://github.com/FYSETC/FYSETC-SPIDER/tree/main/firmware/Klipper)。

```
Obtain definition by "ls -l /dev/serial/by-id/" then unplug to verify
##--------------------------------------------------------------------
serial: /dev/serial/by-id/usb-Klipper_stm32f446xx_230032000851363131363530-if00
```

- ##### 2. Serial (on USART1 PA10/PA9)

如果您想将 Spider UART1（RX1:PA10，TX1:PA9）端口连接到 RPI uart0（TX:GPIO14，RX:GPIO15）端口，您需要选择 `Serial (on USART1 PA10/PA9)`

![](/images/spider--menuconfig-03.png)

在 `printer.cfg` 中您需要取消注释以下行，正如我们的示例 `printer.cfg` 文件（[github](https://github.com/FYSETC/FYSETC-SPIDER/tree/main/firmware/Klipper) [gitee](https://gitee.com/fysetc/FYSETC-SPIDER/blob/main/firmware/Klipper/printer.cfg)）所做的那样，如果您的 cfg 文件没有此行，请添加它。

```
serial: /dev/ttyAMA0
```

除了此 make 选项外，您还需要遵循 `Connect RPI uart.md` 文件中的说明，您可以在 [github](https://github.com/FYSETC/FYSETC-SPIDER/blob/main/firmware/Klipper/Connect%20RPI%20uart.md) 或 [gitee](https://gitee.com/fysetc/FYSETC-SPIDER/blob/main/firmware/Klipper/Connect%20RPI%20uart.md) 找到该文件。

### 3. CAN bus (on PD0/PD1)

![](/images/spider--can-bus-on-pd0-pd1.png)

在您编译并上传固件后，您需要遵循此处的 Klipper CANBUS 说明 [CANBUS - Klipper 文档](https://www.klipper3d.org/CANBUS.html#finding-the-canbus_uuid-for-new-micro-controllers)。

#### 4.2.2 编译固件

```
make
```

#### 4.2.3 上传固件

请遵循[此处](#jump0)的固件更新指南。

### 4.3 RRF

**由于 RRF 固件需要超过 512KB 的 Flash 空间，配备 446 的 Spider 无法满足其要求。因此需要禁用一些功能才能使其工作，请查看 firmware/RRF 文件夹中的 README [github](https://github.com/FYSETC/FYSETC-SPIDER/tree/main/firmware/RRF) [gitee](https://gitee.com/fysetc/FYSETC-SPIDER/tree/main/firmware/RRF)。**

### 4.4  <span id="jump0">固件上传</span>

我们提供了几种上传固件的方式，包括 SDCARD、dfu-util、DFU 和 platformio。

#### 4.4.1 <span id="jump1">上传固件（SDCARD）</span>

使用 SD 卡上传固件是我们更新固件的默认方式，因为 Spider 出厂时已内置 bootloader。但如果您曾经将固件上传到 Spider flash 地址 `0x08000000`，那么 Spider 中的 bootloader 将消失，然后您需要自己将 bootloader 上传到 Spider，请遵循 bootloader 文件夹中的 README（[github](https://github.com/FYSETC/FYSETC-SPIDER/tree/main/bootloader) 或 [gitee](https://gitee.com/fysetc/FYSETC-SPIDER/tree/main/bootloader)）上传 bootloader。

使用 SD 卡上传固件：将您编译的固件文件 ```firmware.bin```（如果您使用 klipper 固件，需要将 `klipper.bin` 重命名为 `firmware.bin`）复制到 SD 卡，然后将其插入板右侧的 SD 卡槽，然后给板上电。您可能需要等待约 30 秒完成上传，上传时 sdcard 槽旁边的 LED 会闪烁。 

#### 4.4.2 <span id="jump4">上传固件（dfu-util）</span>

此方法适用于 linux，这意味着应该可以在树莓派上使用。

##### 步骤 1. 首先进入 DFU 模式

1. 首先关闭板电源

2. 在 5V 引脚和 DC5V 上设置跳线 

![](/images/5vJumper.png)

3. 将跳线放在 BT0 到 3.3V 引脚上 
![](/images/boot.png)

4. 将 USB 线连接到板和您的计算机 

5. 用 24v 给板上电 
   
   现在板处于 DFU 模式。如果不是，请点击复位按钮。您也可以用 5v 给板上电，但您需要在 5V 和 USB5V 上设置跳线（查看板背面的丝印标签），而不是在 5V 和 DC5V 上。
   
   ***请记住在完成固件上传后移除 BT0 跳线，否则它将再次进入 DFU 模式。***

##### 步骤 2. 安装 dfu-util

确保已安装 dfu-util，执行 `dfu-util --version` 命令检查。

示例输出：

```
dfu-util 0.9

Copyright 2005-2009 Weston Schmidt, Harald Welte and OpenMoko Inc.
Copyright 2010-2016 Tormod Volden and Stefan Schmidt
This program is Free Software and has ABSOLUTELY NO WARRANTY
Please report bugs to http://sourceforge.net/p/dfu-util/tickets/
```

如果没有，您应该先安装它，使用您发行版的包管理器获取最新版本，如

```
sudo apt-get install dfu-util
```

##### 步骤 3. 使用命令上传固件

然后使用下面的命令上传固件。您应该将下面的 `firmware.bin` 替换为您构建的固件 bin（或 hex）文件位置，如 `out/klipper.bin`。将 flash 地址 `0x08008000` 更改为您选择的 bootloader。（如果您使用 Marlin 固件且您的 platformio env 为 `default_envs = FYSETC_S6`，则需要将其设置为 `0x08010000`，如果 env 为 `default_envs = FYSETC_S6_8000`，则需要将其设置为 `0x08008000`。如果您使用 klipper 固件且在编译时选择启动地址 `No bootloader`，则将其设置为 `0x08000000`，如果为 `32kiB bootloader`，则设置为 `0x08008000`。如果为 `64KiB bootloader`，则设置为 `0x08010000`。如果您的是 hex 文件，则设置为 `0x08000000`）。

```
dfu-util -R -a 0 -s 0x08008000:leave -D firmware.bin
```

#### 4.4.3 <span id="jump">上传固件（DFU）</span>

上传固件的另一种方式是使用 DFU。

##### 步骤 1. 下载 stm32cubeprogrammer

您可以从 ST 网站下载。

https://www.st.com/zh/development-tools/stm32cubeprog.html

打开 STM32CubeProgrammer 软件。

![1574332767079](/images/S6_1574332767079.png)

##### 步骤 2. 进入 DFU 模式

1. 首先关闭板电源
2. 在 5V 引脚和 DC5V 上设置跳线 ![](/images/5vJumper.png)

3. 将跳线放在 BT0 到 3.3V 引脚上 ![](/images/boot.png)

4. 将 USB 线连接到板和您的计算机 
5. 用 24v 给板上电 

现在板处于 DFU 模式。如果不是，请点击复位按钮。您也可以用 5v 给板上电，但您需要在 5V 和 USB5V 上设置跳线（查看板背面的丝印标签），而不是在 5V 和 DC5V 上。

***请记住在完成固件上传后移除 BT0 跳线，否则它将再次进入 DFU 模式。***

##### 步骤 3. 上传固件

现在您可以使用 stm32cubeprogrammer 通过以下操作连接并刷写 Spider 板。

![1574386395071](/images/S6_1574386395071.png)

按照屏幕截图中红色数字所示操作。

1. 点击按钮查找 DFU 端口。
2. 连接 DFU 
3. 选择“firmware.bin”文件。（或 .hex 文件）。
4. 填写“起始地址”（如果您使用 Marlin 固件且您的 platformio env 为 `default_envs = FYSETC_S6`，则需要将其设置为 `0x08010000`，如果 env 为 `default_envs = FYSETC_S6_8000`，则需要将其设置为 `0x08008000`。如果您使用 klipper 固件且在编译时选择启动地址 `no bootloader`，则将其设置为 `0x08000000`，如果为 `32kiB bootloader`，则设置为 `0x08008000`。如果为 `64KiB bootloader`，则设置为 `0x08010000`。如果您的是 hex 文件，则无需设置任何内容）。
5. 开始编程

#### 4.4.4 上传固件（platformio）

如果您使用 platformio 自己编译 Marlin，可以遵循以下说明上传固件。

##### 步骤 1. 首先进入 DFU 模式

- 首先关闭板电源

- 在 5v 引脚和 DC5V 上设置跳线 ![](/images/5vJumper.png)

- 将跳线放在 BT0 到 3.3V 引脚上 ![](/images/boot.png)

- 将 USB 线连接到板和您的计算机 

- 用 24v 给板上电 
  
  现在板处于 DFU 模式。如果不是，请点击复位按钮。您也可以用 5v 给板上电，但您需要在 5V 和 USB5V 上设置跳线（查看板背面的丝印标签），而不是在 5V 和 DC5V 上。
  
  ***请记住在完成固件上传后移除 BT0 跳线，否则它将再次进入 DFU 模式。***

##### 步骤 2. 点击上传按钮上传固件

![](/images/platformio_upload.png)

### 4.5 测试固件

如果您怀疑板有问题，可以使用我们的测试固件进行测试。请遵循此处的 README（[github](https://github.com/FYSETC/FYSETC-SPIDER/tree/main/firmware/Test) [gitee](https://gitee.com/fysetc-mirrors/FYSETC-SPIDER/tree/main/firmware/Test)）。

## 5. 问题排查

#### 5.1 Spider 3.3v 问题

请查看此处（[github](https://github.com/FYSETC/FYSETC-SPIDER/blob/main/Spider%203.3v%20issue.md) [gitee](https://gitee.com/fysetc/FYSETC-SPIDER/blob/main/Spider%203.3v%20issue.md)）。

#### 5.2 TMC2209 连接问题

修复 1：请在 Spider 板上的每个 TMC2209 上添加一个跳线。然后再次重启机器。

![image-20220115115634509](/images/tmc2209_error.png)

修复 2：尝试执行 Klipper 命令 

```
INIT_TMC STEPPER=<name>
```

name 可以是 `stepper_x`、`stepper_y` 以及您 `printer.cfg` 中的其他步进电机。

#### 5.3 `firmware.bin` 未更改为 `old.bin`

修复 1：重新刷入 bootloader，遵循此处的说明（ github gitee ）。

修复 2：如果您使用 Klipper 固件，在编译时选择 `No bootloader` 选项，并将固件上传到 `0x08000000` flash 地址。请参考[上传固件（dfu-util）](#jump4)或[上传固件（DFU）](#jump)章节。

## 6. 购买渠道

- [FYSETC](https://www.fysetc.com/products/pre-sale-fysetc-spider-v1-0-motherboard-32bit-controller-board-tmc2208-tmc2209-3d-printer-part-replace-skr-v1-3-for-voron?variant=39404109267119)
- [淘宝](https://item.taobao.com/item.htm?spm=a230r.1.14.30.511751bfpMtaWP&id=649360814769&ns=1&abbucket=18#detail)
- [速卖通](https://www.aliexpress.com/item/1005002324070189.html)

## 7. 技术支持

您可以在我们的 github https://github.com/FYSETC/FYSETC-SPIDER/issues 提交问题
或将任何技术问题提交到我们的 [Discord 服务器](https://discord.gg/CtENXn9N) 

## 8. 相关文章

[英文](https://3dwork.io/en/complete-guide-fysetc-spider/)

[西班牙文](https://3dwork.io/guia-completa-fysetc-spider/)

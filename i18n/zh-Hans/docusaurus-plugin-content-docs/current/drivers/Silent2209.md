---
id: Silent2209
title: SILENT_2209
slug: /Silent2209
sidebar_position: 20
description: TMC2209 是一款用于两相步进电机的超静音电机驱动 IC。TMC2209 的引脚兼容多种传统驱动器以及 TMC2208。TRINAMIC 先进的…
source_file: Silent2209.md
source_language: en
---

## 产品介绍


![Silent2209](/images/2209v3.0.png)

<img src="/images/image-20230508155154792.png" alt="image-20230508155154792" style="zoom:50%;" />



TMC2209 是一款用于两相步进电机的超静音电机驱动 IC。TMC2209 的引脚与多种传统驱动器以及 TMC2208 兼容。TRINAMIC 先进的 StealthChop2 斩波器确保无噪声运行、最高效率和最佳电机扭矩。其快速电流调节以及可选与 SpreadCycle 组合，可实现高动态运动，同时增加 StallGuard 用于无传感器归位。集成的功率 MOSFET 可处理高达 2A RMS 的电机电流，并具有保护和诊断功能，实现稳健可靠的运行。简单易用的 UART 接口开启了调谐和控制选项。将应用调谐存储到 OTP 存储器中。业界最先进的 STEP/DIR 步进电机驱动器系列将设计升级为无噪声和最精确的运行，实现高性价比和极具竞争力的解决方案。用于两相双极步进电机的 Step/Dir 驱动器，峰值电流高达 2.8A – StealthChop™ 实现安静运动 – UART 接口选项 – 无传感器失速检测 StallGuard4。

## 特性


- 两相步进电机，线圈电流高达 2.8A（峰值），2A RMS
- STEP/DIR 接口，具有 8、16、32 或 64 微步引脚设置
- 通过 MicroPlyer™ 插值实现 256 微步的平滑运行
- StealthChop2™ 静音电机运行
- SpreadCycle™ 高动态电机控制斩波器
- StallGuard4™ 用于 StealthChop 的负载和失速检测
- CoolStep™ 电流控制，节能高达 75%
- 低 RDSon，低发热 LS 170mΩ 和 HS 170mΩ（25°C 时的典型值）
- 电压范围 4.75… 29V DC
- 低功耗待机，符合待机能耗法规
- 内部采样电阻选项（无需采样电阻）
- 被动制动、续流和自动断电
- 单线 UART 和 OTP 用于高级配置选项
- 集成脉冲发生器用于独立运动
- 全面保护与诊断

## 技术规格

型号                                    | TMC2209 
:---:|:---:
接口                                |   Step/Dir 
配置                       |   CFG 引脚或 UART
原生微步               |   高达 1/256
microPlyer 微步          |    1/256
逻辑电压 (VIO)                 |    3-5V
电机电压 (VM)                | 5.5-28V 
电机相电流 最大        | 2A RMS, 2.8A 峰值 
内部 V- 稳压器         |    启用
RDSon                                    |0.1 欧姆 (HV 0.2 欧姆)
stealthChop (静音)               | 是
spreadCycle                           |      是
coolStep                                | 是 
stallGuard                              | 是 
dcStep                                    | 是 

## 引脚功能

### V3.0

![2209引脚图V3.0](/images/2209%E5%BC%95%E8%84%9A%E5%9B%BEV3.0.jpg)

### V3.1

![TMC2209_V31_引脚图](/images/TMC2209_V31_%E5%BC%95%E8%84%9A%E5%9B%BE.png)

### V4.0

![TMC2209_V40_引脚图](/images/image-20230508160723032.png)

引脚|功能
:---:|---
 |**电源**
 GND|	接地
VM|	电机电源电压
VIO	|逻辑电源电压
|**电机输出**
M1A|	电机线圈 1
M1B	|电机线圈 1
M2A|	电机线圈 2
M2B	|电机线圈 2
|**控制输入**
STEP	|步进信号输入
DIR	|方向信号输入
|**TMC2209**
 EN|	使能电机输出：GND=开启，VIO=关闭
MS1| 微步分辨率配置（内部下拉电阻）
MS2| MS1: 00: 1/8, 01: 1/2, 10: 1/4 11: 1/16 用于基于 UART 的配置选择 UART 地址 0…3 
SP	|斩波模式选择：低/引脚悬空=StealthChop，高=SpreadCycle
CLK	|CLK 输入。使用短导线连接到 GND 以使用内部时钟，或提供外部时钟。
**TYPE**	|<font color="red"> **V4.0 版本将原来的 CLK 引脚替换为模块类型识别引脚，主要用于蜘蛛王。**</font>
TX	|UART TX，通过板上的 1K 电阻连接到 PDN
RX	|UART RX，直接连接到 PDN
DIAG	|诊断和 StallGuard 输出。失速检测或驱动器错误时为高电平。通过 ENN=高电平复位错误状态。
INDEX	|可配置索引输出。提供索引脉冲。
VREF|	模拟参考电压

## 接口资源

###  接线图

![2209接线图](/images/TMC2209_wiring.png)

### 电机电流设置

**V2.1 以下：** 

![2209测vref](/images/2209%E6%B5%8Bvref.png)

**V3.0&3.1**

![2209测vref](/images/TMC2209_vref_V30.jpg)

设置电机电流的最佳方法是测量 Vref 引脚上的电压（0…2.5V），并通过电位器调节电压。最大可设置的电机电流为 1.77A RMS（0.11 欧姆采样电阻），但 SilentStepSticks 只能使用到 1.2A RMS。  
Irms = (Vref * 1.77A) / 2.5V = Vref * 0.71  
Vref = (Irms * 2.5V) / 1.77A = Irms * 1.41 = Imax   
Vref -> Vref 引脚上的电压  
Irms -> 每相 RMS（均方根）电流（Irms = Imax / 1.41）  
Imax -> 每相最大电流（Imax = Irms * 1.41）   


:::note

1. Vref 测量 Gnd 和电位器中间的电压。  
2. 测量电压时不要连接电机，否则容易烧毁驱动器。  
3. 测量电压时应连接电源，不要只连接 USB 电源。  
4. <font color="red">**请特别注意方向！**</font>

:::


### 计算器


<driver-calculator type="Silent2209"></driver-calculator>


### 微步

MS2(-)	|MS1(-)|	步数(-)|	插值(-)|	模式(-)
:---:|:---:|:---:|:---:|:---:
GND |	VIO | 1⁄2 | 1⁄256 | stealthChop2
VIO	| GND | 1⁄4 | 1⁄256 | stealthChop2
GND | GND | 1⁄8 | 1⁄256 | stealthChop2
VIO	| VIO | 1⁄16 | 1⁄256 | stealthChop2

## 设置方法


### V2.1 硬件连接

![2209串口接线](/images/2209%E4%B8%B2%E5%8F%A3%E6%8E%A5%E7%BA%BF.jpg)

您可以使用任何具有 0-5V 逻辑电平的 RS232 串行适配器（例如 FTDI-Breakout），SilentStepStick 测试器/编程器可用作连接适配器。


:::tip

FYSETC TMC2209V2.1 版本已设置跳线，TX 和 RX 引脚已加长以便于接线。您只需按照丝印进行接线和使用。

:::


### V3.0 硬件连接

![2209串口接线V30](/images/2209%E4%B8%B2%E5%8F%A3%E6%8E%A5%E7%BA%BFV30.jpg)





:::note

![TMC2209_V30_error](/images/TMC2209_V30_error.png)

:::


### V3.1 硬件连接

![2209V3.1原理图](/images/2209V3.1%E5%8E%9F%E7%90%86%E5%9B%BE.png)

1. 添加 CLK 引脚，默认不连接，通过 0R 连接到 GND

2. SPREAD 引脚悬空。保留上拉和下拉电阻。

3. 将 TX 从 3 移到 5

4. UART 模式兼容 F6、S6、SKR 系列和 MKS 系列主板。

### V4.0 硬件连接

![image-20230508161953018](/images/image-20230508161953018.png)


## 商店	

- [TMC2209](https://www.aliexpress.com/item/33025556705.html)

## 技术支持

请将任何技术问题提交到我们的[论坛](http://forum.fysetc.com/)

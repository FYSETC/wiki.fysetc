---
id: Cheatah_Board_V30
title: Cheetah v3.0
slug: /Cheatah_Board_V30
sidebar_position: 80
description: 重新设计的Cheetah采用180MHz主控制器，以实现更高速的控制。同时，为了提高易用性，增加了一些常用接口，例如……
source_file: Cheatah_Board_V30.md
source_language: en
---

# Cheetah_V3.0

<a href="">
<img border="0" alt="Cheetch_Top" src="/images/Cheetah_Top.jpg" width="500" ><img border="0" alt="Cheetch_Bot" src="/images/Cheetah_Bot.jpg" width="500">
</a>

## 1. 简介

重新设计的 Cheetah 使用 180Mhz 主控制器来提供更高速的控制。同时，为了提高易用性，增加了一些常用接口，例如 Bl-touch、CAN。同时，它在小板上为 Raspberry Pi 或其他 SBC 提供完整的 5V 电源，这使得使用 Klipper 更加容易，并且还保留了对多种电压风扇的支持，非常方便。

### 变更日志：

1. MCU 变更：STM32F446RCT6 (180Mhz)

2. 增加复位按钮

3. 增加 CAN 接口（带收发器）

4. 增加 BL-Touch 接口（IO 复用）

5. 增加 5V 供电电流以为 Raspberry Pi 供电

6. 增加 2x5 端子用于连接 Raspberry Pi，包括串口 1 (PA9, PA10)

7. 背面的每个引脚都标有定义丝印

8. 所有 IO 重新分配，需要新的配置文件，与 V2 配置不兼容

9. 移除 EXP4

10. 4 层 PCB 以提高 EMC 性能和散热

## 2. 特性

- 紧凑尺寸：101.5mm x 72mm，兼容 Creatlity ender 3/ender5 主板尺寸

- **完全集成的多合一解决方案：**

  - **STM32F446** MCU（运行 Marlin 2.0/Klipper）

  - 4X TMC2209 步进驱动器，支持无传感器归位

- **通用电源：**

  - 24V 转 12V/2A DC-DC 用于风扇

  - 集成高精度电源稳压器 (DC/DC)：**5V** **4****A** 最大和 3.3V 800mA 最大 LDO，

  - 12V&24V 电源引脚输出

- 板载 TF 卡插槽

- EXP3 用于 12864 显示面板（Creality 12864 面板或 FYSETC Generic12864）

- EXP1&EXP2 板载 RepRapDiscount SmartController 兼容引脚排针

- 板载 5V WS2812 RGB 控制

- **板载 CANBUS 电路**

- **5 针 Bltouch 接口**（与 Probe 和 Z-Min 共享 IO）

- 支持 SD 卡和 USB 上传

- 汽车保险丝（15A）用于主电源输入

- 底部标明所有引脚名称

- 最多 3 路 PWM 风扇（5/12/24 可选）

- 可靠的 PCB：**四层**，TG155 FR4，塞孔，沉金


## 3. 配置 Cheetah 板

使用 SSH 软件连接到您的 Raspberry Pi 并输入以下命令：
```
lsusb
```
您应该看到如下所示的设备：

![Image01.png](/images/Image01.png)

如果没有，请返回并检查主板的电源和接线，确保每个电源指示灯都亮起。

![Image02.png](/images/Image02.png)


输入以下命令获取板 ID：
```
ls /dev/serial/by-id
```
使用 Crtl+C 复制 ID

![Image03.png](/images/Image03.png)

使用浏览器输入 Raspberry Pi 的 IP 地址进入 mainsail 界面
点击 MACHINE
点击列表中的 printer.cfg 进入编辑界面

![Image04.png](/images/Image04.png)

替换 [mcu] 部分中的 ID

![Image05.png](/images/Image05.png)

点击 SAVE & RESTART

如果一切顺利，系统将自动跳转到 Dashboard，您可以看到温度曲线

### 3.1 构建固件镜像


* 通过 ssh 登录到 Raspberry Pi
* 运行以下命令：

   ```
   cd ~/klipper
   make clean
   make menuconfig
   ```

* 在菜单结构中有许多项目需要选择。
  * 选择 "Enable extra low-level configuration options"
  * 将微控制器架构设置为 `STMicroelectronics STM32`
  * 将处理器型号设置为 `STM32F446`
  * **许多人因为引导加载程序问题而无法连接到 MCU，因此我们建议选择没有引导加载程序的模式。**
  * 将时钟参考设置为 `12 MHz crystal`
  * 将通信接口设置为 `USB (on PA11/PA12)`  

   ![Image06.png](/images/Image06.png)
  
* 选择配置后，按 `q` 退出，并在询问是否保存配置时选择 "Yes"。

* 运行命令 `make`
* `make` 命令完成后会创建一个固件文件 **klipper.bin**，存储在 `/home/pi/klipper/out` 文件夹中。  

### 3.2 固件安装

* 需要 USB 连接
* 需要在 Cheetah V3 上安装额外的跳线（短接 3V3 和 BT0）
* 不需要 microSD 卡

1. 关闭 Cheetah V3 电源
2. 在 BT0 和 3V3 之间安装跳线

![Image07.png](/images/Image07.png)

3. 通过 USB 连接 Cheetah V3 和 Pi

4. 打开 Cheetah V3 电源

5. 从您的 ssh 会话中运行
    ```
    cd ~/klipper
    ```
    以确保您处于正确的目录中
    
6. 运行 
    ```
     lsusb
    ```
    并找到 DFU 设备的 ID。
    
    ![Image08.png](/images/Image08.png)
    
7. 运行 
    ```
     make flash FLASH_DEVICE=0483:df11
    ```
    通常，STM32 的 DFU 模式就是这个 ID，如果不是，请将 0483:df11 替换为上一步中的 ID
    
 8. 如果一切顺利，您将看到 SUCCESSFUL 字样。
  
    ![Image09.png](/images/Image09.png)
    
 9. 关闭 Cheetah V3 电源

 10. **将跳线移到 BT0 & GND** 


:::warning

（当 STM32 开启时，BT0 应处于低电平，悬空也是可以的，但为了避免不可预测的问题，最好在此处短接 BT0 和 GND，这样更安全。）



![Image10.png](/images/Image10.png)

:::



11. 打开 Cheetah V3 电源

12. 您可以通过运行 `ls /dev/serial/by-id` 来确认烧录是否成功。如果烧录成功，现在应该显示一个 klipper 设备，类似于：

     ![Image11.png](/images/Image11.png)


:::note

如果固件是为 UART 而不是 USB 编译的，则此测试不适用）

:::




:::info

如果 Cheetah V3 未使用 12-24V 供电，Klipper 将无法通过 UART 与 TMC 驱动器通信，Cheetah V3 将自动关闭。

:::

## 4. 技术支持

请将任何技术问题提交到我们的 Discord - https://discord.gg/S9nZUCnDgm

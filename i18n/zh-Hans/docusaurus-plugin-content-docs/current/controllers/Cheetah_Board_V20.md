---
id: Cheetah_Board_V20
title: Cheetah v2.0
slug: /Cheetah_Board_V20
sidebar_position: 70
description: Cheetah 2.0 是一款基于 STM32F401 的单头主控板，板载 4 个 TMC2209，支持无传感器归零，可连接多种显示屏，兼容安装……
source_file: Cheetah_Board_V20.md
source_language: en
---

# Cheetah v2.0

![img](/images/Cheetah_v20.jpg)

## 1. 产品介绍

Cheetah 2.0 是一款基于 STM32F401 的单头主板，板载 4 个 TMC2209，支持无传感器归零，可连接多种显示屏，兼容大多数 Creality 3D 打印机的安装尺寸，例如 ender3、ender3 V2、ender3 pro、ender5，同时也适用于通用 3D 打印机 DIY。

## 2. 特点

- 紧凑尺寸：101.5mm x 72mm，兼容 Creatlity ender 3 主板尺寸
- 全集成一体化解决方案：
- **STM32F401MCU（运行 Marlin 2.0****/****Klipper** **）**
- 4X TMC2209 步进驱动器，支持无传感器归零
- 通用电源：
- 可用于 12V/24V 电机 / 热床
- 24V 转 12V/2A DC-DC 用于风扇
- 集成高精度电源稳压器（DC/DC）：5V 2A Max 和 3.3V 600mA Max LDO
- 12V&24V 电源引脚输出
- 板载 TF 卡座- EXP3 用于 12864 显示面板（Creality 12864 面板或 FYSETC Generic12864）
- **EXP1&EXP2 板载 RepRapDiscount SmartController 兼容引脚排针**
- **EXP4 带 I2C 和 UART1**
- 板载 5V WS2812 RGB 控制
- 支持 SD 卡和 USB 上传
- 主电源输入使用汽车保险丝
- **最多 3 路 PWM 风扇** **（5/12/24 可选）**
- PCB：FR4-TG155 PCB - 沉金工艺

## 3. 应用

- 3D 打印机
- CNC 设备
- 其他类似机器
- Voron 0.1（[github](https://github.com/FYSETC/FYSETC-Voron-0) [gitee](https://gitee.com/fysetc-mirrors/FYSETC-Voron-0)）

## 4. 硬件

### 4.1 硬件资源

| 板卡名称          | Cheetah v2.0                       |
| ------------------- | ---------------------------------- |
| 许可证             | GPL V2.0                           |
| 最新版本      | V2.0                               |
| 挤出机           | 1                                  |
| 可控风扇     | 3 Max                              |
| 加热器             | 2 Max                              |
| 限位开关            | 3 Max                              |
| 温度传感器           | 2 Max                              |
| UART                | 1                                  |
| I2C                 | 1                                  |
| SWD                 | 1                                  |
| USB                 | 1                                  |
| CPU                 | STM32F401                          |
| CPU 速度（MHz）   | 84 Mhz                             |
| 步进驱动器      | 4X TMC2209                         |
| 步进驱动器类型 | 板载                            |
| 输入               | 12v/24v                            |
| 输出              | BED OUT：10A Max ；Heater Out：5A Max |

### 4.2 连接器和跳线定义

即将推出...

### 4.3 引脚定义

<table>
   <tr><td>功能</td><td>Cheetah 引脚</td><td>STM32 引脚</td><td>引脚编号</td><td>备注</td></tr>
   <tr><td rowspan="3">X-MOTOR(1)</td><td>X-Step</td><td>PC0</td><td>8</td><td></td></tr>
   <tr><td>X-DIR</td><td>PC1</td><td>9</td><td></td></tr>
   <tr><td>X-EN</td><td>PA8</td><td>41</td><td></td></tr>
   <tr><td rowspan="3">Y-MOTOR(2)</td><td>Y-Step</td><td>PC14</td><td>3</td><td></td></tr>
   <tr><td>Y-DIR</td><td>PC13</td><td>2</td><td></td></tr>
   <tr><td>Y-EN</td><td>PC15</td><td>4</td><td></td></tr>
   <tr><td rowspan="3">Z-MOTOR(3)</td><td>Z-Step</td><td>PB9</td><td>62</td><td></td></tr>
   <tr><td>Z-DIR</td><td>PB8</td><td>61</td><td></td></tr>
   <tr><td>Z-EN</td><td>PC2</td><td>10</td><td></td></tr>
   <tr><td rowspan="3">E0-MOTOR(4)</td><td>E0-Step</td><td>PB2</td><td>28</td><td></td></tr>
   <tr><td>E0-DIR</td><td>PA15</td><td>50</td><td></td></tr>
   <tr><td>E0-EN</td><td>PD2</td><td>54</td><td></td></tr>
   <tr><td rowspan="2">TMC2209 串行（UART2）</td><td>TX2</td><td>PA2</td><td>16</td><td></td></tr>
   <tr><td>RX2</td><td>PA3</td><td>17</td><td></td></tr>
   <tr><td rowspan="3">限位开关</td><td>X-MIN</td><td>PB4</td><td>56</td><td></td></tr>
   <tr><td>Y-MIN</td><td>PC8</td><td>39</td><td></td></tr>
   <tr><td>Z-MIN</td><td>PB1</td><td>27</td><td></td></tr>
   <tr><td rowspan="3">风扇</td><td>FAN0</td><td>PA14</td><td>49</td><td></td></tr>
   <tr><td>FAN1</td><td>PA13</td><td>46</td><td></td></tr>
   <tr><td>FAN2</td><td>PA1</td><td>15</td><td></td></tr>
   <tr><td rowspan="1">RGB</td><td>Neo-pixel</td><td>PB0</td><td>26</td><td>可用于 fan4</td></tr>
   <tr><td rowspan="2">加热</td><td>E0-Heater</td><td>PC6</td><td>37</td><td></td></tr>
   <tr><td>Heated-Bed</td><td>PC7</td><td>38</td><td></td></tr>
   <tr><td rowspan="2">温度</td><td>TE0</td><td>PC4</td><td>24</td><td></td></tr>
   <tr><td>TB</td><td>PC5</td><td>25</td><td></td></tr>
   <tr><td rowspan="10">EXP1</td><td>SD-MISO</td><td>PA6</td><td>22</td><td></td></tr>
   <tr><td>SD-SCK</td><td>PA5</td><td>21</td><td></td></tr>
   <tr><td>BTN_EN1</td><td>PC10</td><td>51</td><td></td></tr>
   <tr><td>SD-SS</td><td>PA4</td><td>20</td><td></td></tr>
   <tr><td>BTN_EN2</td><td>PC11</td><td>52</td><td></td></tr>
   <tr><td>SD-MOSI</td><td>PA7</td><td>23</td><td></td></tr>
   <tr><td>SD-DET</td><td>PC3</td><td>11</td><td></td></tr>
   <tr><td>RESET</td><td>NRST</td><td>7</td><td></td></tr>
   <tr><td>GND</td><td>GND</td><td>NA</td><td></td></tr>
   <tr><td>5V</td><td>5V</td><td>NA</td><td></td></tr>
   <tr><td rowspan="10">EXP2</td><td>BEEP</td><td>PC9</td><td>40</td><td></td></tr>
   <tr><td>BTN_ENC</td><td>PC12</td><td>53</td><td></td></tr>
   <tr><td>LCD_EN</td><td>PB15</td><td>36</td><td></td></tr>
   <tr><td>LCD_RS</td><td>PB12</td><td>33</td><td></td></tr>
   <tr><td>LCD_D4</td><td>PB13</td><td>34</td><td></td></tr>
   <tr><td>LCD_D5</td><td>PB14</td><td>35</td><td></td></tr>
   <tr><td>LCD_D6</td><td>PB6</td><td>58</td><td></td></tr>
   <tr><td>LCD_D7</td><td>PB7</td><td>59</td><td></td></tr>
   <tr><td>GND</td><td>GND</td><td>NA</td><td></td></tr>
   <tr><td>5V</td><td>5V</td><td>NA</td><td></td></tr>
   <tr><td rowspan="2">UART</td><td>TX</td><td>PA9/TX1</td><td>42</td><td></td></tr>
   <tr><td>RX</td><td>PA10/RX1</td><td>43</td><td></td></tr>
   <tr><td rowspan="2">I2C</td><td>I2C2 SCL</td><td>PB10</td><td>29</td><td></td></tr>
   <tr><td>I2C2 SDA</td><td>PB11</td><td>30</td><td></td></tr>
   <tr><td rowspan="3">SWD 调试</td><td>SWDIO</td><td>PA13</td><td>46</td><td>目前仅用于调试，也可用于其他用途。</td></tr>
   <tr><td>SWCLK</td><td>PA14</td><td>49</td><td>目前仅用于调试，也可用于其他用途。</td></tr>
</table>

<img src="/images/Cheetah_V2.0_pinout.jpg" alt="" loading="lazy" />

### 4.4 接线

#### 4.4.1 Bltouch 接线

![](/images/cheetah20_wiring_bltouch.png)

klipper 配置

```
[bltouch]
sensor_pin: ^PA0
control_pin: PB1
```

#### 4.4.2 VORON 0.1 接线

请参考我们的 VORON 0.1 套件接线（[github ](https://github.com/FYSETC/FYSETC-Voron-0#52-rev11-kit)或[国内](http://git.ecoaas.com/FYSETC/FYSETC-Voron-0#52-rev11-kit)）

## 5. 固件

### 5.1 Marlin

按照以下步骤自行编译固件。更多信息见[此处](https://marlinfw.org/docs/basics/auto_build_marlin.html)。

#### 5.1.1 下载 Vscode + platformio

要编译固件，你需要安装 Visual Studio Code 和 platformio 插件。

#### 5.1.2 固件配置

你有两种代码来源选择

##### 来源 1

你可以在此仓库的 `firmware/Marlin` 文件夹中获取 Marlin 代码 [github](https://github.com/FYSETC/FYSETC-Cheetah-v2/tree/main/firmware/Marlin) 或 [gitee](https://gitee.com/fysetc/FYSETC-Cheetah-v2/tree/main/firmware/Marlin)。

##### 来源 2

你也可以从 [github](https://github.com/MarlinFirmware/Marlin) 或 [gitee](https://gitee.com/fysetc/Marlin) 获取上游分支（你最好使用 bugfix-2.0.x 版本，因为我刚刚在 2021/10/10 提交了 [PR](https://github.com/MarlinFirmware/Marlin/pull/23104)，所以 Marlin 团队可能尚未将代码集成到正式版本中）。记得修改 `platformio.ini` 文件中的 `default_envs`。

```
default_envs = FYSETC_CHEETAH_V20
```

并根据你的 cheetah 板版本在 `Configuration.h` 中修改 `MOTHERBOARD` 定义

```
#define MOTHERBOARD BOARD_FYSETC_CHEETAH_V20
```

以及串口

```
#define SERIAL_PORT -1
#define BAUDRATE 115200
```

##### 修改配置

你需要根据你的机器修改 `configuration.h` 和 `configuration_adv.h`。然后你就可以编译固件了。

#### 5.1.3 编译固件

打开 Vscode 并打开 platformio 主页，点击“Open Project”按钮，然后指向你放置固件的文件夹。

![1561099422559](/images/f1.png)

如果一切顺利，你可以在底部看到几个按钮

![1561099546202](/images/f2.png)

只需点击对勾即可编译。

#### 5.1.4 上传固件

按照[此处](#jump0)的说明操作。

### <span id="jump52">5.2 Klipper</span>

到目前为止（2021/11/30），Klipper 没有针对 STM32F401 芯片的 boot offset 设置，所以我们先使用 `no Bootloader` 选项。（如果你仍想使用 Cheetah bootloader，可以按照[此处](https://github.com/Klipper3d/klipper/pull/5155)的 PR 修改代码，然后使用 `32KiB bootloader` 选项）。

![](/images/menuconfig.png)

```
make clean
make
```

然后按照下面的固件上传部分说明上传固件。

我为 `Cheetah v2.0` 配置的 Klipper 提交了 PR，你可以在[此处](https://github.com/Klipper3d/klipper/pull/4934)查看。

### 5.3  <span id="jump0">固件上传</span>

我们提供多种上传固件的方式。

#### 5.3.1 <span id="jump1">上传固件（SDCARD）</span>

*如果你使用 `No bootloader` 选项的 Klipper 固件，则不能使用此方法。此方法仅适用于 bootloader。*

使用 SD 卡上传固件是我们默认的固件更新方式，因为 `Cheetah v2.0` 出厂时已经带有 `bootloader`。但如果你曾将固件上传到 `Cheetah v2.0` 的 flash 地址 `0x08000000`，那么 `Cheetah v2.0` 中的 bootloader 将丢失，然后你需要自行将 bootloader 上传到 `Cheetah v2.0`，请按照 bootloader 文件夹中的 README（[github](https://github.com/FYSETC/FYSETC-Cheetah-v2/tree/main/bootloader) 或 [gitee](https://gitee.com/fysetc-mirrors/FYSETC-Cheetah-v2/tree/main/bootloader)）上传 bootloader。

##### 如何使用 bootloader 上传固件

将你编译好的固件文件 ```firmware.bin```（如果你使用 klipper 固件，需要将 `klipper.bin` 重命名为 `firmware.bin`）复制到 SD 卡，并将其插入板子右侧的 SD 卡槽，然后给板子上电。你可能需要等待约 30 秒完成上传。完成后固件名称将变为 `old.bin`。

#### 5.3.2 <span id="jump4">上传固件（dfu-util）</span>

此方法适用于 linux，也就是说应该可以在树莓派上使用。

1. 首先进入 DFU 模式
   
   - 首先关闭板子电源
   - 将跳线帽放在 BT0 和 3.3V 引脚上

     ![image-20211130182000593](/images/boot_jumper.png)

   - 将 USB 线连接到板子和你的电脑
   - 使用 24v 给板子上电

2. 确保已安装 dfu-util，运行 `dfu-util --version` 命令检查。
   
   示例输出：
   
   ```
   dfu-util 0.9
   
   Copyright 2005-2009 Weston Schmidt, Harald Welte and OpenMoko Inc.
   Copyright 2010-2016 Tormod Volden and Stefan Schmidt
   This program is Free Software and has ABSOLUTELY NO WARRANTY
   Please report bugs to http://sourceforge.net/p/dfu-util/tickets/
   ```
   
   如果没有，你应该先安装它，使用你的发行版的包管理器获取最新版本，例如
   
   ```
   sudo apt-get install dfu-util
   ```

3. 然后使用下面的命令上传固件。你应该将下面的 `firmware.bin` 替换为你构建的固件 bin 文件位置，例如 `out/klipper.bin`。将 flash 地址 `0x08008000` 更改为你选择的 bootloader。（如果你使用 Marlin 固件，需要将其设置为 `0x08008000`。如果你使用 klipper 固件，并且在编译 klipper 时选择了 boot 地址 `32kiB bootloader`（在[此处](#jump52)描述），则将其设置为 `0x08008000`，如果选择 `no Bootloader`，则设置为 `0x08000000`。）
   
   ```
   dfu-util -R -a 0 -s 0x08008000:leave -D firmware.bin
   ```

4. 移除 boot 跳线，关闭电源然后重新给板子上电。

#### 5.3.3 <span id="jump">上传固件（WINDOWS DFU）</span>

上传固件的另一种方式是使用 DFU。

##### 步骤 1. 下载 stm32cubeprogrammer

你可以从 ST 网站下载。

https://www.st.com/zh/development-tools/stm32cubeprog.html

打开 STM32CubeProgrammer 软件。

![1574332767079](/images/cx.png)

##### 步骤 2. 进入 DFU 模式

1. 首先关闭板子电源
2. 将跳线帽放在 BT0 和 3.3V 引脚上

   ![image-20211130182000593](/images/boot_jumper.png)

3. 将 USB 线连接到板子和你的电脑
4. 使用 24v 给板子上电

现在板子处于 DFU 模式。

***完成固件上传后请记得移除跳线帽，否则它会再次进入 DFU 模式。***

##### 步骤 3. 上传固件

现在你可以使用 stm32cubeprogrammer 通过以下操作连接并烧录 Cheetah 板。

![1574386395071](/images/c2.png)

按照截图中红色数字所示操作。

1. 点击按钮查找 DFU 端口。
2. 连接 DFU
3. 选择“firmware.bin”文件。
4. 如果你的固件是 `.hex` 文件，跳过此步骤。在“Start address”中填写（如果你使用 Marlin，设置为 `0x08008000`。如果你使用 Klipper 固件，并且在编译 klipper 时选择了 boot 地址 `32kiB bootloader`（在[此处](#jump52)描述），则将其设置为 `0x08008000`，如果选择 `no Bootloader`，则设置为 `0x08000000`。）
5. 开始编程
6. 移除 boot 跳线，关闭电源然后重新给板子上电。

#### 5.3.4 上传固件（platformio）

如果你使用 platformio 自行编译 Marlin，可以按照以下说明上传固件。

##### 步骤 1. 首先进入 DFU 模式

- 首先关闭板子电源
- 将跳线帽放在 BT0 和 3.3V 引脚上

  ![image-20211130182000593](/images/boot_jumper.png)

- 将 USB 线连接到板子和你的电脑
- 使用 24v 给板子上电

##### 步骤 2. 点击上传按钮上传固件

![](/images/platformio_upload.png)

## 6. 常见问题

1.如何在 klipper 上配置 Ender 12864？
参考引脚图和 klipper 文档：
```
[display]
lcd_type: st7920
#   Set to "st7920" for st7920 displays.
cs_pin: PB12
sclk_pin: PB13
sid_pin: PB15
#   The pins connected to an st7920 type lcd. These parameters must be
#   provided.
encoder_pins: PC10,PC11
click_pin: PB12
```

## 7. 技术支持

请将任何技术问题提交到我们的[论坛](http://forum.fysetc.com/)

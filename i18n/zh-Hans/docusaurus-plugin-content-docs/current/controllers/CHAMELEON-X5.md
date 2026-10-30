---
id: CHAMELEON-X5
title: CHAMELEON X5
slug: /CHAMELEON-X5
sidebar_position: 20
source_file: CHAMELEON X5.md
source_language: en
helplook_source: Controllers/CHAMELEON X5.md
---

# 简介

![](/images/chameleon-x5--overview-01.png)

Chameleon X5 可用于各种需要多个电机协同工作的多色应用，例如 **Type-A、Type-B 和 Type-C** 系统。它还包含用于**加热和干燥**功能所需的风扇/加热控制和温度检测电路。

它基于 STM32F407VET6 微控制器和 TMC2209 步进电机驱动芯片，每个通道都配备了必要的 I/O 接口，用于耗材输入/输出监测和状态指示（按钮和 LED），以确保稳定进料。

可选的 5 通道加热和干燥功能包括用于风扇控制和加热元件的专用接口，以及 NTC 温度测量，同时还支持 I2C 传感器，例如温湿度传感器。

# 特性
- 尺寸：154mm x 48mm
- 基于 STM32F407VET6（168MHz Cortex-M4）
- 支持 CANBUS 和 USB 通信
- **板载电源：**
  - 输入：24V @ 最大 15A
  - 板载 DC-DC 电源：12V @ 3A、5V @ 3A、3.3V @ 0.8A
- **5 通道材料进料支持：**
  - 5 个板载 TMC2209 驱动器，支持 5 个步进电机
  - 10 个通用 I/O 引脚，用于材料插入/挤出监测
  - 5 个双 I/O 连接器，用于按钮和 LED 指示灯（带电平转换）
- **5 通道热风干燥支持：**
  - 5 个风扇，支持 2/3 个风扇，12V/24V 可选，最大 2A
  - 5 个加热接口，最大 5A
  - 5 个 NTC 温度传感器接口，用于温度检测
  - 1 个 I2C 接口，用于温湿度传感器
- 4 个通用 I/O 引脚，用于外部缓冲器
- 2 个 Neopixel RGB 接口，用于指示或照明
- 板载 BOOT0 和 RST 按钮
- 独立输入接口板
  
# 接线

## 为 X5 供电

X5 板在 CAN 和 USB 两种连接方式下都需要 24V 输入电压。这可以通过 X5 I/O 板上的 DC 圆孔插座或 Microfit3 连接器提供。

### DC 圆孔插座

DC 圆孔插座为 5.5*2.1，中心正极。应直接连接到打印机的 24V 电源。

![](/images/chameleon-x5--dc-barrel-jack.png)


| 圆孔插座 | 数值 |
| - | - |
|红色 |24v |
|黑色 | GND|


### MicroFit3

Microfit3 是一个 2x2 母头连接器。该连接器可同时提供 24V 和 GND 连接，以及 CAN 数据连接。

![](/images/chameleon-x5--microfit3.png)


| Microfit3 | 数值 |
| - | - |
|红色 |24v |
| 黑色|GND |
|黄色 |CAN H |
|白色 |CAN L |


## USB
要在 USB 连接下使用 Chameleon X5，请通过 DC 圆孔插座或 Microfit3 连接器为板子供电，然后将 I/O 板上的 USB C 线缆连接到打印机的 SBC（Raspberry Pi、Orange Pi、BTT Pi 等）。

## CAN
要在 CAN 连接下使用 Chameleon X5。使用 Microfit3 连接器同时提供电源和数据，按照上图将 CAN H 和 CAN L 连接到打印机设置中对应的 CAN 连接。

# 接线示例
## 5 路加热和干燥示例

![](/images/chameleon-x5--ways-heating-and-drying-example.png)

## Type A 使用示例

![](/images/chameleon-x5--type-a-usage-example.png)

## Type B 使用示例

![](/images/chameleon-x5--type-b-usage-example.png)

## Type C 使用示例

![](/images/chameleon-x5--type-c-usage-example.png)

## X5 I/O 板

![](/images/chameleon-x5--x5-i-o-board.png)

# 跳线

:::warning 警告

USB 5V 跳线用于方便固件更新。连接 24V 电源时请移除该跳线帽；否则，板载 DC 5V 将直接连接到 USB 5V，如果主板发生故障，可能会损坏您的 USB 主机设备。

:::

![](/images/chameleon-x5--jumpers.png)



# 固件指南

## 固件配置与编译

## Katapult Bootloader
感谢优秀的 Katapult 项目让 Klipper 固件更新变得更加容易。如果您愿意花一些时间阅读 Katapult 的文档，那么我推荐您使用它，否则就使用无 bootloader 模式！

有关 katapult 的更多信息，请参阅 https://github.com/Arksine/katapult
以下是简要指南，但请仔细检查配置选项！

```shell
cd katapult
make menuconfig
make flash FLASH_DEVICE=0483:df11
```

### USB 模式下的 katapult 配置

![](/images/chameleon-x5--705cb31b072faba0.png)

### CANBUS 模式下的 katapult 配置

![](/images/chameleon-x5--4759c5114f17a3e8.png)

## Klipper 固件配置
### 使用 Katapult Bootloader
#### USB 通信模式

![](/images/chameleon-x5--aa6ccc5217a50ca4.png)

#### CANBUS 通信模式

![](/images/chameleon-x5--378246dd3bfc2f01.png)

### 使用无 bootloader
#### USB 通信模式

![](/images/chameleon-x5--72b458ca70474c66.png)

#### CANBUS 通信模式

![](/images/chameleon-x5--2327e61cb12e0efa.png)

## 固件上传

### 无 Bootloader 模式或上传 Katapult Bootloader

命令：

```shell
cd ~/klipper
make flash FLASH_DEVICE=0483:df11
```

### 使用 Katapult Bootloader 上传 Klipper

1. 确保 klipper 服务已停止。

2. 构建支持 CAN 的 Klipper，并且 bootloader 偏移量与 Katapult 中的“application offset”相匹配。

3. 进入 bootloader。如果 Katapult 检测到 flash 的应用程序区域为空，它会自动进入 bootloader。当从当前已烧录的 Klipper 版本升级时，flashtool.py 脚本会命令 USB 和 CANBus 设备进入 bootloader。请注意，“USB 转 CAN 桥接设备”和“UART”设备无法自动检测。如果设备不处于 bootloader 模式，则需要先使用 -r 选项手动请求 bootloader，然后在不带 -r 的情况下重新运行脚本以执行上传。运行非 Klipper 软件的设备需要使用它们自己的方法请求 bootloader。

4. 运行烧录脚本：对于 CAN 设备：

> cd ~/katapult/scripts
> python3 flashtool.py -i can0 -f ~/klipper/out/klipper.bin -u uuid &lt;uuid&gt;

替换为您 CAN 设备对应的 uuid。如果设备之前未烧录过 Klipper，可以向 bootloader 查询 uuid：

> flashtool.py -i can0 -q


:::info 示例

1. 确保 katapult bootloader 已烧录
2. 双击 RESET 按钮进入 bootloader
3. 使用命令（参考 https://www.klipper3d.org/CANBUS.html）
> ~/klippy-env/bin/python ~/klipper/scripts/canbus_query.py can0
找到 can uuid
4. 使用该 uuid 更新固件
> python3 flashtool.py -i can0 -f ~/klipper/out/klipper.bin -u uuid

:::



:::note 注意

只应在网络上只有一个 can 节点时执行查询。尝试查询多个节点可能会导致传输错误，从而迫使节点进入“bus off”状态。当节点进入“bus off”时，它会变得无响应。必须重置节点才能恢复。

:::


对于 USB/UART 设备：烧录前，请确保已安装 pyserial。安装所需的命令取决于 Linux 发行版。基于 Debian 和 Ubuntu 的发行版可以运行以下命令：

> sudo apt update
> sudo apt install python3-serial

> python3 flashtool.py -d &lt;serial device&gt; -b &lt;baud_rate&gt;

将 &lt;serial_device&gt; 替换为您要烧录的 USB/UART 设备的路径。&lt;baud_rate&gt; 仅对 UART 设备需要，如果省略则默认为 250000 波特。


:::info 示例

1. 确保 katapult bootloader 已烧录
2. 双击 RESET 按钮进入 bootloader
3. 使用命令
> ls /dev/serial/by-id
找到 usb/uart mcu id
4. 使用该 id 更新固件
> python3 flashtool.py -d /dev/serial/by-id/the_id_you_get -f ~/klipper/out/klipper.bin 

:::


# 附件

- [原理图文件](https://github.com/FYSETC/CHAMELEON_X5/blob/main/SCH/CHAMELEON_X5_SCH.pdf)
- [引脚图文件](https://github.com/FYSETC/CHAMELEON_X5/blob/main/SCH/CHameleon_X5_V1.0B%20PINOUT.pdf)

有关包括配置信息在内的更多文档，请查看 https://github.com/FYSETC/CHAMELEON_X5

# 支持

[Fysetc Discord 服务器](https://discord.gg/CtENXn9N)

# 商店

[AliExpress](https://www.aliexpress.com/item/1005011703032478.html)

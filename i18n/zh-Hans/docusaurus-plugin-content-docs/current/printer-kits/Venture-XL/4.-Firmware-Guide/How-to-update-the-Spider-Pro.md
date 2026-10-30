---
id: How-to-update-the-Spider-Pro
title: 如何更新 Spider Pro
slug: /How-to-update-the-Spider-Pro
source_file: How to update the Spider Pro.md
source_language: en
helplook_source: 3D Printer Kits/Venture XL/4. Firmware Guide/How to update the Spider Pro.md
---

**如果您遇到MCU无法连接的问题，或者在更新Klipper主程序后提示版本不一致的错误，您可以考虑更新Spider Pro固件：**

**Spider Pro的更新与Klipper支持的所有主板一致，分为以下步骤：**

## 1.进入Spider Pro DFU模式，即下载模式

![](/images/venture-xl-firmware-guide-how-to-update-the-spider-pro--1-enter-spider-pro-dfu-mode-which-is-download-mode.png)

- 按住② BOOT0 不要松开。
- 按下① RST，1秒后松开。
- 松开② BOOT0。
然后，您的Spider Pro将进入DFU模式。

## 2.进入Linux后台
使用网线或WiFi连接到您的局域网。您可以在屏幕上看到IP地址。使用此IP通过SSH连接到Linux后台。除了IP地址外，您还可以使用venturexl.local连接到Klipper主机。
用户名：fysetc
密码：fysetc
如果您不知道如何使用SSH，请参考以下教程：
建议使用[mobaxterm](https://mobaxterm.mobatek.net/download.html)工具。


:::info SSH指南示例


本指南由Liyan Gong编写，来自[此处](https://www.seeedstudio.com/blog/2024/05/09/how-to-ssh-into-raspberry-pi/?srsltid=AfmBOoo5Sd4a5R8O_mQMTb6QOwKATwJtVR3xdR7NxfCXLuccxQIJlLwm)
## 第4步：SSH连接到您的树莓派
在终端中输入以下命令“ssh pi@IP地址”，执行SSH命令后，系统会提示您输入树莓派的密码。输入密码并按回车键。
注意：IP地址是您在上一步中找到的树莓派IP地址。pi是树莓派的默认用户名，如果您更改了用户名，则需要替换为您自己的用户名。

建议使用MobaXterm进行连接，如下所示：
打开后，运行界面如下：

![](/images/venture-xl-firmware-guide-how-to-update-the-spider-pro--step-4-ssh-into-your-raspberry-pi-01.png)

1.点击“Session”按钮

![](/images/venture-xl-firmware-guide-how-to-update-the-spider-pro--step-4-ssh-into-your-raspberry-pi-02.png)

2.在弹出的新窗口中，选择“SSH”

![](/images/venture-xl-firmware-guide-how-to-update-the-spider-pro--step-4-ssh-into-your-raspberry-pi-03.png)

3.在显示的对话框中，输入树莓派的IP地址，选择指定的用户名，输入用户名，然后点击“ok”

![](/images/venture-xl-firmware-guide-how-to-update-the-spider-pro--step-4-ssh-into-your-raspberry-pi-04.png)

4.在新屏幕中，输入raspberry，即树莓派的用户密码，然后按回车键。

![](/images/venture-xl-firmware-guide-how-to-update-the-spider-pro--step-4-ssh-into-your-raspberry-pi-05.png)

注意：

*默认情况下输入密码时不会有任何提示，第一次使用时很容易误以为没有输入，但Linux系统输入密码就是这样，请注意这一点。

*如果您更改了用户名和密码，则需要输入更改后的用户名和密码。

–如果显示以下消息，则用户名或密码错误。如果密码错误，请继续重新输入。如果用户名错误，您需要关闭当前命令行窗口并从第二步重新开始。

![](/images/venture-xl-firmware-guide-how-to-update-the-spider-pro--step-4-ssh-into-your-raspberry-pi-06.png)

—如果显示以下界面，显示带有用户名的命令行界面，则登录成功。

![](/images/venture-xl-firmware-guide-how-to-update-the-spider-pro--step-4-ssh-into-your-raspberry-pi-07.png)


## 第5步：连接成功
如果用户名和密码正确，您现在应该已通过SSH连接到树莓派。开启SSH树莓派后，您将在终端或PC的命令提示符中看到树莓派命令行界面。

您现在可以通过SSH远程在树莓派上执行命令。请记住保持树莓派软件更新，并使用安全的做法，例如更改默认密码，以及在不需要时禁用root用户的SSH访问。


:::


## 3.编译并上传固件
```shell
lsusb
```
使用此命令确保您的Spider Pro处于DFU模式。如果不是，请重复第一步。



```shell
cd klipper
```
进入klipper文件夹，因为以下操作将在此文件夹中执行

```shell
make menuconfig
```
进入配置界面，使用上下方向键选择，按回车键确认并选择。
按Q退出，按Y保存。

```shell
make flash FLASH_DEVICE=0483:df11
```

此命令将编译固件并上传到Spider Pro。如果成功，您将看到绿色的“successful”消息。

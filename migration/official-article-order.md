# 官网文章顺序同步

核对日期：2026-10-29。来源：[wiki.fysetc.com](https://wiki.fysetc.com/)。

**已对齐 9 个有文章的分类、76 篇对应文档的顺序。中英文共修改 174 个文档文件的 sidebar_position 字段，正文、其他元数据、图片和页面地址保持原样。**

3D Printer Kits 下的全部文档与分类配置均保留原样，并通过逐文件 SHA-256 校验。顶层分类顺序和文件夹结构没有调整。

官网同一产品的独立中文条目，在本地已合并到双语文档，因此按首次出现的位置排序，共合并 9 个重复语言条目。官网没有列出的本地文章放在对应分类末尾，并保留其彼此原有顺序。

| 官网分类 | 对齐文章数 | 官网未列出的本地文章数 |
| --- | ---: | ---: |
| [Controllers](https://wiki.fysetc.com/docs/Controllers) | 14 | 2 |
| [Stepper Drivers](https://wiki.fysetc.com/docs/drivers) | 16 | 2 |
| [Modules](https://wiki.fysetc.com/docs/modules) | 10 | 6 |
| [Sensors](https://wiki.fysetc.com/docs/sensors) | 1 | 1 |
| [Wireless](https://wiki.fysetc.com/docs/wireless) | 1 | 1 |
| [Mechanical Parts](https://wiki.fysetc.com/docs/mechanical) | 5 | 2 |
| [Upgrade Kits](https://wiki.fysetc.com/docs/upgrade) | 17 | 2 |
| [Displays](https://wiki.fysetc.com/docs/displays) | 6 | 1 |
| [Tutorial](https://wiki.fysetc.com/docs/tutorial) | 6 | 3 |

Cables 和 Others 的官网目录没有子文章，无须调整。本地独有的 FAQ、Getting started、Resources 分类保持原样。

## 调整后的顺序

### Controllers

1. CATALYST.K
2. CHAMELEON X5
3. SPIDER_V1-3_F446
4. SPIDER_V3_H723
5. FYSETC-SPIDER-KING
6. CHEETAH
7. CHEETAH_V2.0
8. CHEETAH_V3.0
9. E4
10. FYSETC_S6
11. F6_V1.3
12. BIG-DIPPER
13. STRIDEMAX_DUAL_FD_V2
14. AIO_II
15. Catalyst.K_Mainboard_V1.1（本地保留文章）
16. Controllers Introduction（本地保留文章）

### Stepper Drivers

1. QHV5160
2. SILENT_2209
3. S2210
4. TMC2130
5. EXT2160
6. TMC2208
7. TMC2226
8. TMC2225
9. TMC2100
10. ST820_V1.0
11. S6128_V1.1.zh
12. S5161_V1.1
13. S5160_V1.2
14. S109_V1.1.zh
15. LV8729_V1.0
16. HV5160
17. Stepper Drivers Introduction（本地保留文章）
18. S2240（本地保留文章）

### Modules

1. H36 Combo V2
2. Catalyst.K ToolHead
3. SB_Combo_V2
4. H36 Combo
5. Hexa Distro Fusion
6. SB CAN ToolHead.zh
7. UCAN
8. M36_HUB_V1
9. NanoDLP_Shield_V1.1.zh
10. LED_Driver_V1.0.zh
11. NanoDLP_Shield_MEGA_V2.1（本地保留文章）
12. Shield Introduction（本地保留文章）
13. Spider CAN Expander（本地保留文章）
14. Catalyst.K_Tool_V1.1（本地保留文章）
15. H42_V1.0（本地保留文章）
16. Modules（本地保留文章）

### Sensors

1. PT100_STICK
2. Sensors Introduction（本地保留文章）

### Wireless

1. SD WiFi Pro
2. Wireless Introduction（本地保留文章）

### Mechanical Parts

1. Sherpa-extruder
2. Mk8 Grey Extruder
3. Metal BMG right hand extruder
4. Metal BMG Left  hand extruder
5. Black BMG Extruder
6. Mechanical parts Introduction（本地保留文章）
7. Head MotorCooling Fan For K1K1 Max（本地保留文章）

### Upgrade Kits

1. Prusa mini BMG V1 Extruder
2. PRUSA-MK3S-Bear-Upgrade-kit
3. Ender3 Y-axis Belt Tensioner
4. Ender 5 3D printer Direct Drive Extruder Plate
5. Ender3 belt double Z upgrade kit
6. Ender 3 3D printer Direct Drive Extruder Plate
7. CREALITY X-axis Belt Tensioner
8. CREALITY  CR10 Y-axis Belt Tensioner
9. FLASHFORGE_AD5X Enclosure Kit
10. FYSETC-QuattroBox
11. Adventurer_AD5M_AD5M Pro_AD5X Light Board
12. Adventurer AD5M_AD5M Pro_AD5X_Series Camera
13. X1/P1S Door Hinge Upgrade
14. Creality K1 MAX 8mm Graphite Build Plate & Heated Bed
15. 90° Heat Insert Adaptor
16. Sparkx i7 LED Upgrade
17. PSF Feedback Sensor
18. Retracting Spool Holder（本地保留文章）
19. Upgrade Kits（本地保留文章）

### Displays

1. TFT81050
2. Mini12864_Panel
3. Generic_12864_Panel
4. FYS_Touch_Panel
5. Raspberry Pi 5" DSI Touch Screen MIPI LCD V1.1
6. FYSETC Paneldue 5i/7i
7. LCDs and Displays Introduction（本地保留文章）

### Tutorial

1. Spider_Software_Guide.zh
2. Spider_Hardware_Guide.zh
3. Manual_for_Mini_panel_on_SKR
4. How_to_Configure_TMC2208_on_FYSETC-F6-Board
5. How_to_Configure_TMC2130_on_FYSETC-F6-Board
6. BIQU12864_On_Spider
7. Tutorial Introduction（本地保留文章）
8. How to Upload RP2040 Firmware under Klipper（本地保留文章）
9. How to upload STM32 Firmware under Klipper（本地保留文章）

## 校验与记录

- `node scripts/sync-official-article-order.mjs --check`：核对中英文排序、正文未变化、排除目录未变化。
- `npm run test:navigation`：导航检查。
- `npm run build -- --no-minify`：生成中英文页面并检查链接和锚点。
- 中英文构建通过；已读取实际生成页面的侧栏，9 个分类 × 2 个语言版本共 18 项顺序核对全部通过。
- [页面侧栏核对结果](official-article-order-validation.json)
- [官网顺序快照](../navigation/official-article-order-2026-10-29.json)
- [逐篇排序变更记录](official-article-order-report.json)

尚未提交或发布到线上。

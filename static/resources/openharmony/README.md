# Hi3861 OpenHarmony 嵌入式开发项目

基于华为海思 Hi3861 开发板的 OpenHarmony 嵌入式开发实践项目，包含四个完整的开发模块：红绿灯板开发、炫彩灯板开发、环境监测板开发和 AT 指令开发。

## 📁 项目结构

```
Hi3861/
├── rayawa/                         # 核心开发模块
│   ├── hello/                      # 基础示例
│   │   ├── BUILD.gn                # 编译配置
│   │   └── hello.c                 # Hello World 程序
│   │
│   ├── traffic_light/              # 模块一：红绿灯板开发
│   │   ├── BUILD.gn                # 编译配置（一次只能激活一个文件）
│   │   ├── light.c                 # 红黄绿三色灯基础控制
│   │   ├── traffic.c               # 交通灯系统（自动时序）
│   │   ├── ability.c               # 多线程并发开发
│   │   ├── button.c                # S3 按钮开发
│   │   └── control.c               # 按钮控制红绿灯（综合项目）
│   │
│   ├── colorful_light/             # 模块二：炫彩灯板开发
│   │   ├── BUILD.gn                # 编译配置
│   │   ├── beep.c                  # 蜂鸣器控制
│   │   ├── music.c                 # 蜂鸣器音乐播放
│   │   ├── led.c                   # 混合音乐与三色灯（音乐可视化）
│   │   ├── human_sensor.c          # 人体红外热释电传感器
│   │   ├── photosensitive.c        # 光敏电阻开发
│   │   └── human_sensor_light.c    # 夜晚人体感应灯（综合项目）
│   │
│   ├── environment/                # 模块三：环境监测板开发
│   │   ├── BUILD.gn                # 编译配置
│   │   ├── mq2_demo.c              # MQ-2 燃气传感器开发
│   │   ├── aht20.c/.h              # AHT20 温湿度传感器驱动
│   │   ├── aht20_demo.c            # AHT20 传感器演示
│   │   ├── oled_ssd1306.c/.h       # OLED 显示屏驱动
│   │   ├── oled_fonts.h            # OLED 字体库
│   │   ├── oled_demo.c             # OLED 显示演示
│   │   └── enrionment_demo.c       # 综合环境监测系统
│   │
│   └── at_command/                 # 模块四：AT 指令开发
│       ├── BUILD.gn                # 编译配置
│       └── cal.c                   # 自定义 AT+CALC 指令
│
├── demolink/                        # 基础链接示例
├── iothardware/                     # IoT 硬件示例
├── samgr/                           # 系统服务管理
└── startup/                         # 启动配置
```

## 🎯 四大开发模块详解

### **模块一：红绿灯板开发** 🚦

#### **硬件配置**
- **三色 LED**：GPIO_10（红）、GPIO_11（绿）、GPIO_12（黄）
- **控制按钮**：GPIO_8（S3 按钮）

#### **开发项目**
1. **`light.c`** - 基础灯控制
   - 单个 LED 开关控制
   - 三色灯组合控制
   - 延时和闪烁效果

2. **`traffic.c`** - 交通灯系统
   - 标准交通灯时序：红→绿→黄→红
   - 自动循环控制
   - CMSIS-RTOS2 任务调度

3. **`ability.c`** - 多线程并发
   - OpenHarmony 多任务处理
   - 并行任务执行演示
   - 任务间同步机制

4. **`button.c`** - S3 按钮开发
   - GPIO 输入检测
   - 按键消抖处理
   - 中断和轮询模式

5. **`control.c`** - 按钮控制红绿灯（**综合项目**）
   - 按钮切换交通灯状态
   - 手动/自动模式切换
   - 状态机设计

#### **学习路径**
```
light.c（基础） → traffic.c（系统） → ability.c（并发） → button.c（交互） → control.c（综合）
```

### **模块二：炫彩灯板开发** 🎨

#### **硬件配置**
- **三色 LED**：PWM1（红）、PWM2（绿）、PWM3（黄）
- **蜂鸣器**：PWM0
- **人体传感器**：ADC 通道3
- **光敏电阻**：ADC 输入

#### **开发项目**
1. **`beep.c`** - 蜂鸣器控制
   - PWM 频率控制
   - 不同音调生成
   - 警报音效

2. **`music.c`** - 蜂鸣器音乐播放
   - 预定义旋律播放
   - 节奏和音调控制
   - 多首歌曲支持

3. **`led.c`** - 混合音乐与三色灯（**音乐可视化**）
   - **核心项目**：音乐节奏可视化
   - LED 随音乐节奏变化
   - 多模式灯光效果
   - PWM 调光控制

4. **`human_sensor.c`** - 人体红外传感器
   - 人体运动检测
   - ADC 数据采集
   - 灵敏度调节

5. **`photosensitive.c`** - 光敏电阻
   - 环境光强度检测
   - 自动亮度调节
   - 日夜判断

6. **`human_sensor_light.c`** - 夜晚人体感应灯（**综合项目**）
   - 夜晚检测到人体时自动开灯
   - 光敏+人体双传感器融合
   - 节能延时关闭

#### **学习路径**
```
beep.c（声音） → music.c（音乐） → led.c（可视化） → human_sensor.c（感知） → photosensitive.c（环境） → human_sensor_light.c（智能）
```

### **模块三：环境监测板开发** 🌡️

#### **硬件配置**
- **MQ-2 燃气传感器**：ADC 通道5
- **AHT20 温湿度传感器**：I2C 通信
- **OLED 显示屏**：SSD1306，I2C
- **蜂鸣器报警**：PWM0

#### **开发项目**
1. **`mq2_demo.c`** - 燃气传感器
   - 可燃气体浓度检测
   - ADC 数据采集和转换
   - 浓度阈值报警

2. **`aht20.c/.h`** - 温湿度传感器驱动
   - I2C 通信协议实现
   - 高精度测量：温度 ±0.3°C，湿度 ±2%
   - 数据校准算法

3. **`oled_ssd1306.c/.h`** - OLED 显示驱动
   - 128×64 像素显示控制
   - 字体渲染和图形绘制
   - 帧缓冲管理

4. **`oled_demo.c`** - OLED 显示演示
   - 温湿度实时显示
   - 数据图表绘制
   - 多页面界面

5. **`enrionment_demo.c`** - 综合环境监测系统（**核心项目**）
   - **多传感器数据融合**：温湿度 + 燃气浓度
   - **实时显示**：OLED 显示所有环境参数
   - **智能报警**：参数超阈值时蜂鸣器报警
   - **数据刷新**：定时更新显示

#### **技术特性**
- **I2C 通信**：AHT20 + OLED 共享 I2C 总线
- **ADC 采集**：MQ-2 模拟信号数字化
- **实时显示**：OLED 刷新率优化
- **阈值管理**：可配置报警阈值

### **模块四：AT 指令开发** 📡

#### **开发项目**
1. **`cal.c`** - 自定义 AT+CALC 指令
   - **指令格式**：`AT+CALC=a,b`
   - **功能**：四则运算计算器
   - **输出**：和、差、积、商

#### **功能特性**
- **参数验证**：输入两个整数参数
- **完整计算**：同时返回四种运算结果
- **错误处理**：除零保护机制
- **AT 框架集成**：完全集成到 OpenHarmony AT 系统

#### **使用示例**
输入示例：
```
AT+CALC=12,3
```
输出示例：
```
+CALC:Sum=15
+CALC:Diff=9
+CALC:Prod=36
+CALC:Quot=4
OK
```

## 🛠️ 编译与使用指南

### **编译配置**
每个模块的 `BUILD.gn` 文件控制激活的文件：

```gn
# traffic_light/BUILD.gn 示例
sources = [
    "light.c",    # 激活基础灯控制
    # "traffic.c",  # 注释其他文件
    # "ability.c",
    # "button.c",
    # "control.c",
]
```

### **主编译配置**
```gn
# rayawa/BUILD.gn - 控制激活的模块
features = [
    "hello:hello",                    # 基础示例
    "traffic_light:traffic_light",    # 红绿灯模块
    # "colorful_light:colorful_light", # 注释不需要的模块
    # "environment:environment",
    # "at_command:at_command",
]
```

### **开发流程**
1. **选择模块**：编辑 `rayawa/BUILD.gn` 激活目标模块
2. **选择文件**：编辑模块内的 `BUILD.gn` 激活具体文件
3. **编译**：`hb build`（在 OpenHarmony 根目录）
4. **烧录**：使用 HiBurn 工具烧录固件
5. **测试**：串口终端（115200 波特率）查看输出

### **串口调试**
- **波特率**：115200
- **数据位**：8
- **停止位**：1
- **校验位**：无
- **流控制**：无


## 🔧 技术栈

### **硬件接口**
- **GPIO**：LED、按钮控制
- **PWM**：蜂鸣器、LED 调光
- **I2C**：AHT20、OLED 通信
- **ADC**：MQ-2、人体传感器、光敏电阻

### **软件框架**
- **OpenHarmony**：基础操作系统
- **CMSIS-RTOS2**：实时任务调度
- **HiAT Framework**：AT 命令处理
- **Driver Framework**：硬件驱动抽象层

### **开发工具链**
- **编译系统**：GN + Ninja
- **烧录工具**：HiBurn
- **调试工具**：IPOP
- **版本控制**：Git

## 🚀 快速开始

### **1. 环境准备**
```bash
# 确保 OpenHarmony 开发环境已配置
# Hi3861 开发板连接正常
# 串口驱动安装完成
```

### **2. 编译第一个程序**
```bash
# 激活 hello 模块
cd rayawa
# 编辑 BUILD.gn，只保留 "hello:hello"

# 编译
cd ../../  # 回到 OpenHarmony 根目录
hb build

# 烧录测试
# 使用 HiBurn 烧录，串口查看 "Hello OpenHarmony!"
```

### **3. 进阶开发**
```bash
# 切换到红绿灯模块
# 1. 编辑 rayawa/BUILD.gn，激活 traffic_light
# 2. 编辑 traffic_light/BUILD.gn，激活 light.c
# 3. 重新编译烧录
```

## 🤝 开发规范

### **代码规范**
1. **命名规范**：驼峰命名法，硬件相关使用大写
2. **注释要求**：关键函数必须有功能说明
3. **错误处理**：所有硬件操作必须有错误检查
4. **资源释放**：动态分配的资源必须释放

### **模块设计**
1. **单一职责**：每个文件完成一个明确功能
2. **接口清晰**：模块间通过定义良好的接口通信
3. **可配置性**：通过 BUILD.gn 灵活配置
4. **可测试性**：支持单独测试每个功能

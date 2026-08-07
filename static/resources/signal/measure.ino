#include <Wire.h>
#include <Adafruit_ADS1X15.h>

// ================= 参数定义 =================
#define LED_PWM_PIN   6             // 外置LED PWM控制
#define LED_BUILTIN   13            // 板载LED

Adafruit_ADS1115 ads;                    // ADS1115 ADC (I2C地址0x48)

const float    k_IP           = 10.0;    // 电流转换系数 mA/单位P (标定填入)
const float    b_IP           = 0.0;     // 系统零点偏移量 mA (标定填入)
const float    PSD_LENGTH     = 20.0;    // PSD有效长度 mm (S3932)
const float    R_LOOP         = 100.0;   // 回路等效电阻 R Ω (LCR电桥实测)
const float    L_LOOP         = 0.05;    // 回路等效电感 L H (LCR电桥实测)

const uint16_t BASE_SAMPLES   = 200;     // 环境光采样次数
const uint8_t  FILTER_SIZE    = 16;      // 滑动平均窗口大小
const uint8_t  PERIOD_AVG     = 8;       // 频率周期平均个数
const uint16_t BLINK_INTERVAL = 800;     // 板载LED闪烁间隔 ms

// ================= 全局变量 =================
float V1_ambient = 0;                    // PSD通道1环境光电压 V
float V2_ambient = 0;                    // PSD通道2环境光电压 V

// 滑动平均缓存
float filterBuffer[FILTER_SIZE];
uint8_t filterIndex = 0;
bool filterInitialized = false;

// 频率计算
uint32_t periodBuffer[PERIOD_AVG];
uint8_t periodIndex = 0;
uint32_t lastCrossTime = 0;
float frequency = 0;
float lastP = 0;

// ================= LED控制 =================
void statusSlowBlink() {
  static uint32_t timer = 0;
  static bool state = false;
  if (millis() - timer > BLINK_INTERVAL) {
    timer = millis();
    state = !state;
    digitalWrite(LED_BUILTIN, state);
  }
}

void externalFinished() { analogWrite(LED_PWM_PIN, 255); }

// ================= PSD双通道读取 (ADS1115) =================
void measureAmbient() {
  float sum1 = 0, sum2 = 0;
  Serial.println(F("检测环境光中..."));
  for (uint16_t i = 0; i < BASE_SAMPLES; i++) {
    sum1 += ads.computeVolts(ads.readADC_SingleEnded(0));
    sum2 += ads.computeVolts(ads.readADC_SingleEnded(1));
    delay(5);
  }
  V1_ambient = sum1 / BASE_SAMPLES;
  V2_ambient = sum2 / BASE_SAMPLES;
}

// 归一化位置算子 P = (V2 - V1) / (V1 + V2)
float readP() {
  float V1 = ads.computeVolts(ads.readADC_SingleEnded(0)) - V1_ambient;
  float V2 = ads.computeVolts(ads.readADC_SingleEnded(1)) - V2_ambient;
  if (V1 < 0) { V1 = 0; }
  if (V2 < 0) { V2 = 0; }
  float sum = V1 + V2;
  return (sum > 0.001) ? ((V2 - V1) / sum) : 0;
}

// ================= 滑动平均滤波 =================
float filterP(float inputP) {
  if (!filterInitialized) {
    for (uint8_t i = 0; i < FILTER_SIZE; i++) { filterBuffer[i] = inputP; }
    filterInitialized = true;
  }
  filterBuffer[filterIndex] = inputP;
  filterIndex = (filterIndex + 1) % FILTER_SIZE;
  float sum = 0;
  for (uint8_t i = 0; i < FILTER_SIZE; i++) { sum += filterBuffer[i]; }
  return sum / FILTER_SIZE;
}

// ================= 频率计算 =================
void updateFrequency(float P) {
  if (lastP < 0.001 && P >= 0.001) {      // 上升沿过零检测
    uint32_t now = millis();
    if (lastCrossTime > 0) {
      periodBuffer[periodIndex] = now - lastCrossTime;
      periodIndex = (periodIndex + 1) % PERIOD_AVG;
      uint32_t sum = 0;
      for (uint8_t i = 0; i < PERIOD_AVG; i++) { sum += periodBuffer[i]; }
      float avgPeriod = sum / (float)PERIOD_AVG;
      if (avgPeriod > 0) { frequency = 1000.0 / avgPeriod; }
    }
    lastCrossTime = now;
  }
  lastP = P;
}

// ================= 初始化 =================
void setup() {
  Serial.begin(115200);
  delay(500);
  pinMode(LED_PWM_PIN, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);

  // ADS1115初始化
  Serial.print(F("初始化ADS1115... "));
  if (!ads.begin()) {
    Serial.println(F("失败!"));
    while (1) { delay(1000); }
  }
  ads.setGain(GAIN_ONE);
  Serial.println(F("完成"));

  Serial.println();
  Serial.println(F("=============================="));
  Serial.println(F("         测量模块"));
  Serial.println(F("=============================="));

  // 第一次环境光检测
  measureAmbient();
  Serial.print(F("环境光 V1 = "));
  Serial.print(V1_ambient, 5);
  Serial.print(F(" V  V2 = "));
  Serial.print(V2_ambient, 5);
  Serial.println(F(" V"));

  digitalWrite(LED_BUILTIN, HIGH);
  delay(1500);

  // 第二次环境光检测
  measureAmbient();
  Serial.print(F("新环境光 V1 = "));
  Serial.print(V1_ambient, 5);
  Serial.print(F(" V  V2 = "));
  Serial.print(V2_ambient, 5);
  Serial.println(F(" V"));
  Serial.println(F("----------------------------------"));
  Serial.println(F("初始化完成! 按r键开始测量"));
  Serial.println(F("----------------------------------"));
}

// ================= 主循环 =================
void loop() {
  static bool started = false;

  if (!started) {
    if (Serial.available()) {
      if (Serial.read() == 'r') {
        started = true;
        Serial.println(F("开始测量"));
        externalFinished();
        while (Serial.available()) { Serial.read(); }
      }
    }
    return;
  }

  statusSlowBlink();

  float P = readP();                       // 归一化位置算子
  float Pf = filterP(P);                   // 滑动平均滤波
  updateFrequency(Pf);                     // 过零检测计算频率

  float position = Pf * PSD_LENGTH / 2.0;  // 光斑位置 x = P·L/2  mm
  float current = k_IP * Pf + b_IP;        // I = k_IP·P + b_IP  电流 mA
  float omega = 2 * PI * frequency;        // 信号角频率 rad/s
  float impedance = sqrt(R_LOOP * R_LOOP + omega * omega * L_LOOP * L_LOOP);  // |Z|=√(R²+(ωL)²) Ω
  float voltageValue = current * impedance / 1000.0;   // U = I·|Z|  电压 V

  // 统一打印
  Serial.print(F("P="));
  Serial.print(Pf, 6);
  Serial.print(F("\tx="));
  Serial.print(position, 3);
  Serial.print(F(" mm\tI="));
  Serial.print(current, 5);
  Serial.print(F(" mA\tU="));
  Serial.print(voltageValue, 5);
  Serial.print(F(" V\tf="));
  Serial.print(frequency, 3);
  Serial.println(F(" Hz"));

  delay(100);
}

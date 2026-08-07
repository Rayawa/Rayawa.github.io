#include <Wire.h>
#include <Adafruit_Si4713.h>

// ================= 参数定义 =================
const uint8_t  PIN_RESET       = 12;       // Si4713复位引脚
const uint16_t FM_FREQUENCY    = 9450;     // 载波频率 94.50MHz
const uint8_t  TX_POWER        = 115;      // 发射功率 115dBμV
const uint8_t  MAX_RETRY       = 5;        // 最大重试次数
const uint16_t RETRY_INTERVAL  = 2000;     // 重试间隔 ms
const uint16_t BLINK_INTERVAL  = 800;      // 板载LED闪烁间隔 ms
const uint16_t REPORT_INTERVAL = 2000;     // 状态报告间隔 ms

Adafruit_Si4713 radio = Adafruit_Si4713(PIN_RESET);
bool transmitting = false;

// ================= Si4713初始化 =================
bool initRadio() {
  for (uint8_t attempt = 1; attempt <= MAX_RETRY; attempt++) {
    Serial.print(F("[Init] Si4713连接 "));
    Serial.print(attempt);
    Serial.print(F("/"));
    Serial.print(MAX_RETRY);
    Serial.print(F(" ... "));
    if (radio.begin()) {
      Serial.println(F("成功"));
      return true;
    }
    Serial.println(F("失败"));
    if (attempt < MAX_RETRY) { delay(RETRY_INTERVAL); }
  }
  return false;
}

// ================= 初始化 =================
void setup() {
  Serial.begin(115200);
  delay(800);
  pinMode(LED_BUILTIN, OUTPUT);

  Serial.println();
  Serial.println(F("=============================="));
  Serial.println(F("     微弱电信号发生模块"));
  Serial.println(F("=============================="));

  // I2C初始化
  Serial.print(F("[I2C] 初始化总线... "));
  Wire.begin();
  delay(800);
  Serial.println(F("完成"));

  // Si4713初始化
  Serial.print(F("[Si4713] 初始化模块... "));
  if (!initRadio()) {
    Serial.println(F("失败!"));
    while (1) {                          // 初始化失败，LED快速闪烁报警
      digitalWrite(LED_BUILTIN, HIGH);
      delay(200);
      digitalWrite(LED_BUILTIN, LOW);
      delay(200);
    }
  }
  radio.setTXpower(TX_POWER);
  Serial.println(F("完成"));

  // 初始化完成，板载LED常亮
  digitalWrite(LED_BUILTIN, HIGH);
  Serial.println(F("----------------------------------"));
  Serial.println(F("初始化完成! 按r键开始发射"));
  Serial.println(F("----------------------------------"));
}

// ================= 主循环 =================
void loop() {
  // 等待r键启动发射（启动前LED保持常亮）
  if (!transmitting) {
    if (Serial.available()) {
      if (Serial.read() == 'r') {
        transmitting = true;
        Serial.println();
        Serial.println(F("开始发射微弱电信号"));
        radio.tuneFM(FM_FREQUENCY);
        while (Serial.available()) { Serial.read(); }  // 清空缓冲区
      }
    }
    return;
  }

  // 发射状态：LED缓慢闪烁 + 定期状态报告
  static uint32_t lastBlink = 0;
  static bool ledState = false;
  if (millis() - lastBlink >= BLINK_INTERVAL) {
    lastBlink = millis();
    ledState = !ledState;
    digitalWrite(LED_BUILTIN, ledState);
  }

  static uint32_t lastReport = 0;
  if (millis() - lastReport >= REPORT_INTERVAL) {
    lastReport = millis();
    Serial.print(F("[发射中] 载波："));
    Serial.print(FM_FREQUENCY / 100.0, 2);
    Serial.println(F("MHz，调制：100Hz"));
  }
}

#include<ios>tream>
using namespace std;
void loop() {
    //获取PSD两端模拟电压原始值
    int adc0 = ads.readADC_SingleEnded(0); 
    int adc1 = ads.readADC_SingleEnded(1);
    //转换为实际电平值
    float V1 = adc0 * 0.0000625; // 对应ADS1115 62.5uV精度
    float V2 = adc1 * 0.0000625;
    // 计算归一化算子，消除光源强度波动
    if ((V1 + V2) != 0) {
        float P = (V2 - V1) / (V2 + V1);  
        // 物理映射转换
        float x = (L / 2.0) * P;
        float I = (k * x) / (2.0 * D * N * B * S);
        float U = I * Z;
        //输出结果显示
        Serial.print("Voltage(uV):"); Serial.print(I * 1e9); 
        Serial.print("Current(nA):"); Serial.print(U * 1e6); 
    }
    delay(10);
}
int main()
{

    return 0;
}
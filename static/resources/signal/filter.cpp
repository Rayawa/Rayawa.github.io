#include<iostream>
using namespace std;
float getFilteredValue(int sampleCount, int trimCount) {
    int samples[sampleCount];
    // 数据采集
    for (int i = 0; i < sampleCount; i++) {
        samples[i] = ads.readADC_SingleEnded(0);
        delay(1);
    }
    // 数据排序
    for (int i = 0; i < sampleCount - 1; i++) {
        for (int j = 0; j < sampleCount - i - 1; j++) {
            if (samples[j] > samples[j + 1]) {
                int temp = samples[j];
                samples[j] = samples[j + 1];
                samples[j + 1] = temp;
            }
        }
    }
    // 中值滤波
    int median = samples[sampleCount / 2];  // 求出中值
    long long sum_temp = 0;
    for (int i = trimCount; i < sampleCount - trimCount; i++) {
        sum_temp += samples[i];
    }
    float mean_temp = (float)sum_temp / (sampleCount - 2 * trimCount);
    
    float variance = 0;
    for (int i = trimCount; i < sampleCount - trimCount; i++) {
        float diff = samples[i] - mean_temp;
        variance += diff * diff;
    }
    variance /= (sampleCount - 2 * trimCount - 1);
    float stddev = sqrt(variance);
    // 将超出中值±3倍标准差的异常值替换为中值
    for (int i = 0; i < sampleCount; i++) {
        if (fabs(samples[i] - median) > 3 * stddev) {
            samples[i] = median;
        }
    }
    // 截尾平均
    long long sum = 0;
    int effectiveCount = sampleCount - 2 * trimCount;
    for (int i = trimCount; i < sampleCount - trimCount; i++) {
        sum += samples[i];
    }
    float averageRaw = (float)sum / effectiveCount;
    // 转换电压
    const float ADC_TO_VOLTAGE = 0.000125F;  // 根据量程改变
    return averageRaw * ADC_TO_VOLTAGE;
}
int main()
{
   
    return 0;
}
import numpy as np
import sounddevice as sd

frequency = 100       # Hz
sample_rate = 44100   # 采样率
amplitude = 0.3       # 输出幅值 0~1


def callback(outdata, frames, time, status):

    t = np.arange(frames) / sample_rate

    signal = amplitude * np.sin(
        2 * np.pi * frequency * t
    )

    outdata[:, 0] = signal
    outdata[:, 1] = signal


with sd.OutputStream(
    channels=2,
    samplerate=sample_rate,
    callback=callback
):
    print("100Hz output...")
    input()
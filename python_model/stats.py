import numpy as np
import pandas as pd

def moving_average(data, window_size):
    return pd.Series(data).rolling(window=window_size).mean().tolist()

def standard_deviation(data):
    return np.std(data)

def correlation(x, y):
    return np.corrcoef(x, y)[0, 1]

if __name__ == "__main__":
    # Example usage with dummy data
    data_km = [10, 20, 15, 30, 25, 40, 35]
    data_co2 = [2, 4, 3, 6, 5, 8, 7]

    ma = moving_average(data_km, 3)
    std = standard_deviation(data_co2)
    corr = correlation(data_km, data_co2)

    print(f"Moving Average (window 3): {ma}")
    print(f"Standard Deviation of CO2: {std}")
    print(f"Correlation between Km and CO2: {corr}")

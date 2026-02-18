import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import json

# Load dataset
df = pd.read_csv('vehicle_emissions.csv')

# Clean data (simple dropna for demo)
df = df.dropna()

# Select features and target
# Target: CO2 Emissions(g/km)
# Features: Engine Size(L), Fuel Consumption Comb (L/100 km)
# Requirement mentions: engine size, fuel type, mileage, and vehicle year.
# For simplicity with scikit-learn in a script, we need to encode categorical variables.
# We will just use numerical columns for this demo to ensure stability, 
# or do a quick pd.get_dummies if necessary.

features = ['Engine Size(L)', 'Fuel Consumption Comb (L/100 km)']
target = 'CO2 Emissions(g/km)'

X = df[features]
y = df[target]

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)
mse = mean_squared_error(y_test, predictions)
print(f"Mean Squared Error: {mse}")
print(f"Coefficients: {model.coef_}")
print(f"Intercept: {model.intercept_}")

# Export coefficients
coefficients = {
    'features': features,
    'coefficients': model.coef_.tolist(),
    'intercept': model.intercept_
}

with open('regression_coefficients.json', 'w') as f:
    json.dump(coefficients, f, indent=4)

print("Coefficients exported to regression_coefficients.json")

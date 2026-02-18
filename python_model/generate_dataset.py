import pandas as pd
import numpy as np

# Synthetic Data Generation mimicking Kaggle Vehicle CO2 Emissions Dataset
def generate_synthetic_data(num_samples=200):
    makes = ['ACURA', 'AUDI', 'BMW', 'CHEVROLET', 'FORD', 'HONDA', 'HYUNDAI', 'JEEP', 'KIA', 'MAZDA', 'MERCEDES-BENZ', 'NISSAN', 'SUBARU', 'TOYOTA', 'VOLKSWAGEN', 'VOLVO']
    models = ['MODEL_A', 'MODEL_B', 'MODEL_C', 'SUV_X', 'SEDAN_Y', 'HATCH_Z']
    vehicle_classes = ['COMPACT', 'SUV - SMALL', 'MID-SIZE', 'TWO-SEATER', 'MINICOMPACT', 'SUBCOMPACT', 'STATION WAGON - SMALL']
    transmissions = ['AS5', 'M6', 'AV', 'AM7', 'A8', 'A9']
    fuel_types = ['Z', 'X', 'D', 'E'] # Z=Premium, X=Regular, D=Diesel, E=Ethanol

    data = []

    for _ in range(num_samples):
        make = np.random.choice(makes)
        model = np.random.choice(models)
        v_class = np.random.choice(vehicle_classes)
        
        # Engineering constraints (approximate)
        # Higher engine size -> higher fuel consumption -> higher CO2
        engine_size = round(np.random.uniform(1.0, 6.0), 1)
        cylinders = 4 if engine_size < 2.5 else (6 if engine_size < 4.0 else 8)
        
        # Base consumption ranges
        base_consumption = 4.0 + (engine_size * 1.5) + np.random.normal(0, 0.5)
        
        fuel_cons_city = round(base_consumption * 1.1, 1)
        fuel_cons_hwy = round(base_consumption * 0.8, 1)
        fuel_cons_comb = round((fuel_cons_city * 0.55) + (fuel_cons_hwy * 0.45), 1)
        
        # CO2 Calculation Approximation (Comb L/100km * ~23g/L for petrol)
        # 1L of petrol produces ~2.3kg CO2 so ~2300g. If L/100km, then g/km = (L/100 * 2300) / 100? No.
        # 1L petrol = 2392g CO2.
        # If car consumes 8L/100km -> 8 * 2392 / 100 = 191.36 g/km
        co2_emissions = int(fuel_cons_comb * 23.92 + np.random.normal(0, 5))

        mpg = int(235.215 / fuel_cons_comb) # Conversion

        row = [
            make, 
            model, 
            v_class, 
            engine_size, 
            cylinders, 
            np.random.choice(transmissions), 
            np.random.choice(fuel_types),
            fuel_cons_city,
            fuel_cons_hwy,
            fuel_cons_comb,
            mpg,
            co2_emissions
        ]
        data.append(row)

    columns = ['Make','Model','Vehicle Class','Engine Size(L)','Cylinders','Transmission','Fuel Type','Fuel Consumption City (L/100 km)','Fuel Consumption Hwy (L/100 km)','Fuel Consumption Comb (L/100 km)','Fuel Consumption Comb (mpg)','CO2 Emissions(g/km)']
    df = pd.DataFrame(data, columns=columns)
    
    # Save to both python_model and backend/data
    df.to_csv('vehicle_emissions.csv', index=False)
    df.to_csv('../backend/data/vehicle_emissions.csv', index=False)
    print(f"Generated {num_samples} rows of synthetic vehicle data.")

if __name__ == "__main__":
    generate_synthetic_data()

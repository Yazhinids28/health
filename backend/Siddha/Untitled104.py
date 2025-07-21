#!/usr/bin/env python
# coding: utf-8

# In[4]:


import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.compose import ColumnTransformer, make_column_selector as selector
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.pipeline import Pipeline
import numpy as np

# Load dataset
df = pd.read_csv(r"C:\Users\sridharan\Desktop\sidda.csv", encoding="ISO-8859-1")

# Drop rows with missing target values
df.dropna(subset=["health_conditions"], inplace=True)

# Fill missing values
df.fillna({col: 'Unknown' for col in df.select_dtypes(include='object').columns}, inplace=True)
df.fillna(df.select_dtypes(include='number').mean(), inplace=True)

# Define columns
numerical_cols = ['age', 'Height', 'Weight', 'Water Intake', 'Sleep Duration', 'Stress']
categorical_cols = ['diet_preference', 'symptom_severity', 'Gender']
text_col = 'Symptoms'
target_col = 'health_conditions'

# Encode target
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(df[target_col])

# Preprocessing pipeline
preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), numerical_cols),
    ('cat', OneHotEncoder(drop='first', handle_unknown='ignore'), categorical_cols),
    ('text', TfidfVectorizer(max_features=500, stop_words='english'), text_col)
])

# Apply preprocessing
X = preprocessor.fit_transform(df)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=500, max_depth=30, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"\n🎯 Model Accuracy: {accuracy * 100:.2f}%")
print(classification_report(y_test, y_pred, target_names=label_encoder.classes_))


# 🔮 Prediction Function
def predict_health_condition_interactive():
    print("\n🔍 Please provide the following information:")
    user_data = {
        "age": float(input("Age: ")),
        "Height": float(input("Height (in cm): ")),
        "Weight": float(input("Weight (in kg): ")),
        "Water Intake": float(input("Water Intake (liters (1-10)): ")),
        "Sleep Duration": float(input("Sleep Duration (hours (1-10)): ")),
        "Stress": float(input("Stress Level (1-5): ")),
        "diet_preference": input("Diet Preference (Vegan / Vegetarian / Non-Vegetarian / Keto / Pescatarian): ").strip(),
        "symptom_severity": input("Symptom Severity (Mild / Moderate / Severe): ").strip(),
        "Gender": input("Gender (Male / Female): ").strip(),
        "Symptoms": input("Describe your symptoms: ").strip().lower()
    }

    user_df = pd.DataFrame([user_data])

    # Preprocess user input
    transformed_input = preprocessor.transform(user_df)

    # Predict the health condition
    prediction = model.predict(transformed_input)
    predicted_label = label_encoder.inverse_transform(prediction)[0]

    # Find the most relevant match in the dataset with same health condition and diet preference
    matched_row = df[
        (df['health_conditions'] == predicted_label) & 
        (df['diet_preference'].str.lower() == user_data['diet_preference'].lower())
    ].head(1)

    if matched_row.empty:
        print("No matching diet plan found for your condition and diet preference.")
        return

    match = matched_row.iloc[0]

    herbal = match.get("Herbal", "Not Available")
    lifestyle = match.get("Lifestyle", "Not Available")
    weekly_meal = {
        day: match.get(day, "Not Available")
        for day in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    }

    print("\n🧾 Personalized Health Recommendation".center(60))
    print(f"\n🏥 Predicted Health Condition: {predicted_label}")
    print(f"\n🌿 Herbal Remedy: {herbal}")

    print("\n🥗 Weekly Meal Plan:")
    for day, meal in weekly_meal.items():
        print(f"\n📅 {day:<9}:\n {meal}\n")

    print(f"\n🏃 Lifestyle Advice: {lifestyle}")
    print("\n💡 Tip: Follow the plan, stay hydrated, and take care!")
# Run the interactive predictor
predict_health_condition_interactive()


# In[ ]:





from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import numpy as np

app = Flask(__name__)
CORS(app)

# Load and prepare data
df = pd.read_csv(r"C:\Users\sridharan\Desktop\sam.csv", encoding="ISO-8859-1")
df.dropna(subset=["health_conditions"], inplace=True)
df.fillna({col: 'Unknown' for col in df.select_dtypes(include='object').columns}, inplace=True)
df.fillna(df.select_dtypes(include='number').mean(), inplace=True)

# Columns
numerical_cols = ['age', 'Height', 'Weight', 'Water Intake', 'Sleep Duration', 'Stress']
categorical_cols = ['diet_preference', 'symptom_severity', 'Gender']
text_col = 'Symptoms'
target_col = 'health_conditions'

# Encode target
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(df[target_col])

# Preprocessor
preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), numerical_cols),
    ('cat', OneHotEncoder(drop='first', handle_unknown='ignore'), categorical_cols),
    ('text', TfidfVectorizer(max_features=500, stop_words='english'), text_col)
])

# Preprocess input
X = preprocessor.fit_transform(df)

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=500, max_depth=30, random_state=42)
model.fit(X_train, y_train)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    user_df = pd.DataFrame([data])
    transformed_input = preprocessor.transform(user_df)
    prediction = model.predict(transformed_input)
    predicted_label = label_encoder.inverse_transform(prediction)[0]

    matched_row = df[
        (df['health_conditions'] == predicted_label) & 
        (df['diet_preference'].str.lower() == data['diet_preference'].lower())
    ].head(1)

    if matched_row.empty:
        return jsonify({"error": "No matching diet plan found."})

    match = matched_row.iloc[0]
    weekly_meal = {
        day: match.get(day, "Not Available")
        for day in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    }

    response = {
        "predicted_condition": predicted_label,
        "herbal": match.get("Herbal", "Not Available"),
        "lifestyle": match.get("Lifestyle", "Not Available"),
        "weekly_meal": weekly_meal
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, port=5001)

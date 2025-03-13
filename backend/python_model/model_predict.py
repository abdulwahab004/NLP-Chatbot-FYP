import sys
import json
import os
import librosa
import numpy as np
import pandas as pd
import warnings
warnings.filterwarnings("ignore")

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

def extract_features(file_name):
    try:
        audio, sample_rate = librosa.load(file_name, sr=None)
        zero_crossing_rate = np.mean(librosa.feature.zero_crossing_rate(y=audio).T, axis=0)
        rms_energy = np.mean(librosa.feature.rms(y=audio).T, axis=0)
        spectral_centroid = np.mean(librosa.feature.spectral_centroid(y=audio, sr=sample_rate).T, axis=0)
        spectral_bandwidth = np.mean(librosa.feature.spectral_bandwidth(y=audio, sr=sample_rate).T, axis=0)
        spectral_rolloff = np.mean(librosa.feature.spectral_rolloff(y=audio, sr=sample_rate).T, axis=0)
        mfccs = np.mean(librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=13).T, axis=0)
        pitches, magnitudes = librosa.core.piptrack(y=audio, sr=sample_rate)
        pitch = np.mean(pitches[magnitudes > np.median(magnitudes)])
        rms_volume = np.mean(librosa.feature.rms(y=audio))
        features = np.hstack([zero_crossing_rate, rms_energy, spectral_centroid, spectral_bandwidth, spectral_rolloff, mfccs, pitch, rms_volume])
        return features
    except Exception as e:
        return None

# Load training data from CSV
csv_file = 'bird_voice_features.csv'
if not os.path.exists(csv_file):
    print(json.dumps({"error": "Model data not found"}))
    sys.exit(1)

df = pd.read_csv(csv_file)
le = LabelEncoder()
df['label_encoded'] = le.fit_transform(df['label'])
X = df.drop(columns=['label', 'label_encoded'])
y = df['label_encoded']

clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X, y)

# Get the audio file path from command line arguments
if len(sys.argv) < 2:
    print(json.dumps({"error": "No audio file provided"}))
    sys.exit(1)

audio_file = sys.argv[1]
features = extract_features(audio_file)
if features is None:
    print(json.dumps({"error": "Feature extraction failed"}))
    sys.exit(1)
features = features.reshape(1, -1)

prediction = clf.predict(features)
predicted_species = le.inverse_transform(prediction)[0]

# Optionally, add extra details (static mapping for demo purposes)
bird_details = {
    "Black-hooded Oriole": {
        "description": "A striking bird with dark plumage and a unique call.",
        "imageUrl": "https://example.com/blackhoodedoriole.jpg"
    },
    # Add other species details as needed...
}

details = bird_details.get(predicted_species, {"description": "No description available", "imageUrl": ""})
result = {
    "predicted_species": predicted_species,
    "description": details["description"],
    "imageUrl": details["imageUrl"]
}
print(json.dumps(result))

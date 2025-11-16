
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Nur useRouter für Navigation
import * as ImagePicker from 'expo-image-picker';

export default function InstrumentRegistrationScreen() {
  const [serialNumber, setSerialNumber] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false); // State für Validierungsstatus
  const router = useRouter(); // Für Navigation

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Kamera-Zugriff benötigt für Fotos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  // Benutzerdefinierte Validierungsfunktion basierend auf dem Schema (Algo intern gehalten)
  const validateSerialNumber = () => {
    // Schritt 1: Prüfe Länge (5-7 Ziffern) und ob nur Ziffern
    if (serialNumber.length < 5 || serialNumber.length > 7 || !/^\d+$/.test(serialNumber)) {
      Alert.alert('Validierung fehlgeschlagen', 'Ungültige Seriennummer');
      setIsValid(false);
      return;
    }

    // Schritt 2: Drehe die Ziffern um (intern)
    const reversed = serialNumber.split('').reverse().join('');

    // Schritt 3: Parse zu Zahl und prüfe Teilbarkeit durch 314 (intern)
    const reversedNum = parseInt(reversed, 10);
    if (reversedNum % 314 === 0) {
      Alert.alert('Validierung erfolgreich', `Seriennummer "${serialNumber}" ist gültig!`);
      setIsValid(true);
    } else {
      Alert.alert('Validierung fehlgeschlagen', 'Ungültige Seriennummer');
      setIsValid(false);
    }
  };

  // Vereinfachte Registrierungsfunktion (ohne Storage)
  const handleRegister = () => {
    Alert.alert('Erfolg', `Seriennummer "${serialNumber}" wurde registriert!`);

    // Reset Screen und navigiere zurück zum Dashboard
    setSerialNumber('');
    setImage(null);
    setIsValid(false);
    router.push('/'); // Navigiert zum Home-Screen
  };

  // Neu: Funktion für Zurück-Navigation
  const handleBack = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instrument Registrieren</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Seriennummer eingeben (5-7 Ziffern)"
        value={serialNumber}
        onChangeText={setSerialNumber}
        keyboardType="numeric" // Beschränkt Input auf Zahlen
      />
      
      {/* Menüpunkt: Validierungs-Button direkt unter dem Input */}
      <Button title="Seriennummer validieren" onPress={validateSerialNumber} />
      
      <Button title="Kamera öffnen (für Foto/Scan)" onPress={pickImage} />
      
      {image && <Image source={{ uri: image }} style={styles.image} />}
      
      {/* Custom Registrieren-Button mit Farbwechsel */}
      <TouchableOpacity
        style={[
          styles.customButton,
          { backgroundColor: isValid ? 'blue' : 'gray' }
        ]}
        onPress={handleRegister}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>Registrieren</Text>
      </TouchableOpacity>
      
      {/* Custom Zurück-Button statt Link (sichere Alternative) */}
      <TouchableOpacity
        style={styles.customButton}
        onPress={handleBack}
      >
        <Text style={styles.buttonText}>Zurück zum Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '80%',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  customButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'blue', // Standard für Zurück-Button
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

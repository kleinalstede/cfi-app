
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function InstrumentRegistrationScreen() {
  const [serialNumber, setSerialNumber] = useState('');
  const [image, setImage] = useState<string | null>(null);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instrument Registrieren</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Seriennummer eingeben"
        value={serialNumber}
        onChangeText={setSerialNumber}
      />
      
      <Button title="Kamera öffnen (für Foto/Scan)" onPress={pickImage} />
      
      {image && <Image source={{ uri: image }} style={styles.image} />}
      
      <Button
        title="Registrieren (Placeholder)"
        onPress={() => Alert.alert('Erfolg', `Seriennummer: ${serialNumber} registriert!`)}
      />
      
      <Link href="/" asChild>
        <Button title="Zurück zum Dashboard" />
      </Link>
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
});

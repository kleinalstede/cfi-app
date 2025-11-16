
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Willkommen im CFI-App Dashboard</Text>
      
      <Link href="/instrument-registration" asChild>
        <Button title="Instrument registrieren" />
      </Link>
      
      <Link href="/shop" asChild>
        <Button title="Zubehör bestellen" />
      </Link>
      
      <Button
        title="Weitere Features"
        onPress={() => alert('Noch in Entwicklung!')}
      />
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
});

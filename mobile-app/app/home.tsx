
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { AuthContext } from '../context/AuthContext'; // Angenommen, du hast einen AuthContext für Logout und Token (falls nicht, entferne und passe logout an)

const HomeScreen = () => {
  const navigation = useNavigation();
  //const { logout } = useContext(AuthContext); // Angenommen, Logout-Funktion im Context; falls nicht, implementiere eine einfache Funktion

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Willkommen im CFI-App Dashboard</Text>
      <Button title="Instrument registrieren" onPress={() => navigation.navigate('InstrumentRegistration')} />
      <Button title="Zubehör bestellen" onPress={() => navigation.navigate('Shop')} />
      <Button title="News ansehen" onPress={() => navigation.navigate('News')} />
      <Button title="Kontakt zum Hersteller" onPress={() => navigation.navigate('Contact')} />
      <Button title="Logout" onPress={logout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 40, textAlign: 'center' },
});

export default HomeScreen;

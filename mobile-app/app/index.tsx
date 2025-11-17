import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { fetchDashboardData } from './api'; // Jetzt im selben Ordner (app)
export default function HomeScreen() {
  const { t, i18n } = useTranslation(); // Für Übersetzungen
  const [dashboardData, setDashboardData] = useState(null); // Speichert Backend-Daten
  const [loading, setLoading] = useState(true); // Loading-State

  // API-Call beim Laden der Seite
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data); // Setze Daten, z.B. { message: "..." }
      } catch (error) {
        Alert.alert(t('error'), t('api_error')); // Füge "error": "Fehler", "api_error": "Konnte Daten nicht laden" zu JSONs hinzu
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [t]); // t als Dependency, falls Strings ändern

  // Funktion zum Sprachwechsel
  const switchLanguage = () => {
    const newLang = i18n.language === 'de' ? 'en' : 'de';
    i18n.changeLanguage(newLang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('welcome')}</Text>
      
      {loading ? (
        <Text>{t('loading')}</Text>
      ) : (
        <>
          {/* Zeige Backend-Daten, z.B. eine Nachricht */}
          {dashboardData && <Text style={styles.dataText}>{dashboardData.message || JSON.stringify(dashboardData)}</Text>}
          
          <Link href="/instrument-registration" asChild>
            <Button title={t('register_instrument')} />
          </Link>
          
          <Link href="/shop" asChild>
            <Button title={t('order_accessories')} />
          </Link>
          
          <Button
            title={t('more_features')}
            onPress={() => alert(t('in_development'))}
          />
          
          {/* Sprachwechsel-Button */}
          <Button title={t('language_switch')} onPress={switchLanguage} />
        </>
      )}
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
  dataText: {  // Neu: Style für Backend-Daten
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
});

import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';

// Beispiel-Items (erweitere mit echten Produkten)
const shopItems = [
  { id: '1', name: 'Steg (Carbon) (Li-Ion)', price: '59.99 €', description: 'Robuster Steg, perfektes Match für Ihr Instrument.' },
  { id: '2', name: 'Saiten Pirastro Perpetual Cadenza (Typ C)', price: '79.99 €', description: 'Die besten Saiten für Ihre Violine.' },
  { id: '3', name: 'Maintenance-Kit', price: '24.99 €', description: 'mezzo-forte Reinigungstuch + Reinigungsflüssigkeit.' },
  { id: '4', name: 'Schutzhülle', price: '19.99 €', description: 'Staubschutzhülle für Ihre Violine.' },
];

export default function ShopScreen() {
  const renderItem = ({ item }: { item: typeof shopItems[0] }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
      <Button
        title="Bestellen"
        onPress={() => Alert.alert('Bestellung', `${item.name} für ${item.price} bestellt!`)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zubehör Bestellen</Text>
      
      <FlatList
        data={shopItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
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
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
});

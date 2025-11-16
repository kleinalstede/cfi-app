import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="instrument-registration" options={{ title: 'Instrument Registrieren' }} />
      <Stack.Screen name="shop" options={{ title: 'Zubehör Bestellen' }} />
    </Stack>
  );
}
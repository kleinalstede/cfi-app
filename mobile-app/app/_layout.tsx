import { Stack } from 'expo-router';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import aus demselben Ordner (app)

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="instrument-registration" options={{ title: 'Instrument Registrieren' }} />  // Später übersetzbar machen
        <Stack.Screen name="shop" options={{ title: 'Zubehör Bestellen' }} />  // Dito
      </Stack>
    </I18nextProvider>
  );
}
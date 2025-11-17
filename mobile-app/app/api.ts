// app/api.ts
export const registerInstrument = async (instrumentData) => {
  try {
    const response = await fetch('http://localhost:5000/instruments', {  // Passe URL an deine Endpoint an
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(instrumentData),  // z.B. { name: 'Guitar', type: 'Acoustic', serial: '12345' }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();  // Erwarte Success-Response vom Backend
  } catch (error) {
    console.error('Error registering instrument:', error);
    throw error;  // Für Fehlerbehandlung in der Komponente
  }
};
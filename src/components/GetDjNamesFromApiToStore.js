import { useDjStore } from '@/stores/DjStore'

export async function getDjNamesFromApiToStore() {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Fehler beim Abrufen der Benutzernamen')
    }

    const data = await response.json()

    // Filtere die Benutzernamen aus den empfangenen Daten
    const usernames = data.map((user) => user.username)

    // useDjStore().djs wird mit den ApiDaten überschrieben
    useDjStore().setAllDjsFromApi(usernames)
  } catch (error) {
    console.error('Fehler:', error)
    throw error
  }
}

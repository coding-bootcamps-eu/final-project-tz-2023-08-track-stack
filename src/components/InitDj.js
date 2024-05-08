//Initialisiert den AktivenDJ für Pinia

import { useDjStore } from '@/stores/DjStore'

export function initDj() {
  // Eingeloggter DJ in PiniaStore hinterlegen
  const activeDJStorage = JSON.parse(localStorage.getItem('activeDj'))
  useDjStore().setActiveDj(activeDJStorage)

  // Überprüfe ob DJ vorhanden
  const activeDj = useDjStore().getActiveDj
  if (!activeDj) {
    console.log('Kein Aktiver DJ => back to Login!')
    this.$router.push({ path: '/login' }) // Wenn leer, leite den Benutzer zurück
  }
}

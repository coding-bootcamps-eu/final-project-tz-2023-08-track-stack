import { useDjStore } from '@/stores/DjStore'

export function initDj() {
  const activeDJStorage = JSON.parse(localStorage.getItem('activeDj'))
  useDjStore().setActiveDj(activeDJStorage)

  const activeDj = useDjStore().getActiveDj
  if (!activeDj) {
    console.log('Kein Aktiver DJ => zurück zum Login!')
    // this.$router.push({ path: '/login' }) // Hier kannst du den Benutzer zurück zum Login leiten, falls benötigt
  }
}

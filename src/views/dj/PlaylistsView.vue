<template>
  <active-dj class="menu">nicht eingeloggt</active-dj>
  <h2>Playlisten verwalten</h2>
  <p>
    Hier verwaltest du deine Playlisten und kannst ebenfalls neue Playlisten erstellen. Beim Klick
    auf eine der Playlisten kannst du diese bei Bedarf Ändern oder Löschen.
  </p>
  <div class="marginBot">
    <router-link class="fullwidth" to="/create-playlist"
      ><button><i class="si-plus"></i> Playlist erstellen</button></router-link
    >
  </div>
  <!-- Formular zur Anzeige und Verwaltung der Playlisten -->
  <form @submit.prevent>
    <ol>
      <!-- Durchlaufen der Playlists und Erstellen von Listeneinträgen -->
      <li v-for="playlist in playlists" :key="playlist.id">
        <details name="accordion">
          <summary role="button" class="outline contrast">
            {{ playlist.title }}
          </summary>
          <section class="grid">
            <!-- Button zum Bearbeiten der Playlist -->
            <button type="button" @click="editPlaylist(playlist.id)">
              <i class="si-edit"></i> Ändern
            </button>
            <!-- Button zum Löschen der Playlist -->
            <button type="button" @click="deletePlaylist(playlist.id)">
              <i class="si-trash"></i> Löschen
            </button>
          </section>
        </details>
      </li>
    </ol>
  </form>
  <!-- Button zum Zurückgehen zur DJ-Übersicht -->
  <router-link to="/dj-overview">
    <button class="contrast"><i class="si-grid"></i> Zurück zur Übersicht</button>
  </router-link>
</template>

<script>
import { usePlaylistStore } from '@/stores/PlaylistStore'
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  components: { ActiveDj },

  data() {
    return {
      playlists: [] // Array zur Speicherung der Playlists
    }
  },

  created() {
    // Ruft die Playlists ab, sobald die Komponente erstellt wird
    this.fetchPlaylists()
  },

  methods: {
    // Methode zum Bearbeiten einer Playlist
    async editPlaylist(playlistId) {
      const playlistStore = usePlaylistStore()
      // Setzt die aktuelle Playlist-ID im Store
      playlistStore.setCurrentPlaylistId(playlistId)
      // Navigiert zur Bearbeitungsseite der Playlist
      this.$router.push({ path: '/edit-playlist' })
    },

    // Methode zum Abrufen der Playlists
    async fetchPlaylists() {
      // Holt die DJ-ID aus dem lokalen Speicher
      const localStorageDjId = localStorage.getItem('activeDjId')
      if (!localStorageDjId) {
        return
      }

      // Ruft die Playlists vom Server ab
      await usePlaylistStore().fetchPlaylists()
      // Filtert die Playlists nach der DJ-ID
      this.playlists = usePlaylistStore().playlists.filter(
        (playlist) => playlist.djId === localStorageDjId
      )
    },

    // Methode zum Löschen einer Playlist
    // async
    deletePlaylist(playlistId) {
      const playlistStore = usePlaylistStore()
      // if (confirm('Soll die Playlist wirklich gelöscht werden?')) {
      //   // Löscht die Playlist anhand der ID
      //   await playlistStore.deletePlaylist(playlistId)
      //   // Ruft die Playlists erneut ab, um die Liste zu aktualisieren
      //   this.fetchPlaylists()
      // }

      //alert löschen der playlist
      this.$swal
        .fire({
          title: 'Möchtest du die Playlist wirklich löschen?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#5E26ED',
          cancelButtonColor: '#000',
          confirmButtonText: 'Ja, löschen!',
          cancelButtonText: 'abbrechen'
        })
        .then((result) => {
          if (result.isConfirmed) {
            playlistStore.deletePlaylist(playlistId).then(() => {
              this.$swal.fire({
                title: 'Gelöscht!',
                text: 'Die Playlist wurde erfolgreich gelöscht.',
                icon: 'success'
              })
              this.fetchPlaylists()
            })
          }
        })
    }
  }
}
</script>

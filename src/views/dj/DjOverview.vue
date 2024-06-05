<template>
  <active-dj class="menu">nicht eingeloggt</active-dj>

  <h2>Übersicht DJ</h2>
  <p>
    Hier bist du auf deinem Dashboard. Du kannst Playlisten sowie Events erstellen und verwalten.
    Wichtig ist, im ersten Schritt eine Playliste zu erstellen, da diese im folgenden Schritt im
    Event zugewiesen werden muss. Die aktuelle Wunschliste lässt sich unter Events aktivieren.
  </p>
  <div class="grid">
    <div>
      <router-link class="fullwidth" to="/create-playlist"
        ><button><i class="si-plus"></i> Playlist erstellen</button></router-link
      >
    </div>
    <div>
      <router-link class="fullwidth" to="/playlists"
        ><button><i class="si-pencil"></i> Playlists verwalten</button></router-link
      >
    </div>
  </div>
  <hr />
  <div class="grid">
    <div>
      <router-link class="fullwidth" to="/create-event"
        ><button><i class="si-plus"></i> Event erstellen</button></router-link
      >
    </div>
    <div>
      <router-link class="fullwidth" to="/events"
        ><button><i class="si-pencil"></i> Events verwalten</button></router-link
      >
    </div>
  </div>
  <hr />
  <div class="grid">
    <form @submit.prevent="toWishlist">
      <button
        type="submit"
        data-tooltip="Die Wunschliste lässt sich unter Events aktivieren."
        class="contrast"
        :disabled="!isEventActiv"
      >
        <i class="si-server"></i> Zur Wunschliste {{ activeEvent.title }}
      </button>
    </form>
  </div>
</template>

<script>
import ActiveDj from '@/components/ActiveDj.vue'

export default {
  components: { ActiveDj },
  data() {
    return {
      activeEvent: JSON.parse(localStorage.getItem('eventData')) || {}
    }
  },
  computed: {
    isEventActiv() {
      return this.activeEvent.title
    }
  },
  methods: {
    toWishlist() {
      if (this.isEventActiv) {
        this.$router.push('/wishlist')
      }
    }
  }
}
</script>

<script setup>
import { ref } from 'vue'

const drawer = ref(null)
</script>

<!-- <script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'Acceuil', icon: 'mdi-home', link: '/' },
      { title: "Ajouter-tortue", icon: "mdi-note-plus", link: "/add" },
      { title: "À-propos ?", icon: "mdi-help-box", link: "/about" }
    ]
  })
}
</script>
<template>
  <v-card id="inspire">
    <v-layout>
      <v-navigation-drawer v-model="drawer" >
        <v-list-item>
          <v-list-item-title>
            Tortues-App
          </v-list-item-title>
          <v-list-item-subtitle>
            dev-05
          </v-list-item-subtitle>
        </v-list-item>
        <v-divider></v-divider>
        <v-list density="compact">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link :value="item" color="primary">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Application</v-toolbar-title>
      </v-app-bar>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template> -->


<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" theme="dark">
        <v-list-item prepend-avatar="/logo-dark.svg" title="TORTUE-213" nav>
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link :value="item" color="primary">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Application</v-toolbar-title>
      </v-app-bar>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
      items: [
        { title: 'Acceuil', icon: 'mdi-home-city', link: '/' },
        { title: "Ajouter Tortue", icon: "mdi-plus-thick", link: "/add" },
        { title: "À propos ?", icon: "mdi-information-outline", link: "/about" },
        { title: "Connexion", icon: "mdi-network-outline", link: "/connexion" },
        { title: "Logout", icon: "mdi-logout-variant", link: "/logout" },
      ]
    }
  },
}
</script>
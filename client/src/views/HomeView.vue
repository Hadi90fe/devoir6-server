<template>
  <v-container>
    <v-alert border="start" close-text="Close Alert" color="green accent-4" dark dismissible v-if="$route.params.message">
      {{ $route.params.message }}
    </v-alert>
    <v-row no-gutters>
      <v-col sm="4" class="pa-3" v-for="tortue in tortues" :key="tortue._id">
        <v-card class="pa-1" :to="{ name: 'tortue', params: { id: tortue._id } }">
          <v-img height="250" :src="`/${tortue.image}`"></v-img>
          <v-btn class="ml-4 mt-3" small outlined color="indigo">{{ tortue.nom }}</v-btn>
          <v-card-title class="headline">{{ tortue.nomLatin }}</v-card-title>
          <!-- <v-card-subtitle>{{ tortue.nom }}</v-card-subtitle> -->
          <v-card-text>
            <p>{{ tortue.alimentation.substring(0, 27) + "..." }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pagination controls -->
    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination v-model="currentPage" :length="totalPages" rounded="circle"
                @update:current-page="fetchTortues"></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import API from '@/api';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      tortues: [],
      currentPage: 1,
      totalPages: 1,
    };
  },
  created() {
    this.fetchTortues();
  },
  mounted() {
    this.fetchTortues();
  },
  methods: {
    async fetchTortues(page = this.currentPage) {
      const response = await API.getAllTortuesPages(page);
      this.tortues = response.tortues;
      this.totalPages = response.totalPages;
    },
  },
  watch: {
    currentPage(newPage) {
      this.fetchTortues(newPage);
    },
  },
});
</script>
<template>
  <v-container>
    <v-alert border="start" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.$route.params.message">{{ this.$route.params.message }}</v-alert>
    <v-row no-gutters>
      <v-col sm="4" class="pa-3" v-for="tortue in tortues" :key="tortue._id">
        <v-card class="pa-1" :to="{name: 'tortue', params: {id: tortue._id}}">
          <v-img height="250" :src="`/${tortue.image}`"></v-img>
          <v-btn class="ml-4 mt-3" small outlined color="indigo">
            {{ tortue.nom }}
          </v-btn>
          <v-card-title class="headline">
            {{ tortue.nomLatin }}
          </v-card-title>
          <!-- <v-card-subtitle>
            {{ tortue.nom }}
          </v-card-subtitle> -->
          <v-card-text>
            <p>{{ tortue.alimentation.substring(0,27) + "..." }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from '@/api';
import { defineComponent } from 'vue';

// Components

export default defineComponent({
  name: 'HomeView',
  data(){
    return {
      tortues : [],
    };
  },
  async created(){
    const response = await API.getAllTortues();
    this.tortues = response;
  },
});
</script>

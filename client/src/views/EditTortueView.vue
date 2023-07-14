<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Modifier cette Tortue</v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" class="pa-5" @submit.prevent="updateForm" enctype="multipart/form-data">
            <v-text-field v-model="tortue.nom" label="Nom" prepend-icon="mdo-note" :rules="rules"></v-text-field>
            <v-text-field v-model="tortue.nomLatin" label="Nom Latin" prepend-icon="mdo-note" :rules="rules"></v-text-field>
            <v-text-field v-model="tortue.espece" label="Espèce" prepend-icon="mdo-note" :rules="rules"></v-text-field>
            <v-text-field v-model="tortue.vitesse" label="Vitesse" prepend-icon="mdo-note" :rules="rules"></v-text-field>
            <v-text-field v-model="tortue.habitat" label="Habitat" prepend-icon="mdo-note" :rules="rules"></v-text-field>
            <v-text-field v-model="tortue.ageMaximal" label="Âge Maximal" prepend-icon="mdo-note" :rules="rules"></v-text-field>
            <v-text-field v-model="tortue.alimentation" label="Alimentation" prepend-icon="mdo-note" :rules="rules"></v-text-field>
            <v-file-input ref="fileInput" label="Choisir une Image"></v-file-input>
            <v-btn type="submit" class="mt-3 ms-10" color="primary">Sauvegarder</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from '@/api';

export default {
  data() {
    return {
      tortue: {
        nom: '',
        nomLatin: '',
        espece: '',
        vitesse: '',
        habitat: '',
        ageMaximal: '',
        alimentation: '',
      },
      rules: [(value) => !!value || 'Ce champ est obligatoire'],
    };
  },
  async created() {
    try {
      const response = await API.getTortueById(this.$route.params.id);
      this.tortue = response[0];
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async updateForm() {
      try {
        const form = new FormData();
        form.append('old_image', this.tortue.image);
        form.append('image', this.$refs.fileInput.files[0]);
        form.append('nom', this.tortue.nom);
        form.append('nomLatin', this.tortue.nomLatin);
        form.append('espece', this.tortue.espece);
        form.append('vitesse', this.tortue.vitesse);
        form.append('habitat', this.tortue.habitat);
        form.append('ageMaximal', this.tortue.ageMaximal);
        form.append('alimentation', this.tortue.alimentation);

        if (this.$refs.form.validate()) {
          const response = await API.updateTortue(this.$route.params.id, form);
          this.$router.push({ name: 'home', params: { message: response.message } });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

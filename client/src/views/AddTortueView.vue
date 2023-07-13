<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Créer une Tortue</v-card-title>
                    <v-divider></v-divider>
                    <v-form ref="form" class="pa-5" @submit.prevent="submitForm" enctype="multipart/form-data">
                        <v-text-field v-model="tortue.nom" label="Nom" prepend-inner-icon="mdi-tortoise"
                            :rules="rules"></v-text-field>

                        <v-text-field v-model="tortue.nomLatin" label="Nom latin" prepend-inner-icon="mdi-alphabet-latin"
                            :rules="rules"></v-text-field>

                        <v-text-field v-model="tortue.espece" label="Espece" prepend-inner-icon="mdi-turtle"
                            :rules="rules"></v-text-field>

                        <v-text-field v-model="tortue.vitesse" label="Vitesse" prepend-inner-icon="mdi-speedometer"
                            :rules="rules"></v-text-field>

                        <v-text-field v-model="tortue.habitat" label="Habitat" prepend-inner-icon="mdi-home-heart"
                            :rules="rules"></v-text-field>

                        <v-text-field v-model="tortue.ageMaximal" label="Age Maximal" prepend-inner-icon="mdi-human-cane"
                            :rules="rules"></v-text-field>

                        <v-text-field v-model="tortue.alimentation" label="Alimentation" prepend-inner-icon="mdi-noodles"
                            :rules="rules"></v-text-field>

                        <v-file-input prepend-icon="" prepend-inner-icon="mdi-camera" ref="fileInput"
                            label="Choisir une Image"></v-file-input>
                        <v-btn type="submit" class="mt-3 ms-10" color="primary">Ajouter</v-btn>
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

                //image: this.$refs.fileInput.files[0],

            },

            rules: [(value) => !!value || 'Ce champ est obligatoire'],
        };
    },
    methods: {

        // selectFile(fil) {
        //     // this.image = fil.srcElement.files[0].name;
        //     const image = this.$refs.fileInput.files[0];
        // },
        async submitForm() {
            let form = new FormData();
            form.append('image', this.$refs.fileInput.files[0]);
            form.append('nom', this.tortue.nom);
            form.append('nomLatin', this.tortue.nomLatin);
            form.append('espece', this.tortue.espece);
            form.append('vitesse', this.tortue.vitesse);
            form.append('habitat', this.tortue.habitat);
            form.append('ageMaximal', this.tortue.ageMaximal);
            form.append('alimentation', this.tortue.alimentation);
            if (this.$refs.form.validate()) {

                // console.log(Object.fromEntries(form.entries()));
                const response = await API.addTortue(form);
                this.$router.push({ name: 'home', params: { message: response.message } });
            }

        },
    },
};
</script>

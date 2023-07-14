<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height style="width:50%">
            <v-card class="elevation-12">
               <v-toolbar dark color="primary">
                  <v-toolbar-title>Login</v-toolbar-title>
               </v-toolbar>
               <v-card-text>
                  <v-form>
                     <v-text-field v-model="user.email" 
                        prepend-icon="person"
                        name="email"
                        label="E-mail"
                        type="text"
                     ></v-text-field>
                     <v-text-field v-model="user.password" 
                        id="password"
                        prepend-icon="lock"
                        name="password"
                        label="Password"
                        type="password"
                     ></v-text-field>
                  </v-form>
               </v-card-text>
               <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="seLogin">Login</v-btn>
               </v-card-actions>
            </v-card>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>

import API from '@/api';

export default {
    data() {
    return {
        user: {
            email: '',
            password: '',
            
        },
    };
    },
    methods: {
      async seLogin() {
         let formData = new FormData();
            formData.append('email', this.user.email);
            formData.append('password', this.user.password);

            const response = await API.login(formData);

         if (response.token) {
            localStorage.setItem('token',response.token);
            alert('Vous êtes connecté.');
            this.$router.push('/');
         } else {
            // Display error message
            alert('Erreur de connexion.');
         }
      },
   },
};
</script>

<style></style>

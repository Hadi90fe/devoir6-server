<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="pa-4 mx-auto">
                <v-card class="pa-2" >
                    <v-img :src="`/${tortue.image}`"></v-img>
                    <v-card-action class="pb-0">
                        <v-row class="mt-1 mx-1">
                            <v-col sm="4">
                                <h1>{{ tortue.nom }}</h1>
                                <!-- <v-btn small outlined color="primary">{{ tortue.nom }}</v-btn> -->
                            </v-col>
                            <v-col sm="8" class="d-flex justify-end">
                                <v-btn color="success" text :to="{name: 'edit', params:{id: tortue._id}}" >Edit</v-btn>
                                <v-btn class="ms-1" color="red" text @click="deleteTortue(tortue._id)" >Delete</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-action>
                    <v-card-subtitle class="headline">
                        <h3>{{ tortue.nomLatin }}</h3>
                    </v-card-subtitle>
                    <v-card-text class="grey--text">
                        <p>{{ tortue.alimentation }}</p>
                        <p>{{ tortue.vitesse }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from '@/api';

export default {
    data(){
        return {
            tortue:{}
        };
    },
    async created(){
        const response = await API.getTortueById(this.$route.params.id)
        this.tortue = response[0];
    },
    methods:{
        async deleteTortue(id){
            const response = await API.deleteTortue(id);
            this.$router.push({name: 'home', params:{message: response.message}})
        }
    }
}
</script>
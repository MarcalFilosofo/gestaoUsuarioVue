<template>
    <div>
        <h2>Editar usuário</h2>
        <hr>
        <div class="column is-centered">
            <div class="column is-half">
                <div v-if="error != undefined" class="">
                    <div class="notification is-danger">
                        <button class="delete"></button>
                        {{ error }}
                    </div>
                </div>
                <label for="name">Nome</label>
                <input type="text" name="name" id="name" class="input" v-model="name">
                <label for="email">E-mail</label>
                <input type="email" name="email" id="email" class="input" v-model="email">
                <button class="button is-success" :click="update()">Editar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    created(){
        axios.get('http://localhost:8081/users/' + this.$route.params.id).then(response => {
            this.name = response.data.name;
            this.email = response.data.email;
            this.id = response.data.id;
        }).catch(error => {
            console.log(error);
        })
    },
    data(){
        return {
            name: '',
            email: '',
            id: -1,
            error: undefined,
        }
    }, 
    methods: {
        update(){
           axios.put('http://localhost:8081/user/' + this.id, {
               name: this.name,
               email: this.email,
           }).then(response => {
               this.error = undefined;
               this.$router.push({name: 'Home'});
               console.log(response);
           }).catch(error => {
               this.error = error.response.data.error;
               console.log(error);
           })
       }
    }
}
</script>

<style scoped>

</style>
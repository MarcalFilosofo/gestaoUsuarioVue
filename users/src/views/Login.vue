<template>
    <div>
        <h2>Login</h2>
        <hr>
        <div class="column is-centered">
            <div class="column is-half">
                <div v-if="error != undefined" class="">
                    <div class="notification is-danger">
                        <button class="delete"></button>
                        {{ error }}
                    </div>
                </div>
                <label for="email">E-mail</label>
                <input type="email" name="email" id="email" class="input" v-model="email">
                <label for="password">Senha</label>
                <input type="password" name="password" id="password" class="input" v-model="password">
                <button class="button is-success">Cadastrar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    data(){
        return {
            name: '',
            email: '',
            password: '',
            error: undefined,
        }
    }, 
    register(){
        axios.post('http://localhost:8081/login', {
            email: this.email,
            password: this.password
        }).then(response => {
            this.error = undefined;
            localStorage.setItem('token', response.data.token);
            
            this.$router.push({name: 'Home'});
        }).catch(error => {
            this.error = error.response.data.error;
            console.log(error);
        })
    }
}
</script>

<style scoped>

</style>
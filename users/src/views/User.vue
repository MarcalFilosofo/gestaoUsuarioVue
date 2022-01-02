<template>
    <div>
        <h2>Painel de ADM</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>
                        Nome
                    </th>
                    <th>
                        Email
                    </th>
                    <th>
                        Cargo
                    </th>
                    <th>
                        Ações
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in this.users" :key="user.id">
                    <td>{{ user.name }}</td>                    
                    <td>{{ user.email }}</td>                    
                    <td>{{ user.role | processRole }}</td>
                    <td>
                        <button class="button is-danger" :click="toggleModal()">
                            Apagar
                        </button>
                        <router-link :to="{name: 'UserEdit', params: {id: user.id}}">
                            <button class="button is-success">
                                Editar
                            </button>

                        </router-link>
                    </td>                    
                </tr>
            </tbody>
        </table>



        <div :class="{modal: true, 'is-active': showModal}">
            <div class="modal-background"></div>
            <div class="modal-content">
                Realmente quer excluir esse usuário
            </div>  
            <button class="modal-close is-large" arial-label="close" :click="toggleModal()">Fechar</button>
            <button class="modal-close is-large">Excluir</button>
        </div>
    </div>
  
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            users: [],
            showModal: false,
            deleteUserId: -1
        }
    },
    methods: {
        toggleModal(id){
            this.deleteUserId = id;
            this.showModal = !this.showModal;
            deleteUser();
        },
        deleteUser(){
            let req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }

            axios.delete('http://localhost:8081/user/' + this.deleteUserId, req).then(response => {
                this.showModal = false;
                this.users = this.users.filter(user => user.id !== this.deleteUserId);
            }).catch(error => {
                this.showModal = false;
                console.log(error);
            });
        }
    },
    created(){
        let req = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        axios.get('http://localhost:8000/user', req)
        .then(response => {
            this.user = response.data;
        })
    }, 
    filters: {
        processRole: function (value){
            if(value == 1){
                return 'Administrador';
            }else{
                return 'Usuário';
            }
        }
    }
}
</script>

<style scoped>

</style>
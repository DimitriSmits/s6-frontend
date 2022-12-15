<template>
<div class="center">
    <div class="content">
        <div class="input">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="200" />
        </div>
    <form v-on:submit.prevent="onLoginSubmit">
        <div class="input">
        <label for="username">Username</label>
        <span class="p-float-label">          
        <InputText v-model="JSONresponse.username"  />
        </span>
        </div>
        <div class="input">
        <label for="password">Password</label>
        <span class="p-float-label">      
        <PasswordBox v-model="JSONresponse.password" :feedback="false" />
        </span>
        </div>
        <div class="input">
            <ButtonVue type="submit" label="Login"/><br>
            <router-link to="/RegisterPage">No account yet? Register here</router-link>
            
        </div>
    </form>
    </div>
    
</div>
</template>

<script setup>


</script>

<script>
import API_AUTH from '../services/authService';

export default {
    name: 'GDLoginPage',
    data() {
        return {
            JSONresponse: {},
        };
    },
    methods: {
        onLoginSubmit() {

                API_AUTH.auth()
                    .login(JSON.stringify(this.JSONresponse))
                    .then((response) => {
                        let token = response.token;
                        window.localStorage.setItem('token', token);
                        window.location = '/';
                    })
                    .catch((error) => {
                        console.error(error);
                        alert('Wrong username or password');
                    });
        },
    },
};
</script>
<style scoped>

.center{

width: 40%;


margin-left: auto;
margin-right: auto;
margin-top:200px;

}
.content{
text-align: center;

}
.input{
    margin-bottom: 3%;
}
</style>



<template>
    <div class="d-flex flex-row">
        <form v-on:submit.prevent="onLoginSubmit">
            <div class="mb-3">
                <label class="form-label">Patient ID</label>
                <input type="number" class="form-control" v-model="patientId" />
            </div>
            <button type="submit" class="btn btn-primary">Inloggen</button>
        </form>
    </div>
</template>

<script>
import API_AUTH from '../services/authService';
import jwtService from '../services/jwtService';

export default {
    name: 'DigiDLoginPage',
    data() {
        return {
            patientId: null,
        };
    },
    methods: {
        onLoginSubmit() {
            if (Number.isInteger(this.patientId) && this.patientId > 0) {
                API_AUTH.auth()
                    .login(this.patientId)
                    .then((response) => {
                        let token = response.token;
                        let jwt = jwtService.parseJwt(token);

                        window.localStorage.setItem('token', token);
                        if (!jwt.googleConnected) {
                            window.location = '/';
                        } else {
                            window.location = '/';
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        alert('Failed');
                    });
            } else {
                alert('Vul een geldig patiënt ID in.');
            }
        },
    },
};
</script>

<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>

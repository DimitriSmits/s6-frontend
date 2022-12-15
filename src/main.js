import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes'

import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import Menu from 'primevue/menu';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import SelectButton from 'primevue/selectbutton';

import "primevue/resources/primevue.css";
import "primevue/resources/themes/vela-purple/theme.css";
import "primeicons/primeicons.css";

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {ripple: true});

app.component('MenubarTop', Menubar)
app.component('ButtonVue',Button)
app.component('MenuLeft', Menu)
app.component('InputText',InputText)
app.component('PasswordBox',Password)
app.component('FileUpload',FileUpload)
app.component('SelectButton',SelectButton)

app.mount('#app')



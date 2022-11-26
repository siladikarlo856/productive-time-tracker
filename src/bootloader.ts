import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";

import "devextreme/dist/css/dx.light.css";
import "./index.scss";

import App from "./App.vue";
import router from "./router";

const pinia = createPinia();
const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.use(pinia);

// ATTENTION: Axios global config HARDCODED!!!
axios.defaults.baseURL = "https://api.productive.io/api/v2";
axios.defaults.headers.common["X-Auth-Token"] =
  "3fcefcff-3384-44f4-b520-08507ea4b163";
axios.defaults.headers.common["X-Organization-Id"] = "23881";
axios.defaults.headers.post["Content-Type"] = "application/vnd.api+json";

app.provide("axios", app.config.globalProperties.axios); // provide 'axios'

app.mount("#app");

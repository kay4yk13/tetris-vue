import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/store.js";

Vue.config.productionTip = false;

const app = new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");

window.$app = app;


import './styles/main.scss'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store'

Vue.use(Vuex);
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    components: {App},
    template: '<App/>'
});

//setTimeout(()=> document.getElementById('iframe').contentWindow.setStore(store), 1000 );
//setTimeout(()=> document.getElementById('iframe').contentWindow.setColCount(10), 1000 );


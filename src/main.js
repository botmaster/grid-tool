// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueDraggableResizable from 'vue-draggable-resizable'

Vue.config.productionTip = false;
Vue.component('vue-draggable-resizable', VueDraggableResizable);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: {App},
    template: '<App/>'
});

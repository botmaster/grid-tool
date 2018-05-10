import './styles/main.scss'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Grid from './components/GridViewBootstrap'
//import Vuex from 'vuex'
//import store from './store'

Vue.config.productionTip = false;
//Vue.use(Vuex);

const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function() {
            return EventBus
        }
    }
});

/* eslint-disable */
let gridApp = new Vue({
    el: '#gridBootstrap',
    components: {Grid},
    template: '<Grid/>'
});
/* eslint-enable */


/*window.setStore = function (pStore) {
    /!* eslint-disable*!/
    let griddApp = new Vue({
        el: '#grid',
        store: pStore,
        components: {Grid},
        template: '<Grid/>'
    });
    /!* eslint-enable*!/
}*/

window.setColCount = function (pCount) {
    console.log(pCount);
    gridApp.$bus.$emit('colCountChange', pCount);
}
window.setGutterWidth = function (pWidth) {
    console.log(pWidth);
    gridApp.$bus.$emit('gutterWidthChange', pWidth);
}

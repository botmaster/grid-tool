import Vue from "vue";
import Vuex from "vuex";
import gridModule from "./modules/grid-store";
import appdModule from "./modules/app-store";

Vue.use(Vuex);

/* eslint-disable */
const debug = process.env.NODE_ENV !== 'production';
/* eslint-enable */

export default new Vuex.Store({
    modules: {
        appdModule,
        gridModule
    },
    strict: debug
});

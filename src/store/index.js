
import Vue from 'vue'
import Vuex from 'vuex'
import gridModule from './modules/grid'

Vue.use(Vuex)

/* eslint-disable */
const debug = process.env.NODE_ENV !== 'production'
/* eslint-enable */

export default new Vuex.Store({
    modules: {
        gridModule
    },
    strict: debug
})


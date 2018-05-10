import im from '../../api/iframe-message'

// initial state
const state = {
    colCount: 12,
    gutterWidth: 30
}

// getters
const getters = {
    colCount: state => state.colCount,
    gutterWidth: state => state.gutterWidth,
}

// actions
const actions = {

    setColCount(context, value) {
        im.setColCount(value);
        context.commit('setColCount', value);
    },

    setGutterWidth(context, value) {
        im.setGutterWidth(value);
        context.commit('setGutterWidth', value);
    }
}

// mutations
const mutations = {
    setColCount (state, nb) {
        state.colCount = Number(nb);
    },
    setGutterWidth (state, nb) {
        state.gutterWidth = Number(nb);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

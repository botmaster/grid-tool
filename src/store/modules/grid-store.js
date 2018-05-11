import im from '../../api/iframe-message'

// initial state
const state = {
    colCount: 12,
    gutterWidth: 30,
    isFluid: false,
    maxWidth: 1140
}

// getters
const getters = {
    colCount: state => state.colCount,
    gutterWidth: state => state.gutterWidth,
    isFluid: state => state.isFluid,
    maxWidth: state => state.maxWidth,
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
    },

    setIsFluid(context, value) {
        im.setIsFluid(value);
        context.commit('setIsFluid', value);
    },

    setMaxWidth(context, value) {
        im.setMaxWidth(value);
        context.commit('setMaxWidth', value);
    }
}

// mutations
const mutations = {
    setColCount (state, nb) {
        state.colCount = Number(nb);
    },
    setGutterWidth (state, nb) {
        state.gutterWidth = Number(nb);
    },
    setIsFluid (state, value) {
        state.isFluid = value
    },
    setMaxWidth (state, value) {
        state.maxWidth = Number(value);
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}

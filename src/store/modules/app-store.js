// initial state
const state = {
    currentIframe: {
        value: '',
        text: ''
    },
    iframeSrcList: [
        {
            value: 'grid.html',
            text: 'Custom Grid'
        },
        {
            value: 'grid-bootstrap.html',
            text: 'Bootstrap Grid'
        }
    ]
}

// getters
const getters = {
    getCurrentIframeSrc: state => state.currentIframe.value,
    getIframeSrcList: state => state.iframeSrcList,
}

// actions
const actions = {
    setCurrentIframeSrc(context, value) {
        context.commit('setCurrentIframeSrc', value);
    },
}


// mutations
const mutations = {
    setCurrentIframeSrc(state, value) {
        state.currentIframe = value;
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}

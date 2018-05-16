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
    ],
    deviceTypes: [
        {
            name: 'mobile',
            icon: '',
            width: 320
        }
    ],
    currentDevice: {
        name: 'mobile',
        icon: '',
        width: 320
    }
}

// getters
const getters = {
    getCurrentIframeSrc: state => state.currentIframe.value,
    getIframeSrcList: state => state.iframeSrcList,
    getCurrentDeviceType: state => state.currentDevice,
    getDevicescList: state => state.deviceTypes,
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
    },

    setCurrentDevice(state, value) {
        state.currentDevice = value;
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}

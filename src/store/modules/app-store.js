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
            icon: 'fal fa-mobile-android fa-lg',
            width: 320
        },
        {
            name: 'tablet',
            icon: 'fal fa-tablet-android fa-lg',
            width: 768
        },
        {
            name: 'desktop',
            icon: 'fal fa-desktop fa-lg',
            width: 1024
        },
        {
            name: 'custom',
            icon: 'fal fa-desktop fa-lg',
            width: 1200
        }
    ],
    currentDevice: 'custom'
}

// getters
const getters = {
    getIframeSrcList: state => state.iframeSrcList,
    getCurrentIframeSrc: state => state.currentIframe.value,
    getDevicescList: state => state.deviceTypes,
    getCurrentDevice: state => state.currentDevice,
    getCurrentDeviceByName: (state) => (name) => {
        return state.deviceTypes.find(device => device.name === name)
    }
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
    },

    setCustomDeviceWidth(state, value) {
        //TODO: refactor this.
        state.currentDevice = 'custom';
        state.deviceTypes.splice(state.deviceTypes.indexOf(state.deviceTypes.find(device => device.name === 'custom')), 1);
        state.deviceTypes.push({
            name: 'custom',
            icon: 'fal fa-desktop fa-lg',
            width: value
        });
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}

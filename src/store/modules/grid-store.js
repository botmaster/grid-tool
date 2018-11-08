import im from '../../api/iframe-message'

// initial state
const state = {
    colCount: 12,
    gutterWidth: 30,
    gutterUnit: 'px',
    marginWidth: 0,
    marginUnit: 'px',
    gutterIsFluid: false,
    isFluid: false,
    maxWidth: 1140,
    gridType: 0,
    typeList: [{
        name: 'fixed',
        label: 'Largeur fixe'
    }, {
        name: 'fluid',
        label: 'Fuilde'
    }]
};

// getters
const getters = {
    colCount: state => state.colCount,
    gutterWidth: state => state.gutterWidth,
    gutterUnit: state => state.gutterUnit,
    marginWidth: state => state.marginWidth,
    marginUnit: state => state.marginUnit,
    isFluid: state => state.isFluid,
    maxWidth: state => state.maxWidth,
    gutterIsFluid: state => state.gutterIsFluid,
    gridType: state => state.gridType,
    gridTypeList: state => state.typeList
};

// actions
const actions = {

    setColCount(context, value) {
        im.setColCount(value);
        context.commit('setColCount', value);
    },

    setGutterWidth(context, value) {
        im.setGutterWidth({value, 'unit': context.state.gutterUnit });
        context.commit('setGutterWidth', value);
    },

    setGutterUnit(context, value) {

        // On converti la valeur en fonction de l'unité.
        let newValue = null;

        // Si les marges sont en % on les passe en px.
        let marginWidth = context.state.marginUnit === '%' ? context.state.marginWidth / 100 * context.state.maxWidth : context.state.marginWidth;
        switch (value) {
        case 'px':
            context.commit('setGutterUnit', value);
            context.commit('setGutterFluid', false);
            newValue = Math.round(context.state.gutterWidth * (context.state.maxWidth - marginWidth * 2) / 100);
            context.dispatch('setGutterWidth', newValue);
            break;
        case '%':
            context.commit('setGutterUnit', value);
            context.commit('setGutterFluid', true);
            newValue = context.state.gutterWidth / (context.state.maxWidth - marginWidth * 2) * 100;
            context.dispatch('setGutterWidth', newValue);
            break;
        default:
            console.error('setGutterUnit, value not valide');
        }

    },

    setMarginWidth(context, value) {
        im.setMarginWidth({value, 'unit': context.state.marginUnit });
        context.commit('setMarginWidth', value);
    },

    setMarginUnit(context, value) {
        // On converti la valeur en fonction de l'unité.
        switch (value) {
        case 'px':
            context.commit('setMarginUnit', value);
            context.dispatch('setMarginWidth', context.state.marginWidth * context.state.maxWidth / 100);
            break;
        case '%':
            context.commit('setMarginUnit', value);
            context.dispatch('setMarginWidth', context.state.marginWidth / context.state.maxWidth * 100);

            break;
        default:
            console.error('setGutterUnit, value not valide');
        }
    },

    setIsFluid(context, value) {
        im.setIsFluid(value);
        context.commit('setIsFluid', value);
    },

    setMaxWidth(context, value) {
        im.setMaxWidth(value);
        context.commit('setMaxWidth', value);
    },

    setGutterFluid(context, value) {
        context.commit('setGutterFluid', value);

        switch (value) {
        case true:
            context.dispatch('setGutterUnit', '%');
            break;
        case false:
            context.dispatch('setGutterUnit', 'px');
            break;
        default:
            console.error('setGutterFluid, value not valide');
        }
    },

    setGridType (context, type) {
        if(type === 0) {
            im.setIsFluid(false);
            context.commit('setIsFluid', false);
        } else {
            im.setIsFluid(true);
            context.commit('setIsFluid', true);
        }
        context.commit('setGridType', type);

    }
};

// mutations
const mutations = {
    setColCount(state, nb) {
        state.colCount = Number(nb);
    },
    setGutterWidth(state, nb) {
        state.gutterWidth = Number(nb);
    },
    setGutterUnit(state, value) {
        state.gutterUnit = value;
    },
    setMarginWidth(state, nb) {
        state.marginWidth = Number(nb);
    },
    setMarginUnit(state, value) {
        state.marginUnit = value;
    },
    setIsFluid(state, value) {
        state.isFluid = value
    },
    setMaxWidth(state, value) {
        state.maxWidth = Number(value);
    },
    setGutterFluid(state, value) {
        state.gutterIsFluid = Boolean(value);
    },
    setGridType(state, type) {
        state.gridType = Number(type);
    }

};

export default {
    state,
    getters,
    actions,
    mutations
}

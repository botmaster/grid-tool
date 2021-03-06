import "./assets/styles/main.scss";

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Grid from "./components/GridView";
import dom2image from "dom-to-image";

Vue.config.productionTip = false;

const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
    $bus: {
        get: function() {
            return EventBus;
        }
    }
});

/* eslint-disable */
let gridApp = new Vue({
    el: '#grid',
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

window.setColCount = function(pCount) {
    gridApp.$bus.$emit("colCountChange", pCount);
};
window.setGutterWidth = function({ value, unit }) {
    gridApp.$bus.$emit("gutterWidthChange", { value, unit });
};
window.setGutterUnit = function(pUnit) {
    gridApp.$bus.$emit("gutterUnitChange", pUnit);
};
window.setMarginWidth = function({ value, unit }) {
    gridApp.$bus.$emit("marginWidthChange", { value, unit });
};
window.setIsFluid = function(pValue) {
    gridApp.$bus.$emit("isFluidChange", pValue);
};

window.setMaxWidth = function(pValue) {
    gridApp.$bus.$emit("maxWidthChange", pValue);
};

/*window.setGutterFluid = function (pValue) {
    gridApp.$bus.$emit('GutterFluidChange', pValue);
}*/

window.requestSnapshot = function() {
    //gridApp.$bus.$emit('requestSnapshot');
    let node = document.getElementById("snap");
    return dom2image.toPng(node, {});
};

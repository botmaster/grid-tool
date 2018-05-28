

export default {
    setColCount(pCol) {
        document.getElementById('iframe').contentWindow.setColCount(pCol);
    },

    setGutterWidth({value, unit}) {
        document.getElementById('iframe').contentWindow.setGutterWidth({value, unit});
    },

    setMarginWidth(pWidth) {
        document.getElementById('iframe').contentWindow.setMarginWidth(pWidth);
    },

    setIsFluid(pValue) {
        document.getElementById('iframe').contentWindow.setIsFluid(pValue);
    },

    setMaxWidth(pValue) {
        document.getElementById('iframe').contentWindow.setMaxWidth(pValue);
    },

    /*setGutterFluid(pValue) {
        document.getElementById('iframe').contentWindow.setGutterFluid(pValue);
    }*/

}

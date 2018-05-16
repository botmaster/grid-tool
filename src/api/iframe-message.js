

export default {
    setColCount(pCol) {
        document.getElementById('iframe').contentWindow.setColCount(pCol);
    },

    setGutterWidth(pWidth) {
        document.getElementById('iframe').contentWindow.setGutterWidth(pWidth);
    },

    setIsFluid(pValue) {
        document.getElementById('iframe').contentWindow.setIsFluid(pValue);
    },

    setMaxWidth(pValue) {
        document.getElementById('iframe').contentWindow.setMaxWidth(pValue);
    },

    setGutterFluid(pValue) {
        document.getElementById('iframe').contentWindow.setGutterFluid(pValue);
    }

}

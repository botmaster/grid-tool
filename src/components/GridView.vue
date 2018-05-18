<template>
    <div
        class="grid-view"
        ref="gridView"
    >
        <div
            class="snap"
            ref="snap"
            id="snap"
            :style="{maxWidth: isFluid ? 'none' : (containerWidth + 'px')}">
            <div
                class="g-container"
                ref="containerCustom"
                :style="{ maxWidth: isFluid ? 'none' : (containerWidth + 'px'), paddingLeft: margin + 'px', paddingRight: margin + 'px' }">

                <div class="g-row">
                    <div
                        v-for="(i, index) in Number(columnsNum)"
                        :key="index"
                        class="g-col"
                        :style="{ flex: '0 0 ' + colWidth, paddingLeft: isGutterFluid ? paddingFluid : padding, paddingRight: isGutterFluid ? paddingFluid : padding}">
                        {{ i }}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

import dom2image from 'dom-to-image'

export default {
    data() {
        return {
            containerWidth: 1140,
            columnsNum: 12,
            gutterWidth: 30,
            marginWidth: 0,
            isFluid: false,
            isGutterFluid: false
        };
    },
    methods: {
        capture(target) {
            dom2image.toJpeg(this.$refs[target], {}).then((dataUrl) => {
                // var img = new Image();
                // img.src = dataUrl;
                this.$refs.canvasImg.src = dataUrl;
            }).catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
        }
    },
    computed: {
        colWidth: function () {
            let colWidth = this.containerWidth / this.columnsNum;
            return colWidth / this.containerWidth * 100 + '%';
        },
        padding: function () {
            return this.gutterWidth / 2 + 'px';
        },
        margin: function () {
            return this.marginWidth
        },
        paddingFluid: function () {
            return (this.gutterWidth / this.containerWidth * 100) / 2 + '%';
        }
    },
    created() {
        //console.log(this.$store.state.gridModule.colCount);

        this.$bus.$on('colCountChange', (e) => {
            console.log('colCountChange', e);
            this.columnsNum = e;
        });
        this.$bus.$on('gutterWidthChange', (e) => {
            console.log('gutterWidthChange', e);
            this.gutterWidth = e;
        });
        this.$bus.$on('marginWidthChange', (e) => {
            console.log('marginWidthChange', e);
            this.marginWidth = e;
        });
        this.$bus.$on('isFluidChange', (e) => {
            console.log('isFluidChange', e);
            this.isFluid = e;
        });
        this.$bus.$on('maxWidthChange', (e) => {
            console.log('maxWidthChange', e);
            this.containerWidth = e;
        });
        this.$bus.$on('GutterFluidChange', (e) => {
            console.log('GutterFluidChange', e);
            this.isGutterFluid = e;
        });

    },
    beforeDestroy() {
        this.$bus.$off('colCountChange');
        this.$bus.$off('gutterWidthChange');
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    html, body {
        height: 100%;
        //background-color: black;
    }

    .grid-view {
        height: 100%;
        font-size: 10px;
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;

        .snap {
            height: 100%;
            width: 100%;
            flex: 0 0 auto;
        }

        .g-container {
            height: 100%;
            margin: 0 auto;
            padding: 0;
            background-color: #00ffff;
        }

        .g-row {
            position: relative;
            height: 100%;
            background-color: #FFFFFF;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            margin: 0;
            text-align: center;
        }

        .g-col {
            position: relative;
            width: 100%;
            min-height: 1px;
            //background-image: linear-gradient(#00ffff42);
            background-color: #00ffff42;
            background-clip: content-box;
            //height: 400px;
            align-items: stretch;

        }

        .high-light-container {
            background-color: red;
            padding-top: 2px;
            padding-bottom: 2px;
        }
        .high-light-row {
            background-color: #eeeeee;
        }
        .high-light-col {
            background-image: linear-gradient(#f7dddd);
            background-clip: content-box;
        }

        .dom-wrap {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
            //align-items: center;

            > * {
                flex: 0 0 100%;
                width: 100%;
            }
        }
    }
</style>

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
                :style="{'grid-column-gap': gutterGap, 'margin-left':margin, 'margin-right': margin}"
                class="grid-layout"
                style="display: grid; grid-template-columns: repeat(12, 1fr); height: 100%">
                <div
                    v-for="(i, index) in Number(columnsNum)"
                    :key="index">
                    {{ i }}
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
            gutterUnit: 'px',
            marginWidth: 0,
            marginUnit: 'px',
            isFluid: false,
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
        margin: function () {
            return this.marginWidth + this.marginUnit;
        },
        gutterGap() {
            if(this.gutterUnit === '%') {
                return `${this.gutterWidth}%`;
            } else if (this.gutterUnit === 'px') {
                return `${this.gutterWidth}px`;
            }
            else {
                console.error('Impossible d\'interpréter l\'ulinté');
            }
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
            this.gutterWidth = e.value;
            this.gutterUnit = e.unit
        });
        this.$bus.$on('marginWidthChange', (e) => {
            console.log('marginWidthChange', e);
            this.marginWidth = e.value;
            this.marginUnit = e.unit;
        });
        this.$bus.$on('isFluidChange', (e) => {
            console.log('isFluidChange', e);
            this.isFluid = e;
        });
        this.$bus.$on('maxWidthChange', (e) => {
            console.log('maxWidthChange', e);
            this.containerWidth = e;
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

    @import "../styles/abstracts/variables";

    html, body {
        height: 100%;
        background-color: #8e97a0;
    }

    .grid-layout {
        background-color: $white;
        text-align: center;

        > div {
            background-color: $color-pink;
        }
    }

    .grid-view {
        height: 100%;
        font-size: 10px;
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;

        .snap {
            flex: 0 0 auto;
            height: 100%;
            width: 100%;
            background-color: $color-lime;
        }
    }
</style>

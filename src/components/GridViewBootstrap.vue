<template>
    <div class="grid-view">
        <div
            ref="containerBs"
            class="high-light-container"
            :class="isAutoClass">
            <div class="row high-light-row">
                <div
                    v-for="(i, index) in Number(columnsNum)"
                    :key="index"
                    class="col-sm-1 high-light-col text-center">
                    {{ i }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            containerWidth: 1140,
            columnsNum: 12,
            gutterWidth: 30
        };
    },

    methods: {},

    computed: {

        colWidth: function () {
            let colWidth = this.containerWidth / this.columnsNum;
            return colWidth / this.containerWidth * 100 + '%';
        },

        isAutoClass() {
            return {
                'container-fluid': this.containerWidth === 'auto',
                'container': Number(this.containerWidth)
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
            this.gutterWidth = e;
        });

    },

    beforeDestroy() {
        this.$bus.$off('colCountChange');
        this.$bus.$off('gutterWidthChange');
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .grid-view {

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

    }
</style>

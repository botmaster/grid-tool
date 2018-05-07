<template>
    <div class="grid-view">
        <!--<div class="container">
            <div>
                <label for="inputContainerWith">Largeur max du container</label>
                <input
                    v-model.number="containerWidth"
                    name="inputContainerWith"
                    id="inputContainerWith">
            </div>
            <div>
                <label for="inputColNum">Nombre de colonnes</label>
                <input
                    v-model.number="columnsNum"
                    type="number"
                    name="inputColNum"
                    id="inputColNum">
            </div>
            <div>
                <label for="inputGutterWidth">Largeur goutière</label>
                <input
                    v-model.number="gutterWidth"
                    type="number"
                    name="inputGutterWidth"
                    id="inputGutterWidth">
            </div>
            <button
                class="btn btn-primary"
                @click="containerWidth = 'auto'">auto</button>
        </div>-->

        <!-- <div class="container mt-5">
             <div class="row">
                 <div class="col">
                     <h3>Custom grid</h3>
                 </div>
             </div>
         </div>-->

        <div class="dom-wrap">
            <div
                ref="containerCustom"
                class="g-container"
                :style="{ maxWidth: containerWidth !== 'auto' ? (containerWidth + 'px') : 'none' }">
                <div class="g-row">
                    <div
                        v-for="(i, index) in Number(columnsNum)"
                        :key="index"
                        class="g-col"
                        :style="{ flex: '0 0 ' + colWidth, paddingLeft: gutterWidth/2 + 'px', paddingRight: gutterWidth/2 + 'px'}">
                        {{ i }}
                    </div>
                </div>
            </div>
        </div>

        <!--<button
            class="btn btn-secondary"
            @click="capture('containerCustom')">capturer
        </button>-->

        <!--<div class="container mt-5">
            <div class="row">
                <div class="col">
                    <button
                        class="btn btn-secondary"
                        @click="capture('containerCustom')">capturer</button>
                </div>
            </div>
        </div>-->


        <!--<div class="container mt-5">
            <div class="row">
                <div class="col">
                    <h3>Boostrap grid</h3>
                </div>
            </div>
        </div>

        <div class="dom-wrap">
            <div
                ref="containerBs"
                class="high-light-container"
                :class="isAutoClass">
                <div class="row high-light-row">
                    <div
                        v-for="(i, index) in Number(columnsNum)"
                        :key="index"
                        class="col-1 high-light-col">
                        {{ i }}
                    </div>
                </div>
            </div>
        </div>

        <div class="container mt-5">
            <div class="row">
                <div class="col">
                    <button
                        class="btn btn-secondary"
                        @click="capture('containerBs')">capturer</button>
                </div>
            </div>
        </div>-->


        <!--<div class="text-center mt-5">
            <img
                ref="canvasImg"
                id="canvasImg"
                alt="Right click to save me!">
        </div>-->

        <!--<img src="../assets/logo.png">-->

    </div>
</template>

<script>

import dom2image from 'dom-to-image'

export default {
    data() {
        return {
            containerWidth: 1140,
            columnsNum: 12,
            gutterWidth: 30
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

        isAutoClass() {
            return {
                'container-fluid': this.containerWidth === 'auto',
                'container': Number(this.containerWidth)
            }
        }
    },
    created () {
        //console.log(this.$store.state.gridModule.colCount);

        this.$bus.$on('colCountChange', (e)=> {
            console.log('colCountChange', e);
            this.columnsNum = e;
        });
        this.$bus.$on('gutterWidthChange', (e)=> {
            console.log('gutterWidthChange', e);
            this.gutterWidth = e;
        });

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .grid-view {
        .g-container {
            padding: 2px 0;
            background-color: red;
            // margin-right: auto;
            // margin-left: auto;
            background-image: url("~@/assets/logo.png");
        }

        .g-row {
            background-color: #eeeeee;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin: 0;
            text-align: center;
        }

        .g-col {
            position: relative;
            width: 100%;
            min-height: 1px;
            background-image: linear-gradient(#f7dddd);
            background-clip: content-box;
            height: 400px;
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

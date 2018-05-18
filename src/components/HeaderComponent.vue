<template>
    <header
        class="header">
        <div class="header__logo">
            <img
                src="@/assets/lhs-logo.svg"
                alt="LHS"
                width="60px">
        </div>
        <div class="header__container">
            <div class="header__item">
                <label
                    for="gridType"
                    class="label">Type de grille</label>
                <div class="control">
                    <select
                        id="gridType"
                        class="select"
                        @change="changeIframeSrc">
                        <option
                            v-for="option in iframeList"
                            :key="option.value"
                            :value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="header__item">
                <label
                    for="maxWidth"
                    class="label">Largeur maximum</label>
                <div class="control">
                    <input
                        id="maxWidth"
                        v-model="maxWidth"
                        class="input"
                        type="number"
                        min="320"
                        max="3000"
                        step="10">
                    <span>px</span>
                </div>
            </div>
            <div class="header__item">
                <label
                    for="colNumber"
                    class="label">Nombre de colonnes</label>
                <div class="control">
                    <input
                        v-model.number="colCount"
                        class="input"
                        id="colNumber"
                        type="number"
                        min="1"
                        max="30">
                </div>
            </div>
            <div class="header__item">
                <label
                    for="gutterWidth"
                    class="label">Gouttières</label>
                <div class="control">
                    <input
                        v-model.number="gutterWidth"
                        id="gutterWidth"
                        class="input"
                        type="number"
                        min="0"
                        max="400">
                    <span>px</span>
                </div>
            </div>
            <div class="header__item">
                <label
                    for="margesWidth"
                    class="label">Marges</label>
                <div class="control">
                    <input
                        v-model.number="marginWidth"
                        id="margesWidth"
                        class="input"
                        type="number"
                        min="0"
                        max="800">
                    <span>px</span>
                </div>
            </div>
            <div class="header__item header__item--inline">
                <label
                    for="isFluid"
                    class="label">Grille fluide</label>
                <div class="control">
                    <input
                        v-model="isFluid"
                        id="isFluid"
                        type="checkbox"
                        class="checkbox">
                </div>
                <br>
                <label
                    for="isGutterFluid"
                    class="label">Gouttières Fluides</label>
                <div class="control">
                    <input
                        v-model="isGutterFluid"
                        id="isGutterFluid"
                        type="checkbox"
                        class="checkbox">
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent',

    data() {
        return {}
    },
    methods: {
        changeIframeSrc(e) {
            this.$store.dispatch('setCurrentIframeSrc', {
                value: e.target.value,
                text: e.target.options[e.target.selectedIndex].text
            });
        }
    },

    computed: {
        colCount: {
            get() {
                return this.$store.getters.colCount;
            },
            set(value) {
                this.$store.dispatch('setColCount', value);
            }
        },
        gutterWidth: {
            get() {
                return this.$store.getters.gutterWidth;
            },
            set(value) {
                this.$store.dispatch('setGutterWidth', value);
            }
        },
        marginWidth: {
            get() {
                return this.$store.getters.marginWidth;
            },
            set(value) {
                this.$store.dispatch('setMarginWidth', value);
            }
        },
        isFluid: {
            get() {
                return this.$store.getters.isFluid;
            },
            set(value) {
                this.$store.dispatch('setIsFluid', value);
            }
        },
        isGutterFluid: {
            get() {
                return this.$store.getters.gutterIsFluid;
            },
            set(value) {
                this.$store.dispatch('setGutterFluid', value);
            }
        },
        maxWidth: {
            get() {
                return this.$store.getters.maxWidth;
            },
            set(value) {
                this.$store.dispatch('setMaxWidth', value);
            }
        },
        iframeList() {
            return this.$store.getters.getIframeSrcList;
        },
        selectedIframeSrc() {
            return this.$store.getters.getCurrentIframeSrc;
        }


    },
    created() {
        //this.$store.commit('setColCount', 12)
    }
}
</script>

<style scoped lang="scss">
    .header {
        background-color: black;
        color: white;
        display: flex;
        align-items: center;

        &__logo {
            //background-color: red;
            padding: 0 20px;
            flex: 0 0 auto;
        }

        &__container {
            flex: 1;
            /*max-width: 1140px;
            margin: 0 auto;*/
            padding: 20px;
            display: flex;
        }

        &__item {
            flex: 0 0 auto;

            &:not(firstchild) {
                margin-right: 20px;
            }

            .control {
                display: flex;
                align-items: baseline;

                > *:not(:first-child) {
                    margin-left: 5px;
                }
            }

            &--inline {
                .control {
                    display: inline-flex;
                }
            }

        }
    }
</style>

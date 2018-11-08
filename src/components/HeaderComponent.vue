<template>
    <header class="header">
        <!-- Le logo -->
        <a
            href="http://www.lahautesociete.com"
            target="_blank"
            class="header__logo"
        >
            <img src="@/assets/logo-lhs.png" alt="LHS" width="42" />
        </a>

        <!-- Le conteneur -->
        <div class="header__container">
            <!-- Type de grille -->
            <div class="header__item">
                <label for="gridType" class="label">Type de grille</label>
                <select
                    id="gridType"
                    class="custom-select"
                    @change="changeGridType"
                >
                    <option
                        v-for="(option, index) in gridTypeList"
                        :key="index"
                        :value="option.name"
                    >
                        {{ option.label }}
                    </option>
                </select>
            </div>

            <!-- Nombre de colonnes -->
            <div class="header__item">
                <div class="form-group">
                    <label for="colNumber" class="label">Nombre</label>

                    <div class="form-control form-control--gutter">
                        <input
                            v-model.number="colCount"
                            class="form-control border-0 p-0"
                            style="height: auto"
                            id="colNumber"
                            type="number"
                            min="1"
                            max="30"
                        />
                    </div>
                </div>
            </div>

            <!-- Taille gouttières -->
            <div class="header__item">
                <label for="gutterWidth" class="label">Gouttières</label>
                <div class="input-group">
                    <input
                        id="gutterWidth"
                        type="number"
                        class="form-control"
                        v-model.number="gutterWidth"
                        :step="gutterUnit === 'px' ? 1 : 0.1"
                        min="0"
                        max="400"
                    />
                    <div class="input-group-append">
                        <div class="btn-group btn-group-toggle">
                            <label
                                class="btn btn-outline-secondary"
                                :class="{ active: gutterUnit === 'px' }"
                            >
                                <input
                                    v-model="gutterUnit"
                                    type="radio"
                                    name="gutterUnits"
                                    value="px"
                                    autocomplete="off"
                                />px
                            </label>
                            <label
                                class="btn btn-outline-secondary"
                                :class="{ active: gutterUnit === '%' }"
                            >
                                <input
                                    v-model="gutterUnit"
                                    type="radio"
                                    name="gutterUnits"
                                    value="%"
                                    autocomplete="off"
                                />%
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Marges -->
            <div class="header__item header__item--margin">
                <label for="margesWidth" class="label">Marges</label>
                <div class="input-group">
                    <input
                        id="margesWidth"
                        type="number"
                        class="form-control"
                        v-model.number="marginWidth"
                        :step="marginUnit === 'px' ? 1 : 0.1"
                        min="0"
                        max="800"
                    />
                    <div class="input-group-append">
                        <div class="btn-group btn-group-toggle">
                            <label
                                class="btn btn-outline-secondary"
                                :class="{ active: marginUnit === 'px' }"
                            >
                                <input
                                    v-model="marginUnit"
                                    type="radio"
                                    name="marginsUnits"
                                    value="px"
                                    autocomplete="off"
                                />px
                            </label>
                            <label
                                class="btn btn-outline-secondary"
                                :class="{ active: marginUnit === '%' }"
                            >
                                <input
                                    v-model="marginUnit"
                                    type="radio"
                                    name="marginsUnits"
                                    value="%"
                                    autocomplete="off"
                                />%
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Largeur max de la grille -->
            <div class="header__item">
                <div class="form-group">
                    <label for="maxWidth" class="">Largeur maximum</label>
                    <div class="form-inline">
                        <input
                            id="maxWidth"
                            v-model="maxWidth"
                            class="form-control mr-2"
                            type="number"
                            min="320"
                            max="3000"
                            step="10"
                        />
                        <span>px</span>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "HeaderComponent",
    components: {},

    data() {
        return {};
    },
    methods: {
        changeGridType(e) {
            this.$store.dispatch(
                "setGridType",
                e.target.options[e.target.selectedIndex].index
            );
        }
    },

    computed: {
        colCount: {
            get() {
                return this.$store.getters.colCount;
            },
            set(value) {
                this.$store.dispatch("setColCount", value);
            }
        },
        gutterWidth: {
            get() {
                //return Math.round(this.$store.getters.gutterWidth * 100) / 100;
                return this.$store.getters.gutterWidth;
            },
            set(value) {
                this.$store.dispatch("setGutterWidth", value);
            }
        },
        gutterUnit: {
            get() {
                return this.$store.getters.gutterUnit;
            },
            set(value) {
                this.$store.dispatch("setGutterUnit", value);
            }
        },
        marginWidth: {
            get() {
                return this.$store.getters.marginWidth;
            },
            set(value) {
                this.$store.dispatch("setMarginWidth", Number(value));
            }
        },
        marginUnit: {
            get() {
                return this.$store.getters.marginUnit;
            },
            set(value) {
                this.$store.dispatch("setMarginUnit", value);
            }
        },

        maxWidth: {
            get() {
                return this.$store.getters.maxWidth;
            },
            set(value) {
                this.$store.dispatch("setMaxWidth", value);
            }
        },
        gridTypeList() {
            return this.$store.getters.gridTypeList;
        }
    }
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/abstracts/_variables.scss";

.header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    // Le logo
    &__logo {
        //background-color: red;
        padding: 0 20px;
        position: absolute;
        top: 2rem;
        left: 2rem;
    }

    // Le conteneur
    &__container {
        flex: 0 0 auto;
        /*max-width: 1140px;
            margin: 0 auto;*/
        padding: 20px;
        display: flex;
    }

    // Les items du conteneur
    &__item {
        flex: 0 0 auto;

        // On espace les éléments
        &:not(firstchild) {
            margin-right: 20px;
        }

        // L'item des marges
        &--margin {
            .input-group-append {
                > .btn-group {
                    > .btn-outline-secondary:not(:disabled):not(.disabled).active {
                        background-color: $color-lime;
                    }
                }
            }
        }

        // L'item des gouttières
        &--gutter {
        }

        // On customise l'input du nombre de colonnes.
        .form-control--gutter {
            position: relative;
            padding-right: 20px;
            &:after {
                content: "";
                position: absolute;
                right: 6px;
                top: 0;
                bottom: 0;
                margin: auto 0;
                width: 10px;
                height: 10px;
                border-radius: 5px;
                background-color: $color-pink;
            }
        }
    }
}
</style>

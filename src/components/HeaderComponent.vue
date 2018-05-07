<template>
    <header
        class="header">
        <div class="container">
            <!--<button @click="onClick">test</button>-->
            {{ colCount }}
            <div class="header__container">
                <div class="header__item">
                    <label
                        for="widthMax"
                        class="label">Largeur maximum</label>
                    <div class="control">
                        <input
                            id="widthMax"
                            class="input"
                            type="number"
                            min="320"
                            max="3000">
                    </div>
                </div>
                <div class="header__item">
                    <label
                        for="colNumber"
                        class="label">Nombre de colonnes</label>
                    <div class="control">
                        <input
                            v-model.number="colCount"
                            id="colNumber"
                            type="number"
                            min="1"
                            max="30">
                    </div>
                </div>
                <div class="header__item">
                    <label
                        for="gutterWidth"
                        class="label">Goutières</label>
                    <div class="control">
                        <input
                            v-model.number="gutterWidth"
                            id="gutterWidth"
                            type="number"
                            min="0"
                            max="400">
                    </div>
                </div>
            </div>

        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent',

    data() {
        return {
        }
    },

    computed: {
        colCount: {
            get () {
                return this.$store.getters.colCount;
            },
            set (value) {
                //this.$store.commit('setColCount', value);
                this.$store.dispatch('setColCount', value);
            }
        },
        gutterWidth: {
            get () {
                return this.$store.getters.gutterWidth;
            },
            set (value) {
                //this.$store.commit('setColCount', value);
                this.$store.dispatch('setGutterWidth', value);
            }
        }

    },
    created () {
        //this.$store.commit('setColCount', 12)
    }
}
</script>

<style scoped lang="scss">
    .header {
        background-color: black;
        color: white;

        &__container {
            max-width: 1140px;
            margin: 0 auto;
            padding: 20px;
            display: flex;
        }

        &__item {
            flex: 0 0 auto;

            &:not(firstchild) {
                margin-right: 20px;
            }
        }
    }
</style>

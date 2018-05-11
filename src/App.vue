<template>
    <div id="app">
        <div id="app__header">
            <header-component/>
        </div>
        <main id="app__main">

            <div class="iframe-wrapper">
                <resizer-rewamp/>
                <iframe
                    ref="iframe"
                    id="iframe"
                    name="iframeGrid"
                    title="iframeGrid"
                    width="100%"
                    height="100%"
                    frameborder="0"
                    scrolling="yes"
                    marginheight="0"
                    marginwidth="0"
                    :src="selectedIframeSrc"/><!--<div class="dummy"/>-->
            </div>
        </main>

        <footer id="app__footer">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda beatae cum debitis eligendi,
            eveniet illo illum laboriosam minus molestiae nostrum porro, qui quidem rem repudiandae sequi totam velit
            voluptatem!
        </footer>


    </div>
</template>

<script>

// Import Components
import HeaderComponent from './components/HeaderComponent';
import ResizerRewamp from './components/ResizerRewamp';


export default {
    name: 'App',
    data() {
        return {}
    },
    components: {
        ResizerRewamp,
        HeaderComponent
    },
    methods: {

    },
    computed: {
        selectedIframeSrc() {
            return this.$store.getters.getCurrentIframeSrc;
        }
    },
    created() {
        this.$store.dispatch('setCurrentIframeSrc', this.$store.getters.getIframeSrcList[0]);
    }
}
</script>

<style scoped lang="scss">
    #app {

        display: flex;
        flex-direction: column;
        min-height: 100vh;
        position: relative;

        &__header {

        }

        &__main {
            background-color: #ffffff;
            flex: 1;
            position: relative;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        &__footer {
            background-color: black;
            height: 200px;
        }
    }

    .iframe-wrapper {
        position: relative;
        background-color: #f5f4f4;
        width: 100%;
        height: 500px;
        //box-shadow: 0 0 20px #00000045;
    }

    #iframe {
        pointer-events: none;
    }

    .dummy {
        width: 100%;
        height: 100%;
        background-color: aquamarine;
    }


</style>

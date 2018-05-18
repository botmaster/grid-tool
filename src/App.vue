<template>
    <div id="app">
        <div id="app__header">
            <header-component/>
        </div>
        <main id="app__main">
            <div
                class="iframe-wrapper"
                :style="{width: selectedDeviceWidth + 'px'}">
                <resizer-rewamp
                    @resize="onResize"/>
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
            <footer-component @requestCapture="requestCapture"/>
        </footer>

    </div>
</template>

<script>

// Import Components
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ResizerRewamp from './components/ResizerRewamp';


export default {
    name: 'App',
    data() {
        return {
            captureData: ''
        }
    },
    components: {
        ResizerRewamp,
        HeaderComponent,
        FooterComponent
    },
    methods: {
        onResize(e) {
            // On définit le divice courrant sur custom.
            // On stock la largeur de la fenetre.
            this.$store.commit('setCustomDeviceWidth', e.size.width);
        },
        requestCapture() {
            document.getElementById('iframe').contentWindow.requestSnapshot().then((dataUrl) => {
                let link = document.createElement('a');
                link.download = 'my-image-name.png';
                link.href = dataUrl;
                link.click();
            }).catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
        }
    },
    computed: {
        selectedIframeSrc() {
            return this.$store.getters.getCurrentIframeSrc;
        },
        selectedDeviceWidth() {
            return this.$store.getters.getCurrentDeviceByName(this.$store.getters.getCurrentDevice).width;
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
            background-color: #fffefe;
            flex: 1;
            position: relative;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        &__footer {

        }
    }

    .iframe-wrapper {
        position: relative;
        background-color: #f5f4f4;
        width: 100%;
        height: 500px;
        outline: 1px solid #d9d9d9;
        //box-shadow: 0 0 20px #00000010;
        //transition: width 0.8s;
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

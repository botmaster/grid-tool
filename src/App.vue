<template>
    <div id="app">
        <div id="app__header">
            <header-component/>
        </div>
        <main id="app__main">
            <div class="iframe-wrapper">
                <resizer-rewamp @resize="onResize"/>
                <iframe
                    ref="iframe"
                    id="iframe"
                    name="Example2"
                    title="Example2"
                    width="100%"
                    height="100%"
                    frameborder="0"
                    scrolling="yes"
                    marginheight="0"
                    marginwidth="0"
                    src="grid.html"/>
                    <!--<div class="dummy"/>-->
            </div>
        </main>

        <footer id="app__footer">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda beatae cum debitis eligendi, eveniet illo illum laboriosam minus molestiae nostrum porro, qui quidem rem repudiandae sequi totam velit voluptatem!
        </footer>




    </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent';
import ResizerRewamp from './components/ResizerRewamp';

export default {
    name: 'App',
    components: {
        ResizerRewamp,
        HeaderComponent
    },
    methods: {
        onResize() {
            //console.log(e);
            /*this.$refs.iframe.width = e.size.width;
            this.$refs.iframe.height = e.size.height;*/
        },
        onClick() {
            document.getElementById('iframe').contentWindow.alert('tutu');
        }
    },
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
            background-color: #eeeeee;
            flex: 1;
            position: relative;

            display: flex;
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
        background-color: red;
        width: 1140px;
        height: 500px;
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

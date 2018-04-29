<template>
    <div id="app">

        <!--<GridView/>-->
        <!--<editor/>-->
        <!--<div class="iframe-wrapper">
            <vue-draggable-resizable
                :draggable="false"
                :handles="['mr', 'ml']"
                :parent="true"
                drag-handle=".drag">
                <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br></p>
                <div class="drag">Handle</div>
                <iframe
                    id="Example2"
                    name="Example2"
                    title="Example2"
                    width="100%"
                    height="100%"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=es-419&amp;geocode=&amp;q=buenos+aires&amp;sll=37.0625,-95.677068&amp;sspn=38.638819,80.859375&amp;t=h&amp;ie=UTF8&amp;hq=&amp;hnear=Buenos+Aires,+Argentina&amp;z=11&amp;ll=-34.603723,-58.381593&amp;output=embed"/>
            </vue-draggable-resizable>
        </div>-->

        <div class="iframe-wrapper">
            <resizer
                :w="400"
                :minw="100">
                <iframe
                    id="Example2"
                    name="Example2"
                    title="Example2"
                    width="100%"
                    height="100%"
                    frameborder="0"
                    scrolling="yes"
                    marginheight="0"
                    marginwidth="0"
                    src="grid.html"/>
            </resizer>
        </div>


    </div>
</template>

<script>
import GridView from './components/GridView'
import Editor from './components/Editor'
import Resizer from './components/Resizer'

export default {
    name: 'App',
    components: {
        GridView,
        Editor,
        Resizer
    }
}
</script>

<style>
    #app {
        /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        display: flex;
        min-height: 100vh;
    }

    html, body {
        padding: 0;
        margin: 0;
    }

    html {
        box-sizing: border-box;
        -ms-overflow-style: scrollbar;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

    .iframe-wrapper {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: red;
    }

    .dummy {
        width: 100%;
        height: 100%;
        background-color: aquamarine;
    }

</style>

<template>
    <div id="app">

        <GridView/>

    </div>
</template>

<script>
import GridView from './components/GridView'

export default {
    name: 'App',
    components: {
        GridView,
    }
}
</script>

<style>
    #app {
        /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
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

</style>

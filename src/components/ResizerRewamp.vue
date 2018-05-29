<template>
    <div :class="className"/>
</template>
<script>
//import { inRange } from '../util'

export default {
    name: 'VueJsResizer',
    props: {
        minHeight: {
            type: Number,
            default: 0
        },
        minWidth: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            clicked: false,
            size: {}
        }
    },
    mounted () {
        this.$el.addEventListener('mousedown', this.start, false)
    },
    computed: {
        className () {
            return { 'vue-modal-resizer': true, clicked: this.clicked }
        }
    },
    methods: {
        start (event) {
            this.clicked = true

            window.addEventListener('mousemove', this.mousemove, false)
            window.addEventListener('mouseup', this.stop, false)

            event.stopPropagation()
            event.preventDefault()
        },
        stop () {
            this.clicked = false

            window.removeEventListener('mousemove', this.mousemove, false)
            window.removeEventListener('mouseup', this.stop, false)

            this.$emit('resize-stop', {
                element: this.$el.parentElement,
                size: this.size
            })
        },
        mousemove (event) {
            this.resize(event)
        },
        resize (event) {
            let el = this.$el.parentElement
            //debugger;
            if (el) {
                //console.log(event.movementX);
                let width = el.offsetWidth + event.movementX * 2;
                let height = el.offsetHeight + event.movementY * 2;
                //console.log(width, height);

                // width = inRange(this.minWidth, window.innerWidth, width)
                // height = inRange(this.minHeight, window.innerHeight, height)

                this.size = { width, height }
                el.style.width = width + 'px'
                el.style.height = height + 'px'

                this.$emit('resize', {
                    element: el,
                    size: this.size
                })
            }
        }
    }
}
</script>
<style  lang="scss">
    @import "../styles/abstracts/variables";

    .vue-modal-resizer {
        display: block;
        overflow: hidden;
        position: absolute;
        width: 25px;
        height: 25px;
        right: 0;
        bottom: 0;
        z-index: 90;
        background: transparent;
        cursor: se-resize;
    }

    .vue-modal-resizer::after {
        display: block;
        position: absolute;
        content: '';
        background: transparent;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        border-bottom: 20px solid $black;
        border-left: 20px solid transparent;
    }

    .vue-modal-resizer.clicked::after {
        border-bottom: 20px solid $white;
    }
</style>

<template>
    <div
        class="vdr"
        :style="style"
        :class="{
            resizable: resizable,
            dragging: dragging,
            resizing: resizing
        }"
        @mousedown.stop="elmDown"
        @touchstart.prevent.stop="elmDown"
    >
        <div
            v-for="handle in handles"
            v-if="resizable"
            class="handle"
            :key="handle"
            :class="'handle-' + handle"
            @mousedown.stop.prevent="handleDown(handle, $event)"
            @touchstart.stop.prevent="handleDown(handle, $event)"
        />
        <slot/>
    </div>
</template>

<script>

export default {
    replace: true,
    name: 'Resizer',
    props: {
        resizable: {
            type: Boolean, default: true
        },
        w: {
            type: Number,
            default: 200,
            validator: function (val) {
                return val > 0
            }
        },
        h: {
            type: Number,
            default: 200,
            validator: function (val) {
                return val > 0
            }
        },
        minw: {
            type: Number,
            default: 50,
            validator: function (val) {
                return val > 0
            }
        },
        minh: {
            type: Number,
            default: 50,
            validator: function (val) {
                return val > 0
            }
        },
        x: {
            type: Number,
            default: 0,
            validator: function (val) {
                return typeof val === 'number'
            }
        },
        y: {
            type: Number,
            default: 0,
            validator: function (val) {
                return typeof val === 'number'
            }
        },
        z: {
            type: [String, Number],
            default: 'auto',
            validator: function (val) {
                let valid = (typeof val === 'string') ? val === 'auto' : val >= 0;
                return valid
            }
        },
        handles: {
            type: Array,
            default: function () {
                return ['mr']
            },
            validator: function (val) {
                let s = new Set(['mr']);
                return new Set(val.filter(h => s.has(h))).size === val.length;
            }
        },
        grid: {
            type: Array,
            default: function () {
                return [1, 1]
            }
        },
        parent: {
            type: Boolean, default: false
        },
        maximize: {
            type: Boolean, default: false
        }
    },

    created: function () {
        this.parentX = 0
        this.parentW = 9999
        this.parentY = 0
        this.parentH = 9999

        this.mouseX = 0
        this.mouseY = 0

        this.lastMouseX = 0
        this.lastMouseY = 0

        this.mouseOffX = 0
        this.mouseOffY = 0

        this.elmX = 0
        this.elmY = 0

        this.elmW = 0
        this.elmH = 0
    },
    mounted: function () {
        document.documentElement.addEventListener('mousemove', this.handleMove, true)
        document.documentElement.addEventListener('mousedown', this.deselect, true)
        document.documentElement.addEventListener('mouseup', this.handleUp, true)

        this.elmX = parseInt(this.$el.style.left)
        this.elmY = parseInt(this.$el.style.top)
        this.elmW = this.$el.offsetWidth || this.$el.clientWidth
        this.elmH = this.$el.offsetHeight || this.$el.clientHeight

        this.reviewDimensions()
    },
    beforeDestroy: function () {
        document.documentElement.removeEventListener('mousemove', this.handleMove, true)
        document.documentElement.removeEventListener('mousedown', this.deselect, true)
        document.documentElement.removeEventListener('mouseup', this.handleUp, true)
    },

    data: function () {
        return {
            top: this.y,
            left: this.x,
            width: this.w,
            height: this.h,
            resizing: false,
            dragging: false,
            handle: null,
            zIndex: this.z
        }
    },

    methods: {
        reviewDimensions: function () {
            if (this.minw > this.w) this.width = this.minw;

            if (this.minh > this.h) this.height = this.minh;

            if (this.parent) {
                const parentW = parseInt(this.$el.parentNode.clientWidth, 10);
                const parentH = parseInt(this.$el.parentNode.clientHeight, 10);

                this.parentW = parentW;
                this.parentH = parentH;

                if (this.w > this.parentW) this.width = parentW;

                if (this.h > this.parentH) this.height = parentH;

                if ((this.x + this.w) > this.parentW) this.width = parentW - this.x;

                if ((this.y + this.h) > this.parentH) this.height = parentH - this.y;
            }

            this.elmW = this.width;
            this.elmH = this.height;

            this.$emit('resizing', this.left, this.top, this.width, this.height)
        },
        elmDown: function (e) {
            const target = e.target || e.srcElement;

            if (this.$el.contains(target)) {

                this.reviewDimensions();

            }
        },
        deselect: function (e) {

            this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft;

            this.lastMouseX = this.mouseX;

            const target = e.target || e.srcElement;
            const regex = new RegExp('handle-([trmbl]{2})', '');

            if (!this.$el.contains(target) && !regex.test(target.className)) {
                if (this.enabled) {
                    this.enabled = false;

                    this.$emit('deactivated');
                    this.$emit('update:active', false);
                }
            }
        },
        handleDown: function (handle, e) {
            this.handle = handle;

            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();

            this.resizing = true;
        },
        handleMove: function (e) {
            const isTouchMove = e.type.indexOf('touchmove') !== -1
            this.mouseX = isTouchMove
                ? e.touches[0].clientX
                : e.pageX || e.clientX + document.documentElement.scrollLeft

            let diffX = this.mouseX - this.lastMouseX + this.mouseOffX

            this.mouseOffX = 0

            this.lastMouseX = this.mouseX

            let dX = diffX

            if (this.resizing) {


                if (this.handle.indexOf('l') >= 0) {
                    if (this.elmW - dX < this.minw) this.mouseOffX = (dX - (diffX = this.elmW - this.minw))
                    else if (this.parent && this.elmX + dX < this.parentX) this.mouseOffX = (dX - (diffX = this.parentX - this.elmX))
                    this.elmX += diffX
                    this.elmW -= diffX
                }

                if (this.handle.indexOf('r') >= 0) {
                    if (this.elmW + dX < this.minw) this.mouseOffX = (dX - (diffX = this.minw - this.elmW))
                    else if (this.parent && this.elmX + this.elmW + dX > this.parentW) this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))
                    this.elmW += diffX
                }

                this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])

                this.width = (Math.round(this.elmW / this.grid[0]) * this.grid[0])

                this.$emit('resizing', this.left, this.top, this.width, this.height)

            }
        },
        handleUp: function () {
            this.handle = null;
            if (this.resizing) {
                this.resizing = false
                this.$emit('resizestop', this.left, this.top, this.width, this.height)
            }

            this.elmX = this.left
        }
    },

    computed: {
        style: function () {
            return {
                top: this.top + 'px',
                left: this.left + 'px',
                width: this.width + 'px',
                height: this.height + 'px',
                zIndex: this.zIndex
            }
        }
    },

    watch: {
        z: function (val) {
            if (val >= 0 || val === 'auto') {
                this.zIndex = val
            }
        }
    }
}
</script>

<style scoped>
    .vdr {
        position: absolute;
        box-sizing: border-box;
    }

    .handle {
        box-sizing: border-box;
        position: absolute;
        width: 10px;
        height: 10px;
        font-size: 1px;
        background: #EEE;
        border: 1px solid #333;
    }

    .handle-tl {
        top: -10px;
        left: -10px;
        cursor: nw-resize;
    }

    .handle-tm {
        top: -10px;
        left: 50%;
        margin-left: -5px;
        cursor: n-resize;
    }

    .handle-tr {
        top: -10px;
        right: -10px;
        cursor: ne-resize;
    }

    .handle-ml {
        top: 50%;
        margin-top: -5px;
        left: -10px;
        cursor: w-resize;
    }

    .handle-mr {
        top: 50%;
        margin-top: -5px;
        right: -10px;
        cursor: e-resize;
    }

    .handle-bl {
        bottom: -10px;
        left: -10px;
        cursor: sw-resize;
    }

    .handle-bm {
        bottom: -10px;
        left: 50%;
        margin-left: -5px;
        cursor: s-resize;
    }

    .handle-br {
        bottom: -10px;
        right: -10px;
        cursor: se-resize;
    }

    @media only screen and (max-width: 768px) {
        /* For mobile phones: */
        [class*="handle-"]:before {
            content: '';
            left: -10px;
            right: -10px;
            bottom: -10px;
            top: -10px;
            position: absolute;
        }
    }
</style>

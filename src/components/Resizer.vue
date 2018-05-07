<template>
    <div
        class="vdr"
        :style="style"
        :class="{
            resizing: resizing
        }"
    >
        <div
            v-for="handle in handles"
            v-if="resizable"
            class="handle"
            :key="handle"
            :class="'handle-' + handle"
            @mousedown.stop.prevent="handleDown(handle, $event)"
        />
        <div class="info">
            <span class="info__width">{{ style.width }}</span>
        </div>
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
            default: 300,
            validator: function (val) {
                return val > 0
            }
        },
        h: {
            type: Number,
            default: 500,
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
        maxw: {
            type: Number,
            default: 9999,
            validator: function (val) {
                return val > 0
            }
        },
        z: {
            type: [String, Number],
            default: 'auto',
            validator: function (val) {
                return (typeof val === 'string') ? val === 'auto' : val >= 0
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
        }
    },

    created: function () {

    },
    mounted: function () {
        document.documentElement.addEventListener('mousemove', this.handleMove, true);
        document.documentElement.addEventListener('mouseup', this.handleUp, true);
        document.documentElement.addEventListener('mouseleave', this.handleUp, false);

        this.reviewDimensions()

        console.log(document.documentElement);
    },
    beforeDestroy: function () {
        document.documentElement.removeEventListener('mousemove', this.handleMove, true);
        document.documentElement.removeEventListener('mouseup', this.handleUp, true);
        document.documentElement.removeEventListener('mouseleave', this.handleUp, false);
    },

    data: function () {
        return {
            width: this.w,
            height: this.h,
            resizing: false,
            handle: null,
            zIndex: this.z
        }
    },

    methods: {
        reviewDimensions: function () {
            if (this.minw > this.w) this.width = this.minw;

            if (this.minh > this.h) this.height = this.minh;

            this.elmW = this.width;

            this.$emit('resizing', this.left, this.top, this.width, this.height)
        },
        handleDown: function (handle, e) {
            this.handle = handle;

            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();

            this.resizing = true;
        },
        handleMove: function (e) {
            this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft;

            let diffX = this.mouseX - this.lastMouseX + this.mouseOffX;

            this.mouseOffX = 0;

            this.lastMouseX = this.mouseX;


            if (this.resizing) {
                if (this.handle.indexOf('r') >= 0) {
                    this.elmW += Math.round(diffX * 2);
                }

                this.width = (Math.round(this.elmW / this.grid[0]) * this.grid[0]);
                this.$emit('resizing', this.width, this.height)
            }
        },
        handleUp: function () {
            this.handle = null;
            if (this.resizing) {
                this.resizing = false
                this.$emit('resizestop', this.width, this.height)
            }
        }
    },

    computed: {
        style: function () {
            return {
                width: this.width + 'px',
                height: this.height + 'px',
                'min-width': this.minw + 'px',
                'max-width': this.maxw + 'px',
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

<style scoped lang="scss">

    $handelWidth: 50px;

    .vdr {
        position: relative;
        box-sizing: border-box;
    }

    .handle {
        position: absolute;
        width: $handelWidth;
        background: #EEE;
    }

    .handle-mr {
        top: 0;
        bottom: 0;
        right: -$handelWidth;
        cursor: e-resize;
        background-color: #002e3c;
    }

    .info {
        position: absolute;
        top: -24px;
        left: 0;
        right: 0;
        height: 24px;
        display: flex;
        justify-content: flex-end;

        &__width {

        }
    }

</style>

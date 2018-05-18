
<template>
    <transition name="modal-fade">
        <div
            class="modal-backdrop"
            @click.prevent.stop="close">
            <div
                class="modal"
                role="dialog"
                aria-labelledby="modalTitle"
                aria-describedby="modalDescription"
                @click.prevent.stop=""
            >
                <header
                    class="modal-header"
                    id="modalTitle"
                >
                    <slot name="header"/>
                    <button
                        type="button"
                        class="btn-close"
                        @click="close"
                        aria-label="Close modal"
                    >
                        <i class="fal fa-times"/>
                    </button>
                </header>
                <section
                    class="modal-body"
                    id="modalDescription"
                >
                    <slot name="body"/>
                </section>
                <footer class="modal-footer">
                    <slot name="footer">
                        <button
                            type="button"
                            class="btn-green"
                            @click="close"
                            aria-label="Close modal"
                        >
                            Close me!
                        </button>
                    </slot>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Modal',
    methods: {
        close() {
            this.$emit('close');
        },
    },
};
</script>


<style scoped lang="scss">
    .modal-backdrop {
        z-index: 1000;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.15);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background: #FFFFFF;
        box-shadow: 0 0 17px rgba(0, 0, 0, .5);
        overflow-x: auto;
        display: flex;
        flex-direction: column;
    }

    .modal-header,
    .modal-footer {
        padding: 12px 20px;
        display: flex;
    }

    .modal-header {
        /*border-bottom: 1px solid #eeeeee;
        color: #4AAE9B;*/
        justify-content: space-between;
    }

    .modal-footer {
        /*border-top: 1px solid #eeeeee;*/
        justify-content: flex-end;
    }

    .modal-body {
        position: relative;
        padding: 0 20px;
    }

    .btn-close {
        border: none;
        font-size: 20px;
        padding: 10px;
        cursor: pointer;
        font-weight: bold;
        color: #4AAE9B;
        background: transparent;
    }

    .btn-green {
        /*color: white;
        background: #4AAE9B;
        border: 1px solid #4AAE9B;
        border-radius: 2px;*/
    }
</style>

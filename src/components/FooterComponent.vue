<template>
    <div class="footer">
        <div class="footer__container">
            <a
                href="#"
                class="device-item">
                <div class="device-item__icon"><i class="fal fa-mobile-android fa-lg"/></div>
                <div class="device-item__label">mobile</div>
            </a>
            <a
                href="#"
                class="device-item device-item--selected">
                <div class="device-item__icon"><i class="fal fa-tablet-android fa-lg"/></div>
                <div class="device-item__label">tablette</div>
            </a>
            <a
                href="#"
                class="device-item device-item--selected">
                <div class="device-item__icon"><i class="fal fa-desktop fa-lg"/></div>
                <div class="device-item__label">desktop</div>
            </a>
            <div class="footer__form">
                <div class="footer__form-item footer__form-item--inline">
                    <label
                        for="pageWidth"
                        class="label">Largeur page</label>
                    <div class="control">
                        <input
                            id="pageWidth"
                            class="input"
                            type="number"
                            min="320"
                            max="2000"
                            :value="currentDevice"
                            @input="deviceWidthChange">
                        <span>px</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FooterComponent',
    computed: {
        currentDevice() {
            return this.$store.getters.getCurrentDeviceType.width;
        }
    },
    methods: {
        deviceWidthChange() {
            this.$store.commit('setCurrentDevice', {
                name: 'custom',
                icon: '',
                width: 1200
            })
        }
    },
}
</script>

<style scoped lang="scss">

    .footer {
        background-color: #666666;
        height: 200px;
        color: white;

        &__container {
            max-width: 1140px;
            margin: 0 auto;
            padding: 20px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
        }

        &__form {
            width: 120px;
            margin-left: 80px;
        }

        &__form-item {
            flex: 0 0 auto;

            &:not(firstchild) {
                margin-right: 20px;
            }

            .control {
                display: flex;
                align-items: baseline;

                > *:not(:first-child) {
                    margin-left: 5px;
                }
            }

            &--inline {
                .control {
                    display: inline-flex;
                }
            }

        }
    }

    .device-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        $self: &;
        color: white;
        text-decoration: none;

        &:not(:first-child) {
            margin-left: 20px;
        }

        &__icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #999999;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__label {
            margin-top: 10px;
            font-size: 12px;
        }

        &--selected {
            #{ $self }__icon {
                background-color: #1a1a1a;
            }
        }
    }

</style>

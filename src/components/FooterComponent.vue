<template>
    <div class="footer">
        <div class="footer__container">
            <a
                v-for="device in deviceList"
                :key="device.name"
                href="#"
                class="device-item"
                :class="{ 'device-item--selected': $store.getters.getCurrentDevice === device.name }"
                @click="changeDevice(device.name)">
                <div class="device-item__icon"><i :class="device.icon"/></div>
                <div class="device-item__label">{{ device.name }}</div>
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
                            step="10"
                            :value="currentDevice"
                            @input="deviceWidthChange">
                        <span>px</span>
                    </div>
                </div>
            </div>
            <div>
                <button @click.prevent.stop="capture">capture</button>
            </div>
        </div>
    </div>
</template>

<script>

//import dom2image from 'dom-to-image';

export default {
    name: 'FooterComponent',
    computed: {
        currentDevice() {
            return this.$store.getters.getCurrentDeviceByName(this.$store.getters.getCurrentDevice).width;
        },
        deviceList() {
            return this.$store.getters.getDevicescList;
        }
    },
    methods: {
        deviceWidthChange(e) {
            this.$store.commit('setCustomDeviceWidth', Number(e.target.value))
        },
        changeDevice(deviceName) {
            this.$store.commit('setCurrentDevice', deviceName);
        },
        capture() {
            this.$emit('requestCapture');
        }
    },
}
</script>

<style scoped lang="scss">

    .footer {
        background-color: #666666;
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
        $self: &;
        display: flex;
        flex-direction: column;
        align-items: center;
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
            transition: background-color 0.3s;
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

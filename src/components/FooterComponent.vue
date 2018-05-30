<template>
    <div class="footer">
        <div class="footer__container">
            <button-group-component
                :item-list="deviceList"
                :selected="$store.getters.getCurrentDevice"
                @input="changeDevice"/>
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
            <div class="footer__buttons">
                <button
                    @click.prevent.stop="capture"
                    class="button">PNG&nbsp;<i class="fas fa-download"/></button>
            </div>
        </div>
    </div>
</template>

<script>

import ButtonGroupComponent from '@/components/ButtonGroupComponent'

export default {
    name: 'FooterComponent',
    components: {
        ButtonGroupComponent

    },
    computed: {
        currentDevice() {
            return this.$store.getters.getCurrentDeviceByName(this.$store.getters.getCurrentDevice).width;
        },
        deviceList() {
            let devices = this.$store.getters.getDevicescList;
            return devices.map(item => {
                let obj = {...item};
                obj.name = null;
                return obj;
            });
        }
    },
    methods: {
        deviceWidthChange(e) {
            this.$store.commit('setCustomDeviceWidth', Number(e.target.value))
        },
        changeDevice(e) {
            this.$store.commit('setCurrentDevice', e.selected);
        },
        capture() {
            this.$emit('requestCapture');
        }
    },
}
</script>

<style scoped lang="scss">

    .footer {
        //background-color: #666666;
        //color: white;

        &__container {
            max-width: 1140px;
            margin: 0 auto;
            padding: 20px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: flex-end;
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

        &__buttons {
            margin-left: 20px;
        }
    }

    .device-item {
        $self: &;
        display: flex;
        flex-direction: column;
        align-items: center;

        text-decoration: none;

        &:not(:first-child) {
            margin-left: 20px;
        }

        &__icon {
            color: white;
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
            color: inherit;
        }

        &--selected {
            #{ $self }__icon {
                background-color: #1a1a1a;
            }
        }
    }

</style>

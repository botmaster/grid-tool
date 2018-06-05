<template>
    <div class="footer">
        <div class="footer__container">

            <!-- Liste des divices -->
            <div
                class="btn-group">
                <button
                    type="button"
                    class="btn btn-outline-secondary"
                    v-for="(item, index) in deviceList"
                    :key="index"
                    :class="{ 'active': currentDevice.name === item.name }"
                    @click.prevent="changeDevice(item)"
                    :title="item.label">
                    <span
                        v-if="item.icon"
                        class=""><i :class="item.icon"/></span>
                    <span
                        v-if="item.label && item.label !=='' ">{{ item.label }}</span>
                </button>
            </div>

            <!-- Largeur de la page -->
            <div class="footer__form">
                <form class="form-inline">
                    <div class="form-group">
                        <label for="pageWidth">Largeur page</label>
                        <input
                            id="pageWidth"
                            class="form-control ml-2 mr-2"
                            type="number"
                            min="320"
                            max="2000"
                            step="10"
                            :value="currentDevice.width"
                            @input="deviceWidthChange">
                        <span>px</span>
                    </div>
                </form>
            </div>

            <div class="footer__buttons">
                <button
                    @click.prevent.stop="capture"
                    class="btn btn-outline-secondary">PNG&nbsp;<i class="fas fa-download"/></button>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'FooterComponent',
    components: {},
    computed: {
        currentDevice() {
            return this.$store.getters.getCurrentDeviceByName(this.$store.getters.getCurrentDevice);
        },
        deviceList() {
            let devices = this.$store.getters.getDevicescList;
            return devices.map(item => {
                let obj = {...item};
                obj.label = item.name;
                return obj;
            });
        }
    },
    methods: {
        deviceWidthChange(e) {
            this.$store.commit('setCustomDeviceWidth', Number(e.target.value))
        },
        changeDevice(e) {
            //debugger;
            this.$store.commit('setCurrentDevice', e.name);
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
            padding: 20px 0 70px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: flex-end;
        }

        &__form {
            margin-left: 20px;
        }


        &__buttons {
            margin-left: 80px;
        }
    }


</style>

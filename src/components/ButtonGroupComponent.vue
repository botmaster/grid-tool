<template>
    <div
        class="btn-group">

        <button
            type="button"
            class="btn btn-secondary"
            v-for="(item, index) in itemList"
            :key="index"
            :class="{ 'active': current.name === item.name }"
            @click.prevent="updateSelected(index)">
            <span
                v-if="item.name">{{ item.name }}</span>
            <span
                v-if="item.icon"
                class="device-item__icon"><i :class="item.icon"/></span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'ButtonGroupComponent',

    props: {
        itemList: {
            type: Array,
            default: function () {
                return []
            }
        },
        selected: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            current: {}
        }
    },

    methods: {
        updateSelected(index) {
            console.log(index);
            this.current = this.itemList[index];
            this.$emit('input', {'selected': this.current.name});
        }
    },

    created() {
        this.current = this.itemList.find( item => item.name === this.selected);
    }
}
</script>

<style scoped lang="scss">

</style>

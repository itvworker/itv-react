<template lang="html">
        <div class="itv-header">
            <div class="itv-icon-arrow" v-if="showArrow" @click="back"></div>
            <slot></slot>
        </div>
</template>

<script>
export default {
    props: {
        showArrow: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="less" scoped>
.itv-header {
    height: 44ipx;
    background-color: @itv-page-main;
    color: @itv-page-white;
    position: relative;
    text-align: center;
    font-size: 18ipx;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0px;
}
.itv-icon-arrow{
    position: absolute;
    height: 44ipx;
    left: 0px;
    line-height: 44ipx;
    padding-left: 10ipx;
    padding-right: 10ipx;
}
</style>

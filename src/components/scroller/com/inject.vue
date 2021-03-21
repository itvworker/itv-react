<template></template>
<script>
export default {
    props: {
        value:{
            value: Object,
            defalut: ()=>{}
        }
       
    },
    inject:['itvScroller'],
    mounted() {
        this.$emit('input', this.itvScroller)
    }
}
</script>

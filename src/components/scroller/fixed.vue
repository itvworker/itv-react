<template>
    <div class="itv-scroll-fixed">
        <slot />
    </div>
</template>

<script>
import render from '../../libs/render';
export default {
    data() {
        return {
            top: 0,
            height: 0,
            header: '',
            headerHeight: 0,
            maxY: 0,
            y: 0
        }
    },
    mounted() {
       this.init();
       this.$parent.$on('scroll', (res)=>{
           if(res.y > this.top ) {
               this.y =res.y-this.top;
               this.header(0,-this.y,1)
           }else{
               this.y = 0
               this.header(0,-this.y,1)
           }
           
       })
       this.$parent.$on('content', (res)=>{
           this.init();
       })
        
    },
    methods: {
        init() {
            this.top = this.$el.offsetTop;
            this.header = render(this.$el);

        }
    }

}
</script>
<style lang="less">
.fix-action {
    overflow: hidden;
    position: relative;
}
</style>
<template>
    <div class="itv-scroll-evevator">
        <div class="itv-scroll-evevator-header" ref="header">
            <slot name="header">
                {{title}}
            </slot>
        </div>
        <div class="itv-scroll-evevator-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import render from '../../libs/render';
export default {
    props: {
        title: {
            type: String,
            default:""
        }
    },
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
               let y =res.y-this.top;
               if(y>this.maxY) {
                   y = this.maxY
               }
               this.y = y
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
            this.height = this.$el.clientHeight;
            this.header = render(this.$el.children[0]);
            this.headerHeight = this.$el.children[0].clientHeight;
            this.maxY = this.height - this.headerHeight;
        }
    }

}
</script>
<style lang="less">
.itv-scroll-evevator {
    overflow: hidden;
    position: relative;
    .itv-scroll-evevator-header{
        margin-top: -0.5px;
    }
    
}
</style>
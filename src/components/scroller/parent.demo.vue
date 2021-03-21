<template>
    <itv-container class="page-dialog">
        <itv-header>scroller</itv-header>
        
        <itv-main>
            
            <itv-scroller isProvide
             ref="scrolle1" 
            :topBounce="true" 
            :bottomBounce="true" 
            :pullDown="true" 
            pattern="vertical" 
            :percent="0.95"
            :speed="50" 
            tier="parent"


            >
            <img  class="image-header" width="100%" height="200" src="~@/assets/img/github.png" /> 
                 <itv-scroller testKey isInject 
                    class="child-scroller"
                    ref="scrolle2" 
                    :topBounce="true" 
                    :bottomBounce="true" 
                    :pullDown="true" 
                    pattern="vertical" 
                    :percent="0.95"
                    :speed="50" 
                    touchType="custom"
                    tier="child"
                    
                >
                    
                 <div class="item-list" v-for="(item, index) in list" :key="index">
                        {{item.name}}four{{index}}
                    </div>   
                
                </itv-scroller>

            </itv-scroller>
        </itv-main>
    </itv-container>
</template>

<script>
import data from './data'

import Fixed from './fixed.vue';
export default {
    mixins:[data],
    components: {
        Fixed
    },
    data() {
        return {
          list:[],
          columnIndex: 0  
        }
    },
    computed: {
        tabIndex() {
            let index = parseInt(this.$route.query.index)
            return index || 0
        }
    },
    methods: {
        changeList(size, page) {
            for(let i = 0; i <= size; i++) {
                this.list.push({
                    name: '测试一下内容条数'
                })
            }
        },
        scroll(obj) {
            // console.log(`scroll:{ x: ${obj.x}, y: ${obj.y} }`);
        },
        stopscroll(obj) {
            // console.log(`stopscroll:{ x: ${obj.x}, y: ${obj.y} }`);
            
        },
        refersh() {
            console.log('下拉刷新');
            //    setTimeout(()=>{
                
            //        this.$refs.scroller.refresh()
            //    },3000)
        },
        refershone() {
         
            setTimeout(()=>{
                let arr = []; //
                 for(let i=0; i < 30; i++) {
                    arr.push({
                        name:"重新加载数据"
                    })
                }
                this.list = arr;
                
                this.$refs.scrolle3.refresh()
            },1000)
        },
        infiniteone(){
            setTimeout(()=>{
                for(let i=0; i < 20; i++) {
                    this.list.push({
                        name:"加载更多的数据"
                    })
                }
                if(this.list.length>=100) {
                    this.$refs.scrolle3.infinite(true)
                    return
                }
                this.$refs.scrolle3.infinite()
            },3000)
        },
        changeTab(index) {
            if(this.tabIndex === index) return
            let name = this.$route.name;
            this.$router.replace({
                name: name,
                query: {
                    index: index
                }
            })
        },
         
    },
    created() {
        this.changeList(50,1)
    },
    mounted() {
       this.$refs.scrolle2.setChild();
    }

};
</script>

<style lang="less" scoped>

.item {
    height: 60ipx;
    border-bottom: #ddd solid 1px;
    line-height: 30ipx;
    padding: 15ipx;
    box-sizing: border-box;
    font-size: 18ipx;
}

.tab-meun{
    height: 44rpx;
    display: flex;
    .tab-btn{
        height: 44ipx;
        flex: 1;
        text-align: center;
        line-height: 44ipx;
        font-size: 16ipx;
        border-bottom: #ddd solid 1px;
        &.active {
            color: @itv-page-main;
            border-bottom: @itv-page-main solid 2px;
        }
    }
}

.item-list{
    border-bottom: #eee solid 1px;
    padding: 10ipx;
    line-height: 24ipx;
}

.flex-row-box{
    display: flex;
    .flex-row-item {
        flex:1;
        padding: 10ipx 0;
        text-align: center;
        line-height: 24ipx;
        border-bottom: #ddd solid 1px;
        &.active{
            color: #e1251b;
            border-bottom: #e1251b solid 2ipx;
        }
    }
}
.itv-case-box {
    padding: 5ipx;
    display: flex;
    width:fit-content;
    .item-list-section{
        width: 120ipx;;
        border:#ddd solid 1px;
        margin: 5ipx;
        height: 120ipx;
        line-height: 120ipx;
        flex:0 0 auto;
        text-align: center;
        flex-wrap: nowrap;
        
    }
}

.case-box{
    height: 140ipx;
}
.msg-word{
    font-size: 16ipx;
    width: 2000ipx;
    line-height: 32ipx;
    color: #666;
}
.itv-swpier-height {
    height:100%;
}
.swpier-scroller{
    height: 100%;
}
.content-fix{
    /deep/ .fix-action-header {
        background-color: #ddd;
        height: 36ipx;
        padding-left: 16ipx;
        line-height: 36ipx;
    }
    .l1 {
        height: 44ipx;
        line-height: 44ipx;
        padding-left: 15ipx;
    }
}
.child-scroller{
    height: 500pt;
    
}
</style>


 
<template>
    <div class="itv-scroll" @touchstart="touchstart($event,true)" @touchmove="touchmove($event,true)" @touchend="touchend($event,true)" @touchcancel="touchend($event,true)" >
        <!-- 跟随x轴滚动 -->
        <inject-value v-model="parentScroller" v-if="isInject"/>
        <div class="itv-scroll-x-touch" v-if="scrollXel" ref="x" :style="{'transform':`translate3d(-${x},0,0)`,'WebkitTransform':`translate3d(-${x},0,0)`}">
            <slot name="x"/>
        </div>
        <!-- 跟随y轴滚 -->
        <div class="itv-scroll-y-touch" v-if="scrollYel" ref="y" :style="{'transform':`translate3d(0,-${y},0)`,'WebkitTransform':`translate3d(0,-${y},0)`}" >
            <slot name="y"/>
        </div>
        <slot name="other"/>
        <!-- 滚动的内容 -->
        <div class="itv-scroll-content"  >
            <div class="scroller-bar" v-if="showScrollBar" v-show="!hideBarY && maxY > 2 && (cacheDirection === 'vertical' || pattern === 'freedom' )" >
                <div class="scroll-indoor" ref="barY" :style="{'height':scrollbarHeight+'%','transform':`translate3d(0,${scrollbarY}px,0)`,'WebkitTransform':`translate3d(0,${scrollbarY}px,0)`}"></div>
            </div>
            <div class="scroller-barx" v-if="showScrollBar " v-show="!hideBarY && maxX > 2 && (cacheDirection === 'horizontal' || pattern === 'freedom')" >
                <div class="scroll-indoor" ref="barX" :style="{'width':scrollbarWidth+'%','transform':`translate3d(${scrollbarX}px,0,0)`,'WebkitTransform':`translate3d(${scrollbarX}px,0,0)`}"></div>
            </div>
            <div class="itv-scroll-touch" ref="scroller"  :style="{'transform':`translate3d(-${x},-${y},0)`,'WebkitTransform':`translate3d(-${x},-${y},0)`}">
                <div class="pull-top" v-if="pullDown" ref="pull">
                    <slot name='pull'>
                        <div class="spinner-holder">
                            <arrow
                                class="arrow"
                                :class="{'active': status}"
                                v-if="!isTriggerPullDown"
                                :fillColor="refreshLayerColor"
                            ></arrow>
                             <spinner v-show="isTriggerPullDown" :style="{fill: refreshLayerColor, stroke: refreshLayerColor}"></spinner>
                           
                            <span
                                class="text"
                                :style="{color: refreshLayerColor}"
                                v-text="text"
                            ></span>
                        </div>
                    </slot>
                </div>   
                <slot/> 

                <div class="itv-scroller-more" ref="more" v-show='isMore && moreStatus!=="loadingStop"'>
                    <spinner v-show="moreStatus !== 'none'" class="itv-scroller-more-icon" :style="{fill: refreshLayerColor, stroke: refreshLayerColor}" />
                    <span v-show="moreStatus === 'none'">{{noDataText}}</span>
                    <span v-show="moreStatus !== 'none'">{{loadingText}}</span>
                </div>  
            </div>
        </div>    
    </div>
</template>
<script>
import init from './mixins/init.js'
import touch from './mixins/touch.js'
import calc from './mixins/calc.js'
import animate from './mixins/animate.js'
import Spinner from "./com/Spinner.vue";
import Arrow from "./com/Arrow.vue";
import InjectValue from './com/inject.vue';
export default {
    name:'itv-scroller',
    mixins:[init, touch, calc, animate],
    components:{
        Spinner,
        Arrow,
        InjectValue
    },
    props: {
        topBounce: { //顶部是否弹起
            type: Boolean,
            default: false
        },
        bottomBounce: { //底部是否弹起
            type: Boolean,
            default: false
        },
        leftBounce: { //左部是否弹起
            type: Boolean,
            default: false
        },
        rightBounce: { //右部是否弹起
            type: Boolean,
            default: false
        },
        pullDown: { //开启此功能必须，要开启topBounce
            type: Boolean,
            default: false
        },
        pullDis: {
            type: Number,
            default: 60
        },
        
        /**
         * 滑动模式
         * freedom x轴，y轴可自由滚动, 
         * auto 可滚动x轴，y轴，但只能一次滚动一个方向，
         * vertical竖向滚动，
         * horizontal横向滚动
         */
        pattern: { 
            type: String,
            default: 'vertical' 
        },
        /**
         * 触屏方式
         * self自我滚动， 
         * custom自定义 touchstart,touchmove,touchend,touchcancel事件
         */
        touchType: { 
            type: String,
            default: 'self' 
        },
        tier: { //层级
            type: String,
            default: "none" //none不分层 ,parent父层，child为子层
        },
        /**
         * 控制模式
         * none 当没有子层时用none, 
         * 当有子层时：
         * parent  父层为主控制，当父层滚动到底再滚动子层, 当子层滚动到顶部再滚动父层 仅适后一个子层
         * child  子层为主控制，当子层滚动到底再滚动父层, 当父层滚动到顶部再滚动子层 仅适合一个子层
         */
        controlMode: { 
            type: String,
            default:'none' 
        },
        percent: {
            type: Number,
            default: 0.95
        },
        speed: {
            type: Number,
            default: 60
        },
        //是否黒示滚动条
        showScrollBar: {
            type: Boolean,
            default: false
        },

        //开启随y轴滚动dom
        scrollYel:{
            type: Boolean,
            default: false,
        },
         //开启随X轴滚动dom
        scrollXel:{
            type: Boolean,
            default: false,
        },
        

        refreshLayerColor: {
            type: String,
            default: "#AAA"
        },

        loadingLayerColor: {
            type: String,
            default: "#AAA"
        },
        pullText: {
            type: String,
            default: '下拉刷新'
        },
        loseenText: {
            type: String,
            default: '松开刷新'
        },
        refreshText: {
            type: String,
            default: '更新中'
        },
        loadingText: {
            type:String,
            default: "加载中…"
        },
        noDataText:{
            type:String,
            default: "没有更多数据"
        },
        maxSpeed:{
            type: Number,
            default: 50
        },
        isMore: {
            type: Boolean,
            default: false
        },
        isProvide: {
            type: Boolean,
            default: false
        },
        isInject: {
            type: Boolean,
            default: false
        },
        testKey: {
            type: Boolean,
            default: false
        },
        
        
    },
    watch: {
        scrollY(n) {
            if(this.isTriggerPullDown) {
                this.text = this.refreshText;
                return
            }
            if(this.isTouch && n < this.pullDownPoint) {
                this.text = this.loseenText
                this.status = 1
                return
            }

            if(this.isTouch && n > this.pullDownPoint) {
                this.text = this.pullText;
                this.status = 0
                return
            }
            
            this.loadingData(n);
            
            
        }
        
    },
    provide() {
        if(!this.isProvide){
            return {}
        }
        return {
            itvScroller: this
        }
    },
    methods: {
        setChild() {
         
            this.parentScroller.childScroller = this;
        }
    },
    data() {
        return {
            text:"",
            status: 0,
            x: 0, //x轴位置，初始化有用 
            y: 0, //y轴位置, 初始化时有用
            maxY:0, //最大滚动高度
            maxX: 0, //最大滚动宽度,
            touchMoveList:[],//滑动点储存，最多20个滑动点
            startX: 0,//touchstart的触摸点
            startY: 0,//touchstart的触摸点
            moveX: 0,//上次的触摸点
            moveY: 0,//上次的触摸点,
            scrollX: 0, //真实滚动值，只储存
            scrollY: 0, //真实滚动值，只储存
            scrollRender: '', //设定滚动位置 ref=scroller
            scrollXRender: '',//设定滚动位置 ref = y
            scrollYRender: '',//设定滚动位置 ref = x
            scrollBarYRender :'', //y轴滚动动条
            scrollBarXRender :'', //x轴滚动动条

          
            isTouch: false, //是否手指在屏幕上
            isMove: false,//是否在滑动
            direction:null, //滑动方向, 当 pattern=freedom时失效
            cacheDirection:null,
            stepX: 0, //动画每步的时速度的变化值
            stepY: 0, //动画每步的时速度的变化值
            stopStep: 0.5, //当stepX,stepY绝对值小于0.5停止滚动
            scrollToX: null, //滚动到某一点，仅存
            scrollToY: null, //滚动到某一点，仅存
            pullDownPoint: 0, //下拉加载的触发点
            isTriggerPullDown: false, //是否触发了下拉加载
            contentHeight: 0, //可视框高度
            scrollbarY: 0, //缓存真实位置用到
            cacheScrollbarY:0, //缓存用，滚动条y的真实位置
            scrollbarX: 0, //缓存真实位置用到
            cacheScrollbarX:0, //缓存用，滚动条y的真实位置
            hideBarY: true, //不可视化滚动动条
            scrollBarTimeout: '',
            elPostion:{}, //位置滑动区所在的位置
            moreStatus: 'loadingStop', // loading加载中, loadingStop 加载完成，等待下次加载， none //没有更多数据 

            parentScroller: null,
            childScroller: null
        }
    },
    
    
}
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import './itv-scroller.less';

</style>
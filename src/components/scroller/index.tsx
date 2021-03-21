import React from 'react';
import {ScrollerProps, ScrollerState} from './libs/interface'
import '../../assets/css/itv-theme.less';
import './itv-scroller.less';
import Arrow from './com/Arrow';
import Spinner from './com/Spinner'

export default class Scroller extends React.Component<ScrollerProps, ScrollerState> {
    static defaultProps = {
        topBounce: false,
        bottomBounce: false,
        leftBounce: false,
        rightBounce: false,
        pullDown: false,
        pullDis: 60,
        /**
         * 滑动模式
         * freedom x轴，y轴可自由滚动, 
         * auto 可滚动x轴，y轴，但只能一次滚动一个方向，
         * vertical竖向滚动，
         * horizontal横向滚动
         */
        pattern: 'vertical',
        /**
         * 触屏方式
         * self自我滚动， 
         * custom自定义 touchstart,touchmove,touchend,touchcancel事件
         */
        touchType: 'self',
        tier: "none", //none不分层 ,parent父层，child为子层
        /**
         * 控制模式
         * none 当没有子层时用none, 
         * 当有子层时：
         * parent  父层为主控制，当父层滚动到底再滚动子层, 当子层滚动到顶部再滚动父层 仅适后一个子层
         * child  子层为主控制，当子层滚动到底再滚动父层, 当父层滚动到顶部再滚动子层 仅适合一个子层
         */
        controlMode: 'none',
        percent:  0.95,
        speed: 60,
        //是否黒示滚动条
        showScrollBar: false,

        //开启随y轴滚动dom
        scrollYel: false,
        //开启随X轴滚动dom
        scrollXel: false,
        refreshLayerColor: '#aaa',
        loadingLayerColor: "#aaa",
        pullText: '下拉刷新',
        loseenText: '松开刷新',
        refreshText: '更新中',
        loadingText:  "加载中…",
        noDataText:  "没有更多数据",
        maxSpeed: 50,
        isMore: false,
        isProvide: false,
        isInject: false,
        testKey: false,
    }
    constructor(props) {
        super(props)
        this.state = {
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
    }
    
    render() {
        return (
            <div class="itv-scroll" onTouchStart={(e) => this.touchstart(e, true)} inTouchMove={(e) => this.touchmove(e, true)} onTouchEnd={(e) => this.touchend(e, true)} onTouchCancel={(e) => this.touchend(e, true)} >
            {this.props.soltOther}
     
        <div class="itv-scroll-content"  >
            <div class="scroller-bar" v-if={this.props.showScrollBar} v-show="!hideBarY && maxY > 2 && (cacheDirection === 'vertical' || pattern === 'freedom' )" >
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
        )
    }
}


  
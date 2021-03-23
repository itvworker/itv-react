export interface ScrollerProps {
    topBounce: Boolean,
    bottomBounce: Boolean
    leftBounce: Boolean,
    rightBounce: Boolean,
    pullDown: Boolean,
    pullDis: Number,
    /**
     * 滑动模式
     * freedom x轴，y轴可自由滚动, 
     * auto 可滚动x轴，y轴，但只能一次滚动一个方向，
     * vertical竖向滚动，
     * horizontal横向滚动
     */
    pattern: String,
    /**
     * 触屏方式
     * self自我滚动， 
     * custom自定义 touchstart,touchmove,touchend,touchcancel事件
     */
    touchType: String,
    tier: String,
    /**
     * 控制模式
     * none 当没有子层时用none, 
     * 当有子层时：
     * parent  父层为主控制，当父层滚动到底再滚动子层, 当子层滚动到顶部再滚动父层 仅适后一个子层
     * child  子层为主控制，当子层滚动到底再滚动父层, 当父层滚动到顶部再滚动子层 仅适合一个子层
     */
    controlMode: String,
    percent: Number,
    speed: Number,
    //是否黒示滚动条
    showScrollBar: Boolean,

    //开启随y轴滚动dom
    scrollYel:Boolean,
     //开启随X轴滚动dom
    scrollXel: Boolean,
    refreshLayerColor: String,
    loadingLayerColor: String,
    pullText: String,
    loseenText: String,
    refreshText: String,
    loadingText: String,
    noDataText: String,
    maxSpeed: Number
    isMore: Boolean,
    isProvide: Boolean,
    isInject: Boolean,
    testKey: Boolean,
}

export interface ScrollerState {
    text: String,
    status: Number,
    x: Number, //x轴位置，初始化有用 
    y: Number, //y轴位置, 初始化时有用
    maxY: Number, //最大滚动高度
    maxX: Number, //最大滚动宽度,
    touchMoveList: Array,//滑动点储存，最多20个滑动点
    startX: Number,//touchstart的触摸点
    startY: Number,//touchstart的触摸点
    moveX: Number,//上次的触摸点
    moveY: Number,//上次的触摸点,
    scrollX: Number, //真实滚动值，只储存
    scrollY: Number, //真实滚动值，只储存
    scrollRender: Object, //设定滚动位置 ref=scroller
    scrollXRender: Object,//设定滚动位置 ref = y
    scrollYRender: Object,//设定滚动位置 ref = x
    scrollBarYRender :Object, //y轴滚动动条
    scrollBarXRender :Object, //x轴滚动动条

    
    isTouch: Boolean, //是否手指在屏幕上
    isMove: Boolean,//是否在滑动
    direction: String, //滑动方向, 当 pattern=freedom时失效
    cacheDirection: String,
    stepX: Number, //动画每步的时速度的变化值
    stepY: Number, //动画每步的时速度的变化值
    stopStep: Number, //当stepX,stepY绝对值小于0.5停止滚动
    scrollToX: Number, //滚动到某一点，仅存
    scrollToY: Number, //滚动到某一点，仅存
    pullDownPoint: Number, //下拉加载的触发点
    isTriggerPullDown: Boolean, //是否触发了下拉加载
    contentHeight: Number, //可视框高度
    scrollbarY: Number, //缓存真实位置用到
    cacheScrollbarY: Number, //缓存用，滚动条y的真实位置
    scrollbarX: Number, //缓存真实位置用到
    cacheScrollbarX: Number, //缓存用，滚动条y的真实位置
    hideBarY: Boolean, //不可视化滚动动条
    scrollBarTimeout: Number,
    elPostion: Object, //位置滑动区所在的位置
    moreStatus: String, // loading加载中, loadingStop 加载完成，等待下次加载， none //没有更多数据 
    contentWidth: Number,
    parentScroller: null,
    childScroller: null
  }

import getDirection from '../../../libs/touch'
const Touch = {
    touchstart(e, self) {
        
        //启用自定义调用事件
        this.elPositon = this.root.current.getBoundingClientRect();
        if(this.props.touchType === 'custom' && self) return
        if (e.target.tagName.match(/input|textarea|select/i)) {
            return
        }
        this.cache.direction = null;
        this.cache.isTouch = true;
        this.cache.scrollToX = null;
        this.cache.scrollToY = null;
        let touches = e.touches;
        if(this.tier === 'parent') {
            
            this.cache.childScroller.touchMoveList = this.cache.touchMoveList;
        }
        this.cache.touchMoveList.splice(0, this.cache.touchMoveList.length)
        //检查手指数量
        if (touches.length == null) {
            throw new Error("Invalid touch list: " + touches);
        }
        

        // 两只手指滑动处理中心点
        
        let isSingleTouch = touches.length === 1;
        if (isSingleTouch) {
            this.cache.moveX = touches[0].pageX;
            this.cache.moveY = touches[0].pageY;
        } else {
            this.cache.moveX = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
            this.cache.moveY = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
        }
        this.cache.startX = this.moveX 
        this.cache.startY = this.moveY

        
        this.cache.touchMoveList.push({
            x: this.cache.moveX,
            y: this.cache.moveY,
            time: new Date().getTime()
        })

    },

    
    touchmove(e, self) {
        //启用自定义调用事件
        e.passive = false;
        e.preventDefault();
        if(this.props.touchType === 'custom' && self) return
        if(this.cache.isTouch ===false) return
        
        let touches = e.touches;
        //检查手指数量
        if (touches.length == null) {
            throw new Error("Invalid touch list: " + touches);
        }
        
        // 两只手指滑动处理中心点
        let moveX, moveY
        let isSingleTouch = touches.length === 1;
        if (isSingleTouch) {
            moveX = touches[0].pageX;
            moveY = touches[0].pageY;
        } else {
            moveX = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
            moveY = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
        }
        
        let upxy = this.cache.touchMoveList[this.cache.touchMoveList.length-1];
        this.cache.moveX = upxy.x;
        this.cache.moveY = upxy.y;
        let positon = this.elPositon
        if(moveX  < positon.left || moveX  > positon.right ||  moveY < positon.top ||  moveY > positon.bottom) {
            this.touchend(e)
            return
        }

        //判断滑动方向，并获取滑动距离
        let res = getDirection(this.cache.moveX, this.cache.moveY, moveX, moveY, this.cache.direction)
        //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
        if(!res) return
        
        
        if((res.type===1 || res.type === 2) && !this.cache.direction) {
            this.cache.direction = 'vertical'
            this.cache.cacheDirection = 'vertical'
        }
        if((res.type===3 || res.type === 4) && !this.cache.direction) {
            this.cache.direction = 'horizontal'
            this.cache.cacheDirection = 'horizontal'  
        }
        if(!this.cache.direction) return

       
        // this.moveX = moveX;
        // this.moveY = moveY;
        this.cache.touchMoveList.push({
            x: moveX,
            y: moveY,
            time: new Date().getTime()
        })
        /**
         * 滑动模式
         * freedom x轴，y轴可自由滚动, 
         * auto 可滚动x轴，y轴，但只能一次滚动一个方向，
         * vertical竖向滚动，
         * horizontal横向滚动
        */
       
      
        if(this.isVertcialMove || this.props.pattern === 'freedom') {
            let scrollY = this.cache.scrollY - res.angy;

            if(this.props.pattern === 'vertical' && this.props.pattern !== 'freedom') {
                this.cache.scrollX = 0;
            }
            //允许弹动时
            if((scrollY < 0 && this.props.topBounce) || (scrollY > this.cache.maxY && this.props.bottomBounce)) {
                if((this.cache.scrollY < 0 && res.angy > 0) || (this.cache.scrollY > this.cache.maxY && res.angy < 0) ) {
                    scrollY = this.cache.scrollY - (res.angy*0.5)
                }
            }
            //不许弹动时
            if(scrollY < 0 && !this.props.topBounce) {
                scrollY = 0
            }
            //不许弹动时
            if(scrollY > this.cache.maxY && !this.props.bottomBounce) {
                scrollY = this.cache.maxY
            }

            
            
            
            this.cache.scrollY = scrollY  
            
          
        }
        if(this.isHorizontalMove || this.props.pattern === 'freedom' ) {
           
            let scrollX = this.cache.scrollX - res.angx;
            if(this.props.pattern === 'horizontal' && this.props.pattern !== 'freedom') {
                this.cache.scrollY = 0;
            }


            //允许弹动时
            if((scrollX < 0 && this.props.leftBounce) || (scrollX > this.cache.maxX && this.props.rightBounce)) {
                if((this.cache.scrollX < 0 && res.angx > 0) || (this.cache.scrollX > this.cache.maxX && res.angx < 0) ) {
                    scrollX = this.cache.scrollX - (res.angx*0.5)
                }
            }
            //不许弹动时
            if(scrollX < 0 && !this.props.leftBounce) {
                scrollX = 0
            }
            //不许弹动时
            if(scrollX > this.cache.maxX && !this.props.rightBounce) {
                scrollX = this.cache.maxX
            }
            this.cache.scrollX = scrollX;

        }
        
        
        

        this.cache.scrollRender(this.cache.scrollX, this.cache.scrollY, 1)

        if(this.cache.scrollXRender) {
            this.cache.scrollXRender(this.cache.scrollX,0,1)
        }
        if(this.cache.scrollYRender) {
            this.cache.scrollYRender(0,this.cache.scrollY,1)
        }
        this.hideBarY = false;
        if(this.scrollBarYRender) {
            let percent = parseInt(this.cache.scrollY / this.cache.maxY * 100)/100;
            this.cacheScrollBarY = this.scrollBarOuter*percent;
            this.scrollBarYRender(0,-this.cacheScrollBarY,1)
        }
        if(this.scrollBarXRender) {
         
            let percent = parseInt(this.cache.scrollX / this.cache.maxX * 100)/100;
            this.cacheScrollBarX = this.scrollBarOuterWidth*percent;
            this.scrollBarXRender( -this.cacheScrollBarX,0,1)
        }
        if(this.scrollBarTimeout){
            this.hideBarY = false;
            clearTimeout(this.scrollBarTimeout)
            this.scrollBarTimeout = null
        }
       if(this.props.onScroll) {
        this.props.onScroll({
            x: this.cache.scrollX,
            y: this.cache.scrollY
        })
        
       }
       this.emitScroll({
            x: this.cache.scrollX,
            y: this.cache.scrollY
        })
        
       this.loadingData(this.cache.scrollY)
         

    },
    touchend(e, self) {
        //启用自定义调用事件
        if(this.props.touchType === 'custom' && self) return
        if(this.cache.isTouch===false) return; 
        this.cache.isMove = false;
        this.cache.isTouch = false;
        
        if(this.cache.touchMoveList.length<=0) return
        this.cache.touchMoveList[this.cache.touchMoveList.length-1].time = new Date().getTime()
        if(this.cache.direction === 'horizontal') {
            if(this.props.pattern === 'horizontal') {
                this.cache.scrollY = 0;
            }

            if(this.cache.scrollX < 0 ) {
                this.scrollTo(0, this.cache.scrollY,1.5)
                return
            } 

            if(this.cache.scrollX > this.cache.maxX) {
                this.scrollTo(this.cache.maxX, this.cache.scrollY,1.5)
                return
            } 
        }
        if(this.cache.direction === 'vertical') { 
            if(this.props.pattern === 'vertical') {
                this.cache.scrollX = 0;
            }
            if(this.cache.scrollY < 0 ) {
                if(this.props.pullDown) {
                    //触发下拉刷新事件
                    if(!this.cache.isTriggerPullDown && this.cache.scrollY < this.cache.pullDownPoint) {
                       
                        this.cache.isTriggerPullDown = true;
                      
                        if(this.props.onRefresh){
                            this.props.onRefresh(this)
                        }
                        
                        this.scrollTo(this.cache.scrollX, this.cache.pullDownPoint, 1.5)
                        return
                    }

                    if(this.cache.scrollY < this.cache.pullDownPoint) {
                        this.scrollTo(this.cache.scrollX, this.cache.pullDownPoint, 1.5);
                        return
                    }
                    
                    
                }
                
                this.scrollTo(this.cache.scrollX,0,1.5)
                return
            } 

            if(this.cache.scrollY > this.cache.maxY) {
                this.scrollTo(this.cache.scrollX,this.cache.maxY,1.5)
                return
            } 
        }
        let speed = this.calcMoveSpeed();
        speed.x = speed.x * 0.4;
        speed.y = speed.y * 0.4;
      
        this.animate(speed);          
    }
}

export default Touch;
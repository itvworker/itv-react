import getDirection from '../../../libs/touch'
export default {
    touchstart(e, self) {
        
        //启用自定义调用事件
        this.elPositon = this.root.current.getBoundingClientRect();
        if(this.props.touchType === 'custom' && self) return
        if (e.target.tagName.match(/input|textarea|select/i)) {
            return
        }
        this.state.direction = null;
        this.state.isTouch = true;
        this.state.scrollToX = null;
        this.state.scrollToY = null;
        let touches = e.touches;
        if(this.tier === 'parent') {
            
            this.state.childScroller.touchMoveList = this.state.touchMoveList;
        }
        this.state.touchMoveList.splice(0, this.state.touchMoveList.length)
        //检查手指数量
        if (touches.length == null) {
            throw new Error("Invalid touch list: " + touches);
        }
        

        // 两只手指滑动处理中心点
        
        let isSingleTouch = touches.length === 1;
        if (isSingleTouch) {
            this.state.moveX = touches[0].pageX;
            this.state.moveY = touches[0].pageY;
        } else {
            this.state.moveX = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
            this.state.moveY = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
        }
        this.state.startX = this.moveX 
        this.state.startY = this.moveY

        
        this.state.touchMoveList.push({
            x: this.state.moveX,
            y: this.state.moveY,
            time: new Date().getTime()
        })

    },

    
    touchmove(e, self) {
        //启用自定义调用事件
        // e.preventDefault();
        if(this.props.touchType === 'custom' && self) return
        if(this.state.isTouch ===false) return
        
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
        
        let upxy = this.state.touchMoveList[this.state.touchMoveList.length-1];
        this.state.moveX = upxy.x;
        this.state.moveY = upxy.y;
        let positon = this.elPositon
        if(moveX  < positon.left || moveX  > positon.right ||  moveY < positon.top ||  moveY > positon.bottom) {
            this.touchend(e)
            return
        }

        //判断滑动方向，并获取滑动距离
        let res = getDirection(this.state.moveX, this.state.moveY, moveX, moveY, this.state.direction)
        //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
        if(!res) return
        
        
        if((res.type===1 || res.type === 2) && !this.state.direction) {
            this.state.direction = 'vertical'
            this.state.cacheDirection = 'vertical'
        }
        if((res.type===3 || res.type === 4) && !this.state.direction) {
            this.state.direction = 'horizontal'
            this.state.cacheDirection = 'horizontal'  
        }
        if(!this.state.direction) return

       
        // this.moveX = moveX;
        // this.moveY = moveY;
        this.state.touchMoveList.push({
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
            let scrollY = this.state.scrollY - res.angy;

            if(this.props.pattern === 'vertical' && this.props.pattern !== 'freedom') {
                this.state.scrollX = 0;
            }
            //允许弹动时
            if((scrollY < 0 && this.props.topBounce) || (scrollY > this.state.maxY && this.props.bottomBounce)) {
                if((this.state.scrollY < 0 && res.angy > 0) || (this.state.scrollY > this.state.maxY && res.angy < 0) ) {
                    scrollY = this.state.scrollY - (res.angy*0.5)
                }
            }
            //不许弹动时
            if(scrollY < 0 && !this.props.topBounce) {
                scrollY = 0
            }
            //不许弹动时
            if(scrollY > this.state.maxY && !this.props.bottomBounce) {
                scrollY = this.state.maxY
            }

            
            
            
            this.state.scrollY = scrollY  
            
          
        }
        if(this.isHorizontalMove || this.props.pattern === 'freedom' ) {
           
            let scrollX = this.state.scrollX - res.angx;
            if(this.props.pattern === 'horizontal' && this.props.pattern !== 'freedom') {
                this.state.scrollY = 0;
            }


            //允许弹动时
            if((scrollX < 0 && this.props.leftBounce) || (scrollX > this.state.maxX && this.props.rightBounce)) {
                if((this.state.scrollX < 0 && res.angx > 0) || (this.state.scrollX > this.state.maxX && res.angx < 0) ) {
                    scrollX = this.state.scrollX - (res.angx*0.5)
                }
            }
            //不许弹动时
            if(scrollX < 0 && !this.props.leftBounce) {
                scrollX = 0
            }
            //不许弹动时
            if(scrollX > this.state.maxX && !this.props.rightBounce) {
                scrollX = this.state.maxX
            }
            this.state.scrollX = scrollX;

        }
        
        
        

        this.state.scrollRender(this.state.scrollX, this.state.scrollY, 1)

        if(this.state.scrollXRender) {
            this.state.scrollXRender(this.state.scrollX,0,1)
        }
        if(this.state.scrollYRender) {
            this.state.scrollYRender(0,this.state.scrollY,1)
        }
        this.hideBarY = false;
        if(this.scrollBarYRender) {
            let percent = parseInt(this.state.scrollY / this.state.maxY * 100)/100;
            this.cacheScrollBarY = this.scrollBarOuter*percent;
            this.scrollBarYRender(0,-this.cacheScrollBarY,1)
        }
        if(this.scrollBarXRender) {
         
            let percent = parseInt(this.state.scrollX / this.state.maxX * 100)/100;
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
            x: this.state.scrollX,
            y: this.state.scrollY
        })
       }
        
       this.loadingData(this.state.scrollY)
        
         


    },
    touchend(e, self) {
        //启用自定义调用事件
        if(this.props.touchType === 'custom' && self) return
        if(this.state.isTouch===false) return; 
        this.state.isMove = false;
        this.state.isTouch = false;
        
        if(this.state.touchMoveList.length<=0) return
        this.state.touchMoveList[this.state.touchMoveList.length-1].time = new Date().getTime()
        if(this.state.direction === 'horizontal') {
            if(this.props.pattern === 'horizontal') {
                this.state.scrollY = 0;
            }

            if(this.state.scrollX < 0 ) {
                this.scrollTo(0, this.state.scrollY,1.5)
                return
            } 

            if(this.state.scrollX > this.state.maxX) {
                this.scrollTo(this.state.maxX, this.state.scrollY,1.5)
                return
            } 
        }
        if(this.state.direction === 'vertical') { 
            if(this.props.pattern === 'vertical') {
                this.state.scrollX = 0;
            }
            if(this.state.scrollY < 0 ) {
                if(this.props.pullDown) {
                    //触发下拉刷新事件
                    if(!this.state.isTriggerPullDown && this.state.scrollY < this.state.pullDownPoint) {
                        this.setState({
                            isTriggerPullDown: true
                        })
                      
                        if(this.props.onRefresh){
                            this.props.onRefresh(this)
                        }
                        
                        this.scrollTo(this.state.scrollX, this.state.pullDownPoint, 1.5)
                        return
                    }

                    if(this.state.scrollY < this.state.pullDownPoint) {
                        this.scrollTo(this.state.scrollX, this.state.pullDownPoint, 1.5);
                        return
                    }
                    
                    
                }
                
                this.scrollTo(this.state.scrollX,0,1.5)
                return
            } 

            if(this.state.scrollY > this.state.maxY) {
                this.scrollTo(this.state.scrollX,this.state.maxY,1.5)
                return
            } 
        }
        let speed = this.calcMoveSpeed();
        speed.x = speed.x * 0.6;
        speed.y = speed.y * 0.6;
      
        this.animate(speed);          
    }
}
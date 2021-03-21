import getDirection from '../../../libs/touch'
export default {
    methods: {
        touchstart(e, self) {
            //启用自定义调用事件
            this.elPositon = this.$el.getBoundingClientRect()
            if(this.touchType === 'custom' && self) return
            if (e.target.tagName.match(/input|textarea|select/i)) {
                return
            }
            this.direction = null;
            this.isTouch = true;
            this.scrollToX = null;
            this.scrollToY = null;
            let touches = e.touches;
            if(this.tier === 'parent') {
                
                this.childScroller.touchMoveList = this.touchMoveList;
            }
            this.touchMoveList.splice(0, this.touchMoveList.length)
            //检查手指数量
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }
            

            // 两只手指滑动处理中心点
            
            let isSingleTouch = touches.length === 1;
            if (isSingleTouch) {
                this.moveX = touches[0].pageX;
                this.moveY = touches[0].pageY;
            } else {
                this.moveX = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                this.moveY = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }
            this.startX = this.moveX 
            this.startY = this.moveY

            
            this.touchMoveList.push({
                x: this.moveX,
                y: this.moveY,
                time: new Date().getTime()
            })

        },

        
        touchmove(e, self) {
            //启用自定义调用事件
            e.preventDefault();
            if(this.touchType === 'custom' && self) return
            if(this.isTouch ===false) return
            
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
            
            let upxy = this.touchMoveList[this.touchMoveList.length-1];
            this.moveX = upxy.x;
            this.moveY = upxy.y;
            let positon = this.elPositon
            if(moveX  < positon.left || moveX  > positon.right ||  moveY < positon.top ||  moveY > positon.bottom) {
                this.touchend(e)
                return
            }

            //判断滑动方向，并获取滑动距离
            let res = getDirection(this.moveX, this.moveY, moveX, moveY, this.direction)
            //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
            if(!res) return
            
            
            if((res.type===1 || res.type === 2) && !this.direction) {
                this.direction = 'vertical'
                this.cacheDirection = 'vertical'
            }
            if((res.type===3 || res.type === 4) && !this.direction) {
                this.direction = 'horizontal'
                this.cacheDirection = 'horizontal'  
            }
            if(!this.direction) return

           
            // this.moveX = moveX;
            // this.moveY = moveY;
            this.touchMoveList.push({
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
           
          
            if(this.isVertcialMove || this.pattern === 'freedom') {
                let scrollY = this.scrollY - res.angy;

                if(this.pattern === 'vertical' && this.pattern !== 'freedom') {
                    this.scrollX = 0;
                }
                //允许弹动时
                if((scrollY < 0 && this.topBounce) || (scrollY > this.maxY && this.bottomBounce)) {
                    if((this.scrollY < 0 && res.angy > 0) || (this.scrollY > this.maxY && res.angy < 0) ) {
                        scrollY = this.scrollY - (res.angy*0.5)
                    }
                }
                //不许弹动时
                if(scrollY < 0 && !this.topBounce) {
                    scrollY = 0
                }
                //不许弹动时
                if(scrollY > this.maxY && !this.bottomBounce) {
                    scrollY = this.maxY
                }

                this.scrollY = scrollY  
            }
            if(this.isHorizontalMove || this.pattern === 'freedom' ) {
               
                let scrollX = this.scrollX - res.angx;
                if(this.pattern === 'horizontal' && this.pattern !== 'freedom') {
                    this.scrollY = 0;
                }


                //允许弹动时
                if((scrollX < 0 && this.leftBounce) || (scrollX > this.maxX && this.rightBounce)) {
                    if((this.scrollX < 0 && res.angx > 0) || (this.scrollX > this.maxX && res.angx < 0) ) {
                        scrollX = this.scrollX - (res.angx*0.5)
                    }
                }
                //不许弹动时
                if(scrollX < 0 && !this.leftBounce) {
                    scrollX = 0
                }
                //不许弹动时
                if(scrollX > this.maxX && !this.rightBounce) {
                    scrollX = this.maxX
                }
                this.scrollX = scrollX;

            }
           
            this.scrollRender(this.scrollX, this.scrollY, 1)

            if(this.scrollXRender) {
                this.scrollXRender(this.scrollX,0,1)
            }
            if(this.scrollYRender) {
                this.scrollYRender(0,this.scrollY,1)
            }
            this.hideBarY = false;
            if(this.scrollBarYRender) {
                let percent = parseInt(this.scrollY / this.maxY * 100)/100;
                this.cacheScrollBarY = this.scrollBarOuter*percent;
                this.scrollBarYRender(0,-this.cacheScrollBarY,1)
            }
            if(this.scrollBarXRender) {
             
                let percent = parseInt(this.scrollX / this.maxX * 100)/100;
                this.cacheScrollBarX = this.scrollBarOuterWidth*percent;
                this.scrollBarXRender( -this.cacheScrollBarX,0,1)
            }
            if(this.scrollBarTimeout){
                this.hideBarY = false;
                clearTimeout(this.scrollBarTimeout)
                this.scrollBarTimeout = null
            }
           
            this.$emit('scroll',{
                x: this.scrollX,
                y: this.scrollY
            })

            
            this.loadingData(this.scrollY)
            
             


        },
        touchend(e, self) {
            //启用自定义调用事件
            if(this.touchType === 'custom' && self) return
            
            if(this.isTouch===false) return; 
            this.isMove = false;
            this.isTouch = false;
            
            if(this.touchMoveList.length<=0) return
            this.touchMoveList[this.touchMoveList.length-1].time = new Date().getTime()
            if(this.direction === 'horizontal') {
                if(this.pattern === 'horizontal') {
                    this.scrollY = 0;
                }

                if(this.scrollX < 0 ) {
                    this.scrollTo(0, this.scrollY,1.5)
                    return
                } 

                if(this.scrollX > this.maxX) {
                    this.scrollTo(this.maxX, this.scrollY,1.5)
                    return
                } 
            }
            if(this.direction === 'vertical') { 
                if(this.pattern === 'vertical') {
                    this.scrollX = 0;
                }
                if(this.scrollY < 0 ) {
                    if(this.pullDown) {
                        //触发下拉刷新事件
                        if(!this.isTriggerPullDown && this.scrollY < this.pullDownPoint) {
                            this.isTriggerPullDown = true
                            this.$emit('refresh');
                            this.$emit('onRefresh');
                            this.scrollTo(this.scrollX, this.pullDownPoint, 1.5)
                            return
                        }

                        if(this.scrollY < this.pullDownPoint) {
                            this.scrollTo(this.scrollX, this.pullDownPoint, 1.5);
                            return
                        }
                        
                        
                    }
                    
                    this.scrollTo(this.scrollX,0,1.5)
                    return
                } 

                if(this.scrollY > this.maxY) {
                    this.scrollTo(this.scrollX,this.maxY,1.5)
                    return
                } 
            }
            let speed = this.calcMoveSpeed();
            this.animate(speed);          
        }
    }
}
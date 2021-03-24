export default {
    //滚动到指定位置
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Nubmer} value 速度倍数 
     */
    scrollTo(x,y,value=1) {
        
        this.state.scrollToX =x;
        this.state.scrollToY = y;
        let dx = this.state.scrollX - x;
        let dy = this.state.scrollY - y;
        this.state.stepY = dy > 0? this.calcStep(dy):-this.calcStep(dy)
        this.state.stepX = dx > 0? this.calcStep(dx):-this.calcStep(dx)
        this.state.stepX*=value
        this.state.stepY*=value
        
        
        window.requestAnimationFrame(this.step.bind(this));                 

    },
    /**
     * 马上滚动到位置
     * @param {*} x 
     * @param {*} y 
     */
    scrollToNow(x, y) {
        if(x> this.state.maxX) {
            x = this.state.maxX;
        }
        if(x < 0) {
            x = 0
        }

        if(y> this.state.maxY) {
            y = this.state.maxY;
        }
        if(y < 0) {
            y = 0
        }

        this.state.scrollX =x;
        this.state.scrollY = y;
        this.state.scrollRender(x, y, 1)
    },
    /**
     * 缓存位置，需要结合keeplive组件
     */
    cache() {
        this.x = this.state.scrollX;
        this.y = this.state.scrollY
    },
    //
    animate(speed, value) {
     
        this.state.stepX = speed.x;
        this.state.stepY = speed.y;
        
        
        if(Math.abs(this.state.stepX)<5 || (this.state.cacheDirection === 'vertical'  && this.props.pattern ==='horizontal')) {
            
            this.state.stepX = 0
        }
    
        if(Math.abs(this.state.stepY)<5 || (this.state.cacheDirection === 'horizontal'&& this.props.pattern ==="vertical")) {
            
            this.state.stepY = 0
        }

        if(this.state.stepY===0 && this.state.stepX === 0) {
            if(this.props.onStopscroll) {
                this.props.onStopscroll({
                    x: this.state.scrollX,
                    y: this.state.scrollY
                })
            }
            
            this.state.scrollBarTimeout = setTimeout(()=>{
                this.state.hideBarY = true;
            },2000)
            return 
        }

        
        window.requestAnimationFrame(this.step.bind(this), value)
    },
    
    //滚动动画
    step(time, value) {
       
        let continuing = true;
        if(this.state.isTouch || this.state.isMove) return;
           
        
        let scrollX = this.state.scrollX - this.state.stepX
        let scrollY = this.state.scrollY - this.state.stepY
        

        //当快要滚动到指定点的Y轴时
        let arriveY = ((this.state.stepY < 0 && scrollY > this.state.scrollToY) || (this.state.stepY > 0 && scrollY < this.state.scrollToY)) && this.state.scrollToY!==null
        if(arriveY) {
            this.state.stepY = 0;
            scrollY = this.state.scrollToY;
            this.state.scrollToY = null;
            continuing = false;
            
        }

        let arriveX = ((this.state.stepX < 0 && scrollX > this.state.scrollToX) || (this.state.stepX > 0 && scrollX < this.state.scrollToX)) && this.state.scrollToX!==null
        if(arriveX) {
            this.state.stepX = 0;
            scrollX = this.state.scrollToX;
            this.state.scrollToX = null;
            
            
        }

        //当是指定滚动到某一点时
        if(this.state.stepY > 0 && this.state.scrollToY!==null &&scrollY < this.state.scrollToY) {
            this.state.stepY = 0;
            scrollY = this.state.scrollToY;
            this.state.scrollToY = null;
        }
        //允许弹动时
        if((scrollY < 0 && this.props.topBounce) || (scrollY >= this.state.maxY && this.props.bottomBounce)) {
            //是否回弹
            let isBounce = (this.state.stepY < 0 && this.state.scrollY < 0) || (this.state.stepY > 0 && this.state.scrollY> this.state.maxY);
            if(!isBounce && continuing) {
                scrollY = this.state.scrollY - this.state.stepY*0.5
                this.state.stepY = this.state.stepY*0.8
            }
        }
        //不许弹动时
        if(scrollY < 0 && !this.props.topBounce) {
            scrollY = 0
            this.state.stepY = 0
        }
        //不许弹动时
        if(scrollY > this.state.maxY && !this.props.bottomBounce) {
            scrollY = this.state.maxY
            this.state.stepY = 0
        }
        //当是指定滚动到某一点时
        if((scrollX < 0 && this.props.leftBounce) || (scrollX >= this.state.maxX && this.props.rightBounce)) {
            //是否回弹
            let isBounce = (this.state.stepX < 0 && this.state.scrollX < 0) || (this.state.stepX > 0 && this.state.scrollX> this.state.maxX);
            if(!isBounce) {
                
                scrollX = this.state.scrollX - this.state.stepX*0.5
                this.state.stepX = this.state.stepX*0.8
            }
        }

        //不许弹动时
        if(scrollX < 0 && !this.props.leftBounce) {
            scrollX = 0
            this.state.stepX= 0
        }
        //不许弹动时
        if(scrollX > this.state.maxX && !this.props.rightBounce) {
            scrollX = this.state.maxX
            this.state.stepX = 0
        }


        if(this.props.pattern === 'vertical') {
            this.state.stepX = 0;
            this.state.scrollX = 0;
        }

        if(this.props.pattern === 'horizontal') {
            this.state.stepY = 0;
            this.state.scrollY = 0;
        }   
        if(this.props.pattern === 'auto' && this.state.direction === 'vertcial') {
            this.state.stepX = 0;
            
        }

        this.state.scrollX = scrollX;
        this.state.scrollY = scrollY;
        this.hideBarY = false;
        this.state.scrollRender(this.state.scrollX , this.state.scrollY, 1)
        
        
        if(this.state.scrollXRender) {
            this.state.scrollXRender(this.state.scrollX,0,1)
        }
        if(this.state.scrollYRender) {
            this.state.scrollYRender(0,this.state.scrollY,1)
        }

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

        if(this.props.onScroll) {
            this.props.onScroll({
                x: this.state.scrollX,
                y: this.state.scrollY
            })
        }
       
        this.state.stepX = this.state.stepX * this.props.percent
        this.state.stepY = this.state.stepY * this.props.percent
        
        
        if(Math.abs(this.state.stepX) <= this.state.stopStep) {
            this.state.stepX = 0
        }
        if(Math.abs(this.state.stepY) <= this.state.stopStep) {
            this.state.stepY = 0
        }
        
        if(this.state.stepX===0 && this.state.stepY === 0) {
            if(this.state.scrollY < 0 && continuing) {
                this.scrollTo(this.state.scrollToX, 0, 1.5)
                return
            }

            if(this.state.scrollY > this.state.maxY && continuing) {
                this.scrollTo(this.state.scrollToX, this.state.maxY, 1.5)
                return
            } 

            if(this.state.scrollX < 0 && continuing) {
                this.scrollTo(0, this.state.scrollToY, 1.5)
                return
            }

            if(this.state.scrollX > this.state.maxX && continuing) {
                this.scrollTo(this.state.maxX, this.state.scrollToY, 1.5)
                return
            }
            if(this.props.onStopscroll) {
                this.props.onStopscroll({
                    x: this.state.scrollX,
                    y: this.state.scrollY
                })
            }
            this.scrollBarTimeout = setTimeout(()=>{
                this.state.hideBarY = true;
            },2000)
            return
        }
        
        
        window.requestAnimationFrame(this.step.bind(this))
    }

}

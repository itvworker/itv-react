const animate = {
    //滚动到指定位置
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Nubmer} value 速度倍数 
     */
    scrollTo(x,y,value=1) {
        
        this.cache.scrollToX =x;
        this.cache.scrollToY = y;
        let dx = this.cache.scrollX - x;
        let dy = this.cache.scrollY - y;
        this.cache.stepY = dy > 0? this.calcStep(dy):-this.calcStep(dy)
        this.cache.stepX = dx > 0? this.calcStep(dx):-this.calcStep(dx)
        this.cache.stepX*=value
        this.cache.stepY*=value
        
        
        window.requestAnimationFrame(this.step.bind(this));                 

    },
    /**
     * 马上滚动到位置
     * @param {*} x 
     * @param {*} y 
     */
    scrollToNow(x, y) {
        if(x> this.cache.maxX) {
            x = this.cache.maxX;
        }
        if(x < 0) {
            x = 0
        }

        if(y> this.cache.maxY) {
            y = this.cache.maxY;
        }
        if(y < 0) {
            y = 0
        }

        this.cache.scrollX =x;
        this.cache.scrollY = y;
        this.cache.scrollRender(x, y, 1)
    },
    /**
     * 缓存位置，需要结合keeplive组件
     */
    cache() {
        this.x = this.cache.scrollX;
        this.y = this.cache.scrollY
    },
    //
    animate(speed, value) {
     
        this.cache.stepX = speed.x;
        this.cache.stepY = speed.y;
        
        
        if(Math.abs(this.cache.stepX)<5 || (this.cache.cacheDirection === 'vertical'  && this.props.pattern ==='horizontal')) {
            
            this.cache.stepX = 0
        }
    
        if(Math.abs(this.cache.stepY)<5 || (this.cache.cacheDirection === 'horizontal'&& this.props.pattern ==="vertical")) {
            
            this.cache.stepY = 0
        }

        if(this.cache.stepY===0 && this.cache.stepX === 0) {
            if(this.props.onStopscroll) {
                this.props.onStopscroll({
                    x: this.cache.scrollX,
                    y: this.cache.scrollY
                })
            }
            
            this.state.scrollBarTimeout = setTimeout(()=>{
                this.cache.hideBarY = true;
            },2000)
            return 
        }

        
        window.requestAnimationFrame(this.step.bind(this), value)
    },
    
    //滚动动画
    step(time, value) {
       
        let continuing = true;
        if(this.cache.isTouch || this.cache.isMove) return;
           
        
        let scrollX = this.cache.scrollX - this.cache.stepX
        let scrollY = this.cache.scrollY - this.cache.stepY
        

        //当快要滚动到指定点的Y轴时
        let arriveY = ((this.cache.stepY < 0 && scrollY > this.cache.scrollToY) || (this.cache.stepY > 0 && scrollY < this.cache.scrollToY)) && this.cache.scrollToY!==null
        if(arriveY) {
            this.cache.stepY = 0;
            scrollY = this.cache.scrollToY;
            this.cache.scrollToY = null;
            continuing = false;
            
        }

        let arriveX = ((this.cache.stepX < 0 && scrollX > this.cache.scrollToX) || (this.cache.stepX > 0 && scrollX < this.cache.scrollToX)) && this.cache.scrollToX!==null
        if(arriveX) {
            this.cache.stepX = 0;
            scrollX = this.cache.scrollToX;
            this.cache.scrollToX = null;
            
            
        }

        //当是指定滚动到某一点时
        if(this.cache.stepY > 0 && this.cache.scrollToY!==null &&scrollY < this.cache.scrollToY) {
            this.cache.stepY = 0;
            scrollY = this.cache.scrollToY;
            this.cache.scrollToY = null;
        }
        //允许弹动时
        if((scrollY < 0 && this.props.topBounce) || (scrollY >= this.cache.maxY && this.props.bottomBounce)) {
            //是否回弹
            let isBounce = (this.cache.stepY < 0 && this.cache.scrollY < 0) || (this.cache.stepY > 0 && this.cache.scrollY> this.cache.maxY);
            if(!isBounce && continuing) {
                scrollY = this.cache.scrollY - this.cache.stepY*0.5
                this.cache.stepY = this.cache.stepY*0.8
            }
        }
        //不许弹动时
        if(scrollY < 0 && !this.props.topBounce) {
            scrollY = 0
            this.cache.stepY = 0
        }
        //不许弹动时
        if(scrollY > this.cache.maxY && !this.props.bottomBounce) {
            scrollY = this.cache.maxY
            this.cache.stepY = 0
        }
        //当是指定滚动到某一点时
        if((scrollX < 0 && this.props.leftBounce) || (scrollX >= this.cache.maxX && this.props.rightBounce)) {
            //是否回弹
            let isBounce = (this.cache.stepX < 0 && this.cache.scrollX < 0) || (this.cache.stepX > 0 && this.cache.scrollX> this.cache.maxX);
            if(!isBounce) {
                
                scrollX = this.cache.scrollX - this.cache.stepX*0.5
                this.cache.stepX = this.cache.stepX*0.8
            }
        }

        //不许弹动时
        if(scrollX < 0 && !this.props.leftBounce) {
            scrollX = 0
            this.cache.stepX= 0
        }
        //不许弹动时
        if(scrollX > this.cache.maxX && !this.props.rightBounce) {
            scrollX = this.cache.maxX
            this.cache.stepX = 0
        }


        if(this.props.pattern === 'vertical') {
            this.cache.stepX = 0;
            this.cache.scrollX = 0;
        }

        if(this.props.pattern === 'horizontal') {
            this.cache.stepY = 0;
            this.cache.scrollY = 0;
        }   
        if(this.props.pattern === 'auto' && this.cache.direction === 'vertcial') {
            this.cache.stepX = 0;
            
        }

        this.cache.scrollX = scrollX;
        this.cache.scrollY = scrollY;
        this.cache.hideBarY = false;
        this.cache.scrollRender(this.cache.scrollX , this.cache.scrollY, 1)
        
        
        if(this.cache.scrollXRender) {
            this.cache.scrollXRender(this.cache.scrollX,0,1)
        }
        if(this.cache.scrollYRender) {
            this.cache.scrollYRender(0,this.cache.scrollY,1)
        }

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
       
        this.cache.stepX = this.cache.stepX * this.props.percent
        this.cache.stepY = this.cache.stepY * this.props.percent
        
        
        if(Math.abs(this.cache.stepX) <= this.cache.stopStep) {
            this.cache.stepX = 0
        }
        if(Math.abs(this.cache.stepY) <= this.cache.stopStep) {
            this.cache.stepY = 0
        }
        
        if(this.cache.stepX===0 && this.cache.stepY === 0) {
            if(this.cache.scrollY < 0 && continuing) {
                this.scrollTo(this.cache.scrollToX, 0, 1.5)
                return
            }

            if(this.cache.scrollY > this.cache.maxY && continuing) {
                this.scrollTo(this.cache.scrollToX, this.cache.maxY, 1.5)
                return
            } 

            if(this.cache.scrollX < 0 && continuing) {
                this.scrollTo(0, this.cache.scrollToY, 1.5)
                return
            }

            if(this.cache.scrollX > this.cache.maxX && continuing) {
                this.scrollTo(this.cache.maxX, this.cache.scrollToY, 1.5)
                return
            }
            if(this.props.onStopscroll) {
                this.props.onStopscroll({
                    x: this.cache.scrollX,
                    y: this.cache.scrollY
                })
            }
            this.scrollBarTimeout = setTimeout(()=>{
                this.cache.hideBarY = true;
            },2000)
            return
        }
        
        
        window.requestAnimationFrame(this.step.bind(this))
    }

}

export default animate;
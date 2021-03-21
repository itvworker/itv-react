export default {
    methods: {
        //滚动到指定位置
        /**
         * 
         * @param {Number} x 
         * @param {Number} y 
         * @param {Nubmer} value 速度倍数 
         */
        scrollTo(x,y,value=1) {
     
            this.scrollToX =x;
            this.scrollToY = y;
            let dx = this.scrollX - x;
            let dy = this.scrollY - y;
            this.stepY = dy > 0? this.calcStep(dy):-this.calcStep(dy)
            this.stepX = dx > 0? this.calcStep(dx):-this.calcStep(dx)
            this.stepX*=value
            this.stepY*=value
           
           
            window.requestAnimationFrame(this.step);                 

        },
        /**
         * 马上滚动到位置
         * @param {*} x 
         * @param {*} y 
         */
        scrollToNow(x, y) {
            if(x> this.maxX) {
                x = this.maxX;
            }
            if(x < 0) {
                x = 0
            }

            if(y> this.maxY) {
                y = this.maxY;
            }
            if(y < 0) {
                y = 0
            }

            this.scrollX =x;
            this.scrollY = y;
            this.scrollRender(x, y, 1)
        },
        /**
         * 缓存位置，需要结合keeplive组件
         */
        cache() {
            this.x = this.scrollX;
            this.y = this.scrollY
        },
        //
        animate(speed, value) {
            
            this.stepX = speed.x;
            this.stepY = speed.y;
          
          
            if(Math.abs(this.stepX)<5 || (this.cacheDirection === 'vertical'  && this.pattern ==='horizontal')) {
             
                this.stepX = 0
            }
      
            if(Math.abs(this.stepY)<5 || (this.cacheDirection === 'horizontal'&& this.pattern ==="vertical")) {
                
                this.stepY = 0
            }

            if(this.stepY===0 && this.stepX === 0) {
                this.$emit('stopscroll',{
                    x: this.scrollX,
                    y: this.scrollY
                })
                this.scrollBarTimeout = setTimeout(()=>{
                    this.hideBarY = true;
                },2000)
                return 
            }

            
            window.requestAnimationFrame(this.step, value)
        },
      
        //滚动动画
        step(time, value) {
            let continuing = true;
            if(this.isTouch || this.isMove) return;
                
          
            let scrollX = this.scrollX - this.stepX
            let scrollY = this.scrollY - this.stepY
            

            //当快要滚动到指定点的Y轴时
            let arriveY = ((this.stepY < 0 && scrollY > this.scrollToY) || (this.stepY > 0 && scrollY < this.scrollToY)) && this.scrollToY!==null
            if(arriveY) {
                this.stepY = 0;
                scrollY = this.scrollToY;
                this.scrollToY = null;
                continuing = false;
                
            }

            let arriveX = ((this.stepX < 0 && scrollX > this.scrollToX) || (this.stepX > 0 && scrollX < this.scrollToX)) && this.scrollToX!==null
            if(arriveX) {
                this.stepX = 0;
                scrollX = this.scrollToX;
                this.scrollToX = null;
                
                
            }

            //当是指定滚动到某一点时
            if(this.stepY > 0 && this.scrollToY!==null &&scrollY < this.scrollToY) {
                this.stepY = 0;
                scrollY = this.scrollToY;
                this.scrollToY = null;
            }
            //允许弹动时
            if((scrollY < 0 && this.topBounce) || (scrollY >= this.maxY && this.bottomBounce)) {
                //是否回弹
                let isBounce = (this.stepY < 0 && this.scrollY < 0) || (this.stepY > 0 && this.scrollY> this.maxY);
                if(!isBounce && continuing) {
                    scrollY = this.scrollY - this.stepY*0.5
                    this.stepY = this.stepY*0.8
                }
            }
            //不许弹动时
            if(scrollY < 0 && !this.topBounce) {
                scrollY = 0
                this.stepY = 0
            }
            //不许弹动时
            if(scrollY > this.maxY && !this.bottomBounce) {
                scrollY = this.maxY
                this.stepY = 0
            }
            //当是指定滚动到某一点时
            if((scrollX < 0 && this.leftBounce) || (scrollX >= this.maxX && this.rightBounce)) {
                //是否回弹
                let isBounce = (this.stepX < 0 && this.scrollX < 0) || (this.stepX > 0 && this.scrollX> this.maxX);
                if(!isBounce) {
                    
                    scrollX = this.scrollX - this.stepX*0.5
                    this.stepX = this.stepX*0.8
                }
            }

            //不许弹动时
            if(scrollX < 0 && !this.leftBounce) {
                scrollX = 0
                this.stepX= 0
            }
            //不许弹动时
            if(scrollX > this.maxX && !this.rightBounce) {
                scrollX = this.maxX
                this.stepX = 0
            }
    

            if(this.pattern === 'vertical') {
                this.stepX = 0;
                this.scrollX = 0;
            }

            if(this.pattern === 'horizontal') {
                this.stepY = 0;
                this.scrollY = 0;
            }   
            if(this.pattern === 'auto' && this.direction === 'vertcial') {
                this.stepX = 0;
                
            }

            this.scrollX = scrollX;
            this.scrollY = scrollY;
            this.hideBarY = false;
            this.scrollRender(this.scrollX , this.scrollY, 1)
            
           
            if(this.scrollXRender) {
                this.scrollXRender(this.scrollX,0,1)
            }
            if(this.scrollYRender) {
                this.scrollYRender(0,this.scrollY,1)
            }

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
            this.$emit('scroll',{
                x: this.scrollX,
                y: this.scrollY
            })
            this.stepX = this.stepX * this.percent
            this.stepY = this.stepY * this.percent
            
            
            if(Math.abs(this.stepX) <= this.stopStep) {
                this.stepX = 0
            }
            if(Math.abs(this.stepY) <= this.stopStep) {
                this.stepY = 0
            }
            
            if(this.stepX===0 && this.stepY === 0) {
                if(this.scrollY < 0 && continuing) {
                    this.scrollTo(this.scrollToX, 0, 1.5)
                    return
                }

                if(this.scrollY > this.maxY && continuing) {
                    this.scrollTo(this.scrollToX, this.maxY, 1.5)
                    return
                } 

                if(this.scrollX < 0 && continuing) {
                    this.scrollTo(0, this.scrollToY, 1.5)
                    return
                }

                if(this.scrollX > this.maxX && continuing) {
                    this.scrollTo(this.maxX, this.scrollToY, 1.5)
                    return
                }
                this.$emit('stopscroll', {
                    x: this.scrollX,
                    y: this.scrollY
                })
                this.scrollBarTimeout = setTimeout(()=>{
                    this.hideBarY = true;
                },2000)
                return
            }
            
            
            window.requestAnimationFrame(this.step)
        }
    }
}

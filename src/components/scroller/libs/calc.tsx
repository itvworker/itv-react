

 const Calc = {
    
    /**
         * 计滚动到一定距离的stepX,stepY的开始步数
         * @param {Number} distance 
         */
     calcStep(distance) {
        let dis = Math.abs(distance);

        if(dis===0) {
            return 0
        }
        let step = this.cache.stopStep; 
        let numDis = 0;
        while(numDis<dis) {
            numDis+= step/this.props.percent
            step = step/this.props.percent
        }

        
        step = step/this.props.percent
        return step
    },
    /**
     * 计算滚动的最大值
     */
    calcMax() {
        
        let parent = this.scroller.current.parentNode;
        
        let child = this.scroller.current;
     
        let parentWidth = parent.clientWidth;
        let parentHeight = parent.clientHeight;
        let childWidth = child.clientWidth;
        let childHeight = child.clientHeight;

        
        this.cache.maxX = Math.max(0,childWidth - parentWidth);
        this.cache.maxY = Math.max(0,childHeight - parentHeight);
        this.cache.contentHeight = parentHeight;
        this.cache.contentWidth = parentWidth;
      
        this.state.elPositon = this.root.current.getBoundingClientRect()
        //当滚动值超过最大值时，恢复到最大值

        if(this.cache.scrollX > this.cache.maxX) {
            this.cache.scrollX =  this.cache.maxX;
            this.cache.x =  this.cache.maxX;
        }
        
        if(this.cache.scrollY > this.cache.maxY) {
            this.cache.scrollY =  this.cache.maxY;
            this.y =  this.cache.maxY
        }
        this.cache.scrollRender(this.cache.scrollX , this.cache.scrollY, 1);
   
        //计算下拉加载触发点
        if(this.props.pullDown) {
           this.cache.pullDownPoint =  -this.pull.current.clientHeight
        }
        

    },
    //计算touch结束后的滑动速度
    calcMoveSpeed() {
        let touchList = this.cache.touchMoveList;

        // this.cache.touchMoveList = [];
        let num = touchList.length
        if(num > 20) {
            touchList = touchList.slice(num-20, num)
        }
        let last = touchList.length-1;
        let first = 0;
       

        for(let i = last; i >= 0; i--) {
            if(touchList[last].time-touchList[i].time > this.speed) {
                first = i;
                break
            }
            first = i;
        }
        let x = touchList[last].x-touchList[first].x 
        let y = touchList[last].y-touchList[first].y
        
        if(Math.abs(x)<10) {
            x = 0
        }
        if(Math.abs(y)<10) {
            y = 0
        }

        if(y>this.props.maxSpeed) {
            y = this.props.maxSpeed
        }

        if(y <-this.props.maxSpeed) {
            y = -this.props.maxSpeed
        }

        if(x>this.props.maxSpeed) {
            x = this.props.maxSpeed
        }

        if(x <-this.props.maxSpeed) {
            x = -this.props.maxSpeed
        }


        
        return {
            x: x,
            y: y
        }
    }
      
}
export default Calc;
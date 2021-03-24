

export default {
    
    /**
         * 计滚动到一定距离的stepX,stepY的开始步数
         * @param {Number} distance 
         */
     calcStep(distance) {
        let dis = Math.abs(distance);

        if(dis===0) {
            return 0
        }
        let step = this.state.stopStep; 
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

        
        this.state.maxX = Math.max(0,childWidth - parentWidth);
        this.state.maxY = Math.max(0,childHeight - parentHeight);
        this.state.contentHeight = parentHeight;
        this.state.contentWidth = parentWidth;
      
        this.state.elPositon = this.root.current.getBoundingClientRect()
        //当滚动值超过最大值时，恢复到最大值

        if(this.state.scrollX > this.state.maxX) {
            this.state.scrollX =  this.state.maxX;
            this.state.x =  this.state.maxX;
        }
        
        if(this.state.scrollY > this.state.maxY) {
            this.state.scrollY =  this.state.maxY;
            this.y =  this.state.maxY
        }
        this.state.scrollRender(this.state.scrollX , this.state.scrollY, 1);
   
        //计算下拉加载触发点
        if(this.props.pullDown) {
           this.state.pullDownPoint =  -this.pull.current.clientHeight
        }
        

    },
    //计算touch结束后的滑动速度
    calcMoveSpeed() {
        let touchList = this.state.touchMoveList;

        // this.state.touchMoveList = [];
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
        
        if(Math.abs(x)<2) {
            x = 0
        }
        if(Math.abs(y)<2) {
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
import render from '../../../libs/render'
export default {
    mounted() {
        
        this.state.scrollRender =  render(this.scroller.current);
        
        let parttern = this.props.pattern;
        if(this.props.showScrollBar ) {   
            if(parttern === 'horizontal' || parttern==='freedom' || parttern === 'auto')  {
                this.state.scrollBarXRender = render(this.barX);
            }
            if(this.pattern === 'vertical' || this.pattern==='freedom' || this.pattern==='auto') {
                this.state.scrollBarYRender = render(this.barY);
            }
        }
    
        this.calcMax()
    },
  
    //下拉加载复位
    refresh() {
        if(this.scrollY < 0) {
            this.scrollTo(this.scrollX, 0, 1.5);
        }
        this.isTriggerPullDown = false
        this.$nextTick(()=>{
            this.calcMax()
            if(this.isMore) {
                this.moreStatus = 'loadingStop'; 
            }
        })  
        this.$emit("content");
      
    },
    //是否触发上拉加载
    loadingData(value) {
        if(this.isMore && value >= this.maxY && this.moreStatus ==='loadingStop') {
            this.moreStatus = 'loading';
            this.$emit('infinite')
            this.$emit('onInfinite')
            this.$nextTick(()=>{
                this.calcMax()
            })
        }
    },
    infinite(value) {
        if(value) {
            this.moreStatus = 'none';
        }else{
            this.moreStatus = 'loadingStop'; 
        }
        
        this.$nextTick(()=>{
            this.calcMax()
        })  
    }
}
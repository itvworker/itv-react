import render from '../../../libs/render'
const Init = {
    mounted() {
        
        this.cache.scrollRender =  render(this.scroller.current);
        
        let parttern = this.props.pattern;
        if(this.props.showScrollBar ) {   
            if(parttern === 'horizontal' || parttern==='freedom' || parttern === 'auto')  {
                this.cache.scrollBarXRender = render(this.barX);
            }
            if(this.props.pattern === 'vertical' || this.props.pattern==='freedom' || this.props.pattern==='auto') {
                this.cache.scrollBarYRender = render(this.barY);
            }
        }
    
        this.calcMax()
    },
  
    //下拉加载复位
    refresh() {
        if(this.cache.scrollY < 0) {
            this.scrollTo(this.cache.scrollX, 0, 1.5);
        }
       
       
        this.cache.isTriggerPullDown = false;
        setTimeout(()=>{
            this.calcMax()
            if(this.props.isMore) {
                this.cache.moreStatus = 'loadingStop'
              
                
            }
        })
        
        
      
    },
    //是否触发上拉加载
    loadingData(value) {
    
        if(this.props.isMore && value >= this.cache.maxY && this.cache.moreStatus ==='loadingStop') {
            this.cache.moreStatus = "loading"
           if(this.props.onInfinite) {
            this.props.onInfinite()
           }
            
            setTimeout(()=>{
                this.calcMax()
            })
        }
    },
    infinite(value) {
        if(value) {

            this.cache.moreStatus = 'none'
            
        }else{
            
            this.cache.moreStatus = 'loadingStop'
        }
        setTimeout(()=>{
            this.calcMax()
        })
        
    }
}
export default Init;
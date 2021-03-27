import render from '../../../libs/render'
export default {
    mounted() {
        
        this.state.scrollRender =  render(this.scroller.current);
        
        let parttern = this.props.pattern;
        if(this.props.showScrollBar ) {   
            if(parttern === 'horizontal' || parttern==='freedom' || parttern === 'auto')  {
                this.state.scrollBarXRender = render(this.barX);
            }
            if(this.props.pattern === 'vertical' || this.props.pattern==='freedom' || this.props.pattern==='auto') {
                this.state.scrollBarYRender = render(this.barY);
            }
        }
    
        this.calcMax()
    },
  
    //下拉加载复位
    refresh() {
        if(this.state.scrollY < 0) {
            this.scrollTo(this.state.scrollX, 0, 1.5);
        }
       
        this.setState({
            isTriggerPullDown: false
        })
        setTimeout(()=>{
            this.calcMax()
            if(this.props.isMore) {
                this.setState({
                    moreStatus: 'loadingStop'
                })
                
            }
        })
        
        
      
    },
    //是否触发上拉加载
    loadingData(value) {
    
        if(this.props.isMore && value >= this.state.maxY && this.state.moreStatus ==='loadingStop') {
            this.setState({
                moreStatus: 'loading'
            });
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
            this.setState({
                moreStatus: 'none'
            });
            
        }else{
            this.setState({
                moreStatus: 'loadingStop'
            });
        }
        setTimeout(()=>{
            this.calcMax()
        })
        
    }
}
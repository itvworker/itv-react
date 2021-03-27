
import './index.less';
import React from 'react';
import Container from '@/layout/container';
import Header from '@/layout/header';
import Main from '@/layout/main';
import ItvScroll from '../index.tsx'
class DemoScroller extends React.Component{
    cellFef = React.createRef();
    scroller = React.createRef();
    
    
    constructor(props: any) {
        super(props);
        this.state = {
            list:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        }
    }
    render(){ 
       
       
        let list = this.state.list.map((item, index)=>{
            return (
                <div className="item-bar-container" key={index}>
                        你们真是好人{index}
                </div>
            )
        })
        return (<Container>
                    <Header title="Scroller"/>
                    <Main>
                        <ItvScroll onRefresh={this.onRefresh.bind(this)} pullDown ref={this.scroller} topBounce bottomBounce isMore onInfinite={this.onInfinite.bind(this)}  >
                            
                            {list}
                            
                        </ItvScroll>
                      
                    </Main>
                </Container>)
    }
    onInfinite() {
        
        // setTimeout(()=>{
        //   debugger
        //     this.scroller.infinite(true)
        // },300)
        
    }

    onRefresh(child) {
        console.log(this.scroller);
        
    }
    componentDidMount() {
        console.log(this.props.history)
    }

}
export default DemoScroller


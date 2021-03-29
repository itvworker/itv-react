
import './index.less';
import React from 'react';
import Container from '@/layout/container';
import Header from '@/layout/header';
import Main from '@/layout/main';
import ItvScroll from '../index.tsx'
import Test from './test'
import ScrollerElevator from '../../scroller-elevator'
class DemoScroller extends React.Component{
    cellFef = React.createRef();
    scroller = React.createRef();
    
    
    constructor(props: any) {
        super(props);
        this.cache = {
            list:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        }
    }
    render(){ 
       
       
        let list = this.cache.list.map((item, index)=>{
            return (
                <div className="item-bar-container" key={index}>
                        你们真是好人{index}
                </div>
            )
        })
        return (<Container>
                    <Header title="Scroller"/>
                    <Main>
                        <ItvScroll onRefresh={this.onRefresh.bind(this)}  pullDown ref={this.scroller} topBounce bottomBounce isMore onInfinite={this.onInfinite.bind(this)}  >
                            <Test/>
                            {list}
                            <ScrollerElevator title="我是中国人">
                            {list}
                            </ScrollerElevator>
                            
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
    onRef(child) {
        console.log(child);
        
    }
    onRefresh(child) {
        
       
       setTimeout(()=>{
        this.scroller.current.refresh();
       },3000)
        
        
        
        
    }
    componentDidMount() {
        console.log(this.props.history)
    }

}
export default DemoScroller


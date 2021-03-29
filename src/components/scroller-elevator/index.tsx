
import React from 'react';
import '@/assets/css/itv-theme.less'
import './itv-scroller-elevator.less'
import ScrollerContext from '../scroller/libs/provider';
import render from '../../libs/render';
export interface CellProps{
    name?: String,
    children: HTMLDivElement
    
}


 
class ScrollerElevator extends React.Component {
    static contextType = ScrollerContext;
    el = React.createRef();
    id = new Date().getTime() + parseInt(Math.random()*100000000);
   
    
    constructor(props:any) {
        super(props);
        this.state = {
            top: 0,
            height: 0,
            header: '',
            headerHeight: 0,
            maxY: 0,
            y: 0
        }
    }
    init =()=>{
        let dom = this.el.current;
        this.state.top = dom.offsetTop;
        this.state.height = dom.clientHeight;
        this.header = render(dom.children[0]);
        this.state.headerHeight = dom.children[0].clientHeight;
        this.state.maxY = this.state.height - this.state.headerHeight 
    }

    scroll = (res) =>{
       
        if(res.y > this.state.top ) {
            let y =res.y-this.state.top;
            if(y>this.state.maxY) {
                y = this.state.maxY
            }
            this.state.y = y
            this.header(0,-this.state.y,1)
        }else{
            this.state.y = 0
            this.header(0,-this.state.y,1)
        }
    }
    componentDidMount(){
       this.context.events[this.id] = this;
       this.init();
    }


    render(){
        return (
            <div ref={this.el} className="itv-scroll-evevator">
                <div className="itv-scroll-evevator-header" >
                    {this.props.title}
                </div>
                <div className="itv-scroll-evevator-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default ScrollerElevator


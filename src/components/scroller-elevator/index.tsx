
import React from 'react';
import '@/assets/css/itv-theme.less'
import './itv-scroller-elevator.less'
import ScrollerContext from '../scroller/libs/provider';
import render from '../../libs/render';
export interface CellProps{
    name?: String,
    children: HTMLDivElement
    
}


 
function ScrollerElevator (props) {
  
        return (
            <div className="itv-scroll-evevator">
                <div className="itv-scroll-evevator-header" >
                    {props.title}
                </div>
                <div className="itv-scroll-evevator-body">
                    {props.children}
                </div>
            </div>
        )
}

export default ScrollerElevator



import React from 'react';
import '@/assets/css/itv-theme.less'
import './itv-cell.less'
export interface CellProps{
    name?: String,
    children: HTMLDivElement
    
}


 
class Cell extends React.Component<CellProps> {
    constructor(props:CellProps) {
        super(props);
        this.state = {}
    }
    
    render(){
        return (
            <div className='itv-cell'>
                <div className="itv-cell-box">
                    <div className="itv-cell-left">
                        <span className="itv-cell-title">{this.props.title}</span>
                        <span className="itv-cell-sub-title">{this.props.subTitle}</span>
                    </div>
                    <div className="itv-cell-right">
                        <span className="itv-cell-desc">{this.props.desc}</span>
                        <span className="itv-cell-icon">
                            <img src="data:image/svg+xml,%3Csvg viewBox='0 0 5 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.215 9.757l3.577-4.17a.931.931 0 0 0 0-1.173L1.215.244a.642.642 0 0 0-1.007 0 .929.929 0 0 0 0 1.172L3.283 5 .208 8.584a.93.93 0 0 0 0 1.173.643.643 0 0 0 1.007 0z' fill='rgb(200,200,205)'/%3E%3C/svg%3E" alt="" />
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}



export default Cell
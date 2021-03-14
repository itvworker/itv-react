
import React from 'react';
export interface CellProps{
    name?: String,
    children: HTMLDivElement
    
}

export interface CellStates{
    arr: (string | number)[]
}



class Cell extends React.Component<CellProps, CellStates> {
    
    refCell = React.createRef()


    constructor(props:CellProps) {
        super(props);
        this.state = {
            arr: [12, 30, 14]
        }
    }
    render(){
        return <div className="cell" ref={this.refCell}>
                {this.props.children}
                <button onClick={e=>this.change(e)}>按钮</button>
            </div>
    }

    change() {
        console.log(this.refCell.current);
        
    }


}



export default Cell

import './index.less';
import React from 'react';
import Cell from '../components/cell'

class IndexPage extends React.Component{
    cellFef = React.createRef();

    // constructor(props: any) {
    //     super(props);
    //     this.state = {}
    // }
    render(){ 
       
       
        
        return (<div className = "page-index" >
                <Cell ref={this.cellFef} >
                    <span>pageHome</span>
                </Cell>
                   
                </div>)
    }

    componentDidMount() {
        console.log(this.cellFef)
      }

}
export default IndexPage


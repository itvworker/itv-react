
import './index.less';
import React from 'react';
import ScrollerContext from '../libs/provider'
class Test extends React.Component{
    static contextType = ScrollerContext;
    scroller = React.createRef()
    refname = (value)=>{
        console.log('------');
        
        return (<input type="text" />)
        
    }
    constructor(props: any) {
        super(props)
    }
    render(){ 
       return (
           <div className="test" >
                <div ref={this.scroller} className="test-item" >
               
               </div>
               <div ref={this.scroller}  className="test-ite2" >
               
                </div>
           </div>
           
       )
       
       
    }
 
 
    componentDidMount() {
        console.log(this.scroller);
        
        
    }

}
export default Test


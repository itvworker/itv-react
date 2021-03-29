
import './index.less';
import React from 'react';
import ScrollerContext from '../libs/provider'
class Test extends React.Component{
    static contextType = ScrollerContext;
    
    constructor(props: any) {
        super(props)
    }
    render(){ 
       return (
           <div className="test">
               
           </div>
       )
       
       
    }
 
 
    componentDidMount() {
        console.log(this.context)
    }

}
export default Test



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
                <Cell desc="详细信息" title="这是一个标题" subTitle="这里要填写你的手机号码" >
                    
                </Cell>
                <Cell desc="详细信息" title="这是一个标题" subTitle="这里要填写你的手机号码" >
                    
                </Cell>
                <Cell desc="详细信息" title="这是一个标题" subTitle="这里要填写你的手机号码" >
                    
                </Cell>
                   
                </div>)
    }

    componentDidMount() {
        console.log(this.cellFef)
      }

}
export default IndexPage


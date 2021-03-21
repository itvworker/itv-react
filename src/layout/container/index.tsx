
import './index.less';
import React from 'react';

class Container extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render(){ 
        return (
        <section className="itv-main-page">
            {this.props.children}
        </section>
        )
    }
}
export default Container


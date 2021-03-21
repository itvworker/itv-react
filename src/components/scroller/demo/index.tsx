
import './index.less';
import React from 'react';
import Container from '@/layout/container';
import Header from '@/layout/header';
import Main from '@/layout/main';
class DemoScroller extends React.Component{
    cellFef = React.createRef();

    constructor(props: any) {
        super(props);
        this.state = {
           
        }
    }
    render(){ 
       
       
        
        return (<Container>
                    <Header title="Scroller"/>
                    <Main>

                        ------
                    </Main>
                </Container>)
    }

    componentDidMount() {
        console.log(this.props.history)
    }

}
export default DemoScroller


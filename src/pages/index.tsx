
import './index.less';
import React from 'react';
import Container from '../layout/container'

class IndexPage extends React.Component{
    cellFef = React.createRef();
    private state
    constructor(props: any) {
        super(props);
        this.state = {
            navs:[
                {
                    name: "介绍",
                    routerName: ''
                },
                {
                    name: "组件",
                    routerName: 'itv_doc_index'
                },
                {
                    name: "主题",
                    routerName: ''
                },
                {
                    name: "发布日志",
                    routerName: ''
                },
                {
                    name: "捐赠、赞助",
                    routerName: ''
                },
                {
                    name: "DEMO",
                    routerName:'itv_demo_enter'
                }
            ]
        }
    }
    render(){ 
        return (<Container>
                    <div className="itv-bar">
                        <div className="itv-logo" >
                            iTV
                        </div>
                        <div className="nav">
                            <div className="nav-item">
                                
                            </div>        
                        </div>
                    </div>
                </Container>)
    }

    componentDidMount() {
        console.log(this.cellFef)
      }

}
export default IndexPage


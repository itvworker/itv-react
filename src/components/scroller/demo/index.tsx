
import './index.less';
import React from 'react';
import Container from '@/layout/container';
import Header from '@/layout/header';
import Main from '@/layout/main';
import Scroller from '../src/index'
function  DemoScroller (){
    return (<Container>
        <Header title="Scroller"/>
        <Main>
            <Scroller></Scroller>
            
        </Main>
    </Container>)

}
export default DemoScroller


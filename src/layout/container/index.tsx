
import './index.less';
import React from 'react';

function Container (props) {
    return (
        <section className="itv-main-page">
            {props.children}
        </section>
        )
}

export default Container


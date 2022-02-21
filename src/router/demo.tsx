import { Route } from 'react-router-dom';
import { Fragment, lazy  } from 'react';

const Scroller = lazy(() => import('../components/scroller/demo/index'));
console.log(Scroller);

export default function Demo() {
    return (
        <Fragment>
            <Route exact path="/demo/scroller" component={Scroller}/>
        </Fragment>
    )
}
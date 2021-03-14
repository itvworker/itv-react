import './App.less';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Suspense, lazy } from 'react';
const Home = lazy(() => import('./pages/index'));

function App() {
  return (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home}/>
          </Switch>
        </Suspense>
    </Router>
   
  );
}

export default App;

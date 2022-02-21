import './App.less';
import '@/assets/css/font.less';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import demoRouter from './router/demo';

const Home = lazy(() => import('./pages/index'));



function App() {
  return (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home}/>
            {demoRouter()}
          </Switch>
        </Suspense>
    </Router>
  );
}

export default App;

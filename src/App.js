import './App.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';

import ListView from './components/ListView';
import RecepieDetail from './components/RecepieDetail';

function App() {
  return (
    <div className="App">
       <Router>
         <div>
          <ul style={{listStyleType:"none"}}>
           <li>
             <Link to="/">View All Recepie</Link>
           </li>
          </ul>
          <Switch>
            <Route path="/">
              <ListView />
            </Route>
            <Route exact path={`/:recepieID`}>
              <RecepieDetail />
            </Route>
          </Switch>
         </div>
       </Router>
    </div>
  );
}

export default App;

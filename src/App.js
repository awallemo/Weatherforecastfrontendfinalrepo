
import './App.css';
import IndexPage from './pages/indexpage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Specificdaypage from './pages/specificdaypage';
import Historicaldatapage from './pages/historicaldatapage';
import axios from 'axios';




function App() {
  localStorage.setItem('baseurl', 'http://localhost:5000')
  axios.defaults.baseURL = localStorage.getItem('baseurl');
  

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={()=><IndexPage/>}/>
          <Route path="/specificday" exact render={()=><Specificdaypage/>}/>
          <Route path="/historicaldata" exact render={()=><Historicaldatapage/>}/>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;

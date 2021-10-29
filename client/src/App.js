import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import FormPage from './pages/FormPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={FormPage}/>
        <Route path='/success' exact component={SuccessPage}/>
      </Switch>
    </Router>
  );
}

export default App;

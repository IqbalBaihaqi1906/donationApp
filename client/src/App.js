import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import FormPage from './pages/FormPage';
import SuccessPage from './pages/SuccessPage';
import { useState } from 'react';
import SuccessOnly from './routes/SuccessOnly';

function App() {

  return (
    <Router>
      <Switch>
        <Route path='/' exact component={FormPage}/>
        <SuccessOnly path='/success' exact component={SuccessPage} />
      </Switch>
    </Router>
  );
}

export default App;

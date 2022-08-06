import logo from './logo.svg';
import './App.css';


import AuthContext from './store/auth-context';
import { useContext } from 'react';
import { BrowserRouter  as  Router, Route,Switch } from "react-router-dom";
import { Login } from './component/Auth/Login';
import { Signup } from './component/Auth/Signup';
import { Mail } from './component/Mail/Mail';

function App() {
   
  const authctx=useContext(AuthContext)
  console.log("aapp", authctx.isLoggedIn)
  return (
    <>
     <Router>
      
     <Switch>
        <Route path="/" exact><Signup /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/mail"><Mail/></Route>
        
      </Switch>
     </Router>
    </>
  );
}

export default App;

import './App.css';
import HomeScreen from './screens/homeScreen';
import WritingScreen from './screens/writingScreen';
import Navbar from './templates/Navbar';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DetailedArticleScreen from './screens/detailedArticlePage';
import ManageScreen from './screens/manageArticleScreen';
import SignUpScreen from './screens/signUp';
import LoginScreen from './screens/login';
import SettingsScreen from './screens/settings';
import EditingScreen from './screens/editingScreen';
import GuardedRoute from "./routeGuards/guardedRoute";
import AuthGuardedRoute from './routeGuards/authGuardedRoute'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar>
          <div className="container">
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/write" component={WritingScreen} />
              <Route exact path="/article/:id" component={DetailedArticleScreen} />
              <GuardedRoute  path='/manage' component={ManageScreen}/>
              {/* <Route exact path="/manage" component={ManageScreen} /> */}
              <AuthGuardedRoute exact path="/signup" component={SignUpScreen} />
              <AuthGuardedRoute exact path="/login" component={LoginScreen} />
              <GuardedRoute  path="/settings" component={SettingsScreen} />
              <GuardedRoute  path="/edit/:id" component={EditingScreen} /> 
            </Switch>
          </div>
        </Navbar>
      </BrowserRouter>
    </div>
  );
}

export default App;

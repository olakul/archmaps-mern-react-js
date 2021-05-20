import './App.css';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Maps from './components/Map';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import LandmarkDetails from './components/LandmarkDetails';
import EditLandmark from './components/EditLandmark';


class App extends React.Component {
  state = {
    user: this.props.user
  }

  setUser = user => {
    this.setState({ user });
  }
  render() {
    return(
      <>
      <Maps/>
      <Navbar user={this.state.user} setUser={this.setUser} />
      <Route exact path="/landmarks/:id" component={LandmarkDetails} />
      <Route
          exact path="/signup"
          render={props => <Signup setUser={this.setUser} {...props} />}
        />
      
      <Route
        exact path="/login"
        render={props => <Login setUser={this.setUser} {...props} />}
      />
      <Route
        exact path="/landmarks/edit/:id"
        render={props => <EditLandmark setUser={this.setUser} {...props} />}
      />
      </>
      
    )
    
  }
}


export default App;

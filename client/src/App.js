import './App.css';
import React from 'react';
import Maps from './components/Map';
// import Navbar from './components/Navbar';
import LandmarksList from './components/LandmarksList';

class App extends React.Component {
  render() {
    return(
      <>
      {/* <Navbar/> */}
      <Maps/>
      <LandmarksList/>
      //
      </>
      
    )
    
  }
}


export default App;

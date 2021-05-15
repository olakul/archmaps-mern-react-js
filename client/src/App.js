import './App.css';
import React from 'react';
import Maps from './components/Map';
// import Locate from './components/Locate';
// import Search from './components/Search';
// import panTo from './components/Map';


class App extends React.Component {
  render() {
    return(
      <>
      {/* <Search panTo={panTo} /> */}
      {/* <Locate panTo={panTo} /> */}
      <Maps/>
      </>
      
    )
    
  }
}


export default App;

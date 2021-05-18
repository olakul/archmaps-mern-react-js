import React, { Component } from 'react';
import axios from 'axios';
import LandmarksList from './LandmarksList';
import Landmarks from './components/Landmarks'



export default class Landmarks extends Component {
  state = {
    landmarks: [],
  }

  getData = () => {
    axios.get('/api/landmarks')
      .then(response => {
        console.log(response);
        this.setState ={
          landmarks: response.data
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        <Landmarks landmarks={this.state.landmarks}/>
      </div>
    )
  }
}

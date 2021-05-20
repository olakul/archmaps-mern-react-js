import React, { Component } from 'react';
import axios from 'axios';

export default class EditLandmark extends Component {

  state = {
    
    year: '',
    architect: '',
    description: '',
    tags: ''
  }

  handleSubmit = e => {
    console.log('submit');
    e.preventDefault();
    const { year, architect, description, tags } = this.state;
    axios.put(`/api/landmarks/edit/${this.props.id}`, {
      
      year, 
      architect, 
      description, 
      tags
    })
      .then(response => {
        console.log(response.data);
        this.setState({
          
          year: '',
          architect: '',
          description: '',
          tags: ''
        })
        // this.props.getData();
      })
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    console.log(this.state)
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="year">Year: </label>
        <input

          type="text"
          name="year"
          id="year"
          value={this.state.year}
          onChange={this.handleChange}
        />
        <br/>
        <label htmlFor="architect">Architect: </label>
        <input
          type="text"
          name="architect"
          id="architect"
          value={this.state.architect}
          onChange={this.handleChange}
        />
        <br/>
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          id="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <br/>
        <label htmlFor="tags">Tags: </label>
        <input
          type="text"
          name="tags"
          id="tags"
          value={this.state.tags}
          onChange={this.handleChange}
        />
        <br/>
        <button type="submit">Create the landmark info</button>
      </form>
      
    )
  }
}

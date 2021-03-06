import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import Smurfs from './Smurfs';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: ''
    };
  }


  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    axios.post('http://localhost:3333/smurfs', {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height
    })
    .then( res => {
      this.setState({ smurfs: res.data });
      this.props.history.push('/');
      window.location.reload();
      //5th times the charm^^^^
    })
    .catch( err => console.log(err));

  

    this.setState({
      name: '',
      age: '',
      height: ''
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <Link
          to='/'
          refresh='true'
          >
          <button type="submit" onClick={this.addSmurf}>Add to the village</button>
          </Link>
        </form>
      </div>
    );
  }
}

export default SmurfForm;

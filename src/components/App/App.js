import React, { Component } from 'react';
import Map from '../Map/Map'
import MainMap from '../MainMap/MainMap'
import { connect } from 'react-redux';

class App extends Component {
  state = {
    input: '',
    radius: 0,
  }

  // componentDidMount (event) {
  //   event.preventDefault();

  // }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'GET_ADDRESS', payload: this.state
    })
  }

  handleChange = (property) => (event) => {
    this.setState({
      ...this.state,
      [property]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        Map Time!
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange('input')} type="text" placeholder="address"/>
          <input type="text" onChange={this.handleChange('radius')} placeholder="radius"/>
          <input type="submit" />

        </form>

        <MainMap />
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(App);


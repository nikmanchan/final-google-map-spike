import React, { Component } from 'react';
import SearchBoxMap from '../Map/SearchMap'
import { connect } from 'react-redux';

class MainMap extends Component {
 


  render() {
    return (
      <div>
        <SearchBoxMap 
            googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCZv9A4Vtnra6r04z9JnNk91zeXwX82O68&v=3.exp&libraries=geometry,drawing,places"
            loadingElement = {<div style={{ height: `100%` }} />}
            containerElement = {<div style={{ height: `400px` }} />}
            mapElement = {<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(MainMap);
import React from 'react';
import { connect } from 'react-redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import _ from 'lodash';
/* global google */
class SearchBoxMap extends React.Component {
state = {
    bounds: null,
    center: {
      lat: 44.9778, lng: -93.2650
    },
}
componentWillMount() {
    const refs = {}

    this.setState({
      bounds: null,
      center: {
        lat: 44.9778, lng: -93.2650
      },
      markers: [],
      onMapMounted: ref => {
        refs.map = ref;
      },
      onBoundsChanged: () => {
        this.setState({
          bounds: refs.map.getBounds(),
          center: refs.map.getCenter(),
        })
      },
      onSearchBoxMounted: ref => {
        refs.searchBox = ref;
      },
      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces();
        const bounds = new google.maps.LatLngBounds();

        places.forEach(place => {
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport)
          } else {
            bounds.extend(place.geometry.location)
          }
        });
        const nextMarkers = places.map(place => ({
          position: place.geometry.location,
        }));
        const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

        this.setState({
          center: nextCenter,
          markers: nextMarkers,
        });
        refs.map.fitBounds(bounds);
      },
    })
}

  render() {
    return (
        <div>
            <GoogleMap
                ref={this.state.onMapMounted}
                defaultZoom={15}
                center={this.state.center}
                onBoundsChanged={this.props.onBoundsChanged}
            >

                <SearchBox
                ref={this.state.onSearchBoxMounted}
                bounds={this.state.bounds}
                controlPosition={google.maps.ControlPosition.TOP_LEFT}
                onPlacesChanged={this.state.onPlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="Customized your placeholder"
                        style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        marginTop: `27px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        }}
                    />
                </SearchBox>
                {this.state.markers.map((marker, index) =>
                    <Marker key={index} position={marker.position} />
                )}
        </GoogleMap>

        </div>
        );
    }
}
const mapStateToProps = state => ({
    state: state,
  });

export default connect(mapStateToProps)(withScriptjs(withGoogleMap(SearchBoxMap)))